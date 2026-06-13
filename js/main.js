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

  if (!nav.querySelector('a[href*="dashboard.html"]')) {
    var dashboardBtn = document.createElement('a');
    dashboardBtn.href = root + 'dashboard.html';
    dashboardBtn.className = 'btn btn-gold nav-auth-btn';
    dashboardBtn.textContent = 'Dashboard';
    nav.appendChild(dashboardBtn);
  }

}
```

} else {

```
var getStartedBtn = document.createElement('a');
getStartedBtn.href = root + 'auth.html';
getStartedBtn.className = 'btn btn-gold nav-auth-btn';
getStartedBtn.textContent = 'Get Started';
nav.appendChild(getStartedBtn);
```

}
});
