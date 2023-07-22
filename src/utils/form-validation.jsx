export const usernameValidator = {
  required: {
    value: true,
    message: "Please enter a valid username ",
  },
  pattern: {
    value: /^[a-zA-Z0-9]+$/,
    message: "Email address is not valid",
  },
}


export const emailValidator = {
  required: {
    value: true,
    message: "Please enter a valid email",
  },
  pattern: {
    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-z]{2,}$/i,
    message: "Email address is not valid",
  },
};

export const passwordValidator = {
    required: {
        value: true,
        message: "Please enter a password",
      },
      pattern: {
        value:6,
        message: "Password must be at least 6 characters",
      },


}