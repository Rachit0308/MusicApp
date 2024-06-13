export const userDetailValidation = {
    email: (value) => {
      if (!/\S+@\S+\.\S+/.test(value)) {
        return 'Please provide a valid email.';
      }
      return '';
    },
    name: (value) => {
      if (!value) {
        return 'Please provide a name.';
      }
      return '';
    },
    mobile: (value) => {
      if (!/^\d{10}$/.test(value)) {
        return 'Please provide a valid 10-digit mobile number.';
      }
      return '';
    },
  };