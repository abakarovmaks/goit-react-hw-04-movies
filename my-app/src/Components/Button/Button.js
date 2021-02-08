import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Button({ route }) {
  const navRoute = route ? route : '/';

  const label = '<- Go back';

  return (
    <button type="button">
      <Link to={navRoute} style={{ textDecoration: 'none', color: 'black' }}>
        {label}
      </Link>
    </button>
  );
}

Button.propTypes = {
  route: PropTypes.string,
};
