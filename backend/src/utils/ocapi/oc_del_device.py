import requests
import json
import sys
import mysql.connector


ocdevice_id = sys.argv[1]


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
authorization = "Bearer " + accessToken


url = "https://49.4.92.191:8743/iocm/app/dm/v1.4.0/devices/"+ocdevice_id+"?appId=YsyupmenAZu8_AK1HOujaigWs68a"

payload = "{\n\t\"header\": {\n\t\t\"mode\":\"NOACK\",\n\t\t\"method\":\"down\",\n\t\t\"paras\":{\n\t\t\t\"req\":1\n\t\t}\n\t}\n}"
headers = {
  'Authorization': authorization,
  'app_key': 'YsyupmenAZu8_AK1HOujaigWs68a',
  'Content-Type': 'application/json'
}

response = requests.request("DELETE", url, headers=headers, data=payload, verify=False, cert=('\\client.crt', '\\client.key'))

print(response.text.encode('utf8'))

db = mysql.connector.connect(
    host="106.54.90.108",
    user="yuan",
    passwd="root",
    database="bs"
)
cursor = db.cursor()
sql = "delete from device where ocdevice_id=\""+ocdevice_id+"\""
cursor.execute(sql)
db.commit()
db.close()
