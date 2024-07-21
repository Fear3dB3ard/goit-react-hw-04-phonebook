import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!name.trim() || !number.trim()) {
      setError('Both fields are required.');
      return;
    }
    
    if (name.length < 3) {
      setError('Name must be at least 3 characters long.');
      return;
    }
    
    if (number.length < 7) {
      setError('Number must be at least 7 digits long.');
      return;
    }

    onAddContact(name, number);
    setName('');
    setNumber('');
    setError('');
  };

  return (
    <form className={styles.contactForm} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        pattern="^[a-zA-Z][a-zA-Z '-]*$"
        title="Name may contain only letters, apostrophes, dashes, and spaces."
        required
        placeholder="Name"
      />
      <input
        type="tel"
        name="number"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        pattern="^\+?\d{1,4}[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        placeholder="Phone number"
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Add Contact</button>
    </form>
  );
};

ContactForm.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
