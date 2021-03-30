enum Role{
    STUDENT,
    AUTHORITY,
    ADMINISTRATOR,
}

interface isUser{

     name:string;
     password: string;
     set_password:boolean;
     role:Role;
     phone:string;

     getName:()=>string;
     getRole:()=>string;
     getPhone:()=>string;
     hasSetPassword:()=>boolean;

     setName:(string)=>string;
     setRole:(Role)=>string;
     setPassword:(string)=>boolean;
     setPhone:(string)=>string;

}

export default class User implements isUser{
    
    public static table:string = 'users';
    private name:string;
    private password:string;
    private set_password:boolean;
    private role:Role;
    private phone:string;

    constructor(userData){
        /**
         * TODO: HANDLE DATA RECIEVED
         */
        this.name = userData.name;
        this.password = userData.password ? userData.password : '';
        this.set_password = userData.set_password ? userData.set_password : false;
        this.role = userData.role ? userData.role: Role.STUDENT;
        this.phone = userData.phone ? userData.phone : '';
    }

    /** ----- GETTERS ------*/
    getName():string{
        return this.name;
    }
    getRole():string{
        return this.role.toString();
    }
    getPhone():string{
        return this.phone;
    }
    hasSetPassword():boolean{
        return this.set_password;
    }

    /** ----- SETTERS ------- **/
    setName:(string)=>string;
    setRole:(Role)=>string;
    setPassword:(string)=>boolean;
    setPhone:(string)=>string;

}