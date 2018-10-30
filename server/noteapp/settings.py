import os
from .helpers import docker

class Config(object):
    """Base configuration."""

    SECRET_KEY = docker.read_secret('APP_SECRET', 'CHANGE_ME')
    FIRST_USER = docker.read_secret('FIRST_USER', 'CHANGE_ME')
    FIRST_USER_PASSWORD = docker.read_secret('FIRST_USER_PASSWORD', 'CHAN')
    PYOTP_SECRET_KEY = docker.read_secret('OTP_SECRET', 'CHANGEMEbase3232')
    BCRYPT_LOG_ROUNDS = 13
    APP_DIR = os.path.abspath(os.path.dirname(__file__))
    PROJECT_ROOT = os.path.abspath(os.path.join(APP_DIR, os.pardir))


class ProdConfig(Config):
    """Production configuration."""

    ENV = 'prod'
    DEBUG = False
    MONGO_URI = 'mongodb://db/notes'


class DevConfig(Config):
    """Development configuration."""

    ENV = 'dev'
    MONGO_URI = 'mongodb://localhost/notes'
    BCRYPT_LOG_ROUNDS = 4
    DEBUG = True


class TestConfig(Config):
    """Test configuration."""

    TESTING = True
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4