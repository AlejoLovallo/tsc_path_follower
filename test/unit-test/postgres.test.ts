import Postgres from '../../src/classes/Postgres';
const userBoundaries = require('../../src/database/tables_format/user');
require('dotenv').config({ path: __dirname + process.argv[2] });


let pg_adm;
beforeEach(async ()=>{
    pg_adm = new Postgres();
    await pg_adm.build();
})

describe('Postgress tests',()=>{
    it('Postgress create table',()=>{
        const test_table = {
            name:         {  type: 'string', lengths: userBoundaries.lengths.name, primaryKey: true, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
            phone:        {  type: 'string', lengths: userBoundaries.lengths.phone, couldBeUndefinedAtCreate: true, couldBeNullInDB:true                 },
        };
    })
    
})

