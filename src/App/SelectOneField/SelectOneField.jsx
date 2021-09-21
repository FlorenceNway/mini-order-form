import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import PropTypes from 'prop-types';
import Button from '../../lib/Button';

const SelectOneField = ({
  back, next, data, question, options, name, validationSchema,
}) => {
  const handleSubmit = (values) => {
    next(values, true);
  };

  return (
    <Formik validationSchema={validationSchema} initialValues={data} onSubmit={handleSubmit} autocomplete='off'>
      {({ values }) => (
        <Form>
          <div className='question'>
            <h1>{question}</h1>
            <div className='select'>
              {options.map((option) => (
                <label htmlFor={option} key={option}>
                  {option}
                  <Field id={option} type='radio' name={name} value={option} className='radio-button' />
                </label>
              ))}
            </div>
            <span className='error'><ErrorMessage name='Service' /></span>
          </div>
          <div className='buttons'>
            <Button
              text='< Back'
              type='button'
              onClick={() => back(values)}
            />
            <Button
              text='Next >'
              type='submit'
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

SelectOneField.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  data: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Service: PropTypes.string.isRequired,
  }).isRequired,
  question: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  validationSchema: PropTypes.shape({
    Name: PropTypes.string,
    Email: PropTypes.string,
    Service: PropTypes.string,
  }).isRequired,
};
export default SelectOneField;
