/**
 * スクロールアニメーションモジュール
 */

export class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.service-card, .portfolio__item');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  }

  init() {
    if (!('IntersectionObserver' in window)) {
      // IntersectionObserverがサポートされていない場合は全て表示
      this.showAllElements();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries),
      this.observerOptions
    );

    this.animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(element);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }

  showAllElements() {
    this.animatedElements.forEach(element => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }
}