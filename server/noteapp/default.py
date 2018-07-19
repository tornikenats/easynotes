from flask import Blueprint, send_from_directory

default = Blueprint('default', __name__, static_folder='static')


@default.route('/', defaults={'path': ''})
@default.route('/<path:path>')
def catch_all(path):
    return default.send_static_file('notes.html')