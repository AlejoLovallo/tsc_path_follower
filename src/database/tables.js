const userBoundaries = require('./tables_format/user');
const universityBoundaries = require('./tables_format/university');
const subjectBoundaries = require('./tables_format/subject');
const careerBoundaries = require('./tables_format/career');
const userSubjectNotesBoundaries = require('./tables_format/user_subject_notes');

module.exports = {
    universities:{
        id:  {      type: 'string', lengths: universityBoundaries.lengths.id, primaryKey: true, couldBeUndefinedAtCreate:false, couldBeNullInDB:false},
        address: {  type: 'string', lengths: universityBoundaries.lengths.address, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        web: {      type: 'string', lengths:  universityBoundaries.lengths.web, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        mail: {     type: 'string', lengths: universityBoundaries.lengths.mail, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        phone: {    type: 'string', lengths:universityBoundaries.lengths.phone, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        logo: {     type: 'string', sizes: universityBoundaries.lengths.logo, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
    },
    careers:{
        id:{            type:'serial',primaryKey:true,couldBeNullInDB:false,couldBeUndefinedAtCreate:false},
        name:{          type:'string',lengths:careerBoundaries.lengths.name,couldBeUndefinedAtCreate:false,couldBeNullInDB:false},
        university:{    type:'string', referenceTable: 'universities', lengths: careerBoundaries.lengths.university, couldBeNullInDB: true, couldBeUndefinedAtCreate: false},
        years: {        type:'string', lengths: careerBoundaries.lengths.years, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        subjects: {     type:'string', lengths: careerBoundaries.lengths.subjects, couldBeUndefinedAtCreate: true, couldBeNullInDB:true},
    },
    subjects:{
        id: {           type:'serial', primaryKey: true, couldBeNullInDB:false,couldBeUndefinedAtCreate:false},
        careeer: {      type:'serial', referenceTable: 'careers', couldBeNullInDB: true, couldBeUndefinedAtCreate: false},
        name:{          type:'string',lengths:subjectBoundaries.lengths.name,couldBeUndefinedAtCreate:false,couldBeNullInDB:false},
        term:{          type:'string', definedValues: subjectBoundaries.enums.term, definedValues:subjectBoundaries.errors.termNotExist, couldBeUndefinedAtCreate:true, couldBeNullInDB:true },
        is_mandatory:{  type:'boolean', couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        year: {         type:'string', lengths: subjectBoundaries.lengths.year, couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
    },
    users:{
        name: {           type: 'string', lengths:       userBoundaries.lengths.name, primaryKey: true, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
        password: {     type: 'string', lengths: userBoundaries.lengths.password, couldBeUndefinedAtCreate:false, couldBeNullInDB:true},
        set_password: { type: 'boolean', couldBeUndefinedAtCreate:true, couldBeNullInDB:true},
        role: {         type: 'string', couldBeNulleable: false, definedValues: userBoundaries.enums.role, valueNotMatchValuesError: userBoundaries.errors.roleNotExist},
        phone: {        type: 'string', lengths: userBoundaries.lengths.phone, couldBeUndefinedAtCreate: true, couldBeNullInDB:true},
    },
    user_subject_notes:{
        user_id: {                                  type: 'string', referenceTable: 'users', referenceField: 'name', lengths: userBoundaries.lengths.name,  primaryKey:true, couldBeUndefinedAtCreate: false, couldBeNullInDB: false},
        subject: {                                  type: 'serial', referenceTable: 'subjects', couldBeNullInDB: false, couldBeUndefinedAtCreate: false },
        first_partial_note: {                       type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        second_partial_note: {                      type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        first_partial_first_recuperative_note: {    type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        first_partial_second_recuperative_note: {   type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        second_partial_first_recuperative_note: {   type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        second_partial_second_recuperative_note: {  type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
        final_note: {                               type: 'string', lengths: userSubjectNotesBoundaries.lengths.first_partial_note, couldBeNullInDB:true, couldBeUndefinedAtCreate: true},
    },
}