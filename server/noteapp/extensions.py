from flask_bcrypt import Bcrypt
from flask_pymongo import PyMongo
import flask_login

bcrypt = Bcrypt()
mongo = PyMongo()
login_manager = flask_login.LoginManager()
