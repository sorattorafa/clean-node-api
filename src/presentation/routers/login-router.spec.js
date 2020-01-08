 class LoginRouter{ 
    route(httpRequest){  
        if(!httpRequest){ 
            return{ 
                statusCode:500
            }
        }
        const {email, password} = httpRequest.body; 
        if(!email || !password){ 
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


      test('Should return 500 if no httpRequest', async () => {
        const sut = new LoginRouter()         
        const httpResponse = await sut.route()
        expect(httpResponse.statusCode).toBe(500)
      })  
})