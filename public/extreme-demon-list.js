// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBgk3wQyXTkhDALB5YXs3kwtN63Nntm1Iw",
  authDomain: "demonlist-ha-tinh.firebaseapp.com",
  databaseURL: "https://demonlist-ha-tinh-default-rtdb.firebaseio.com",
  projectId: "demonlist-ha-tinh",
  storageBucket: "demonlist-ha-tinh.appspot.com",
  messagingSenderId: "812055586785",
  appId: "1:812055586785:web:xxxxx" // Nếu thiếu cũng không sao với web đơn giản
};

// Khởi tạo Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Lấy danh sách level từ Firebase
const levelListContainer = document.getElementById("level-list");
const listRef = db.ref("extreme-demon-list");

listRef.once("value").then((snapshot) => {
  const data = snapshot.val();

  if (!data) {
    levelListContainer.innerHTML = "<p>No levels available.</p>";
    return;
  }

  const entries = Object.entries(data)
    .map(([id, level]) => ({ id, ...level }))
    .sort((a, b) => b.points - a.points); // Sắp xếp giảm dần theo điểm

  entries.forEach((level, index) => {
    const levelBox = document.createElement("div");
    levelBox.className = "level-box";
    levelBox.innerHTML = `
      <h2>#${index + 1}: ${level.name}</h2>
      <p><strong>ID:</strong> ${level.id}</p>
      <p><strong>Creator:</strong> ${level.creator}</p>
      <p><strong>Verifier:</strong> ${level.verifier}</p>
      <p><strong>Points:</strong> ${level.points}</p>
    `;
    levelListContainer.appendChild(levelBox);
  });
}).catch((error) => {
  console.error("Error loading levels:", error);
  levelListContainer.innerHTML = "<p>Error loading levels.</p>";
});
