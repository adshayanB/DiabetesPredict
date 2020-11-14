from flask import Flask,render_template, request, jsonify, make_response, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager,jwt_required,create_access_token
from flask_mail import Mail, Message
from sqlalchemy import Column, Integer,String, Float, Boolean
from itsdangerous import URLSafeTimedSerializer, SignatureExpired

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

filename = 'diabetes-model2.pkl'
model = pickle.load(open(filename, 'rb'))
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
app.config['SQLALCHEMY_DATABASE_URI']='sqlite:///' + os.path.join(basedir,'users.db')
app.config['SECRET_KEY']='secret-key'
app.config['MAIL_SERVER']='smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = 'ea1b2115a85da6'
app.config['MAIL_PASSWORD'] = 'f4639f2ee2cb85'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
mail=Mail(app)
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

    return jsonify(user=user_data)

@app.route('/api/register', methods=['POST'])
def register():
    data=request.json
    emailUser=data['email']

    test=User.query.filter_by(email=emailUser).first()

    if test:
        return jsonify(message='User already exists'), 409
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
    token = s.dumps(email, salt='email-confirm')

    msg = Message('Confirm Email', sender='bookingapp@booking.com', recipients=[email])

    link = url_for('confirm_email', token=token, _external=True)

    msg.body = 'Your link is {}'.format(link)

    mail.send(msg)

    db.session.add(new_user)
    db.session.commit()
    return jsonify(message='User Created'),201

@app.route('/api/login', methods=['POST'])
def login():
    login=request.json

    user=User.query.filter_by(email=login['email']).first()

    if not user:
        return jsonify(message='A user with this email does not exist.')
    if check_password_hash(user.password,login['password']):
        token=jwt.encode({'public_id': user.public_id,'exp':datetime.datetime.utcnow()+datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify(token=token.decode('UTF-8'))
    else:
        return jsonify('Your email or password is incorrect'),401

@app.route('/confirm_email/<token>')
def confirm_email(token):
    try:
        email = s.loads(token, salt='email-confirm', max_age=3600)
    except SignatureExpired:
        return jsonify(message='Invalid token')
    user=User.query.filter_by(email=email).first()
    if user.confirmedEmail:
        return jsonify(message='Email already confirmed')
    else:
        user.confirmedEmail= True
        user.confirmedOn = datetime.datetime.now()
        db.session.add(user)
        db.session.commit()
        return jsonify(message='Email confirmed')

@app.route('/api/predict', methods=['POST'])
def predict():
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

        
  
if __name__ == '__main__':
    app.run(debug=True)
    