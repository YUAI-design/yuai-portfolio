/**
 * ヘッダースクロール制御モジュール
 */

export class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScrollTop = 0;
    this.scrollThreshold = 5;
    this.ticking = false;
  }

  init() {
    if (!this.header) return;

    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    });
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // スクロール量が閾値以下の場合は処理しない
    if (Math.abs(scrollTop - this.lastScrollTop) <= this.scrollThreshold) {
      return;
    }

    // スクロール方向に応じてヘッダーの表示/非表示を制御
    if (scrollTop > this.lastScrollTop && scrollTop > this.header.offsetHeight) {
      // 下スクロール時
      this.header.style.transform = 'translateY(-100%)';
    } else {
      // 上スクロール時
      this.header.style.transform = 'translateY(0)';
    }

    this.lastScrollTop = scrollTop;
  }
}