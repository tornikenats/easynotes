from werkzeug.routing import BaseConverter, ValidationError
from bson.errors import InvalidId
from bson import ObjectId
from flask.json import JSONEncoder

class ObjectIDConverter(BaseConverter):
    def to_python(self, value):
        try:
            return ObjectId(value)
        except (InvalidId, ValueError, TypeError):
            raise ValidationError()
    def to_url(self, value):
        return value.binary


class MongoEngineJSONEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return JSONEncoder.default(self, o)
