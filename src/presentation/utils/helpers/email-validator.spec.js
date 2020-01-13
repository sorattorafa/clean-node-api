const EmailValidator = require('./email-validator')  
describe('Email validator', () => { 
    test('Shold return true if validator is true', () => { 
        const sut = new EmailValidator()  
        const isEmailValid = sut.isValid('validemail@email.com') 
        expect(isEmailValid).toBe(true)
    })
})