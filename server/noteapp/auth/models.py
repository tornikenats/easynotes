import time
from noteapp.extensions import flask_login, mongo


class User(flask_login.UserMixin):
    def __init__(self, username, secret):
        self.username = username
        self.secret = secret
        self.ts = time.time()

    def save(self):
        id = mongo.db.users.update(
            {
                'username': self.username,
            },
            {
                '$set': {
                    'secret': self.secret,
                    'ts': self.ts
                }
            },
            upsert=True
        )
        return str(id)

    def get_id(self):
        return self.username
