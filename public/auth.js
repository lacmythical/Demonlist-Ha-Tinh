import { createClient } from '@supabase/supabase-js';

// Khởi tạo Supabase client
const supabaseUrl = 'https://ydxpommceinqsiobidom.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeHBvbW1jZWlucXNpb2JpZG9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNTA3NzMsImV4cCI6MjA2OTYyNjc3M30.MxkN3YMrEl-sZGQ7FZgUnF-Cid-s027vT660dMyzTNo';

const supabase = createClient(supabaseUrl, supabaseKey);

// Đăng ký tài khoản
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    console.error('Lỗi đăng ký:', error.message);
  } else {
    console.log('Đăng ký thành công:', data);
  }
}

// Đăng nhập
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Lỗi đăng nhập:', error.message);
  } else {
    console.log('Đăng nhập thành công:', data);
  }
}

// Đăng xuất
async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Lỗi đăng xuất:', error.message);
  } else {
    console.log('Đã đăng xuất');
  }
}

// Lấy thông tin user hiện tại
async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Không thể lấy user:', error.message);
  } else {
    console.log('User hiện tại:', user);
  }
}

// Ví dụ sử dụng:
// signUp('test@email.com', '12345678');
// signIn('test@email.com', '12345678');
// getUser();
// signOut();
