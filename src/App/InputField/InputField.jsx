import React from 'react';
import {
  ErrorMessage, Field, Form, Formik,
} from 'formik';
import PropTypes from 'prop-types';
import Button from '../../lib/Button';

const InputField = ({
  next, back, data, question, title, id, name, validationSchema,
}) => {
  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <Formik validationSchema={validationSchema} initialValues={data} onSubmit={handleSubmit}>
      {({ values }) => (
        <Form>
          <div className='question'>
            <h1>{question}</h1>
            <label htmlFor={id}>
              {title}
            </label>

            <Field
              maxLength='25'
              className={id}
              type='text'
              id={id}
              name={name}
            />
            <span className='error'><ErrorMessage name={name} /></span>
          </div>
          <div className='buttons'>
            <Button text={back ? '< Back' : ''} type='button' onClick={() => back(values)} />
            <Button
              text='Next > '
              type='submit'
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

InputField.defaultProps = {
  back: undefined,
};

InputField.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func,
  data: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Service: PropTypes.string.isRequired,
  }).isRequired,
  question: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  validationSchema: PropTypes.shape({
    Name: PropTypes.string,
    Email: PropTypes.string,
    Service: PropTypes.string,
  }).isRequired,
};

export default InputField;
