// Load Supabase once for all pages
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