import time

time0 = "20200415T141803Z"

timeArray = time.strptime(time0, "%Y%m%dT%H%M%SZ")

timeStamp = int(time.mktime(timeArray)) + 8*60*60
print(timeStamp)
timeArray = time.localtime(timeStamp)
otherStyleTime = time.strftime("%Y%m%dT%H%M%SZ", timeArray)
print(otherStyleTime)
