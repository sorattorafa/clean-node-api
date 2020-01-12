const LoginRouter = require('./login-router'); 
const MissingParamError = require('../helpers/missing-param-error'); 
const InvalidParamError = require('../helpers/invalid-param-error');   
const ServerError = require('../helpers/server-error');  
const UnauthorizedError = require('../helpers/unautorizedError'); 
  
//design patter : factory method
// => create instance of object, if change instance change all objects
const makeSut = () => {   
  // fake object // not a construction class
  const authUseCaseSpy = makeAuthUseCase() 
  const emailValidatorSpy = makeEmailValidator() 
  authUseCaseSpy.accessToken = 'valid_token'
  const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpy) 
  return { 
    sut,  
    authUseCaseSpy, 
    emailValidatorSpy
  }
}  
const makeEmailValidator = () => { 
  class EmailValidatorSpy{ 
   isValid(email){  
     this.email = email
     return this.isEmailValid
   }  
  }  
  const emailValidatorSpy = new EmailValidatorSpy() 
  emailValidatorSpy.isEmailValid = true 
  return emailValidatorSpy
}

const makeAuthUseCase = () => {  
  class AuthUseCaseSpy{ 
    async auth(email, password){ 
      this.email = email  
      this.password = password 
      return this.accessToken
    }
  }  
  return new AuthUseCaseSpy()
} 

const makeAuthUseCasewithError = () => { 
  class AuthUseCaseSpy{ 
    async auth(){ 
      throw new Error()
    }
  }  
  return new AuthUseCaseSpy()
} 

const makeEmailValidatorWithError = () => { 
  class EmailValidatorSpy{ 
    isValid(){ 
      throw new Error()
    }
  }  
  return new EmailValidatorSpy()
}

// describe the login test's
describe('Login router', () => {  
    // if no email is provided 
    test('Should return 400 if no email is provided', async () => {
        const { sut}  = makeSut() 
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
      // if no password is provided
      test('Should return 400 if no password is provided', async () => {
        const { sut}  = makeSut() 
        const httpRequest = {
          body: {
            email: 'any_email'
          }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400) 
        expect(httpResponse.body).toEqual(new MissingParamError('password'))
      })    
      
      
      // if no httpRequest
      test('Should return 500 if no httpRequest', async () => {
        const { sut}  = makeSut()        
        const httpResponse = await sut.route()
        expect(httpResponse.statusCode).toBe(500) 
        expect(httpResponse.body).toEqual(new ServerError())
      })     
      test('Should return 500 if httpRequest has no body', async () => {  
        const { sut}  = makeSut()        
        const httpResponse = await sut.route({})
        expect(httpResponse.statusCode).toBe(500) 
        expect(httpResponse.body).toEqual(new ServerError())
      })    


      test('Should call AuthUseCase with correct params', async () => {
        const { sut, authUseCaseSpy}  = makeSut() 
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }         
        await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email) 
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
      })   
 
      // 401 = not user identified 
      // 403 = identify user but he dont have admin access
      test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authUseCaseSpy}  = makeSut()  
        authUseCaseSpy.accessToken = null
        const httpRequest = {
          body: {
            email: 'invalid_email',
            password: 'invalid_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(401)  

        expect(httpResponse.body).toEqual(new UnauthorizedError())
      })   

      test('Should return 200 if valid credentials are provided', async () => {
        const { sut, authUseCaseSpy }  = makeSut() 
        const httpRequest = {
          body: {
            email: 'valid_email',
            password: 'valid_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        expect(httpResponse.statusCode).toBe(200) 
        expect(httpResponse.body.accessToken).toEqual(authUseCaseSpy.accessToken)    
      })    


      test('Should return 500 if has no AuthCase', async () => {
        const sut = new LoginRouter()  // pass a empty object
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500) 
        expect(httpResponse.body).toEqual(new ServerError())
      })     

      
      test('Should return 500 if AuthCase has no auth method', async () => {
        const sut = new LoginRouter({})  // pass a empty object
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500) 
        expect(httpResponse.body).toEqual(new ServerError())
      })     

 
            
      test('Should return 500 if AuthCase throw', async () => {
        const authUseCaseSpy = makeAuthUseCasewithError() 
        const sut = new LoginRouter(authUseCaseSpy)
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500) 
      })     
 
      test('Should return 400 if invalid email is provided', async () => {
        const { sut, emailValidatorSpy}  = makeSut()  
        emailValidatorSpy.isEmailValid = false
        const httpRequest = {
          body: {
            email: 'invalid_email', 
            password: '1234deoliveira4'
          }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400) 
        expect(httpResponse.body).toEqual(new InvalidParamError('email'))
      })     


      test('Should return 500 if has no EmailValidator is provided', async () => { 
        const authUseCaseSpy = makeAuthUseCase() 
        const sut = new LoginRouter(authUseCaseSpy)  // pass a empty object
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500) 
        expect(httpResponse.body).toEqual(new ServerError())
      })      



      test('Should return 500 if EmailValidator HAS NO isValid  provided', async () => { 
        const authUseCaseSpy = makeAuthUseCase() 
        const sut = new LoginRouter(authUseCaseSpy, {})  // pass a empty object
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500) 
        expect(httpResponse.body).toEqual(new ServerError())
      })      
      test('Should return 500 if EmailValidator throw', async () => {
        const authUseCaseSpy = makeAuthUseCase() 
        const emailValidatorSpywitherror = makeEmailValidatorWithError() 
        const sut = new LoginRouter(authUseCaseSpy, emailValidatorSpywitherror)
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500) 
      })   
      
      
      test('Should call AuthUseCase with correct email', async () => {
        const { sut, emailValidatorSpy}  = makeSut() 
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }         
        await sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(emailValidatorSpy.email).toBe(httpRequest.body.email) 
      })   

 
         

})