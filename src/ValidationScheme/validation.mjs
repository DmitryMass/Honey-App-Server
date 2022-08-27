export const mainValidationSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['email', 'name', 'amount', 'container', 'message'],
      properties: {
        email: {
          type: 'string',
          minLength: 5,
          maxLength: 30,
        },
        name: {
          type: 'string',
          minLength: 2,
          maxLength: 15,
        },
        container: {
          type: 'string',
        },
        amount: {
          type: 'string',
        },
        message: {
          type: 'string',
        },
      },
    },
  },
};

export const questionValidationSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['email'],
      properties: {
        email: {
          type: 'string',
          minLength: 5,
          maxLength: 30,
        },
      },
    },
  },
};
