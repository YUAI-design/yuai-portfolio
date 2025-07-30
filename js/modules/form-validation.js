/**
 * フォームバリデーションモジュール
 */

export class FormValidation {
  constructor() {
    this.form = document.querySelector('.contact__form');
    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.telRegex = /^[\d-+()（）\s]+$/;
  }

  init() {
    if (!this.form) return;

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // リアルタイムバリデーション
    const inputs = this.form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  async handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const isValid = this.validateForm();

    if (isValid) {
      // フォーム送信処理（実際の実装では、ここでAPIを呼び出す）
      // const response = await this.submitForm(formData);
      this.showSuccessMessage();
      this.form.reset();
    }
  }

  validateForm() {
    const requiredFields = this.form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    let isValid = true;

    // 必須フィールドのチェック
    if (field.hasAttribute('required') && !value) {
      this.showError(field, '必須項目です');
      isValid = false;
    }
    // メールアドレスの検証
    else if (field.type === 'email' && value) {
      if (!this.emailRegex.test(value)) {
        this.showError(field, '正しいメールアドレスを入力してください');
        isValid = false;
      }
    }
    // 電話番号の検証
    else if (field.type === 'tel' && value) {
      if (!this.telRegex.test(value)) {
        this.showError(field, '正しい電話番号を入力してください');
        isValid = false;
      }
    }

    return isValid;
  }

  showError(field, message) {
    this.clearError(field);

    const errorElement = document.createElement('span');
    errorElement.className = 'contact__error';
    errorElement.textContent = message;

    field.classList.add('is-error');
    field.parentElement.appendChild(errorElement);
  }

  clearError(field) {
    field.classList.remove('is-error');

    const errorElement = field.parentElement.querySelector('.contact__error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'contact__success';
    successMessage.textContent = 'お問い合わせありがとうございます。内容を確認次第、ご連絡いたします。';

    this.form.parentElement.insertBefore(successMessage, this.form);

    // 5秒後に自動的に削除
    setTimeout(() => {
      successMessage.classList.add('contact__success--fade-out');
      setTimeout(() => successMessage.remove(), 300);
    }, 5000);
  }

  // 将来的なAPI実装用
  async submitForm(formData) {
    // const response = await fetch('/api/contact', {
    //   method: 'POST',
    //   body: formData
    // });
    // return response.json();
  }
}