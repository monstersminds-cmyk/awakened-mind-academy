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

// Work out if we are in the /pages/ subfolder
var inSubfolder = window.location.pathname.includes('/pages/');
var root = inSubfolder ? '../' : '';

// Smart nav
db.auth.getSession().then(function(result) {
  var session = result.data.session;
  var nav = document.querySelector('.nav-links');
  if (!nav) return;

  // Remove ALL existing auth-related buttons and dashboard links injected before
  nav.querySelectorAll('.nav-auth-btn, .nav-dashboard-btn').forEach(function(el) { el.remove(); });

  if (session) 
    // Logged in — show Dashboard link + Profile button, no Get Started

var dashLink = document.createElement('a');
dashLink.href = root + 'dashboard.html';

var profileBtn = document.createElement('a');
profileBtn.href = root + 'profile.html';
profileBtn.className = 'btn nav-auth-btn';
profileBtn.style.cssText = 'font-size:0.8rem;padding:0.5rem 1.2rem;';

var logoutBtn = nav.querySelector('#logout-btn');
if (logoutBtn) {
  nav.insertBefore(dashLink, logoutBtn);
} else {
  nav.appendChild(dashLink);
}
nav.appendChild(profileBtn);