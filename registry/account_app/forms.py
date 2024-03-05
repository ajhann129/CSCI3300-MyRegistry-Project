from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
from .models import UserProfile

class CreateAccountForm(forms.ModelForm):
    password1 = forms.CharField(label=_('Password'), widget=forms.PasswordInput)
    password2 = forms.CharField(label=_('Confirm Password'), widget=forms.PasswordInput)
    registry_type = forms.ChoiceField(label=_('Registry Type'), choices=[('gift', _('Gift Registry')), ('wedding', _('Wedding Registry')), ('baby', _('Baby Registry'))])

    class Meta:
        model = User
        fields = ['username']

    def clean_password1(self):
        password1 = self.cleaned_data.get('password1')
        username = self.cleaned_data.get('username')
        registry_type = self.cleaned_data.get('registry_type')

        try:
            validate_password(password1, self.instance)
        except ValidationError as error:
            self.add_error('password1', error)

        # Add username and registry_type back to cleaned data
        self.cleaned_data['username'] = username
        self.cleaned_data['registry_type'] = registry_type

        return password1

    def clean_password2(self):
        password1 = self.cleaned_data.get('password1')
        password2 = self.cleaned_data.get('password2')

        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(_('Passwords do not match'))

        return password2

    def save(self, commit=True):
        user = super(CreateAccountForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
            UserProfile.objects.create(user=user, registry_type=self.cleaned_data['registry_type'])
        return user