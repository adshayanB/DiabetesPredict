from flask import Flask,render_template, request, jsonify, make_response, url_for,redirect
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager,jwt_required,create_access_token
from flask_mail import Mail, Message
from sqlalchemy import Column, Integer,String, Float, Boolean
from itsdangerous import URLSafeTimedSerializer, SignatureExpired
import sendgrid
from sendgrid.helpers.mail import *

import pickle
import numpy as np
import json
import os
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import requests
from functools import wraps

filename = 'diabetes-model.pkl'
model = pickle.load(open(filename, 'rb'))
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///' + os.path.join(basedir,'users.db')
app.config['SECRET_KEY']='secret-key'

SENDGRID_API_KEY = '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'

sg = sendgrid.SendGridAPIClient(api_key=SENDGRID_API_KEY)


s = URLSafeTimedSerializer('SECRET_KEY')

db=SQLAlchemy(app)
@app.cli.command('dbCreate')
def db_create():
    db.create_all()
    print('Database created')

@app.cli.command('dbDrop')
def db_drop():
    db.drop_all()
    print('Database Dropped')

@app.cli.command('dbSeed')
def db_seed():
    hashed_password=generate_password_hash('password', method='sha256')
    testUser=User(firstName='User',
                    lastName='Test',
                             email='doctor@doctor.com',
                             healthCard='123456789',
                             phoneNumber='4166666666',
                             password=hashed_password,
                             confirmedEmail=True,
                             public_id=str(uuid.uuid4()),
                             confirmedOn=None
                             )
    db.session.add(testUser)
    db.session.commit()
    print('Seeded')

class User(db.Model):
    id=Column(Integer, primary_key=True)
    public_id=Column(String(50), unique=True)
    firstName=Column(String(50))
    lastName=Column(String(50))
    email=Column(String(50), unique=True)
    healthCard=Column(String(10))
    phoneNumber=Column(Integer)
    password=Column(String(50))
    confirmedEmail=Column(Boolean)
    confirmedOn=Column(String())

class Data(db.Model):
    id=Column(Integer,primary_key=True)
    user_id=Column(String(50))
    data_id=Column(String(50))
    pregnancies=Column(Integer)
    glucose=Column(Float)
    bp=Column(Float)
    st=Column(Float)
    insulin=Column(Float)
    bmi=Column(Float)
    dpf=Column(Float)
    age=Column(Integer)
    result=Column(Integer)
    dateTested=Column(String())

class Track(db.Model):
    id=Column(Integer,primary_key=True)
    user_id=Column(String(50))
    dailyGlucose=Column(Integer)
    hours=Column(Integer)
    weight=Column(Float)
    height=Column(Integer)
    dateTested=Column(String())
    bmi=Column(Float)


    
def token_required(f):
    @wraps(f)
    def decorated(*args,**kwargs):
        token=None
        if 'x-access-tokens' in request.headers:
            token=request.headers['x-access-tokens']
        if not token:
            return jsonify(message='Token is missing'),401
        try:
            data=jwt.decode(token, app.config['SECRET_KEY'])
            current_user=User.query.filter_by(public_id=data['public_id']).first()
        except:
            return jsonify(message='Token is invalid'),401

        return f(current_user, *args, **kwargs)
    return decorated

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')

@app.route('/')
def home():
    return render_template('index.html', token="React Connected!")

@app.route('/api/user',methods=['GET'])
@token_required
def user(current_user):
    user_data={}
    user_data['firstName']=current_user.firstName
    user_data['lastName']=current_user.lastName
    user_data['email']=current_user.email
    user_data['healthCard']=current_user.healthCard
    user_data['phoneNumber']=current_user.phoneNumber
    user_data['confirmedEmail']=current_user.confirmedEmail
    user_data['confirmedOn']=current_user.confirmedOn

    return jsonify(user_data)

