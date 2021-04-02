import { type } from "node:os";

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

     setName:(string)=>boolean;
     setRole:(string)=>boolean;
     setPassword:(string)=>boolean;
     setPhone:(string)=>boolean;

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
    setName( new_name:string):boolean{
        let res = false;
        if(new_name){
            this.name = new_name;
            res = true;
        }
        return true;
    }
    setRole(new_role:string):boolean{
        let res = false;
        switch(new_role){
            case 'STUDENT':
                this.role = Role.STUDENT;
                res = true;
                break;
            case 'ADMINISTRATOR':
                this.role = Role.ADMINISTRATOR;
                res = true;
                break;
            case 'AUTHORITY':
                this.role = Role.AUTHORITY;
                res = true;
                break;
            default:
                res = false;
                break;
        }
        return res;
    }
    setPhone(new_phone:string):boolean{
        let res = false;
        if(new_phone){
            this.phone = new_phone;
            res = true;
        }
        return true;
    }
    setPassword(new_password:string):boolean{
        /**
         * TODO: Hash password 
         */
        return true;
    }

}