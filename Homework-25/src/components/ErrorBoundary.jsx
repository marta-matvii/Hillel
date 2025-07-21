import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Цей метод викликається коли виникає помилка
  static getDerivedStateFromError(error) {
    return { hasError: true }; // Встановлюємо що є помилка
  }

  // Цей метод дозволяє логувати помилку
  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary спіймав помилку:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Показуємо запасний інтерфейс
      return (
        <div className="error">
          <h2>Щось пішло не так!</h2>
          <p>Сталася помилка в застосунку.</p>
          <button onClick={() => window.location.reload()}>
            Перезавантажити сторінку
          </button>
        </div>
      );
    }

    // Якщо помилки немає - показуємо дочірні компоненти
    return this.props.children;
  }
}

export default ErrorBoundary;