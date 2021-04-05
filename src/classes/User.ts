import { type } from "node:os";
const bcrypt = require('bcrypt');
import {saltRounds} from '../../utils/constants';


enum Role{
    STUDENT = "STUDENT",
    AUTHORITY = "AUTHORITY",
    ADMINISTRATOR = "ADMINISTRATOR",
}

function getRoleName(role_name:string):Role{
    switch(role_name){
        case 'STUDENT':
            return Role.STUDENT;
        case 'AUTHORITY':
            return Role.AUTHORITY;
        case 'ADMINISTRATOR':
            return Role.ADMINISTRATOR;
    }
}

interface isUser{
     getName:()=>string;
     getRole:()=>Role;
     getPhone:()=>string;
     hasSetPassword:()=>boolean;

     setName:(string)=>boolean;
     setRole:(string)=>boolean;
     setPassword:(string)=>void;
     setPhone:(string)=>boolean;
}

export default class User implements isUser{
    
    public static table:string = 'users';
    private name:string;
    private password;
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
    getRole(){
        return getRoleName(this.role);
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
            return true;
        }
    }
    setRole(new_role:string):boolean{
        switch(new_role){
            case 'STUDENT':
                this.role = Role.STUDENT;
                return true;
            case 'ADMINISTRATOR':
                this.role = Role.ADMINISTRATOR;
                return true;
            case 'AUTHORITY':
                this.role = Role.AUTHORITY;
                return true;
            default:
                return false;
        }
    }
    setPhone(new_phone:string):boolean{
        let res = false;
        if(new_phone){
            this.phone = new_phone;
            res = true;
        }
        return true;
    }
    async hashPassword(password:string){
        const salt = await bcrypt.genSalt(saltRounds);
        return new Promise( resolve => {
            bcrypt.hash(password,salt).then(
                (hash) => {
                resolve(hash)
            })
        });
    }
    async setPassword(new_password:string){
        const hashed_password = await this.hashPassword(new_password)
        this.password = hashed_password;
        this.set_password = true;
    }
    
}