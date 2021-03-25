const lengths = {
    name: {min: 3, max: 500}, 
    password: {min: 3, max: 500},
    phone: { min: 4, max: 30},
}

const enums = {
    role:{
        ADMINISTRATOR: "ADMINISTRATOR",
        STUDENT: "STUDENT",
        AUTHORITY: "AUTHORITY",
    }
}

const errors = {
    roleNotExist: {status: 400, message: 'Role does not exist', error: 'roleNotExist'},
}

module.exports ={
    lengths,
    errors,
    enums,
}