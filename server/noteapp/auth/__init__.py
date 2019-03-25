from flask import jsonify
from noteapp.extensions import login_manager, bcrypt, mongo
from noteapp.helpers.auth import hash_password
from noteapp.models import User

@login_manager.user_loader
def user_loader(username):
    user_dict = mongo.db.users.find_one({'username': username})
    if not user_dict:
        return
    user = User(username, user_dict['secret'])
    return user


@login_manager.request_loader
def request_loader(request):
    post_data = request.get_json()
    if not post_data:
        return

    username = post_data.get('username')
    password = post_data.get('secret')
    user_dict = mongo.db.users.find_one({'username': username})
    if not user_dict:
        return

    user = User(username, user_dict['secret'])

    # DO NOT ever store passwords in plaintext and always compare password
    # hashes using constant-time comparison!
    user.is_authenticated = bcrypt.check_password_hash(user_dict['secret'], password)
    
    return user

@login_manager.unauthorized_handler
def unauthorized_handler():
    return jsonify({'status': 'Unauthorized'}), 401