import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaTelegram, FaGithub, FaLinkedin } from 'react-icons/fa';

function Contacts() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Дякую ${formData.name}! Повідомлення надіслано (це демо)`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div>
      <h2>Контакти</h2>
      
      <h3>Мої контакти:</h3>
      <ul>
        <li className="contact-item">
          <MdEmail /> Email: martamatvij@gmail.com
        </li>
        <li className="contact-item">
          <FaTelegram /> Telegram: @Marta_matvii
        </li>
        <li className="contact-item">
          <FaGithub /> GitHub: github.com/marta-matvii
        </li>
        <li className="contact-item">
          <FaLinkedin /> LinkedIn: linkedin.com/in/marta-matvii/
        </li>
      </ul>

      <h3>Форма зворотного зв'язку:</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ім'я:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>
        
        <div>
          <label>Повідомлення:</label>
          <textarea 
            name="message" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        <button type="submit">Надіслати</button>
      </form>
    </div>
  );
}

export default Contacts;