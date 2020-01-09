// sut is the object the will be test 
// sut = new class Login router that returns the status Code  and the missing param 
// class login Router verify if has httpRequest and httpResquest.body 
// after verify that contains the email and password 
const httpResponse = require('../helpers/httpResponse'); 

module.exports = class LoginRouter{ 
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
    }
}  
 