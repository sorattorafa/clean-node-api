const EmailValidator = require('./email-validator')  
const validator = require('validator')  

// make sut is the factory 
const makeSut = () => { 
    return new EmailValidator()
}
 
describe('Email validator', () => { 
    test('Shold return true if validator is true', () => { 
        const sut = makeSut() 
        const isEmailValid = sut.isValid('validemail@email.com') 
        expect(isEmailValid).toBe(true)
    })   
    // using mocking jest you dont have to know the valid email,  
    // you can set te function thats return if is valid with false  
    // it's  mocking function operation
    test('Shold return false if validator is false', () => {  
        validator.isEmailValid = false
        const sut = makeSut()  
        const isEmailValid = sut.isValid('invalidemail@gmail.com') 
        expect(isEmailValid).toBe(false)
    }) 

    test('Shold call validator with correct email', () => {  
        const sut = makeSut()  
        sut.isValid('any_email@gmail.com') 
        expect(validator.email).toBe('any_email@gmail.com')
    })
})