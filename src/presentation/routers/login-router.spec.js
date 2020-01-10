const LoginRouter = require('./login-router'); 
const MissingParamError = require('../helpers/missing-param-error');  
const UnauthorizedError = require('../helpers/unautorizedError'); 
  
//design patter : factory method
// => create instance of object, if change instance change all objects
const makeSut = () => {   
  // fake object // not a construction class
  class AuthUseCaseSpy{ 
    auth(email, password){ 
      this.email = email  
      this.password = password 

    }
  } 
  const authUseCaseSpy = new AuthUseCaseSpy()
  const sut = new LoginRouter(authUseCaseSpy) 
  return { 
    sut,  
    authUseCaseSpy
  }
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
        const httpResponse = await sut.route({})
        expect(httpResponse.statusCode).toBe(500)
      })    

      test('Should call AuthUseCase with correct params', async () => {
        const { sut, authUseCaseSpy}  = makeSut() 
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }         
        sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(authUseCaseSpy.email).toBe(httpRequest.body.email) 
        expect(authUseCaseSpy.password).toBe(httpRequest.body.password)
      })   
 
      // 401 = not user identified 
      // 403 = identify user but he dont have admin access
      test('Should return 401 if invalid credentials are provided', async () => {
        const { sut, authUseCaseSpy}  = makeSut() 
        const httpRequest = {
          body: {
            email: 'invalid_email',
            password: 'invalid_password'
          } 
        }          

        const httpResponse = sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(401)  

        expect(httpResponse.body).toEqual(new UnauthorizedError())
      })  
 

      test('Should return 500 if no AuthCase has no auth method', async () => {
        const sut = new LoginRouter({})  // pass a empty object
        const httpRequest = {
          body: {
            email: 'any_email',
            password: 'any_password'
          } 
        }          

        const httpResponse = sut.route(httpRequest) 
        // verify if email and password usecase is equal to request email and password body
        expect(httpResponse.statusCode).toBe(500)  
      })   

})