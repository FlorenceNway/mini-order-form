import PropTypes from 'prop-types';
import React from 'react';

const Button = (props) => {
  const {
    children, className, disabled, onClick, testId, text, type,
  } = props;

  return (
    <button
      data-testid={testId}
      disabled={disabled}
      className={className}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
    >
      {children}
      {text}
    </button>
  );
};

Button.defaultProps = {
  children: undefined,
  className: undefined,
  disabled: false,
  testId: undefined,
  type: 'button',
  onClick: () => {},
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  testId: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
};

export default Button;
