// script.js - small interactions for the site
document.addEventListener('DOMContentLoaded', () => {
  // set years in footer
  const years = ['year','year2','year3','year4','year5'];
  years.forEach(id => {
    const el = document.getElementById(id);
    if(el) el.textContent = new Date().getFullYear();
  });

  // mobile nav toggle
  const toggle = document.querySelector('.mobile-toggle');
  const nav = document.querySelector('.main-nav');
  toggle && toggle.addEventListener('click', () => {
    if(nav.style.display === 'flex') nav.style.display = '';
    else nav.style.display = 'flex';
  });

  // active link highlight based on filename
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(a => {
    const href = a.getAttribute('href');
    if(href && href.endsWith(path)) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  // Reviews carousel
  (function reviewsCarousel(){
    const next = document.querySelector('.reviews-carousel .next');
    const prev = document.querySelector('.reviews-carousel .prev');
    const slides = Array.from(document.querySelectorAll('.reviews-carousel .review'));
    let idx = slides.findIndex(s => s.classList.contains('active')) || 0;
    function show(i){
      slides.forEach(s => s.classList.remove('active'));
      slides[i].classList.add('active');
    }
    next && next.addEventListener('click', () => { idx = (idx+1)%slides.length; show(idx); });
    prev && prev.addEventListener('click', () => { idx = (idx-1+slides.length)%slides.length; show(idx); });

    // auto-play small
    setInterval(()=>{ if(slides.length>1){ idx=(idx+1)%slides.length; show(idx); } }, 7000);
  })();

  // Review form (local add)
  const reviewForm = document.getElementById('reviewForm');
  if(reviewForm){
    reviewForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('revName').value.trim();
      const text = document.getElementById('revText').value.trim();
      const msg = document.getElementById('revMsg');
      if(!name || !text){ msg.textContent = 'Please fill both fields.'; return; }
      msg.textContent = 'Thanks! Your review has been received (client-side demo).';
      reviewForm.reset();
    });
  }

  // Gallery lightbox
  (function galleryLightbox(){
    const items = Array.from(document.querySelectorAll('.gallery-item img'));
    const lb = document.getElementById('lightbox');
    const lbImg = lb ? lb.querySelector('.lb-content img') : null;
    let current = 0;
    function open(index){
      if(!lb) return;
      current = index;
      lbImg.src = items[index].src;
      lb.style.display = 'flex';
    }
    function close(){
      if(!lb) return;
      lb.style.display = 'none';
      lbImg.src = '';
    }
    function next(){
      current = (current+1) % items.length;
      lbImg.src = items[current].src;
    }
    function prev(){
      current = (current-1+items.length) % items.length;
      lbImg.src = items[current].src;
    }
    items.forEach((img, i) => img.addEventListener('click', ()=>open(i)));
    if(lb){
      lb.querySelector('.lb-close').addEventListener('click', close);
      lb.querySelector('.lb-next').addEventListener('click', next);
      lb.querySelector('.lb-prev').addEventListener('click', prev);
      window.addEventListener('keydown', e => {
        if(lb.style.display !== 'flex') return;
        if(e.key === 'Escape') close();
        if(e.key === 'ArrowRight') next();
        if(e.key === 'ArrowLeft') prev();
      });
      lb.addEventListener('click', e => { if(e.target === lb) close(); });
    }
  })();

  // Contact form (client-only demo)
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      const msg = document.getElementById('contactMsg');
      if(!name||!email||!message){ msg.textContent = 'Please complete all fields'; return; }
      // For production, send to server / email service
      msg.textContent = 'Thanks — your message has been sent (demo).';
      contactForm.reset();
    });
  }
});
