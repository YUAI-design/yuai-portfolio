/**
 * スムーススクロール機能モジュール
 */

export class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.header = document.querySelector('.header');
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.handleClick(e));
    });
  }

  handleClick(e) {
    const href = e.currentTarget.getAttribute('href');

    // #のみの場合はページトップへ
    if (href === '#') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    // ターゲット要素が存在する場合
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const headerHeight = this.header?.offsetHeight ?? 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  }
}