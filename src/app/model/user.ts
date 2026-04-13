export class User {
    private token: String = "";
    constructor(public UID: String,public username:String, private password:String){};
    setToken(strToken: String)
    {
        this.token = strToken;
    }
    
}
