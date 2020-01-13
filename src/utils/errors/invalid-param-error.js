// customized error, show missing param 
module.exports = class InvalidParamError extends Error{ 
    constructor(paramName){ 
        super(`Invalid the param: ${paramName}`) 
        this.name = 'InvalidParamError'
    }
}
