const supabaseUrl = 'https://ydxpommceinqsiobidom.supabase.co';
const supabaseKey = 'sb-publishable-ZJ4JzMkjn7Ve-Kc4f1WHrw_Ee7SDGwR';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async () => {
  const session = await supabase.auth.getSession();
  if (session.data.session) {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('level-list').style.display = 'block';
    loadLevels();
  } else {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('level-list').style.display = 'none';
  }
});

async function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Đăng nhập thất bại: " + error.message);
  } else {
    location.reload(); // reload để chạy lại kiểm tra session
  }
}

async function loadLevels() {
  const { data, error } = await supabase
    .from('levels')
    .select('*')
    .order('points', { ascending: false });

  const container = document.getElementById('level-list');
  container.innerHTML = '';

  if (error) {
    container.innerHTML = "<p>Lỗi tải dữ liệu.</p>";
    return;
  }

  data.forEach(level => {
    const videoId = extractYouTubeID(level.video);
    const html = `
      <div class="level-box">
        <div class="level-row">
          <img src="https://img.youtube.com/vi/${videoId}/hqdefault.jpg" alt="${level.name}">
          <div class="level-details">
            <h4>${level.name}</h4>
            <p><strong>Publisher:</strong> ${level.publisher}</p>
            <p><strong>Điểm:</strong> ${level.points}</p>
            <p><strong>Độ khó:</strong> ${level.difficulty}</p>
          </div>
        </div>
      </div>`;
    container.innerHTML += html;
  });
}

function extractYouTubeID(url) {
  const regex = /(?:youtube\.com.*(?:v=|\/embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  return match ? match[1] : '';
}
