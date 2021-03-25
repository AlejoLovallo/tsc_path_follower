const lengths = {
    careeer: {min: 3, max: 100},
    name: {min: 3, max: 100},
    year: {min: 1, max: 2},
}

const enums = {
    term: {
        ANUAL: "ANUAL",
        MIDTERM: "MIDTERM",
        SUMMER: "SUMMER",
        FREE: "FREE",
    }
}

const errors = {
    termNotExist: {status: 400, message: 'Subject Term does not exist', error: 'termNotExist'},
}

module.exports= {
    lengths,
    enums,
    errors,
}