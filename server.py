# -*- coding: utf-8; -*-
import bottle
import logging

from bottle import route, static_file

LOG_FORMAT = '[%(levelname).1s] [%(asctime)s] [%(name)s] %(message)s'
logging.basicConfig(level=logging.DEBUG, format=LOG_FORMAT)

@route('/:path#.*#')
def server_static(path):
    if not path:
        path = "index.html"
    return static_file(path, root='./')

if __name__ == '__main__':
    log = logging.getLogger(__name__)

    bottle.debug()
    bottle.run(server="paste", reloader=True, host='localhost', port=9999)
