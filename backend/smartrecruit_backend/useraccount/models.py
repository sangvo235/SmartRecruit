import uuid 
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models
import PyPDF2
from ml_processing.ml_model import ResumeProcessor
from django.http import JsonResponse

resume_processor = ResumeProcessor()

class CustomUserManager(UserManager):
    def _create_user(self, name, email, password, **extra_fields):
        if not email:
            raise ValueError('You have not specified a valid email address.')
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_user(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(name, email, password, **extra_fields)
    
    def create_superuser(self, name=None, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(name, email, password, **extra_fields)
    
class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True, default='')
    bio = models.TextField(blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    phone = models.CharField(max_length=15,blank=True, default='')
    avatar = models.ImageField(upload_to='uploads/avatars', default='uploads/avatars/default.jpg')
    resume = models.FileField(upload_to='uploads/resumes', blank=True, null=True)
    resume_text = models.TextField(blank=True, default='')
    skills = models.JSONField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    EMAIL_FIELDS = 'email'
    REQUIRED_FIELDS = ['name',]

    def avatar_url(self):
        if self.avatar:
            return f'{settings.WEBSITE_URL}{self.avatar.url}'
        else: 
            return ''
        
    def resume_url(self):
        if self.resume:
            return f'{settings.WEBSITE_URL}{self.resume.url}'
        else:
            return ''
        
    def save(self, *args, **kwargs):
        if self.resume:
            try:
                pdf_reader = PyPDF2.PdfFileReader(self.resume)
                resume_text = ''
                for page_num in range(pdf_reader.numPages):
                    resume_text += pdf_reader.getPage(page_num).extractText()
                self.resume_text = resume_text
                skills = resume_processor.analyze_resume(resume_text)
                self.skills = skills
            except PyPDF2.utils.PdfReadError:
                return JsonResponse({'error': 'Invalid PDF file. Please upload a valid PDF file.'}, status=400)

        super().save(*args, **kwargs) 

