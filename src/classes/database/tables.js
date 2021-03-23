const userBoundaries = require('./boundaries/user');
const universityBoundaries = require('./boundaries/university');
const subjectBoundaries = require('./boundaries/subject');
const careerBoundaries = require('./boundaries/career');

module.exports = {
    universities:{
        id:  {      type: 'string', lengths: universityBoundaries.lengths.id, primaryKey: true, couldBeUndefinedAtCreate:false, couldBeNullInDB:false},
        address: {  type: 'string', lengths: universityBoundaries.lengths.address, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        web: {      type: 'string', lengths:  universityBoundaries.lengths.web, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        mail: {     type: 'string', lengths: universityBoundaries.lengths.mail, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        phone: {    type: 'string', lengths:universityBoundaries.lengths.phone, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        logo: {     type: 'string', sizes: universityBoundaries.sizes.logo, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
    },
    careers:{
        id:{         type:'serial',primaryKey:true,couldBeNullInDB:false,couldBeUndefinedAtCreate:false},
        name:{       type:'string',lengths:careerBoundaries.lengths.name,couldBeUndefinedAtCreate:false,couldBeNullInDB:false},
        university:{ type:'string', referenceTable: 'universities', lengths: careerBoundaries.lengths.university, couldBeNullInDB: true, couldBeUndefinedAtCreate: false},
        term:{       type:'string', lengths: careerBoundaries.lengths.term, couldBeUndefinedAtCreate:true, couldBeNullInDB:true },
        year: {      type:'string', lengths: careerBoundaries.lengths.year, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        is_mandatory:{type:'boolean', couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
    },
    subjects:{
        
    },
    users:{
        id: {type: 'string', lengths:       userBoundaries.lengths.id, primaryKey: true, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
        name: {type: 'string', lengths:     userBoundaries.lengths.name, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
        surname: {type: 'string', lengths:  userBoundaries.lengths.surname, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
        password: {type: 'string', lengths: userBoundaries.lengths.password, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
        set_password: {type: 'boolean', couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        role: { type: 'string', couldBeNulleable: false, definedValues: constants.users.roles, valueNotMatchValuesError: errors.users.roleNotExist},
        phone: {type: 'string', lengths: lengths.users.phone, couldBeUndefinedAtCreate: true, couldBeNullInDB:true},
    },
}