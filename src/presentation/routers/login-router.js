// class login Router first verify if has httpRequest and httpResquest.body 
// after verify that contains the email and password 
const httpResponse = require('../helpers/httpResponse'); 

module.exports = class LoginRouter{   
    constructor(authUseCase){ 
        this.authUseCase = authUseCase
    }
    // verify request
    route(httpRequest){  
        if(!httpRequest || !httpRequest.body){ 
            return httpResponse.serverError() 
        }
        const {email, password} = httpRequest.body; 
        if(!password){ 
            return httpResponse.badRequest(`password`)        
        } 
        if(!email){ 
            return httpResponse.badRequest(`email`)        
        } 
        this.authUseCase.auth(email, password)
    }
}  
 