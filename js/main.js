const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if(hamburger){
  hamburger.addEventListener('click',()=>navLinks.classList.toggle('open'));
  document.addEventListener('click',(e)=>{
    if(!hamburger.contains(e.target)&&!navLinks.contains(e.target)){
      navLinks.classList.remove('open');
    }
  });
}