from flask import Flask,render_template, request, jsonify, make_response, url_for
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer,String, Float, Boolean
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
@app.route('/api/users',methods=['GET'])
def users():
    users=User.query.all()
    output=[]
    for user in users:
        user_data={}
        user_data['public_id']=user.public_id
        user_data['firstName']=user.firstName
        user_data['lastName']=user.lastName
        user_data['password']=user.password
        user_data['email']=user.email
        user_data['healthCard']=user.healthCard
        user_data['phoneNumber']=user.phoneNumber
        user_data['confirmedEmail']=user.confirmedEmail
        user_data['confirmedOn']=user.confirmedOn
        output.append(user_data)

    return jsonify(users=output)

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

    db.session.add(new_user)
    db.session.commit()
    return jsonify(message='User Created'),201

@app.route('/api/predict', methods=['POST'])
def predict():
    json_data = request.get_json()
    
    #pregnancies = int(request.form['pregnancies'])
    #glucose = int(request.form['glucose'])
    #bp = int(request.form['bloodpressure'])
    #st = int(request.form['skinthickness'])
    #insulin = int(request.form['insulin'])
    #bmi = float(request.form['bmi'])
    #dpf = float(request.form['dpf'])
    #age = int(request.form['age'])
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
    