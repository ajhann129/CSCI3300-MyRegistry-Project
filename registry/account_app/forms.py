from django import forms
from django.contrib.auth.models import User
from .models import UserProfile

class CreateAccountForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Confirm Password', widget=forms.PasswordInput)
    registry_type = forms.ChoiceField(label='Registry Type', choices=[('gift', 'Gift Registry'), ('wedding', 'Wedding Registry'), ('baby', 'Baby Registry')])

    class Meta:
        model = User
        fields = ['username']

    def save(self, commit=True):
        user = super(CreateAccountForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        if commit:
            user.save()
            UserProfile.objects.create(user=user, registry_type=self.cleaned_data['registry_type'])
        return user