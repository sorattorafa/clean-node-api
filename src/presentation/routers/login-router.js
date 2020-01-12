// class login Router first verify if has httpRequest and httpResquest.body 
// after verify that contains the email and password 
const httpResponse = require('../helpers/httpResponse'); 

module.exports = class LoginRouter{   
    constructor(authUseCase){ 
        this.authUseCase = authUseCase
    }
    // verify request
    async route(httpRequest){  
        try{ 
            const {email, password} = httpRequest.body; 
            if(!password){ 
                return httpResponse.badRequest(`password`)        
            } 
            if(!email){ 
                return httpResponse.badRequest(`email`)        
            }  

            const  accessToken = await this.authUseCase.auth(email, password) 
            if(!accessToken){ 
                return httpResponse.unauthorizedError()
            }  
            return httpResponse.ok({ accessToken }) 
        } catch(error){  
            //console.log(error)
            return httpResponse.serverError()
        }
    }
}  
 