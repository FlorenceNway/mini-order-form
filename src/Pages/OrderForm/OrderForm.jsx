/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import * as Yup from 'yup';
import './OrderForm.scss';
import InputField from '../../App/InputField/InputField';
import SelectOneField from '../../App/SelectOneField/SelectOneField';
import Preview from '../Preview/Preview';

const OrderForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [previewData, setPreviewData] = useState({});
  const [data, setData] = useState({
    Name: '', Email: '', Service: '',
  });

  const handleNextStep = (newData, final = false) => {
    setData((prev) => ({ ...prev, ...newData }));
    if (final) {
      setPreviewData(newData);
      setCurrentStep((prev) => prev + 1);
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  };


  const StepOneValidationSchema = Yup.object({
    Name: Yup.string()
      .min(2, 'Name is too Short!')
      .max(25, 'Name is too Long!')
      .matches(/^[a-zA-Z]+$/, 'Please enter valid name')
      .required('Required'),
  });
  const StepTwoValidationSchema = Yup.object({
    Email: Yup.string().email('Please enter valid email address').required('Required'),
  });
  const StepThreeValidationSchema = Yup.object({
    Service: Yup.string().required('Choose one'),
  });

  const options = ['STI Testing', 'Contraception', 'Other'];

  const steps = [
    <InputField
      next={handleNextStep}
      data={data}
      question='What is your name?'
      title='Name'
      id='customer-name'
      name='Name'
      validationSchema={StepOneValidationSchema}
    />,
    <InputField
      next={handleNextStep}
      back={handlePrevStep}
      data={data}
      question='What is your email address?'
      title='Email Address'
      id='customer-email'
      name='Email'
      validationSchema={StepTwoValidationSchema}
    />,
    <SelectOneField
      next={handleNextStep}
      back={handlePrevStep}
      data={data}
      question='What service are you here for?'
      options={options}
      name='Service'
      validationSchema={StepThreeValidationSchema}
    />,
    <Preview previewData={previewData} back={handlePrevStep} />,
  ];

  return (
    <div className='form-wrapper'>
      {steps[currentStep]}
    </div>
  );
};

export default OrderForm;
