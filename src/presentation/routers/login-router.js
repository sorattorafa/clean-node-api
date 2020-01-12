// class login Router first verify if has httpRequest and httpResquest.body 
// after verify that contains the email and password 
const httpResponse = require('../helpers/httpResponse');  
const MissingParamError = require('../helpers/missing-param-error');  
const InvalidParamError = require('../helpers/invalid-param-error'); 


module.exports = class LoginRouter{   
    constructor(authUseCase, emailValidator){ 
        this.authUseCase = authUseCase 
        this.emailValidator = emailValidator
    }
    // verify request
    async route(httpRequest){  
        try{ 
            const {email, password} = httpRequest.body; 
            if(!password){ 
                return httpResponse.badRequest(new MissingParamError(`password`))        
            } 
            if(!email){ 
                return httpResponse.badRequest(new MissingParamError(`email`))        
            }   
            if(! this.emailValidator.isValid(email)){ 
                return httpResponse.badRequest(new InvalidParamError('email'))
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
 