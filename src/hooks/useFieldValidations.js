import { useState } from 'react';

const useFieldValidations = (initialState, validations) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    if (validations[name]) {
      const validationError = validations[name](value);
      setErrors({
        ...errors,
        [name]: validationError,
      });
    }
  };

  const resetValues = () => {
    setValues(initialState);
    setErrors({});
  };

  return { values, errors, handleChange, resetValues };
};

export default useFieldValidations;
