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


url = "https://49.4.92.191:8743/iocm/app/shadow/v1.5.0/devices/60ba3351-dcdd-40c2-8f72-937396da9911?appId=YsyupmenAZu8_AK1HOujaigWs68a"

payload = {}
headers = {
  'app_key': 'YsyupmenAZu8_AK1HOujaigWs68a',
  'Authorization': authorization,
  'Content-Type': 'application/json' 
}

response = requests.request("GET", url, headers=headers, data=payload, verify=False, cert=('\\client.crt', '\\client.key'))

data_json = json.loads(response.text)

# print(json.dumps(data_json, indent=4))





# print(type(data_json))
# xauthtoken = response.headers.get("X-Subject-Token")

# print(data_json)

# # product_id = sys.args[1]
# # device_id = sys.args[2]
# # url = "https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/" + product_id + "/devices/" + device_id + "/shadow"
# url = "https://iotda.cn-north-4.myhuaweicloud.com/v5/iot/063c924f96800fb72f78c012471a0813/devices/4a943d42-d698-43ce-a865-10a605ddddbb/shadow"

# payload = {}
# headers = {
#   'Content-Type': 'application/json',
#   'X-Auth-Token': xauthtoken
# }

# response = requests.request("GET", url, headers=headers, data=payload,  verify=False)

# # print(response.text.encode('utf8'))
# data_json = json.loads(response.text)

# temperature = data_json['shadow'][0]['reported']['properties']['up']
# temperature = int(eval("0x"+str(temperature)))
# # temperature = 26
# datatype_id = 1
# device_id = 1
# time0 = "20200415T082803Z"
# time0 = data_json['shadow'][0]['reported']['event_time']
# # 加8小时
# timeArray = time.strptime(time0, "%Y%m%dT%H%M%SZ")
# timeStamp = int(time.mktime(timeArray)) + 8*60*60
# timeArray = time.localtime(timeStamp)
# time0 = time.strftime("%Y%m%dT%H%M%SZ", timeArray)

# time0 = time0[0:8]+time0[9:-1]
# print(time0)
# print(temperature)

# mycursor = mydb.cursor()
# mycursor.execute("SELECT * FROM data where time = \'"+time0+"\'")
# myresult = mycursor.fetchall()
# # print(myresult)
# if myresult != []:
#     print("data exists")
# else:
#     mycursor = mydb.cursor()
#     sql = "insert into data (value, datatype_id, device_id, time) values ("+str(temperature)+","+str(datatype_id)+","+str(device_id)+",\'"+time0+"\')"
#     mycursor.execute(sql)
#     mydb.commit()
#     print(mycursor.rowcount, " 条记录被修改")
