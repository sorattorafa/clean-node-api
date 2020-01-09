const LoginRouter = require('./login-router'); 
const MissingParamError = require('../helpers/missing-param-error'); 

// describe the login test's
describe('Login router', () => {  
    // if no email is provided 
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
      // if no password is provided
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
      // if no httpRequest
      test('Should return 500 if no httpRequest', async () => {
        const sut = new LoginRouter()         
        const httpResponse = await sut.route({})
        expect(httpResponse.statusCode).toBe(500)
      })  
})