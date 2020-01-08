 class LoginRouter{ 
    route(httpRequest){ 
        if(!httpRequest.body.email || !httpRequest.body.password){ 
            return{ 
                statusCode: 400
            }
        }
    }
} 
describe('Login router', () => {  
    test('Should return 400 if no password is provided', async () => {
        const sut = new LoginRouter() 
        const httpRequest = {
          body: {
            password: 'any_password'
          }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
      }) 

      test('Should return 400 if no email is provided', async () => {
        const sut = new LoginRouter() 
        const httpRequest = {
          body: {
            email: 'any_email'
          }
        }
        const httpResponse = await sut.route(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
      })  
})