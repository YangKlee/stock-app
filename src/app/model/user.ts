export class User {
    private token: String = "";
    constructor(public id: String,public username:String, public password:String){};
    setToken(strToken: String)
    {
        this.token = strToken;
    }
    
}
