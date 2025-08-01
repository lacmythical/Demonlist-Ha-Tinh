// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBgk3wQyXTkhDALB5YXs3kwtN63Nntm1Iw",
  authDomain: "demonlist-ha-tinh.firebaseapp.com",
  databaseURL: "https://demonlist-ha-tinh-default-rtdb.firebaseio.com",
  projectId: "demonlist-ha-tinh",
  appId: "1:812055586785:web:0e4fc63f7d5ba89920d54d"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const userInfo = document.getElementById("user-info");

loginBtn.onclick = () => {
  auth.signInWithPopup(provider)
    .then(result => {
      userInfo.textContent = `Logged in as ${result.user.displayName}`;
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
    });
};

logoutBtn.onclick = () => {
  auth.signOut().then(() => {
    userInfo.textContent = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  });
};

auth.onAuthStateChanged(user => {
  if (user) {
    userInfo.textContent = `Logged in as ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  }
});

// Navbar toggle
document.querySelector(".toggle-button").addEventListener("click", () => {
  document.querySelector(".navbar-links").classList.toggle("active");
});

// Load levels from Firebase
const db = firebase.database();
const container = document.getElementById("level-container");

function loadLevels() {
  db.ref("extreme-demon-list").once("value").then(snapshot => {
    const levels = Object.values(snapshot.val() || {}).sort((a, b) => a.rank - b.rank);

    levels.forEach(level => {
      const box = document.createElement("div");
      box.className = "level-box";
      box.innerHTML = `
        <div class="level-rank">#${level.rank}</div>
        <div class="level-name">${level.name}</div>
        <div class="level-author">by ${level.creator}</div>
        <div class="level-video">
          <iframe src="${level.video}" allowfullscreen></iframe>
        </div>
        <div class="level-points">${level.points} pts</div>
      `;
      container.appendChild(box);
    });
  });
}

loadLevels();
