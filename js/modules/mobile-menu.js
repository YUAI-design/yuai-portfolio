/**
 * モバイルメニュー制御モジュール
 */

export class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.toggle = document.querySelector('.header__mobile-toggle');
    this.menu = document.querySelector('.header__menu');
    this.menuLinks = document.querySelectorAll('.header__menu-link');
  }

  init() {
    if (!this.toggle || !this.menu) return;

    this.toggle.addEventListener('click', () => this.toggleMenu());

    // メニューリンククリックで閉じる
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.close());
    });

    // 外部クリックで閉じる
    document.addEventListener('click', (e) => {
      if (this.isOpen &&
          !this.menu.contains(e.target) &&
          !this.toggle.contains(e.target)) {
        this.close();
      }
    });
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menu.classList.toggle('is-active');
    this.toggle.classList.toggle('is-active');

    // アクセシビリティ対応
    this.toggle.setAttribute('aria-expanded', String(this.isOpen));
    this.toggle.setAttribute('aria-label',
      this.isOpen ? 'メニューを閉じる' : 'メニューを開く');
  }

  close() {
    this.isOpen = false;
    this.menu.classList.remove('is-active');
    this.toggle.classList.remove('is-active');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.setAttribute('aria-label', 'メニューを開く');
  }
}