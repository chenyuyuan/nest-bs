import requests

url = "https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens"

payload = "{\n\t\"auth\":{\n\t\t\"identity\":{\n\t\t\t\"methods\":[\"password\"],\n\t\t\t\"password\":{\n\t\t\t\t\"user\":{\n\t\t\t\t\t\"name\":\"cyuyuan15\",\n\t\t\t\t\t\"password\":\"ccc1111.\",\n\t\t\t\t\t\"domain\":{\n\t\t\t\t\t\t\"name\":\"cyuyuan15\"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"scope\":{\n\t\t\t\"project\":{\n\t\t\t\t\"name\": \"cn-north-4\"\n\t\t\t}\n\t\t}\n\t}\n}"
headers = {
  'Content-Type': 'application/json;charset=utf-8',
  'Content-Type': 'text/plain'
}

response = requests.request("POST", url, headers=headers, data = payload)

print(response.text.encode('utf8'))
