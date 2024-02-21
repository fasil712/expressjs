export const createUserValidationSchema = {
  fullname: {
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage:
        "Full Name must be at least 5 characters with a max of 30 characters",
    },
    notEmpty: {
      errorMessage: "Full Name cannot be empty",
    },
    isString: {
      errorMessage: "Full Name must be a string",
    },
  },
  username: {
    isLength: {
      options: {
        min: 3,
        max: 30,
      },
      errorMessage:
        "username must be at least 3 characters with a max of 30 characters",
    },
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
    isString: {
      errorMessage: "username must be a string",
    },
  },
  email: {
    notEmpty: {
      errorMessage: "username cannot be empty",
    },
  },
};
