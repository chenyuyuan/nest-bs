import time

str_recv = "+CM2MCLIRECV: 0Bsdfcsfsdfsdf"  # recv success
str_new = "+CM2MCLI: 1"  # new success
str_send = "+CM2MCLI: 5"  # send success
str_error = "ERROR"

print(str_recv[0:14])
print(str_new[0:13])
print(str_recv[14:])
print(time.time())
time.sleep(10)
print(time.time())

if str_recv[0:14] == "+CM2MCLIRECV: ":
    print("equal")
