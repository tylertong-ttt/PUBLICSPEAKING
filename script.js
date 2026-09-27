document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const currentIndicator = document.getElementById('current-slide');
  const totalIndicator = document.getElementById('total-slides');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnFs = document.getElementById('btn-fs');

  let currentIndex = 0;
  const totalSlides = slides.length;
  totalIndicator.textContent = totalSlides;

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    currentIndex = index;
    currentIndicator.textContent = currentIndex + 1;
  }

  function next() {
    if (currentIndex < totalSlides - 1) showSlide(currentIndex + 1);
  }

  function prev() {
    if (currentIndex > 0) showSlide(currentIndex - 1);
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  // Phím tắt trực quan cho MC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prev();
    } else if (e.key.toLowerCase() === 'f') {
      toggleFullscreen();
    }
  });

  // Hỗ trợ cuộn chuột nhạy (Mouse Wheel / Touchpad)
  let isScrolling = false;
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;
    if (e.deltaY > 30) {
      next();
      debounceScroll();
    } else if (e.deltaY < -30) {
      prev();
      debounceScroll();
    }
  });

  function debounceScroll() {
    isScrolling = true;
    setTimeout(() => { isScrolling = false; }, 600);
  }

  btnNext.addEventListener('click', next);
  btnPrev.addEventListener('click', prev);
  btnFs.addEventListener('click', toggleFullscreen);
});
