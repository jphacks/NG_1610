#!/usr/bin/env python
# -*- coding: utf-8 -*-

from bottle import template, static_file, route, run, get, view, url
from bottle.ext.websocket import GeventWebSocketServer
from bottle.ext.websocket import websocket

import os
import json

clients = set()
drones = set()

@route('/static/css/<filepath:path>', name='css')
def static_css(filepath):
    return static_file(filepath, root="./static/css")


@route('/static/js/<filepath:path>', name='js')
def static_css(filepath):
    return static_file(filepath, root="./static/js")


# @route('/')
# def html_index():
#     return template('./views/index')
@route('/')
@view("index")
def html_index():
    return dict(url=url)


@get('/ws/client', apply=[websocket])
def ws_client(ws):
    clients.add(ws)
    while True:
        msg = ws.receive()
        if msg is not None:
            for c in drones:
                c.send(json.dumps({'data': msg}))
        else: break
    clients.remove(ws)


@get('/ws/drone', apply=[websocket])
def ws_drone(ws):
    drones.add(ws)
    while True:
        msg = ws.receive()
        if msg is not None:
            for c in clients:
                c.send(json.dumps({'data': msg}))
        else: break
    drones.remove(ws)


run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)), server=GeventWebSocketServer)
