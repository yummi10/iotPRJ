var config = {
  apiKey: "AIzaSyDaPpDrJsJdM3ynDpI6qQ21ySJ1geIFqbI",
  authDomain: "loginsensehat.firebaseapp.com",
  databaseURL: "https://loginsensehat-default-rtdb.firebaseio.com",
  projectId: "loginsensehat",
  storageBucket: "loginsensehat.appspot.com",
  messagingSenderId: "19886982208",
  appId: "1:19886982208:web:ab98b4b358cd2aacc94ba5"
};

firebase.initializeApp(config);
var database = firebase.database();

var sensorRef = database.ref("sensor");

sensorRef.on("value", function (data) {
  var val = data.val();
  if (val) {
    document.getElementById("temp").textContent = val.temperature ?? "-";
    document.getElementById("hum").textContent = val.humidity ?? "-";
    document.getElementById("press").textContent = val.pressure ?? "-";

    document.getElementById("pitch").textContent = val.gyro?.pitch ?? "-";
    document.getElementById("roll").textContent = val.gyro?.roll ?? "-";
    document.getElementById("yaw").textContent = val.gyro?.yaw ?? "-";

    document.getElementById("ax").textContent = val.acceleration?.x ?? "-";
    document.getElementById("ay").textContent = val.acceleration?.y ?? "-";
    document.getElementById("az").textContent = val.acceleration?.z ?? "-";

    document.getElementById("updated").textContent = val.updated ?? "-";
  }
});
