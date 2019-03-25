# -*- coding: utf-8 -*-
import os
import click
from flask import current_app
from flask.cli import with_appcontext
from noteapp.models import User
from noteapp.helpers.auth import hash_password


@click.command()
@click.argument('username')
@click.argument('password')
@with_appcontext
def add_user(username, password):
    User(username, hash_password(password)).save()
