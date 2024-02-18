export const createUserValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage:
        "Name must be at least 5 characters with a max of 30 characters",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
    isString: {
      errorMessage: "Name must be a string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
  },
};
