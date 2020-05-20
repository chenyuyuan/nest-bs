import random


def pressure():
    high = 115
    low = 75
    low = low + random.randint(-6, 6)
    high = high + random.randint(-10, 10)
    return [low, high]


def get_data():
    # data = random.randint(1, 9999)
    data = pressure()
    data_hex_low = hex(data[0])
    data_hex_low = data_hex_low[2:] if len(data_hex_low) % 2 == 0 else "0" + data_hex_low[2:]
    data_hex_high = hex(data[1])
    data_hex_high = data_hex_high[2:] if len(data_hex_high) % 2 == 0 else "0" + data_hex_high[2:]
    return str(data_hex_low) + str(data_hex_high)


print(get_data())
