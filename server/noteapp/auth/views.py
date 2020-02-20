from flask import Blueprint, request,  jsonify, current_app
from noteapp.extensions import flask_login, mongo, bcrypt
from noteapp.models import User
from noteapp.helpers.auth import hash_password, is_authenticated
import re 

auth = Blueprint('auth', __name__)


@auth.route('/login', methods=['POST'])
def login():
    post_data = request.get_json()
    username = post_data.get('username')
    secret = post_data.get('secret')

    regx = re.compile('^{}$'.format(username), re.IGNORECASE)
    user_dict = mongo.db.users.find_one({'username': regx})
    user_secret = secret

    if is_authenticated(user_dict, user_secret):
        user = User(user_dict['username'], user_secret)
        flask_login.login_user(user)
        resp = {
            'status': 0,
            'authenticated': True,
            'message': 'Successfully logged in.',
            'user': {
                'username': user.username,
            }
        }
        return jsonify(resp), 200

    resp = {
        'status': 'fail',
        'authenticated': False,
        'message': 'Bad login'
    }
    return jsonify(resp), 401


# DISABLE REGISTRATION
# @auth.route('/register', methods=['POST'])
# def register():
#     post_data = request.get_json()
#     username = post_data.get('username')
#     secret = post_data.get('secret')
#     hashed = hash_password(secret)

#     id = User(username, hashed).save()
#     if id:
#         resp = {
#             'status': 0,
#             'message': 'Successfully registered.',
#         }
#         return jsonify(resp), 201
#     resp = {
#         'status': 'fail',
#         'message': 'Some error occurred. Please try again.'
#     }
#     return jsonify(resp), 401


@auth.route('/status')
def status():
    if flask_login.current_user.is_authenticated:
        return jsonify({
            'status': 0,
            'authenticated': True,
            'user': {
                'username': flask_login.current_user.username,
            }
        })
        
    return jsonify({
        'status': 0,
        'authenticated': False,
    }), 200


@auth.route('/logout', methods=['POST'])
def logout():
    flask_login.logout_user()
    return jsonify({'status': 0})