@app.route('/api/register', methods=['POST'])
def register():
    data=request.json
    emailUser=data['email']

    test=User.query.filter_by(email=emailUser).first()

    if test:
        return jsonify(message='A user with this email already exists.'), 409
    if data['password'] != data['confirmPassword']:
        return jsonify(message='Passwords do not  match')
    else:
        hashed_password=generate_password_hash(data['password'], method='sha256')
        new_user=User(
                             public_id=str(uuid.uuid4()),
                             firstName=data['firstName'],
                             lastName=data['lastName'],
                             email=data['email'],
                             healthCard=data['healthCard'],
                             phoneNumber=data['phoneNumber'],
                             password=hashed_password,
                             confirmedEmail=False,
                             confirmedOn=None
                             )
        email = data['email']
        from_email = Email("diabetesd0@gmail.com")
        to_email=To(email)
        subject="Verify your email"
        token = s.dumps(email, salt='email-confirm')
        link = url_for('confirm_email', token=token, _external=True)
        content=Content("text/plain", "Your link is {}".format(link))
        mail = Mail(from_email, to_email, subject, content)

        response = sg.client.mail.send.post(request_body=mail.get())
        print(response.status_code)
        print(response.body)
        print(response.headers)
        db.session.add(new_user)
        db.session.commit()
        return jsonify(message='User Created'),201
@app.route('/api/resendToken',methods=['POST'])
def resend():
    data=request.json

    test=User.query.filter_by(email=data['email']).first()
    if not test:
        return jsonify(message="Invalid Email")
    if test.confirmedEmail:
        return jsonify(message="Already Verified!")
    else:
        email = data['email']
        from_email = Email("diabetesd0@gmail.com")
        to_email=To(email)
        subject="Verify your email"
        token = s.dumps(email, salt='email-confirm')
        link = url_for('confirm_email', token=token, _external=True)
        content=Content("text/plain", "Your link is {}".format(link))
        mail = Mail(from_email, to_email, subject, content)

        response = sg.client.mail.send.post(request_body=mail.get())
        print(response.status_code)
        print(response.body)
        print(response.headers)
        return jsonify(message='Sent a new token!')

