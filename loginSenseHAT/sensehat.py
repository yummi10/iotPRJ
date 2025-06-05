from sense_hat import SenseHat
import requests
from datetime import datetime
import time

sense = SenseHat()

FIREBASE_URL = 'https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app'

my_name = "신유림"
my_id = "2024800010"

def push_sensor_data():
    temp = round(sense.get_temperature(), 2)    # 소수점 2자리
    hum = round(sense.get_humidity(), 2)        # 소수점 2자리
    press = round(sense.get_pressure(), 2)      # 소수점 2자리

    orientation = sense.get_orientation()       # pitch, roll, yaw
    accel = sense.get_accelerometer_raw()       # x, y, z

    now = datetime.now().strftime("%Y-%m-%dT%H:%M:%S")  # ISO 8601

    data = {
        "info": {
            "학번": my_id  # string
        },
        "sensehat": {
            "accel": {
                "x": round(accel['x'], 4),
                "y": round(accel['y'], 4),
                "z": round(accel['z'], 4)
            },
            "gyro": {
                "x": round(orientation['pitch'], 4),
                "y": round(orientation['roll'], 4),
                "z": round(orientation['yaw'], 4)
            },
            "humidity": hum,
            "pressure": press,
            "temperature": temp,
            "timestamp": now
        }
    }

    # 이름을 최상위 경로로 해서 데이터 저장
    requests.put(f"{FIREBASE_URL}/{my_name}.json", json=data)

try:
    while True:
        push_sensor_data()
        time.sleep(10)
except KeyboardInterrupt:
    print("종료됨")
