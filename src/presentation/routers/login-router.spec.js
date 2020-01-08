// sut is the object the will be test 
// sut = new class Login router that returns the status Code  
// class login Router verify if has httpRequest and httpResquest.body 
// after verify that contains the email and password
class LoginRouter{ 
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
 
// class httpResponse return the status code of error 
// exemple bad request and server request
class httpResponse { 
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

// customized error, show missing param 
class MissingParamError extends Error{ 
    constructor(paramName){ 
        super(`Missing the param: ${paramName}`) 
        this.name = 'MissingParamError'
    }
}
// describe the login test's
describe('Login router', () => {  
    test('Should return 400 if no email is provided', async () => {
        const sut = new LoginRouter() 
        const httpRequest = {
          body: {
            password: 'any_password'
          }
        }
        const httpResponse = await sut.route(httpRequest) 
        // compare the pointer 
        expect(httpResponse.statusCode).toBe(400) 
        // compare the value 
        expect(httpResponse.body).toEqual(new MissingParamError('email'))
      }) 

      test('Should return 400 if no password is provided', async () => {
        const sut = new LoginRouter() 
        const httpRequest = {
          body: {
            email: 'any_email'
          }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400) 
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
      })   


      test('Should return 500 if no httpRequest', async () => {
        const sut = new LoginRouter()         
        const httpResponse = await sut.route({})
        expect(httpResponse.statusCode).toBe(500)
      })  
})