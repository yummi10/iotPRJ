// Firebase 연결
const firebaseConfig = {
  apiKey: "AIzaSyAXZKdkx72F2GvM7qaynr5r9agAMAiVX2s",
  authDomain: "commonpjt-fd9ed.firebaseapp.com",
  databaseURL: "https://commonpjt-fd9ed-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "commonpjt-fd9ed",
  storageBucket: "commonpjt-fd9ed.appspot.com",
  messagingSenderId: "653463134970",
  appId: "1:653463134970:web:8301b6f3a2bde8da201f43"
};
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// 로그인할 때 저장한 이름, 학번 가져오기
const studentName = localStorage.getItem("studentName") || "신유림";

// 내 데이터만 가져오기
database.ref(studentName + "/sensehat").on("value", (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.getElementById("temp").textContent = `${data.temperature} ℃`;
    document.getElementById("hum").textContent = `${data.humidity} %`;
    document.getElementById("press").textContent = `${data.pressure} hPa`;
    document.getElementById("pitch").textContent = `${data.gyro.x}`;
    document.getElementById("roll").textContent = `${data.gyro.y}`;
    document.getElementById("yaw").textContent = `${data.gyro.z}`;
    document.getElementById("ax").textContent = `${data.accel.x}`;
    document.getElementById("ay").textContent = `${data.accel.y}`;
    document.getElementById("az").textContent = `${data.accel.z}`;
    document.getElementById("updated").textContent = data.timestamp;
  }
});

// 메시지 전송
document.getElementById("sendMessageBtn").addEventListener("click", () => {
  const message = document.getElementById("messageInput").value.trim();
  if (!message) {
    alert("메시지를 입력하세요!");
    return;
  }
  firebase.database().ref("message").set({ text: message });
  document.getElementById("messageInput").value = "";
  alert("메시지 전송 완료!");
});

// 전체 학생 데이터 가져오기
database.ref("/").on("value", (snapshot) => {
  const allStudents = snapshot.val();
  const tableBody = document.getElementById("studentTableBody");
  tableBody.innerHTML = "";

  for (const name in allStudents) {
    const studentData = allStudents[name];
    if (studentData.sensehat) {
      const sense = studentData.sensehat;
      const tr = document.createElement("tr");

      const pitch = `${Number(sense.gyro?.x ?? 0).toFixed(2)}°`;
      const roll = `${Number(sense.gyro?.y ?? 0).toFixed(2)}°`;
      const yaw = `${Number(sense.gyro?.z ?? 0).toFixed(2)}°`;

      const accelX = `${Number(sense.accel?.x ?? 0).toFixed(4)}g`;
      const accelY = `${Number(sense.accel?.y ?? 0).toFixed(4)}g`;
      const accelZ = `${Number(sense.accel?.z ?? 0).toFixed(4)}g`;

      tr.innerHTML = `
        <td>${name}</td>
        <td>${sense.temperature ?? "--"}</td>
        <td>${sense.humidity ?? "--"}</td>
        <td>${sense.pressure ?? "--"}</td>
        <td>(${pitch} / ${roll} / ${yaw})</td>
        <td>(${accelX} / ${accelY} / ${accelZ})</td>
        <td>${sense.timestamp ?? "--"}</td>
      `;
      tableBody.appendChild(tr);
    }
  }
});


// ✅ 이름 수정 기능 추가
async function updateStudentName(correctName, studentID) {
  try {
    const snapshot = await firebase.database().ref("/").once("value");
    const allData = snapshot.val();

    for (const name in allData) {
      if (allData[name].info && allData[name].info.학번 === studentID) {
        const studentData = allData[name];

        // 1. 새로운 이름으로 데이터 복사
        await firebase.database().ref(`/${correctName}`).set(studentData);

        // 2. 기존 이름 삭제
        await firebase.database().ref(`/${name}`).remove();

        alert(`이름이 '${name}' → '${correctName}'(으)로 변경되었습니다.`);
        return;
      }
    }
    alert("해당 학번을 가진 학생이 없습니다.");
  } catch (error) {
    console.error("업데이트 실패:", error);
    alert("업데이트 중 오류가 발생했습니다.");
  }
}

// ✅ 버튼에 연결
document.getElementById("updateNameBtn").addEventListener("click", () => {
  const newName = prompt("올바른 이름을 입력하세요:");
  const studentID = prompt("학번을 입력하세요:");

  if (!newName || !studentID) {
    alert("이름과 학번을 모두 입력하세요.");
    return;
  }

  updateStudentName(newName.trim(), studentID.trim());
});
