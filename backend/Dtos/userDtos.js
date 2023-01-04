class UserDto{
    name
    email
    avatar
    role
    id
    constructor(user){
        this.name=user.name;
        this.email=user.email;
        this.avatar=user.avatar?`${process.env.BASE_URL}${user.avatar}`:null;
        this.role=user.role;
        this.id=user._id;
    }
}
export default UserDto;