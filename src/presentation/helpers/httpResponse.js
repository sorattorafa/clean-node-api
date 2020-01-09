// class httpResponse return the status code of error 
// exemple bad request and server request 
const MissingParamError = require('./missing-param-error') 

module.exports = class httpResponse { 
    static badRequest(paramName){ 
        return{ 
            statusCode: 400, 
            body: new MissingParamError(paramName)
        }
    }  

    static serverError(){ 
        return{ 
            statusCode: 500
        }
    } 

}  