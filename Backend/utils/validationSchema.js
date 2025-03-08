import Joi from 'joi';


export const schema = Joi.object({
    fullname: Joi.string().required().messages({
        'string.empty': " Full Name cannot be an empty field",
        'any.required': 'Full Name is a required field',
    }),
    email: Joi.string().trim().lowercase().email({tlds: { allow: ['com', 'net'] }}).required().messages({
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email must be a valid email address`,
        'any.required': 'Email is a required field'
    }),
    password: Joi.string().min(6).max(15).required().label('password').regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/).messages({
        "string.empty": "Password cannot be an empty field",
        "string.min": "Password Must have at least 6 characters",
        "string.pattern.base": "Must have a Strong Password",
        'any.required': 'Password is a required field'
    }),
    confirmPassword: Joi.any().equal(Joi.ref('password')).required().messages({ 
        'any.only': 'Confirm password does not match',
        'any.required': 'Confirm password is a required field'
    }),
    profilePicture: Joi.string().default(""),
});

export const updateSchema = Joi.object({
    fullname: Joi.string().messages({
        'string.empty': " Full Name cannot be an empty field",
    }),
    email: Joi.string().trim().lowercase().email({tlds: { allow: ['com', 'net'] }}).messages({
        'string.empty': `Email cannot be an empty field`,
        'string.email': `Email must be a valid email address`,
    }),
    currentPassword: Joi.string(),
    newPassword: Joi.string().min(6).max(15).label('password').regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/).messages({
        "string.empty": "Password cannot be an empty field",
        "string.min": "Password Must have at least 6 characters",
        "string.pattern.base": "Must have a Strong New Password",
    }),
    profilePicture: Joi.string().default(""),
});
