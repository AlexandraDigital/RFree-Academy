// RFree Academy - Simple Auth Handler
// Hides Sign In/Join buttons when logged in

let rfreeUser = null;

function initAuthState() {
  const saved = localStorage.getItem('rfreeUser');
  if (saved) {
    rfreeUser = JSON.parse(saved);
    updateAuthUI();
  }
}

function updateAuthUI() {
  const signIn = document.getElementById('signInBtn');
  const join = document.getElementById('joinBtn');
  const logout = document.getElementById('logoutBtn');

  if (signIn) signIn.style.display = rfreeUser ? 'none' : 'inline-flex';
  if (join) join.style.display = rfreeUser ? 'none' : 'inline-flex';
  if (logout) logout.style.display = rfreeUser ? 'inline-flex' : 'none';
}

function loginAsAdmin(email, pwd) {
  rfreeUser = { email, role: 'admin' };
  localStorage.setItem('rfreeUser', JSON.stringify(rfreeUser));
  updateAuthUI();
}

function logout() {
  rfreeUser = null;
  localStorage.removeItem('rfreeUser');
  updateAuthUI();
}

// Run on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthState);
} else {
  initAuthState();
}