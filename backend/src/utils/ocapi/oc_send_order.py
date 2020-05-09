import requests
import sys
import time
import json
import mysql.connector

# 参数：
# 1 ocproduct_id
# 2 ocdevice_id
# 3 device_id
# 4 数据个数
# 5 每个数据类型分别按顺序排列的id
#  ......

mydb = mysql.connector.connect(
  host="101.132.105.38",
  user="root",
  passwd="Aaa1111.",
  database="health_center"
)

url = "https://49.4.92.191:8743/iocm/app/sec/v1.1.0/login"

payload = {'appId': 'YsyupmenAZu8_AK1HOujaigWs68a', 'secret': 'pSEwWvokYIp0A1PvdKPfNiMC8b8a'}
headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

response = requests.request("POST", url, headers=headers, data=payload, verify=False, cert=('\\client.crt', '\\client.key'))


data_json = json.loads(response.text)
print(data_json)
print(data_json['accessToken'])

accessToken = data_json['accessToken']

# 获取设备影子

authorization = "Bearer " + accessToken


url = "https://49.4.92.191:8743/iocm/app/signaltrans/v1.1.0/devices/60ba3351-dcdd-40c2-8f72-937396da9911/services/down/sendCommand?appId=YsyupmenAZu8_AK1HOujaigWs68a"


# payload = 'header=%7B%22mode%22%3A%20%22ACK%22%2C%22method%22%3A%20%22INVITE-INIT%22%7D'
payload = {
  'header': {
    'mode': 'ACK',
    'method': 'INVITE-INIT',
  }
}
headers = {
  'Authorization': authorization,
  'app_key': 'YsyupmenAZu8_AK1HOujaigWs68a',
  'Content-Type': 'application/json',
}

response = requests.request("POST", url, headers=headers, data=payload, verify=False, cert=('\\client.crt', '\\client.key'))

print(response.text.encode('utf8'))
