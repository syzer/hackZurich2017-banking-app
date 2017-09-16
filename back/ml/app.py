import json
import os
import sys
import traceback
import random

import requests
from flask import Flask, request, flash, redirect, url_for

app = Flask(__name__)


UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

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


import http.client, urllib.request, urllib.parse, urllib.error, base64
key=os.environ["AZURE_LUIS_KEY"]
headers = {
    # Request headers
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': key,
}

def call_luis():
    params = urllib.parse.urlencode({
    })

    try:
        conn = http.client.HTTPSConnection('westus.api.cognitive.microsoft.com')
        conn.request("POST", "/luis/api/v2.0/apps/?%s" % params, "{hello there my good man}", headers)
        response = conn.getresponse()
        data = response.read()
        print(data)
        conn.close()
        return data, 200
    except Exception as e:
        print("[Errno {0}] {1}".format(e.errno, e.strerror))
    return 'not ok',200

if __name__ == '__main__':
    print("Running")
    app.run(debug=True)
