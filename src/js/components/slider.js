export default class Slider {
  constructor(containerId, images) {
    this.container = document.getElementById(containerId);
    this.images = images;
    this.currentIndex = 0;
    this.interval = null;
    this.isPlaying = true;

    if (this.container) {
      this.init();
    }
  }

  init() {
    this.container.classList.add('slider-container');
    this.render();
    this.startAutoPlay();
    this.addEventListeners();
  }

  render() {
    this.container.innerHTML = `
      <div class="slider-wrapper">
        ${this.images.map((img) => `
          <div class="slide">
            <img src="${img.url}" alt="${img.caption}">
            <div class="caption">${img.caption}</div>
          </div>
        `).join('')}
      </div>
      <button class="slider-btn prev">&lt;</button>
      <button class="slider-btn next">&gt;</button>
      <div class="slider-dots">
        ${this.images.map((_, index) => `
          <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('')}
      </div>
    `;

    this.wrapper = this.container.querySelector('.slider-wrapper');
    this.dots = this.container.querySelectorAll('.dot');
  }

  addEventListeners() {
    const prevBtn = this.container.querySelector('.prev');
    const nextBtn = this.container.querySelector('.next');

    prevBtn.addEventListener('click', () => {
      this.prevSlide();
      this.resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    this.dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index, 10);
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Pause on hover
    this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.container.addEventListener('mouseleave', () => this.startAutoPlay());
  }

  update() {
    const offset = -this.currentIndex * 100;
    this.wrapper.style.transform = `translateX(${offset}%)`;

    this.dots.forEach((dot, index) => {
      if (index === this.currentIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.update();
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.update();
  }

  goToSlide(index) {
    this.currentIndex = index;
    this.update();
  }

  startAutoPlay() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopAutoPlay() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  resetAutoPlay() {
    this.stopAutoPlay();
    this.startAutoPlay();
  }
}
