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
    
    private name:string;
    private password:string;
    private set_password:boolean;
    private role:Role;
    private phone:string;

    constructor(){

    }

    public static getById(user_name:string){

    }

    public getName():string{

    }

    public getRole():string{

    }

}