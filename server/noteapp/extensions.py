from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
import flask_login
from flask_pyotp import PyOTP

bcrypt = Bcrypt()
mongo = PyMongo()
login_manager = flask_login.LoginManager()
pyotp = PyOTP()
