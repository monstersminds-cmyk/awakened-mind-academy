const SUPABASE_URL = 'https://ffpppcbegvjskeujlqif.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZmcHBwY2JlZ3Zqc2tldWpscWlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExODM3MTQsImV4cCI6MjA5Njc1OTcxNH0.FZu3uNtxJ8KeYx-c2d79YC3ThKzC98W4Azaxzsoot2A';

async function initNav(){
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const {data:{session}} = await client.auth.getSession();
  const nav = document.querySelector('.nav-links');
  if(!nav) return;

  if(session){
    const name = session.user.user_metadata?.full_name || 'My Account';
    nav.innerHTML = `
      <a href="/index.html">Home</a>
      <a href="/pages/about.html">About</a>
      <a href="/pages/services.html">Services</a>
      <a href="/pages/contact.html">Contact</a>
      <a href="/dashboard.html">Dashboard</a>
      <a href="/profile.html">👤 ${name}</a>
      <button onclick="logoutUser()" class="btn btn-outline" style="font-size:0.8rem;padding:0.5rem 1.2rem;">Logout</button>
    `;
  } else {
    nav.innerHTML = `
      <a href="/index.html">Home</a>
      <a href="/auth.html" class="btn btn-gold">Login / Register</a>
    `;
  }

  const hamburger = document.querySelector('.hamburger');
  if(hamburger){
    hamburger.addEventListener('click', ()=>nav.classList.toggle('open'));
    document.addEventListener('click',(e)=>{
      if(!hamburger.contains(e.target)&&!nav.contains(e.target)){
        nav.classList.remove('open');
      }
    });
  }
}

async function logoutUser(){
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  await client.auth.signOut();
  window.location.href = '/index.html';
}

async function requireAuth(){
  const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
  const {data:{session}} = await client.auth.getSession();
  if(!session){
    showLockedSection();
    return null;
  }
  return session;
}

function showLockedSection(){
  const locked = document.querySelector('.locked-section');
  if(locked) locked.style.display = 'block';
  const content = document.querySelector('.protected-content');
  if(content) content.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', ()=>{
  if(typeof window.supabase !== 'undefined'){
    initNav();
  }
});