@app.route('/api/login', methods=['POST'])
def login():
    login=request.json

    user=User.query.filter_by(email=login['email']).first()

    if not user:
        return jsonify(message='A user with this email does not exist.')
    if not user.confirmedEmail:
        return jsonify(message='User is not verified')
    if check_password_hash(user.password,login['password']):
        token=jwt.encode({'public_id': user.public_id,'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify(token=token.decode('UTF-8'))
    else:
        return jsonify(message='Your email or password is incorrect'),401

@app.route('/confirm_email/<token>')
def confirm_email(token):
    return redirect('/auth/' + token)

@app.route('/api/confirm_email/<token>')
def confirm_email_api(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
    except SignatureExpired:
        return jsonify(message='token_expired')
    user=User.query.filter_by(email=email).first()
    if user.confirmedEmail:
         return jsonify(message='email_already_confirmed')
    else:
        user.confirmedEmail= True
        user.confirmedOn = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()
        return jsonify(message='email_confirm_success')

@app.route('/api/predict', methods=['POST'])
@token_required
def predict(current_user):
    json_data = request.get_json()
    
    pregnancies = int(json_data['pregnancies'])
    glucose = int(json_data['glucose'])
    bp = int(json_data['bloodpressure'])
    st = int(json_data['skinthickness'])
    insulin = int(json_data['insulin'])
    bmi = float(json_data['bmi'])
    dpf = float(json_data['dpf'])
    age = int(json_data['age'])

    data = np.array([[pregnancies, glucose, bp, st, insulin, bmi, dpf, age]])

    my_prediction = model.predict(data)
    serializable_prediction = my_prediction.tolist()


    return json.dumps(serializable_prediction)
    #return render_template('result.html', prediction=my_prediction)

@app.route('/api/trackData', methods =['POST'])
@token_required
def trackData(current_user):
    user_data={}
    user_data['public_id']=current_user.public_id
    data=request.json
    newTrackData=Track(
        user_id=user_data['public_id'],
        dailyGlucose=data['dailyGlucose'],
        hours=data['hours'],
        weight=data['weight'],
        height=data['height'],
        dateTested=datetime.datetime.now(),
        bmi=round((data['weight']/data['height']/data['height'])*10000, 2)
    )
    db.session.add(newTrackData)
    db.session.commit()
    return jsonify(message='Data Added'),201

@app.route('/api/trackDataAll',methods=['GET'])
@token_required
def trackDataAll(current_user):
    user={}
    user['public_id']=current_user.public_id
    userData=Track.query.filter_by(user_id=user['public_id']).all()
    output=[]
    if userData:
        for data in userData:
            trackData={}
            trackData['dailyGlucose']=data.dailyGlucose
            trackData['hours']=data.hours
            trackData['weight']=data.weight
            trackData['height']=data.height
            trackData['dateTested']=data.dateTested
            output.append(trackData)
        return jsonify(userData=output)
    else:
        return jsonify(message='You do not have any Tracking Data')

@app.route('/api/trackData', methods=['GET'])
@token_required
def getTrackData(current_user):
    user={}
    user['public_id']=current_user.public_id

    userDataAll=Track.query.filter_by(user_id=user['public_id']).order_by('dateTested').all()
    userData=userDataAll[-1]
    
    if userData:
        user_data={}
        user_data['dailyGlucose']=userData.dailyGlucose
        user_data['hours']=userData.hours
        user_data['weight']=userData.weight
        user_data['height']=userData.height
        user_data['dateTested']=userData.dateTested

        return jsonify(user_data=user_data)
    else:
        return jsonify(message='No Tracking Data')


@app.route('/api/predictData',methods=['POST'])
@token_required
def predictData(current_user):
   
    user_data={}

    user_data['public_id']=current_user.public_id
    data=request.json
    if not isinstance(data['pregnancies'], int) :
        return jsonify(message=f'Pregnancies must be of an integer value')
    if not isinstance(data['age'], int):
        return jsonify(message=f'Age must be of an integer value')
    
    newData=Data(
        user_id=user_data['public_id'],
        data_id=str(uuid.uuid4()),
        pregnancies=data['pregnancies'],
        glucose=data['glucose'],
        bp=data['bp'],
        st=data['st'],
        insulin=data['insulin'],
        bmi=data['bmi'],
        dpf=data['dpf'],
        age=data['age'],
        result=data['result'],
        dateTested=datetime.datetime.now()
    )
    db.session.add(newData)
    db.session.commit()
    return jsonify(message='Data Added'),201
@app.route('/api/predictData/<dataId>',methods=['DELETE'])
@token_required
def deletePredictData(current_user,dataId):
    user={}
    user['public_id']=current_user.public_id
    deleteData=Data.query.filter_by(data_id=dataId,user_id=user['public_id']).first()

    if deleteData:
        db.session.delete(deleteData)
        db.session.commit()
        return jsonify(message='Data has been deleted')
    else:
        return jsonify(message='Data does not exist')




@app.route('/api/predictData',methods=['GET'])
@token_required
def getPredictDataAll(current_user):
    user={}
    user['public_id']=current_user.public_id

    userDataAll=Data.query.filter_by(user_id=user['public_id']).all()
    output=[]
    if userDataAll:
        for user in userDataAll:
            user_data={}
            user_data['pregnancies']=user.pregnancies
            user_data['glucose'] = user.glucose
            user_data['bp']=user.bp
            user_data['st']=user.st
            user_data['insulin']=user.insulin
            user_data['bmi']=user.bmi
            user_data['dpf']=user.dpf
            user_data['age']=user.age
            user_data['result']=user.result
            user_data['dateTime']=user.dateTested
            user_data['id'] = user.id
            user_data['data_id']=user.data_id
            output.append(user_data)

        return jsonify(userData=output)
    else:
        return jsonify(message="No Predict Data")
    
  
if __name__ == '__main__':
    app.run(debug=True)
    