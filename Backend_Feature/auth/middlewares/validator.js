const joi= require('joi')

const passwordField = joi.string()
  .min(12)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{12,}$/)
  .required()
  .messages({
    'string.pattern.base': 'Password must contain uppercase, lowercase, number and special character',
    'any.required': 'password is required'
  });

//password schema
const passwordSchema = joi.object({
            password: joi.string()
            .min(12)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{12,}$/)
            // .pattern(new RegExp(' (?=.*[a-z])')) // least one lowercase
            // .pattern(new RegExp('(?=.*[A-Z])')) // least one uppercase
            // .pattern(new RegExp('(?=.*[0-9])')) //least one number 
            // .pattern(new RegExp('(?=.*[!@#$%^&*])')) //least one special character
            .required()
            .messages({
                'string.min': 'password must be at least 12 characters',
                'string.pattern.base': 'Password must be at least 12 characters and contain uppercase, lowercase, number and special character',
                'any.required': 'password is required'
            })
     })

// Joi Register Schema 
const registerSchema = joi.object({
    email : joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'Please provide a valid email',
        'any.required' : 'email is required'
    }),

    password: passwordField,
    
    first_name:joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
        'string.min': 'first name should be at least 3 characters',
        'string.max': 'first_name characters should be 15 max ',
        'any.required' :'first name is required'
    }),

    last_name : joi.string()
    .min(3)
    .max(15)
    .required()
    .messages({
        'string.min' : 'last name should be at least 3 characters',
         'string.max' : 'last name should not be more than 100 characters',
         'any.required' : 'last name is required'
    }),

    phone_number: joi.string()
    .pattern (/^(?:\+234|0)[789][01]\d{8}$/)
    .required()
    .messages({
        'string.pattern.base' : 'Please input a valid phone number',
        'any.required': 'phone number is required'
    }),

    user_type: joi.string()
    .valid('tenant', 'landlord')
    .required()
    .messages({
        'any.only': 'user must either be a tenant or landlord'
    })
})

//Joi login Schema
const loginSchema = joi.object({
    email: joi.string()
    .email()
    .required()
    .messages({
        'string.email': 'please input a valid email',
        'any.required': 'Email is required'
    }),

})

const profileSchema =joi.object({
    first_name :joi.string()
    .optional()
    .min(3)
    .max(100)
    .messages({
        'string.min' : 'first name should be at least 3 characters',
         'string.max' : 'first name should not be more than 100 characters',
    }),

    last_name: joi.string()
    .optional()
    .min(3)
    .max(100)
    .messages({
        'string.min' : 'last name should be at least 3 characters',
         'string.max' : 'last name should not be more than 100 characters',
    }),

    phone_number:joi.string()
    .pattern(/^(?:\+234|0)[789][01]\d{8}$/)
    .optional()
    .messages({
        'string.pattern.base' : ' please input a valid phone number'
    }),

    profile_picture_url: joi.string()
    .optional()
})

//validator factory
const validate =(schema) =>{
    return ( req,res, next)=>{
        const {error, value}= schema.validate(req.body,{
            abortEarly: false,
            stripUnknown: true
        })
            if (error) {
            const errors = error.details.map(detail => detail.message);
            return res.status(400).json({
                success: false,
                errors
            });
        }
        req.body= value
        next()
    }
}

module.exports= {
    passwordSchema,
    registerSchema,
    loginSchema,
    profileSchema,
    validate
}