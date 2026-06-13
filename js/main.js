var SUPA_URL = 'https://ffpppcbegvjskeujlqif.supabase.co';
var SUPA_KEY = 'PASTE_YOUR_CURRENT_KEY_HERE';

var db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

// Mobile menu
var hamburger = document.querySelector('.hamburger');
var navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
hamburger.addEventListener('click', function () {
navLinks.classList.toggle('open');
});

document.addEventListener('click', function (e) {
if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
navLinks.classList.remove('open');
}
});
}

// Path helper
var inSubfolder = window.location.pathname.includes('/pages/');
var root = inSubfolder ? '../' : '';

// Smart navigation
db.auth.getSession().then(function(result) {
var session = result.data.session;
var nav = document.querySelector('.nav-links');

if (!nav) return;

// Remove previously injected buttons
nav.querySelectorAll('.nav-auth-btn').forEach(function(el) {
el.remove();
});

if (session) {

  // Dashboard
  if (!nav.querySelector('a[href*="dashboard.html"]')) {
    var dashLink = document.createElement('a');
    dashLink.href = root + 'dashboard.html';
    dashLink.className = 'nav-dashboard-btn';
    dashLink.textContent = 'Dashboard';

    var logoutBtn = nav.querySelector('#logout-btn');

    if (logoutBtn) {
      nav.insertBefore(dashLink, logoutBtn);
    } else {
      nav.appendChild(dashLink);
    }
  }

  // Profile
  if (!nav.querySelector('a[href*="profile.html"]')) {
    var profileBtn = document.createElement('a');
    profileBtn.href = root + 'profile.html';
    profileBtn.className = 'btn btn-gold nav-auth-btn';
    profileBtn.style.cssText = 'font-size:0.8rem;padding:0.5rem 1.2rem;';
    profileBtn.textContent = 'Profile';

    nav.appendChild(profileBtn);
  }

} else {

  var authBtn = document.createElement('a');
  authBtn.href = root + 'auth.html';
  authBtn.className = 'btn btn-gold nav-auth-btn';
  authBtn.textContent = 'Register / Log In';

  nav.appendChild(authBtn);

}
});