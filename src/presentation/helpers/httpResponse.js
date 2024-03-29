// class httpResponse return the status code of error 
// exemple bad request and server request 
const { UnauthorizedError, ServerError } = require('../errors') 

module.exports = class httpResponse { 
    static badRequest(error){ 
        return{ 
            statusCode: 400, 
            body: error
        }
    }  

    static serverError(){ 
        return{ 
            statusCode: 500, 
            body: new ServerError()
        }
    } 
  

    static ok(data){ 
        return{ 
            statusCode: 200,
            body: data
        }
    }  

    static unauthorizedError(){ 
        return{ 
            statusCode: 401,             
            body: new UnauthorizedError()
    
        }
    } 
}  