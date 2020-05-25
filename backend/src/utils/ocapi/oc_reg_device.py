import requests
import sys
import json
import mysql.connector

imei = sys.argv[1]
model = sys.argv[2]
deviceType = sys.argv[3]
ocproduct_id = sys.argv[4]

url = "https://49.4.92.191:8743/iocm/app/sec/v1.1.0/login"
payload = {'appId': 'YsyupmenAZu8_AK1HOujaigWs68a', 'secret': 'pSEwWvokYIp0A1PvdKPfNiMC8b8a'}
headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
}
response = requests.request("POST", url, headers=headers, data=payload, verify=False, cert=('\\client.crt', '\\client.key'))
data_json = json.loads(response.text)
# print(data_json)
print(data_json['accessToken'])
accessToken = data_json['accessToken']
authorization = "Bearer " + accessToken

url = "https://49.4.92.191:8743/iocm/app/reg/v1.1.0/deviceCredentials?appId=YsyupmenAZu8_AK1HOujaigWs68a"

payload = "{\n\t\"nodeId\":\""+imei+"\",\n\t\"deviceInfo\": {\n\t\t\"model\":\""+model+"\",\n\t\t\"manufacturerId\":\"ea2d9865d3434fd9b4830069196c91ec\",\n\t\t\"protocolType\":\"CoAP\",\n\t\t\"deviceType\":\""+deviceType+"\",\n\t\t\"manufacturerName\":\"hit\"\n\t},\n\t\"verifyCode\":\""+imei+"\"\n}"
headers = {
    'Authorization': authorization,
    'app_key': 'YsyupmenAZu8_AK1HOujaigWs68a',
    'Content-Type': 'application/json'
}
response = requests.request("POST", url, headers=headers, data=payload, verify=False, cert=('\\client.crt', '\\client.key'))
print(response.text.encode('utf8'))
data_json = json.loads(response.text)
deviceId = data_json['deviceId']


db = mysql.connector.connect(
    host="106.54.90.108",
    user="yuan",
    passwd="root",
    database="bs"
)
cursor = db.cursor()
sql = "insert into device(ocdevice_id,ocproduct_id,imei) values (\""+deviceId+"\",\""+ocproduct_id+"\",\""+imei+"\")"
cursor.execute(sql)
db.commit()

db.close()
