# encoding: utf-8
import serial
import serial.tools.list_ports
import threading
import multiprocessing
import time
import random
# import struct


def rcv_data(queue):
    i = 0
    while True:
        rcv = serial.readline()
        rcv = rcv.decode()
        if rcv == "\r\n":
            time.sleep(0.1)
            continue
        print("消息: " + str(rcv[0:-2]))
        if queue.full():
            print("队列queue已满")
        else:
            if rcv[0:14] == "+CM2MCLIRECV: ":
                queue.put(rcv[14:])
                # print("rcv_data: "+str(rcv[14:-2]))
            # if rcv[0:10] == "+CM2MCLI: ":
            #     cm2mcli_code = rcv[10:-2]
                # print("+CM2MCLI code: " + str(cm2mcli_code))
            # if rcv == "ERROR":
                # print("is ERROR")

        i = i + 1
        # print("rcv_data循环次数: " + str(i))
        time.sleep(0.1)


def get_data():
    # data = random.randint(1, 9999)
    data = heartrate()
    data_hex = hex(data)
    data_hex = data_hex[2:] if len(data_hex) % 2 == 0 else "0" + data_hex[2:]
    return data_hex


def getprobability(hr):
    if hr > 120:
        return int(1 if (random.randint(-100, 0)) >= 0 else -1)
    if hr > 100:
        return int(1 if (random.randint(-95, 5)) >= 0 else -1)
    if hr > 90:
        return int(1 if (random.randint(-90, 10)) >= 0 else -1)
    if hr > 80:
        return int(1 if (random.randint(-85, 15)) >= 0 else -1)
    if hr > 75:
        return int(1 if (random.randint(-80, 20)) >= 0 else -1)
    if hr < 45:
        return int(1 if (random.randint(0, 100)) >= 0 else -1)
    if hr < 55:
        return int(1 if (random.randint(-5, 95)) >= 0 else -1)
    if hr < 65:
        return int(1 if (random.randint(-10, 90)) >= 0 else -1)
    else:
        return int(1 if (random.randint(-50, 50)) >= 0 else -1)


def heartrate():
    basic = random.randint(65, 75)
    heart_rate = basic
    for i in range(0, 1):
        sign = getprobability(heart_rate)
        add = random.randint(0, 2)
        heart_rate = heart_rate + sign * add
    return heart_rate


def temperature():
    file = open('/sys/bus/w1/devices/28-01187a999cff/w1_slave')
    text = file.read()
    tempmul1000 = int(text[-6:-1])
    print("DS18B20，温度是" + str(float(tempmul1000)/1000))
    file.close()
    return tempmul1000


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
    order_new = "AT+CM2MCLINEW=\"49.4.85.232\",\"5683\",\"00200001\"\r\n"
    serial.write(order_new.encode())
    order_new_data = serial.read(1)
    time.sleep(0.1)
    order_new_data = (order_new_data + serial.read(serial.inWaiting())).decode()
    print("order_new_data: " + str(order_new_data))
    start_time = time.time()
    while True:
        overtime = 4  # 超时未上报时间为10秒
        if (time.time() - start_time) > overtime:
            sensor_data = get_data()
            order_senddata = "at+cm2mclisend=" + str(sensor_data) + "\r\n"
            serial.write(order_senddata.encode())
            print("已发送：" + str(sensor_data))
            start_time = time.time()
            time.sleep(5)
            continue

        if queue.empty():
            # print("\n")
            time.sleep(10)
            continue
        else:
            print("get data")
            order = queue.get()
            while queue.empty() is False:
                a = queue.get()  # 读到命令就清空queue
            if order != "":
                count = 1  # 收到命令后连续上报10分钟
                while count <= 120:
                    # get sensor data
                    sensor_data = get_data()
                    order_senddata = "at+cm2mclisend=" + str(sensor_data) + "\r\n"
                    serial.write(order_senddata.encode())
                    print(str(count) + " 以发送：" + str(sensor_data))
                    time.sleep(2)
                    count = count+1
            start_time = time.time()

        time.sleep(5)
