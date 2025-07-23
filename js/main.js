/**
 * YUAI Portfolio - メインエントリーポイント
 * ES6 Modules を使用したモダンなJavaScript
 */

// モジュールのインポート
import { MobileMenu } from './modules/mobile-menu.js';
import { SmoothScroll } from './modules/smooth-scroll.js';
import { HeaderScroll } from './modules/header-scroll.js';
import { FormValidation } from './modules/form-validation.js';
import { ScrollAnimations } from './modules/scroll-animations.js';
import { BackToTop } from './modules/back-to-top.js';
import { ContactForm } from './modules/contact-form.js';
import { createAnimationStyles } from './modules/animations.js';

// アプリケーションクラス
class App {
  constructor() {
    this.modules = {
      mobileMenu: new MobileMenu(),
      smoothScroll: new SmoothScroll(),
      headerScroll: new HeaderScroll(),
      formValidation: new FormValidation(),
      scrollAnimations: new ScrollAnimations(),
      backToTop: new BackToTop(),
      contactForm: new ContactForm()
    };
  }

  init() {
    // アニメーション用CSS追加
    createAnimationStyles();

    // 各モジュールの初期化
    Object.values(this.modules).forEach(module => {
      if (module.init) {
        module.init();
      }
    });

    // パフォーマンス監視（開発環境のみ）
    // if (process.env.NODE_ENV === 'development') {
    //   this.logPerformance();
    // }
  }

  logPerformance() {
    const perfData = performance.getEntriesByType('navigation')[0];
    console.warn('Page Load Performance:', {
      domContentLoaded: `${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`,
      loadComplete: `${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`,
      totalTime: `${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`
    });
  }
}

// アプリケーションの初期化
const initApp = () => {
  const app = new App();
  app.init();
};

// DOMContentLoadedイベントで初期化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// サービスワーカーの登録（PWA対応準備）
if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', async () => {
    try {
      // const registration = await navigator.serviceWorker.register('/sw.js');
      // console.log('ServiceWorker registration successful');
    } catch (error) {
      console.error('ServiceWorker registration failed:', error);
    }
  });
}