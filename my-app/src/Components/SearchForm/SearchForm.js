import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from './SearchForm.module.css';

export default function SearchForm({ getSearchQuery }) {
  const [value, setValue] = useState('');

  const btn = useRef(null);

  const handleSubmit = e => {
    e.preventDefault();
    const query = value.toLowerCase().trim();
    if (query === '') {
      toast.error('Please enter a query');
      btn.current.blur();
      return;
    }
    getSearchQuery(query);
    setValue('');
    btn.current.blur();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        value={value}
        placeholder="Search movies"
        onChange={e => {
          setValue(e.target.value);
        }}
      />
      <button type="submit" className={styles.btn} ref={btn}>
        Search
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  getSearchQuery: PropTypes.func.isRequired,
};
