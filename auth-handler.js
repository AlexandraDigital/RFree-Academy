/**
 * RFree Academy - Authentication & Button Visibility Handler
 * Hides Sign In and Join Free buttons when user is logged in as admin
 */

let currentUser = null;

/**
 * Initialize authentication state on page load
 * Checks localStorage for saved user session
 */
function initAuthState() {
  try {
    const savedUser = localStorage.getItem('rfreeUser');
    if (savedUser) {
      currentUser = JSON.parse(savedUser);
      updateNavForAuthState();
    }
  } catch (error) {
    console.error('Error initializing auth state:', error);
  }
}

/**
 * Update navigation buttons based on current auth state
 * Hides Sign In/Join for logged-in users, shows logout
 */
function updateNavForAuthState() {
  const signInBtn = document.getElementById('signInBtn');
  const joinBtn = document.getElementById('joinBtn');
  const logoutBtn = document.getElementById('logoutBtn');

  if (!signInBtn || !joinBtn || !logoutBtn) {
    console.warn('Auth buttons not found in DOM');
    return;
  }

  if (currentUser) {
    // User is logged in (admin or regular user)
    signInBtn.style.display = 'none';
    joinBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-flex';
    
    // Optional: Show user profile info
    if (currentUser.displayName) {
      logoutBtn.title = `Logged in as: ${currentUser.displayName}`;
    }
  } else {
    // User is NOT logged in - show sign in/join buttons
    signInBtn.style.display = 'inline-flex';
    joinBtn.style.display = 'inline-flex';
    logoutBtn.style.display = 'none';
  }
}

/**
 * Login as admin
 * @param {string} email - User email
 * @param {string} password - User password (should be validated server-side)
 * @param {string} role - User role (default: 'admin')
 */
function loginAsAdmin(email, password, role = 'admin') {
  try {
    // Validate inputs
    if (!email || !password) {
      showToast('❌ Email and password required', 'error');
      return false;
    }

    // TODO: Add server-side authentication here
    // This should validate credentials against your backend
    // Example: const response = await fetch('/api/auth/login', {...})

    currentUser = {
      email: email,
      displayName: email.split('@')[0],
      role: role,
      loginTime: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('rfreeUser', JSON.stringify(currentUser));

    // Update UI
    updateNavForAuthState();

    // Show success message
    showToast(`✅ Welcome, ${currentUser.displayName}!`, 'success');

    return true;
  } catch (error) {
    console.error('Login error:', error);
    showToast('❌ Login failed', 'error');
    return false;
  }
}

/**
 * Login as regular user
 * @param {string} email - User email
 * @param {string} password - User password
 */
function loginAsUser(email, password) {
  return loginAsAdmin(email, password, 'user');
}

/**
 * Logout current user
 * Clears session and resets UI
 */
function logout() {
  try {
    const displayName = currentUser?.displayName || 'User';
    
    currentUser = null;
    localStorage.removeItem('rfreeUser');
    
    updateNavForAuthState();
    
    showToast('👋 Logged out successfully', 'success');
    
    // Redirect to home after a short delay
    setTimeout(() => {
      showPage('home');
    }, 500);
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    showToast('❌ Logout failed', 'error');
    return false;
  }
}

/**
 * Get current user info
 * @returns {Object|null} Current user object or null
 */
function getCurrentUser() {
  return currentUser;
}

/**
 * Check if user is logged in
 * @returns {boolean}
 */
function isLoggedIn() {
  return currentUser !== null;
}

/**
 * Check if user is admin
 * @returns {boolean}
 */
function isAdmin() {
  return currentUser?.role === 'admin';
}

/**
 * Check if user is staff (admin or teacher)
 * @returns {boolean}
 */
function isStaff() {
  return currentUser?.role === 'admin' || currentUser?.role === 'teacher';
}

/**
 * Require admin access for a feature
 * @param {Function} callback - Function to execute if user is admin
 * @returns {boolean} true if user is admin, false otherwise
 */
function requireAdmin(callback) {
  if (isAdmin()) {
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  } else {
    showToast('⛔ Admin access required', 'error');
    return false;
  }
}

/**
 * Require login for a feature
 * @param {Function} callback - Function to execute if user is logged in
 * @returns {boolean}
 */
function requireLogin(callback) {
  if (isLoggedIn()) {
    if (typeof callback === 'function') {
      callback();
    }
    return true;
  } else {
    showToast('🔐 Please sign in first', 'error');
    openSignIn();
    return false;
  }
}

/**
 * Clear all user data (useful for debugging)
 */
function clearUserData() {
  if (confirm('⚠️ Clear all user data? This cannot be undone.')) {
    localStorage.removeItem('rfreeUser');
    currentUser = null;
    updateNavForAuthState();
    showToast('✅ User data cleared', 'success');
  }
}

/**
 * Initialize on page load
 * This runs automatically when the script loads
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAuthState);
} else {
  initAuthState();
}

// Export for use in other modules (if using modules)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loginAsAdmin,
    loginAsUser,
    logout,
    getCurrentUser,
    isLoggedIn,
    isAdmin,
    isStaff,
    requireAdmin,
    requireLogin,
    clearUserData,
    updateNavForAuthState
  };
}
