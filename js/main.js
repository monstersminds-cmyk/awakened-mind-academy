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

const form = document.querySelector('.contact-form');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const success = document.querySelector('.form-success');
    if(success){
      success.style.display='block';
      form.reset();
      setTimeout(()=>success.style.display='none',5000);
    }
  });
}