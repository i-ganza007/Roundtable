const swagger_jsdoc = require('swagger-jsdoc')

const options = {
    definition:{
        openapi: '3.1.0',
        info:{
            title:'Super App Documentation',
            description:'Backend Trello Clone using all microservices I know up until this point',
            version:'1.0.0'
        }
    },
    apis:['../router/*js']
}

const specs = swagger_jsdoc(options)

module.exports = {
    specs
}