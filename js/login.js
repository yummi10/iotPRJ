// 이름 + 학번 입력 받아서 이동
document.getElementById("loginBtn").addEventListener("click", function () {
  const name = document.getElementById("nameInput").value.trim();
  const id = document.getElementById("idInput").value.trim();

  if (!name || !id) {
    alert("이름과 학번을 모두 입력하세요.");
    return;
  }

  // 이름, 학번을 localStorage에 저장
  localStorage.setItem("studentName", name);
  localStorage.setItem("studentID", id);

  // dashboard.html로 이동
  window.location.href = "../html/dashboard.html";
});
