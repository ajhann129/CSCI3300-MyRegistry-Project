from django import forms

from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

from django.core.exceptions import ValidationError

from django.utils.translation import gettext as _

from .models import UserProfile

class CreateAccountForm(UserCreationForm):
    registry_type = forms.ChoiceField(label=_('Registry Type'), choices=[('gift', _('Gift Registry')), ('wedding', _('Wedding Registry')), ('baby', _('Baby Registry'))])

    class Meta(UserCreationForm.Meta):
        model = User
        fields = ['username', 'password1', 'password2']

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')

        try:
            validate_password(password1, self.instance)
        except ValidationError as error:
            self.add_error('password1', error)

        return password1

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
            UserProfile.objects.create(user=user, registry_type=self.cleaned_data['registry_type'])
        return user