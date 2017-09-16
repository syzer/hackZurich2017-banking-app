import json
import os
import sys
import traceback
import random
import requests
from flask import Flask, request, flash, redirect, url_for
import urllib.request


app = Flask(__name__)

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])
luis_key=os.environ["AZURE_LUIS_KEY"]
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET'])
def root_get():
    menu  = '<br><br><a href="/text">Return text analysis</a>'
    menu += '<br><br><a href="/image">Return banking data</a>'
    menu += '<br><br><a href="/video">No clue</a>'
    menu += '</p>'
    return menu, 200


@app.route('/', methods=['POST'])
def root_post():
    return "ok", 200


@app.route('/json', methods=['POST'])
def text_post():
    content = request.get_json()

    return 'ok', 200

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            print('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            print('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            print('saved to:', os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

from robot import gesture
from robot import get_gesture_list
@app.route('/robot')
def robot_root():
    links = ''
    for gest in get_gesture_list():
        links += "<a href=/robot/"+gest+">"+gest+"</a><br/>"
    return links, 200


@app.route('/robot/<action>')
def robot(action):
    gesture(action)
    return 'Robot does %s' % action, 200

from flask import request

@app.route('/action')
def action():
    text = request.args.get('text')
    return 'Text was ' + str(len(text))+ ' char long', 200


@app.route('/intent')
def intent():
    statement = '+'.join(request.args.get('statement').split(' '))
    url = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/12011bc9-fe5b-4da5-8268-376aed698141?subscription-key="+luis_key+"&verbose=true&timezoneOffset=0&q="+statement
    luis_json = urllib.request.urlopen(url).read()
    return luis_json, 200


if __name__ == '__main__':
    print("Running")
    app.run(debug=True)
