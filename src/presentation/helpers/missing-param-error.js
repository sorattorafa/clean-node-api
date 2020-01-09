// customized error, show missing param 
module.exports = class MissingParamError extends Error{ 
    constructor(paramName){ 
        super(`Missing the param: ${paramName}`) 
        this.name = 'MissingParamError'
    }
}
