import numpy as np
import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

df =pd.read_csv('diabetes-dataset.csv')
df=df.rename(columns={'DiabetesPedigreeFunction':'DPF'})
df[['Glucose','BloodPressure','SkinThickness','Insulin','BMI']]=df[['Glucose','BloodPressure','SkinThickness','Insulin','BMI']].replace(0,np.NaN)


df['Glucose'].fillna(df['Glucose'].mean(), inplace=True)
df['BloodPressure'].fillna(df['BloodPressure'].mean(), inplace=True)
df['SkinThickness'].fillna(df['SkinThickness'].median(), inplace=True)
df['Insulin'].fillna(df['Insulin'].median(), inplace=True)
df['BMI'].fillna(df['BMI'].median(), inplace=True)

X=df.drop(columns='Outcome')
Y=df['Outcome']

X_train, X_test, Y_train, Y_test = train_test_split(X,Y, test_size=0.20,random_state=0)

model=RandomForestClassifier(n_estimators=20)
model.fit(X_train,Y_train)

filename = 'diabetes-model.pkl'
pickle.dump(model, open(filename, 'wb'))