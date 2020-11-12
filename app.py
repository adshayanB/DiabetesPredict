from flask import Flask,render_template, request
import pickle
import numpy as np
import json

filename = 'diabetes-model2.pkl'
model = pickle.load(open(filename, 'rb'))
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html', token="React Connected!")

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
    