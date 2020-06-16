import bids_curation_gui
import pytest


@pytest.fixture
def client():
    """Flask test client"""
    bids_curation_gui.app.testing = True
    return bids_curation_gui.app.test_client()


def test_version():
    """Package should have a version defined"""
    version = getattr(bids_curation_gui, '__version__', None)
    assert version is not None


def test_ui_index(client):
    """Should render the home page"""
    resp = client.get('/')
    assert b'<div id="root">' in resp.data
    assert b'initApp' in resp.data


def test_api_echo(client):
    """Should echo the URL parameter"""
    resp = client.get('/api/echo/test-value')
    assert resp.get_json() == {'value': 'test-value'}


def test_api_echo_empty(client):
    """Should return a 404 error"""
    resp = client.get('/api/echo')
    assert resp.status_code == 404
