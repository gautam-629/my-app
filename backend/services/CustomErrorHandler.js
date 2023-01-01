class CustomErrorHandler extends Error{
        constructor(statusCode,message){
            super(message);
            this.statusCode=statusCode;
            this.message=message;
        }
        static alreadyExist(message) {
            return new CustomErrorHandler(409, message);
        }
        static wrongCredentials(message='Username or password is wrong!'){
            return new CustomErrorHandler (401,message);
        }
}
export default CustomErrorHandler;