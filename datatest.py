from sklearn.externals import joblib
import json
import numpy as np
import matplotlib.pyplot as plt
from sklearn import preprocessing 
from sklearn import linear_model
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score
from sklearn.linear_model import Ridge
import pickle
from sklearn.externals import joblib

linreg = joblib.load('model.pkl')

data_test = open('sample.json').read()
dat_test  = json.loads(data_test)
dat_test = np.array([dat_test])

#x variables
xStr = ['firstTimeHomeBuyer', 'occupancyStatus', 'sellerName', 'servicerName', 
        'channel', 'PPM', 'propertyType', 'loanPurpose']
xFloat = ['creditScore', "numBorrowers", "numUnits", 'loanTerm', 'DTI', 'unpaidAmount', 'LTV', 'CLTV']
def toStringArr(featureName):
    arr = []
    for i in range(0, len(dat_test)):
        arr.append(str(dat_test[i][featureName]))
    return arr
def toFloatArr(featureName):
    arr = []
    for i in range(0, len(dat_test)):
        arr.append( float(dat_test[i][featureName]))
    return arr

firstTimeHomeBuyer = toStringArr('firstTimeHomeBuyer')
OS = toStringArr(xStr[1])
SN = toStringArr(xStr[2])
SerN = toStringArr(xStr[3])
Ch = toStringArr(xStr[4])
PPM = toStringArr(xStr[5])
PT = toStringArr(xStr[6])
LP = toStringArr(xStr[7])

le = preprocessing.LabelEncoder()

fTHMBclass = le.fit(['True', 'False', 'None'])

le2 = preprocessing.LabelEncoder()

OSclass = le2.fit(['O', 'I', 'S'])
le3 = preprocessing.LabelEncoder()

sellerNclass = le3.fit(SN)
le4 = preprocessing.LabelEncoder()

servicerNclass = le4.fit(SerN) 
le5 = preprocessing.LabelEncoder()

chaclass = le5.fit(Ch)
le6 = preprocessing.LabelEncoder()

PPMclass = le6.fit(PPM)
le7 = preprocessing.LabelEncoder()

PTclass = le7.fit(PT)
le8 = preprocessing.LabelEncoder()

lpclass = le8.fit(LP)

#{Preprocess each data object in array}
dataArr = [];
for item in dat_test:
    data_point_arr = [];
    for key in list(item):
        if key in xStr:
            if(key == xStr[0]):
               item[key] = fTHMBclass.transform([str(item[key])])[0]
            if(key == xStr[1]):
                item[key] = OSclass.transform([item[key]])[0]
            if(key == xStr[2]):
                item[key] = sellerNclass.transform([item[key]])[0]
            if(key== xStr[3]):
                item[key] = servicerNclass.transform([item[key]])[0]
            if(key== xStr[4]):
                item[key] = chaclass.transform([item[key]])[0]
            if(key == xStr[5]):
                item[key] = PPMclass.transform([item[key]])[0]
            if(key == xStr[6]):
                item[key] = PTclass.transform([item[key]])[0]
            if(key == xStr[7]):
                item[key] = lpclass.transform([item[key]])[0]
            data_point_arr.append(item[key])
        elif key in xFloat:
            try:
                if (item[key]==None):
                    item[key]=301.00
                    data_point_arr.append(item[key])
                else:
                    item[key] = float(item[key])
                    data_point_arr.append(item[key])
            except ValueError:
                if key =='DTI' and item[key] == '   ':
                    item[key] = 65.00
                    data_point_arr.append(item[key])
                elif key == 'DTI' and item[key] == '':
                    item[key] = 30
                    data_point_arr.append(item[key])
                else:
                    item[key] = 50.00
                    data_point_arr.append(item[key])
                
        else:
            del item[key]
    dataArr.append(np.array(data_point_arr))
ypred = linreg.predict(np.array(dataArr))