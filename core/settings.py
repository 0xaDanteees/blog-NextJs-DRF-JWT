import os
import environ
from pathlib import Path
from datetime import timedelta
from decouple import config
import cloudinary_storage
import cloudinary.uploader
import cloudinary.api

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

env=environ.Env()
env.read_env(os.path.join(BASE_DIR,".env"))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
#On prod this might as well be in a .env
DEBUG = True

ALLOWED_HOSTS = []
DOMAIN='localhost:3000'
SITE_NAME='DROPZ'
SITE_ID =1
WEBSITE_URL='http://localhost:3000'



AUTH_USER_MODEL = "profiles.UserAccount"

DJANGO_APPS=[
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

THIRD_PARTY_APPS=[
 
    'corsheaders',
    'rest_framework',
    'rest_framework.authtoken',
    'djoser',
    'cloudinary',
    'cloudinary_storage',
]

MY_APPS=[

    'profiles',
    'blog',
]

INSTALLED_APPS=DJANGO_APPS+MY_APPS+THIRD_PARTY_APPS


MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

#.env needed in prod
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]


REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DATETIME_FORMAT": "%Y/%m/%d %H:%M",
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=1),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=8),
    "AUTH_HEADER_TYPES": ("JWT",),
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
}

DJOSER = {

    "LOGIN_FIELD": "email",

    "SEND_ACTIVATION_EMAIL": True,

    "SEND_CONFIRMATION_EMAIL": True,

    "USERNAME_CHANGED_EMAIL_CONFIRMATION": True,

    "PASSWORD_CHANGED_EMAIL_CONFIRMATION": True,
 
    "USER_CREATE_PASSWORD_RETYPE": True,

    "SET_PASSWORD_RETYPE": True,

    "ACTIVATION_URL": "signup/{uid}/{token}",

    "PASSWORD_RESET_CONFIRM_URL": "reset-password/{uid}/{token}",

    "SERIALIZERS": {
        "user_create": "profiles.serializers.UserSerializer",
        "user": "profiles.serializers.UserSerializer",
        "current_user": "profiles.serializers.UserSerializer",
    },
}

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
#Didnt saw the need to migrate to Postges but easily to do :3


# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Password validation
PASSWORD_HASHERS = [
    "django.contrib.auth.hashers.Argon2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2PasswordHasher",
    "django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher",
    "django.contrib.auth.hashers.BCryptSHA256PasswordHasher",
]

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'America/Mexico_City'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'
STATIC_ROOT = str(BASE_DIR / 'staticfiles')

MEDIA_URL = '/media/'
# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field



DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CLOUDINARY_STORAGE={
'CLOUD_NAME': env("CLOUDINARY_NAME"),
'API_KEY' : env("CLOUDINARY_API_KEY"),
'API_SECRET': env("CLOUDINARY_API_SECRET")
}

DEFAULT_FILE_STORAGE = "cloudinary_storage.storage.MediaCloudinaryStorage"

LOGIN_REDIRECT_URL = '/'
EMAIL_BACKEND = 'django_ses.SESBackend'
DEFAULT_FROM_EMAIL=env('AWS_SES_FROM_EMAIL')
AWS_SES_ACCESS_KEY_ID = env('AWS_SES_ACCESS_KEY_ID')
AWS_SES_SECRET_ACCESS_KEY = env('AWS_SES_SECRET_ACCESS_KEY')
AWS_SES_REGION_NAME=env('AWS_SES_REGION_NAME')
AWS_SES_REGION_ENDPOINT=f'email.{AWS_SES_REGION_NAME}.amazonaws.com'
AWS_SES_FROM_EMAIL= env('AWS_SES_FROM_EMAIL')
# If you want to use the SESv2 client
USE_SES_V2 = True   

# aws settings
AWS_QUERYSTRING_AUTH = False

AWS_ACCESS_KEY_ID = env('AWS_ACCESS_KEY_ID')
AWS_SECRET_ACCESS_KEY = env('AWS_SECRET_ACCESS_KEY')
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')

AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.us-east-2.amazonaws.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
AWS_DEFAULT_ACL = 'public-read'

AUTHENTICATION_BACKENDS=[
    'django.contrib.auth.backends.ModelBackend',
]