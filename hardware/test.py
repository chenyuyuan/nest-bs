import serial
import serial.tools.list_ports
import threading
import multiprocessing
from time import sleep


def rcv_data(queue):
    i = 1
    while True:
        rcv = serial.readline()
        rcv = rcv.decode()
        print("got order: " + str(rcv))
        if queue.full():
            print("队列queue 已满")
        queue.put(i)
        i = i + 1
        print("recv")
        print(i)
        sleep(1)


def get_data():
    data = 1
    return data


if __name__ == '__main__':
    serialName = "/dev/ttyS0"
    serial = serial.Serial(serialName, 115200, timeout=3600)
    queue = multiprocessing.Queue(100)
    th = threading.Thread(target=rcv_data, args=(queue,))
    th.setDaemon(True)
    th.start()
    if serial.isOpen():
        print("open succeed >", serial.name)
    else:
        print("open failed >", serial.name)
    # create a link
    order_new = "AT+CM2MCLINEW=\"119.3.250.80\",\"5683\",\"868334033365754\"\r\n"
    serial.write(order_new.encode())
    while True:
        # send_data = input("=>")
        # send_data = send_data + '\r\n'
        if queue.empty:
            print("队列queue为空")
            sleep(1)
            continue
        print("get data")
        order = queue.get()
        if order == 1:
            # get sensor data
            sensor_data = get_data()
            order_data = "at+cm2mclisend=" + sensor_data
            sleep(5)
            print(sensor_data)
