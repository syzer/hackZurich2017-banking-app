import requests
from requests.auth import HTTPDigestAuth
import urllib


# Thanks to Phaiax  for fixing this

def moveRobot(arm,action):


    url = 'http://[VM_IP]/rw'
    auth = HTTPDigestAuth('Default User', 'robotics')

    session = requests.session()

    r0 = session.get(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/bStart?json=1',
                       auth=auth)
    #print(r0)
    #print(r0.text)

    r02 = session.get(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/bRunning?json=1',
                       )
    #print(r02)
    #print(r02.text)


    payload={'value':'"'+action+'"'}
    headers = {u'content-type': u'application/x-www-form-urlencoded'}
    r1 = session.post(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/stName?action=set',
                       data=payload,
                       headers=headers)
    #print(r1)
    #print(r1.text)

    r2 = session.post(url + '/rapid/symbol/data/RAPID/'+arm+'/Remote/bStart?action=set',
                       data={'value':'true'},
                       )
    #print(r2)

    return;



#moveRobot('T_ROB_R','SayHello')
#moveRobot('T_ROB_L','NoClue')
#moveRobot('T_ROB_L','Home')
#moveRobot('T_ROB_L','Path_50')

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


def gesture(name):
        for gesture in gesture_dict[name]:
               moveRobot(gesture[0], gesture[1])

#gesture('kill')
