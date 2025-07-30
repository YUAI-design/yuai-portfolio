/**
 * ページトップへ戻るボタンモジュール
 */

export class BackToTop {
  constructor() {
    this.button = null;
    this.scrollThreshold = 300;
  }

  init() {
    this.createButton();
    this.bindEvents();
  }

  createButton() {
    this.button = document.createElement('button');
    this.button.className = 'back-to-top';
    this.button.innerHTML = '↑';
    this.button.setAttribute('aria-label', 'ページトップへ戻る');
    this.button.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: 48px;
      height: 48px;
      background-color: var(--color-accent);
      color: white;
      border: none;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      z-index: 999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;

    document.body.appendChild(this.button);
  }

  bindEvents() {
    // スクロール時の表示制御
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateButtonVisibility();
          ticking = false;
        });
        ticking = true;
      }
    });

    // クリック時のスクロール
    this.button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // ホバーエフェクト
    this.button.addEventListener('mouseenter', () => {
      this.button.style.transform = 'scale(1.1)';
    });

    this.button.addEventListener('mouseleave', () => {
      this.button.style.transform = 'scale(1)';
    });
  }

  updateButtonVisibility() {
    if (window.pageYOffset > this.scrollThreshold) {
      this.button.style.opacity = '1';
      this.button.style.visibility = 'visible';
    } else {
      this.button.style.opacity = '0';
      this.button.style.visibility = 'hidden';
    }
  }
}