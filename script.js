// Quản lý điều khiển chuyển slide thuyết trình
document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const currentIndicator = document.getElementById('current-slide');
  const totalIndicator = document.getElementById('total-slides');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnFullscreen = document.getElementById('btn-fullscreen');

  let currentIndex = 0;
  const totalSlides = slides.length;
  totalIndicator.textContent = totalSlides;

  function showSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    currentIndex = index;
    currentIndicator.textContent = currentIndex + 1;
  }

  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      showSlide(currentIndex + 1);
    }
  }

  function prevSlide() {
    if (currentIndex > 0) {
      showSlide(currentIndex - 1);
    }
  }

  // Điều khiển bằng bàn phím cho MC
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ': // Phím cách
        e.preventDefault();
        nextSlide();
        break;
      case 'ArrowLeft':
      case 'PageUp':
        e.preventDefault();
        prevSlide();
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
    }
  });

  // Điều khiển bằng nút bấm
  btnNext.addEventListener('click', nextSlide);
  btnPrev.addEventListener('click', prevSlide);
  btnFullscreen.addEventListener('click', toggleFullscreen);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }
});
