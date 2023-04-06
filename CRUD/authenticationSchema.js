const Joi=require('@hapi/joi');

const authSchema=Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    age: Joi.number(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports={
    authSchema
}