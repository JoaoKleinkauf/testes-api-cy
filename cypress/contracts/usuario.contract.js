const Joi = require ('joi')

const contratoUsuario = Joi.object({
    quantidade: Joi.number(), 
    usuarios: Joi.array().items({
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        _id: Joi.string(),
    })
})

export default contratoUsuario;