import serial
# import os
import threading
import serial.tools.list_ports
from time import sleep


def rcv_data():
    while True:
        rc = serial.readline()
        rcv = rc.decode()
        print(rcv)


if __name__ == '__main__':
    serialName = "/dev/ttyS0"
    # print(serialName)
    serial = serial.Serial(serialName, 115200, timeout=3600)
    th = threading.Thread(target=rcv_data)
    th.setDaemon(True)
    th.start()
    if serial.isOpen():
        print("open succeed >", serial.name)
    else:
        print("open failed >", serial.name)
    while True:
        send_data = input("=>")
        send_data = send_data + '\r\n'
        serial.write(send_data.encode())
        data = serial.read(1)
        sleep(0.1)
        data = (data + serial.read(serial.inWaiting())).decode()
        print(data)
