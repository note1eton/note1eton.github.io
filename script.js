const sections = document.querySelectorAll('.section');
const userArea = document.getElementById('userArea');

function showSection(id) {
  sections.forEach(section => section.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function updateUserUI() {
  const user = localStorage.getItem('user');
  if (user) {
    userArea.innerHTML = `👤 ${user} <button onclick="logout()">Logout</button>`;
  } else {
    userArea.innerHTML = '';
  }
}

function signup() {
  const u = username.value.trim();
  const p = password.value.trim();

  if (!u || !p) {
    alert('Fill in both fields');
    return;
  }

  localStorage.setItem('user_' + u, p);
  localStorage.setItem('user', u);

  updateUserUI();
  showSection('home');
}

function login() {
  const u = username.value.trim();
  const p = password.value.trim();

  if (localStorage.getItem('user_' + u) === p) {
    localStorage.setItem('user', u);
    updateUserUI();
    showSection('home');
  } else {
    alert('Wrong username or password');
  }
}

function logout() {
  localStorage.removeItem('user');
  updateUserUI();
  showSection('home');
}

updateUserUI();
showSection('home');