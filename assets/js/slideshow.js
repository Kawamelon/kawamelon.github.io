document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.slideshow').forEach(slideshow => {
      const content  = slideshow.querySelector('.slideshow-content');
      const imgs     = content.querySelectorAll('img');
      const prevBtn  = slideshow.querySelector('.carrousel-btn.prev');
      const nextBtn  = slideshow.querySelector('.carrousel-btn.next');
      const dotsWrap = slideshow.querySelector('.carrousel-indicators');
  
      if (!imgs.length) return;
  
      let current   = 0;
      let autoTimer = null;
      let isHovered = false;
  
      /* ── build dots dynamically ── */
      dotsWrap.innerHTML = '';
      imgs.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsWrap.appendChild(dot);
      });
  
      const dots = () => dotsWrap.querySelectorAll('span');
  
      function goTo(index, direction = 'next') {
        const allDots = dots();
        allDots[current].classList.remove('active');
        imgs[current].classList.remove('active', 'leaving-left', 'leaving-right');
  
        imgs[current].classList.add(direction === 'next' ? 'leaving-left' : 'leaving-right');
        setTimeout(() => imgs[current].classList.remove('leaving-left', 'leaving-right'), 500);
  
        current = (index + imgs.length) % imgs.length;
        imgs[current].classList.add('active');
        allDots[current].classList.add('active');
      }
  
      /* ── initialise first image ── */
      //imgs.forEach((img, i) => { if (i !== 0) img.style.opacity = '0'; });
      imgs[0].classList.add('active');
  
      prevBtn.addEventListener('click', () => { resetAuto(); goTo(current - 1, 'prev'); });
      nextBtn.addEventListener('click', () => { resetAuto(); goTo(current + 1, 'next'); });
  
      /* ── touch / swipe ── */
      let touchStartX = 0;
      content.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      content.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { resetAuto(); goTo(current + (dx < 0 ? 1 : -1), dx < 0 ? 'next' : 'prev'); }
      });
  
      /* ── auto-play (pause on hover) ── */
      function startAuto() { autoTimer = setInterval(() => { if (!isHovered) goTo(current + 1); }, 10000); }
      function resetAuto()  { clearInterval(autoTimer); startAuto(); }
      slideshow.addEventListener('mouseenter', () => { isHovered = true; });
      slideshow.addEventListener('mouseleave', () => { isHovered = false; });
  
      if (imgs.length > 1) startAuto();
    });
});