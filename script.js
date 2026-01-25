const sections = document.querySelectorAll('.section');
const userArea = document.getElementById('userArea');

function showSection(id) {
  sections.forEach(sec => sec.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

function updateUserUI() {
  const user = localStorage.getItem('user');
  if (user) {
    userArea.innerHTML = `👤 ${user} <button onclick="logout()">Log out</button>`;
  } else {
    userArea.innerHTML = `<button onclick="showSection('auth')">Sign up / Log in</button>`;
  }
}

function signup() {
  const u = username.value;
  const p = password.value;
  if (!u || !p) return alert('Fill both fields');
  localStorage.setItem(`user_${u}`, p);
  localStorage.setItem('user', u);
  updateUserUI();
  showSection('home');
}

function login() {
  const u = username.value;
  const p = password.value;
  if (localStorage.getItem(`user_${u}`) === p) {
    localStorage.setItem('user', u);
    updateUserUI();
    showSection('home');
  } else {
    alert('Wrong login');
  }
}

function logout() {
  localStorage.removeItem('user');
  updateUserUI();
}

updateUserUI();
showSection('home');