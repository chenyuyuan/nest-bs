import requests
import json
from redis import StrictRedis
import mysql.connector

# import sys

url = "https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens"

payload = "{\n\t\"auth\":{\n\t\t\"identity\":{\n\t\t\t\"methods\":[\"password\"],\n\t\t\t\"password\":{\n\t\t\t\t\"user\":{\n\t\t\t\t\t\"name\":\"cyuyuan15\",\n\t\t\t\t\t\"password\":\"ccc1111.\",\n\t\t\t\t\t\"domain\":{\n\t\t\t\t\t\t\"name\":\"cyuyuan15\"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"scope\":{\n\t\t\t\"project\":{\n\t\t\t\t\"name\": \"cn-north-4\"\n\t\t\t}\n\t\t}\n\t}\n}"
headers = {
  'Content-Type': 'application/json;charset=utf-8',
}

response = requests.request("POST", url, headers=headers, data=payload)

# print(response.text)
# print(type(response.text))

data_json = json.loads(response.text)
# print(type(data_json))
x_auth_token = response.headers.get("X-Subject-Token")
# print(x_auth_token)
# redis = StrictRedis(host='101.132.105.38', port=6379, db=0, password='')
# redis.set('xauthtoken', x_auth_token)
# print(redis.get('xauthtoken'))
mydb = mysql.connector.connect(
  host="101.132.105.38",
  user="root",
  passwd="Aaa1111.",
  database="health_center"
)
mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM sys_config")
myresult = mycursor.fetchall()     # fetchall() 获取所有记录
for x in myresult:
  print(x)
