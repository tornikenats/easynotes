from flask import Blueprint, request, Response
import requests

player = Blueprint('player', __name__)


def generate_data_from_response(resp, chunk=2048):
    for data_chunk in resp.iter_content(chunk_size=chunk):
        yield data_chunk


@player.route('/play')
def play_youtube():
    id = request.args.get('id', None)
    if not id:
        return jsonify('must supply id'), 400
        
    r = requests.get(f"http://localhost:5000/api/v1/play?id={id}", stream=True)
    return Response(generate_data_from_response(r), mimetype='video/mp4')