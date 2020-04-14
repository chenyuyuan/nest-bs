# encoding: utf-8
import serial
import serial.tools.list_ports
import threading
import multiprocessing
import time
import random
import struct


def rcv_data(queue):
    i = 0
    while True:
        rcv = serial.readline()
        rcv = rcv.decode()
        print("收到消息: " + str(rcv))
        if queue.full():
            print("队列queue已满")
        else:
            if rcv[0:14] == "+CM2MCLIRECV: ":
                queue.put(rcv[14:])
                print("rcv_data: "+str(rcv[14:]))
            if rcv[0:10] == "+CM2MCLI: ":
                cm2mcli_code = rcv[10:]
                print("+CM2MCLI: " + str(cm2mcli_code))
            if rcv == "ERROR":
                print("is ERROR")

        i = i + 1
        print("rcv_data循环次数: " + str(i))
        # time.sleep(5)


def get_data():
    data = random.randint(1, 9999)
    data_hex = (hex(struct.unpack('>H', struct.pack('>h', data))[0]))
    data_hex = data_hex[2:] if len(data_hex) % 2 == 0 else "0" + data_hex[2:]
    return data_hex


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
    order_new_data = serial.read(1)
    time.sleep(0.1)
    order_new_data = (order_new_data + serial.read(serial.inWaiting())).decode()
    print("order_new_data: " + str(order_new_data))
    start_time = time.time()
    while True:
        overtime = 30  # 超时未上报时间为30秒
        if (time.time() - start_time) > overtime:
            sensor_data = get_data()
            order_senddata = "at+cm2mclisend=" + str(sensor_data)
            serial.write(order_senddata.encode())
            print("超时自动上报：" + str(sensor_data))
            start_time = time.time()
            time.sleep(5)

        if queue.empty:
            print("队列queue为空")
            time.sleep(10)
            continue
        else:
            print("get data")
            order = queue.get()
            queue.clear()  # 读到命令直接清空
            if order != "":
                count = 120  # 收到命令后连续上报10分钟
                while count > 0:
                    # get sensor data
                    sensor_data = get_data()
                    order_senddata = "at+cm2mclisend=" + str(sensor_data)
                    serial.write(order_senddata.encode())
                    print("连续上报第" + str(count) + "次：" + str(sensor_data))
                    time.sleep(5)
                    count = count-1
            start_time = time.time()

        time.sleep(5)
