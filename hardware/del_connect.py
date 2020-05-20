# encoding: utf-8
import serial
import serial.tools.list_ports
import time


if __name__ == '__main__':
    serialName = "/dev/ttyS0"
    serial = serial.Serial(serialName, 115200, timeout=3600)
    if serial.isOpen():
        print("open succeed >", serial.name)
    else:
        print("open failed >", serial.name)
    order_new = "AT+CM2MCLIDEL\r\n"
    serial.write(order_new.encode())
    order_new_data = serial.read(1)
    time.sleep(0.1)
    order_new_data = (order_new_data + serial.read(serial.inWaiting())).decode()
    print("order_new_data: " + str(order_new_data))
    start_time = time.time()
