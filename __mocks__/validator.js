// mock version of validator 
const validator = require('validator') 
module.exports = {  
    isEmailValid: true,  
    email: '',
    isEmail (email){ 
        this.email = email 
        return this.isEmailValid
    }
}