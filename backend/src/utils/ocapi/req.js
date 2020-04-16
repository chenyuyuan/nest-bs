var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://iam.cn-north-4.myhuaweicloud.com/v3/auth/tokens',
  'headers': {
    'Content-Type': ['application/json;charset=utf-8', 'text/plain']
  },
  body: "{\n\t\"auth\":{\n\t\t\"identity\":{\n\t\t\t\"methods\":[\"password\"],\n\t\t\t\"password\":{\n\t\t\t\t\"user\":{\n\t\t\t\t\t\"name\":\"cyuyuan15\",\n\t\t\t\t\t\"password\":\"ccc1111.\",\n\t\t\t\t\t\"domain\":{\n\t\t\t\t\t\t\"name\":\"cyuyuan15\"\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t},\n\t\t\"scope\":{\n\t\t\t\"project\":{\n\t\t\t\t\"name\": \"cn-north-4\"\n\t\t\t}\n\t\t}\n\t}\n}"

};
request(options, function (error, response) { 
  if (error) throw new Error(error);
  console.log(response.body);
});
