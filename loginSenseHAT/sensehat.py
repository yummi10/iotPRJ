from sense_hat import SenseHat
import requests
import time
from datetime import datetime

sense = SenseHat()

FIREBASE_SENSOR_URL = 'https://loginsensehat-default-rtdb.firebaseio.com/sensor.json'

try:
    while True:
        temp = round(sense.get_temperature(), 1)
        hum = round(sense.get_humidity(), 1)
        press = round(sense.get_pressure(), 1)

        orientation = sense.get_orientation()  # pitch, roll, yaw
        accel = sense.get_accelerometer_raw()  # x, y, z

        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        data = {
            "temperature": temp,
            "humidity": hum,
            "pressure": press,
            "gyro": {
                "pitch": round(orientation['pitch'], 1),
                "roll": round(orientation['roll'], 1),
                "yaw": round(orientation['yaw'], 1)
            },
            "acceleration": {
                "x": round(accel['x'], 2),
                "y": round(accel['y'], 2),
                "z": round(accel['z'], 2)
            },
            "updated": now
        }

        requests.put(FIREBASE_SENSOR_URL, json=data)
        time.sleep(1)

except KeyboardInterrupt:
    print("종료됨.")
