import Postgres from './Postgres';

export default class Database{
    
    private driver;
    
    constructor(){
        this.driver;
    }
    
    async initialize(){
        switch(process.env['DATABASE'].toLowerCase()){
            case 'psql':
                this.driver = new Postgres();
                await this.driver.initialize()
                return;
            default:
                console.log("Manage error handler")
        }
    }
}


