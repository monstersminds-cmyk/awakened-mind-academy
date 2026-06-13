var SUPA_URL = 'https://ffpppcbegvjskeujlqif.supabase.co';
var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcHBwY2JlZ3Zqc2tldWpscWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODM3MTQsImV4cCI6MjA5Njc1OTcxNH0.FZu3uNtxJ8KeYx-c2d79YC3ThKzC98W4Azaxzsoot2A';

var db = window.supabase.createClient(SUPA_URL, SUPA_KEY);

// Mobile menu
var hamburger = document.querySelector('.hamburger');
var navLinks = document.querySelector('.nav-links');
if (hamburger) {
  hamburger.addEventListener('click', function() { navLinks.classList.toggle('open'); });
  document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// Smart nav — runs on every page automatically
db.auth.getSession().then(function(result) {
  var session = result.data.session;
  var nav = document.querySelector('.nav-links');
  if (!nav) return;

  // Remove any existing get-started or login buttons
  var existing = nav.querySelector('.nav-auth-btn');
  if (existing) existing.remove();

  if (session) {
    // User is logged in — add Dashboard link and Profile button
    // Only add Dashboard link if not already in nav
    if (!nav.querySelector('a[href="dashboard.html"], a[href="../dashboard.html"]')) {
      var dashLink = document.createElement('a');
      dashLink.href = window.location.pathname.includes('/pages/') ? '../dashboard.html' : 'dashboard.html';
      dashLink.textContent = 'Dashboard';
      // Insert before the last child (hamburger button area)
      nav.insertBefore(dashLink, nav.querySelector('button:not(.nav-auth-btn)'));
    }
    // Add Profile button
    var profileBtn = document.createElement('a');
    profileBtn.href = window.location.pathname.includes('/pages/') ? '../profile.html' : 'profile.html';
    profileBtn.className = 'btn btn-gold nav-auth-btn';
    profileBtn.style.fontSize = '0.8rem';
    profileBtn.style.padding = '0.5rem 1.2rem';
    profileBtn.textContent = 'Profile';
    nav.appendChild(profileBtn);
  } else {
    // User is not logged in — add Get Started button
    var getStartedBtn = document.createElement('a');
    getStartedBtn.href = window.location.pathname.includes('/pages/') ? '../auth.html' : 'auth.html';
    getStartedBtn.className = 'btn btn-gold nav-auth-btn';
    getStartedBtn.style.fontSize = '0.8rem';
    getStartedBtn.style.padding = '0.5rem 1.2rem';
    getStartedBtn.textContent = 'Get Started';
    nav.appendChild(getStartedBtn);
  }
});