from flask import Blueprint, request, make_response, jsonify, render_template
from flask.views import MethodView
from noteapp.extensions import mongo, flask_login
import time
from pymongo.errors import ConnectionFailure


class Notes(MethodView):
    @flask_login.login_required
    def get(self, note_id):
        if note_id:
            cursor = mongo.db.entries.find({'_id': note_id})
        else:
            cursor = mongo.db.entries.find({}).sort([('ts', -1)])

        try:
            notes = list(cursor)
        except ConnectionFailure:
            notes = []

        for i, entry in enumerate(notes):
            entry['key'] = i

        return jsonify(notes)

    @flask_login.login_required
    def post(self, note_id):
        data = request.get_json()
        data['ts'] = time.time()

        if note_id:
            resp = mongo.db.entries.update({'_id': note_id}, {'$set': data})
        else:
            resp = mongo.db.entries.insert_one(data)

        return jsonify(data)

    @flask_login.login_required
    def delete(self, note_id):
        if not note_id:
            return jsonify({
                'status': 1,
                'msg': 'note_id is missing'
            })

        mongo.db.entries.delete_one({'_id': note_id})
        return jsonify({'deleted_id': note_id})
