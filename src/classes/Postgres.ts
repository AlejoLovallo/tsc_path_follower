import { Client } from 'pg';
import pg  = require('pg');
import dbTables = require('../database/tables');
const client = pg.Client;
let types = pg.types;

/**This is setting 1114 into returning everything from psql 
 * as a json format that comes as a date. 
 */
types.setTypeParser(1114, function(stringValue) {
    return new Date(stringValue + "+0000");
});


export default class Postgres {
    protected client;
    protected detailedMessage: Object;
    views=[];
    
    constructor(){
        this.client = null;
        this.detailedMessage = {
            value: 'Value: ',
            column: 'Column: ',
            id: 'Id: ', 
        }
    }

    async build(){
        let _client = new Client({
            user: process.env['DATABASE_USER'],
            password: process.env['DATABASE_PASSWORD'],
            host: process.env['DATABASE_HOST'],
            database: process.env['DATABASE_DATABASE'],
            port: process.env['DATABASE_PORT']
        })
        let connect = await _client.connect();
        this.client = _client;
        console.log("FINISHED!");
        console.log(this.client);
    }

    async initialize(){
        let _client = new Client({
            user: process.env['DATABASE_USER'],
            password: process.env['DATABASE_PASSWORD'],
            host: process.env['DATABASE_HOST'],
            database: process.env['DATABASE_DATABASE'],
            port: process.env['DATABASE_PORT']
        })
        let connect = await _client.connect();
        this.client = _client;
        await this.createTables()
    }

    query(query, values = []){

        return new Promise( (resolve, reject) => {
            this.client.query(query, values).then( result => {
                resolve(result.rows)
            }).catch( error => {
                console.log({error, query, values})
            })
        })
    }

    getDbDataTypes(type,length){
        switch(type){
            case 'string':
                return ' varchar' + ((length !== null)? `(${length}) `: '')
            case 'number':
                return ' integer '
            case 'boolean':
                return ' boolean '
            case 'serial':
                return ' serial '
        }
    }

    getDbReference(table,referenceField=""){
        return 'REFERENCES ' + table + `(${referenceField!=""?referenceField:'id'}) on update cascade ON DELETE CASCADE `;
    }

    async createViews(){
        for(let viewIndex = 0; viewIndex < this.views.length ; viewIndex++){
            try{
                await this.query(
                    this.views[viewIndex].query,
                    this.views[viewIndex].values)
            }catch(e){}
        }
    }

    async createTable(table_data){
        const createTableQuery = `CREATE TABLE ${table_data.table_name} (`;
        for (const field in table_data){
            if(field != 'table_name'){
                const data = Object.keys(table_data[field])
                console.log(data);
            }
        }
    }

    async createTables(){
        const tables = Object.keys(dbTables);

        const query = await this.client.query("SELECT table_name FROM \
            information_schema.tables WHERE table_schema='public' \
            AND table_type= 'BASE TABLE' ;");

        for(const table of tables){
            const index = query.rows.findIndex(table_obj => table_obj.table_name == table);
            if(index < 0){
                const columns = Object.keys(dbTables[table])

                let createTableString = 'CREATE TABLE ' + table + ' ('
                const keys = []
                columns.map( (column, index) => {

                    let data = dbTables[table][column]
                    const columnType = this.getDbDataTypes(data.type, data.lengths?data.lengths.max: null) + 
                    ((data.unique)?' UNIQUE ':'')

                    const reference = (data.referenceTable)?this.getDbReference(data.referenceTable,data.referenceField):''

                    if(data.primaryKey){
                        keys.push(column)
                    }

                    const columnConfig = column + columnType + reference
                    console.log(columnConfig);
                    createTableString += columnConfig

                    if(index != (columns.length - 1)){
                        createTableString += ','
                    }

                })

                if(keys.length > 0){
                    createTableString += ', PRIMARY KEY(' + keys.join(',') + ')'
                }

                createTableString += ');'
                await this.query(createTableString);
            }
        }
        await this.createViews()
    }

    async dropTables(){
           
    }

    async insert(table_name:string,data:object){
        let insertQuerie = `INSERT INTO ${table_name}`
        let columns = Object.keys(data);
        insertQuerie += `( ${columns.join()} ) values `;
        insertQuerie += `( ${Object.values(data).join()} );`
        return this.query(insertQuerie);
    }

    async update(table_name:string,data:object){
        let insertQuerie =`UPDATE ${table_name} SET`;
        for(const column in data){
            if(column != 'filter' && column != 'filter_value'){
                insertQuerie += `${column} = ${data[column]},`
            }
        }
        insertQuerie += `WHERE ${data['filter']} = ${data['filter_value']};`
    }

    async delete(){
        
    }

    close(){
        this.client.end();
    }
    
}