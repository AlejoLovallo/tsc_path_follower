import { isMainThread } from 'node:worker_threads';
import User from '../../src/classes/User';
import {completeUser} from '../data/userData';
let user : User;

beforeEach(()=>{
    user = new User(completeUser);
})

describe('User Positive tests',()=>{


    it('Create User',()=>{
        expect(user.getName()).toBe(completeUser.name);
        expect(user.getRole()).toBe(completeUser.role);
        expect(user.getPhone()).toBe(completeUser.phone);
        expect(user.hasSetPassword()).toBe(completeUser.set_password);
    });

    it('Create user and set name',()=>{
        let new_name:string = "new Name";
        user.setName(new_name);
        expect(user.getName()).toBe(new_name);
    })  

    it('Create user and set role',()=>{
        let new_role:string = "AUTHORITY";
        user.setRole(new_role);
        expect(user.getRole()).toBe(new_role);
    })

    it('Create user and set phone',()=>{
        let new_phone = "33334444";
        user.setPhone(new_phone);
        expect(user.getPhone()).toBe(new_phone);
    })

    it('Create user and set password',async ()=>{
        let new_password = "new_password";
        await user.setPassword(new_password);
        
    })

})
