/**
 * コンタクトフォーム機能モジュール
 */

export class ContactForm {
  constructor() {
    this.emailForm = document.getElementById('email-form');
    this.emailBtn = document.querySelector('.contact__email-btn');
  }

  init() {
    // グローバル関数として定義（HTMLのonclickから呼び出されるため）
    window.showEmailForm = () => this.showEmailForm();
    window.hideEmailForm = () => this.hideEmailForm();
  }

  showEmailForm() {
    if (this.emailForm) {
      this.emailForm.style.display = 'block';
      this.emailForm.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
      
      // フォームの最初の入力欄にフォーカス
      const firstInput = this.emailForm.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 300);
      }
    }
  }

  hideEmailForm() {
    if (this.emailForm) {
      this.emailForm.style.display = 'none';
    }
  }
}