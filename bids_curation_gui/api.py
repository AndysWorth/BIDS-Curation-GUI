import datetime
import json
import os
import sys
import subprocess as sp

from flask import Blueprint, jsonify, request


blueprint = Blueprint('api', __name__)


class APIError(Exception):
    """Represents an API error.

    Follows the API exception raising and handling pattern documented
    at http://flask.pocoo.org/docs/0.12/patterns/apierrors/
    """
    def __init__(self, status_code, payload):
        super(APIError, self).__init__(self)
        self.status_code = status_code
        self.payload = payload


@blueprint.errorhandler(APIError)
def handle_api_error(error):
    """Responds with an API error in JSON format.

    Parameters
    ----------
    error: APIError

    Returns
    -------
    dict
    """
    response = jsonify(error.payload)
    response.status_code = error.status_code
    return response


@blueprint.route('/api/echo/<value>', methods=['GET'])
def echo(value):
    return jsonify({'value': value})

@blueprint.route('/api/submit', methods=['POST'])
def submit():

    print("importing heudiconv", flush=True)
    import heudiconv
    print(flush=True)
    sys.stdout.flush()
    print("importing BIDS validator", flush=True)
    from bids_validator import BIDSValidator
    print(flush=True)
    print("heudiconv --version", flush=True)
    sp.run("heudiconv --version", shell=True)
    print(flush=True)
    print("which dcm2niix", flush=True)
    sp.run("which dcm2niix", shell=True)
    print(flush=True)
    msg = f"Input directory: {os.environ['INPUT']}\n"
    msg += f"Output directory: {os.environ['OUTPUT']}\n"
    print(msg, flush=True)
    print("ls /input", flush=True)
    sp.run("ls /input", shell=True)
    print("ls /output", flush=True)
    sp.run("ls /output", shell=True)
    #print(request.get_json())
    return request.get_json()
