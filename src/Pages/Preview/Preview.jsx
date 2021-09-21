import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../lib/Button';
import Confirmation from '../Confirmation/Confirmation';
import './Preview.scss';

const Preview = ({ previewData, back }) => {
  const [isSubmitted, SetIsSubmitted] = useState(false);

  const confirm = () => {
    SetIsSubmitted(true);
  };
  if (isSubmitted) return <Confirmation />;
  return (
    <div className='list'>
      <h3>Please confirm your details: </h3>
      <ul>
        {Object.keys(previewData).map((key) => (
          <li key={key}>
            {key}
            {': '}
            {previewData[key]}
          </li>
        ))}
      </ul>
      <div className='buttons'>
        <Button text='< Back' type='button' onClick={() => back(previewData)} />
        <Button text='Confirm' type='submit' onClick={() => confirm(previewData)} />
      </div>
    </div>
  );
};

Preview.propTypes = {
  back: PropTypes.func.isRequired,
  previewData: PropTypes.shape({
    Name: PropTypes.string,
    Email: PropTypes.string,
    Service: PropTypes.string,
  }).isRequired,
};

export default Preview;
