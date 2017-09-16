import requests
from requests.auth import HTTPDigestAuth
import urllib
import os

gesture_dict = {
   'happy':(['T_ROB_L','Happy'],['T_ROB_R','Happy']),
   'surprised':(['T_ROB_L','Suprised'],['T_ROB_R','Suprised']),
   'contempt':(['T_ROB_L','Contempt'],['T_ROB_R','Contempt']),
   'noclue':(['T_ROB_L','NoClue'],['T_ROB_R','NoClue']),
   'handsup':(['T_ROB_L','HandsUp'],['T_ROB_R','HandsUp']),
   'diss':(['T_ROB_L','ToDiss'],['T_ROB_R','ToDiss']),
   'anger':(['T_ROB_L','Anger'],['T_ROB_R','Anger']),
   'excited':(['T_ROB_L','Excited'],['T_ROB_R','Excited']),
   'hug':(['T_ROB_L','GiveMeAHug'],['T_ROB_R','GiveMeAHug']),
   'away':(['T_ROB_L','GoAway'],['T_ROB_R','GoAway']),
   'power':(['T_ROB_L','Powerful'],['T_ROB_R','Powerful']),
   'scared':(['T_ROB_L','Scared'],['T_ROB_R','Scared']),
   'home':(['T_ROB_L','Home'],['T_ROB_R','Home']), #reset-state should not needed to be called
   'kill':(['T_ROB_R','IKillYou'],),
   'kiss':(['T_ROB_R','Kiss'],),
   'hello':(['T_ROB_R','SayHello']),
   'no':(['T_ROB_R','SayNo'],),
   'shaking':(['T_ROB_R','ShakingHands'],)
 }

def moveRobot(arm,action):

    robot_ip=os.environ["ROBOT_IP"]

    url = 'http://'+robot_ip+'/rw'
    auth = HTTPDigestAuth('Default User', 'robotics')

    session = requests.session()

    r0 = session.get(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/bStart?json=1',
                       auth=auth)

    r02 = session.get(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/bRunning?json=1')

    payload={'value':'"'+action+'"'}
    headers = {u'content-type': u'application/x-www-form-urlencoded'}
    r1 = session.post(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/stName?action=set',
                       data=payload,
                       headers=headers)

    r2 = session.post(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/bStart?action=set',
                       data={'value':'true'})


def get_gesture_list():
    return gesture_dict.keys()


def gesture(name):
        for gesture in gesture_dict[name]:
               moveRobot(gesture[0], gesture[1])
