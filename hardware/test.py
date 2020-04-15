# import time
import struct

str_recv = "+CM2MCLIRECV: 0Bsdfcsfsdfsdf"  # recv success
str_new = "+CM2MCLI: 12\r\n"  # new success
str_send = "+CM2MCLI: 5"  # send success
str_error = "ERROR"

data = 1024
data_hex = (hex(struct.unpack('>H', struct.pack('>h', data))[0]))
data_hex = data_hex[2:] if len(data_hex) % 2 == 0 else "0" + data_hex[2:]


file = open('/sys/bus/w1/devices/28-01187a999cff/w1_slave')
text = file.read()
temp = float(text[-6:-1])/1000
print(temp)
file.close()


# print(data_hex)

# print(str_recv[0:14])
# print(str_new[0:-2])
# print(str_recv[14:])
# print(time.time())
# time.sleep(10)
# print(time.time())

# if str_recv[0:14] == "+CM2MCLIRECV: ":
#     print("equal")
