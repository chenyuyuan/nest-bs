import random
# import matplotlib.pyplot as plt
# import numpy as np
from matplotlib.font_manager import FontProperties
font = FontProperties(fname=r"C:\Windows\Fonts\simhei.ttf", size=14)


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
    for i in range(0, 400):
        sign = getprobability(heart_rate)
        add = random.randint(0, 2)
        heart_rate = heart_rate + sign * add
    return heart_rate


# plt.title(u'散点图示例', FontProperties=font)

# plt.xlabel('x-value')
# plt.ylabel('y-label')
# # plt.scatter(x, y, s, c, marker)
# # x: x轴坐标
# # y：y轴坐标
# # s：点的大小/粗细 标量或array_like 默认是 rcParams['lines.markersize'] ** 2
# # c: 点的颜色
# # marker: 标记的样式 默认是 'o'
# plt.legend()

# plt.plot(xlist, ylist, marker='o')
# plt.show()
