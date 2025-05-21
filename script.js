function ledOn() {
	console.log("LED 켜짐")
	var ref = database.ref("led");
	ref.update({
		led: 1
	})
}

function ledOff() {
	console.log("LED 꺼짐")
	var ref = database.ref("led");
	ref.update({
		led: 0
	})
}

var config = {
	apiKey: "AIzaSyAVPQR_qOmzcNN9sfA6m-HDU0fR9cJ21fg",
	authDomain: "myweb-6c4ef.firebaseapp.com",
	databaseURL: "https://myweb-6c4ef-default-rtdb.firebaseio.com",
	projectId: "myweb-6c4ef",
	storageBucket: "myweb-6c4ef.firebasestorage.app",
	messagingSenderId: "895066997638",
	appId: "1:895066997638:web:983216a70d630905a7a207"
}

//Firebase 데이터베이스 만들기
firebase.initializeApp(config);
database = firebase.database();

// Firebase 데이터베이스 정보 가져오기
var ref = database.ref("led");
ref.on("value", gotData);


function gotData(data) {
	var val = data.val();
	const container = document.querySelector('.container');

	if (val.led == 0) {
		document.getElementById("img").src = "ledOff.png";
		document.body.style.background = 'linear-gradient(-45deg, #2c3e50, #34495e, #2c3e50, #34495e)';
		container.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
	} else {
		document.getElementById("img").src = "ledOn.png";
		document.body.style.background = 'linear-gradient(-45deg, #ff8c00, #ffa500, #ffb347, #ffd700)';
		container.style.boxShadow = '0 8px 32px rgba(255, 140, 0, 0.3)';
	}

	console.log(val);
}