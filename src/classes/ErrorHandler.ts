export default class ErrorHandler {

    static errorObject(error:object,message:string=""){
        return({
            message: JSON.stringify({
                error: error.error,
                status: error.status,
                value: error.value ? error.value : undefined,
                message: message,
            })
        })
    }


    static throw (error:object, message:string=""){
        return new Error(this.errorObject(error,message).message);
    }
}

