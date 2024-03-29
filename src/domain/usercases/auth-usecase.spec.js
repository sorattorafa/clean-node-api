 const {MissingParamError} = require('../../utils/errors')
class AuthUseCase { 
    async auth(email, password){  
        if(!email){ 
            throw new MissingParamError('email')
        } 
        if(!password){ 
            throw new MissingParamError('password')
        }

    }
}  
describe('Auth use case', () => { 
    test('Shold throw if no email is provided', async () => { 
        const sut = new AuthUseCase() 
        const promise = sut.auth() 
        expect(promise).rejects.toThrow(new MissingParamError('email'))
    }) 
    test('Shold throw if no password is provided', async () => { 
        const sut = new AuthUseCase() 
        const promise = sut.auth('any_email@email.com') 
        expect(promise).rejects.toThrow(new MissingParamError('password'))
    }) 
    
})