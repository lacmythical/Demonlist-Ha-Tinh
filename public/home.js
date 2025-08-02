import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = 'https://demonlist-ha-tinh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlbW9ubGlzdC1oYS10aW5oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAwMDAwMDAwMH0.abc...'; // thay bằng anon key thật
const supabase = createClient(supabaseUrl, supabaseKey);

const levelList = document.getElementById("level-list");

async function fetchLevels() {
  const { data: levels, error } = await supabase
    .from("levels")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    levelList.innerHTML = `<p>❌ Lỗi khi tải dữ liệu: ${error.message}</p>`;
    console.error(error);
    return;
  }

  if (!levels || levels.length === 0) {
    levelList.innerHTML = "<p>Chưa có level nào được thêm.</p>";
    return;
  }

  levelList.innerHTML = levels.map(level => `
    <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
      <h3>${level.name}</h3>
      <p><strong>Creator:</strong> ${level.creator}</p>
      <p><strong>Points:</strong> ${level.points}</p>
      <p><strong>Ngày thêm:</strong> ${new Date(level.created_at).toLocaleString()}</p>
    </div>
  `).join("");
}

fetchLevels();
