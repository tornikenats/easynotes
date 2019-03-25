from flask import current_app
from noteapp.extensions import bcrypt, pyotp
from noteapp.models import User


def hash_password(password):
    hash = bcrypt.generate_password_hash(
        password, current_app.config.get('BCRYPT_LOG_ROUNDS')).decode()
    return hash


def is_authenticated(user_dict, user_secret, otp_token):
    return user_dict and bcrypt.check_password_hash(user_dict['secret'], user_secret) and pyotp.verify(otp_token)
