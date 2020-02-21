from flask import Flask, jsonify
from noteapp import commands
from noteapp.settings import ProdConfig
from noteapp.notes import notes
from noteapp.player import player
from noteapp.auth.views import auth
from noteapp.extensions import bcrypt, mongo, login_manager
from noteapp.converters import ObjectIDConverter, MongoEngineJSONEncoder

def create_app(config_object=ProdConfig):
    app = Flask(__name__)
    app.json_encoder = MongoEngineJSONEncoder
    app.config.from_object(config_object)

    register_converters(app)
    register_extensions(app)
    register_blueprints(app)
    register_errorhandlers(app)
    register_shellcontext(app)
    register_commands(app)

    return app


def register_blueprints(app):
    app.register_blueprint(notes, url_prefix='/api/v1/notes')
    app.register_blueprint(player, url_prefix='/api/v1/player')
    app.register_blueprint(auth, url_prefix='/api/v1/auth')

def register_extensions(app):
    bcrypt.init_app(app)
    mongo.init_app(app)
    login_manager.init_app(app)


def register_errorhandlers(app):
    """Register error handlers."""
    def render_error(error):
        """Render error template."""
        # If a HTTPException, pull the `code` attribute; default to 500
        error_code = getattr(error, 'code', 500)
        return jsonify({'error': error_code}), error_code
    for errcode in [401, 404, 500]:
        app.errorhandler(errcode)(render_error)


def register_shellcontext(app):
    """Register shell context objects."""
    def shell_context():
        """Shell context objects."""
        return {
            'db': db,
            'User': user.models.User}

    app.shell_context_processor(shell_context)


def register_commands(app):
    app.cli.add_command(commands.add_user)
    app.cli.add_command(commands.encrypt_password)


def register_converters(app):
    app.url_map.converters['objectid'] = ObjectIDConverter
