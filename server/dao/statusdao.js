const Dao = require("./dao.js");

module.exports = class StatusDao extends Dao {
    
    /** Get all statuses from the db. */
    getAllStatuses(callback:any) {
        super.query(
            "SELECT * FROM StatusTable",
            [],
            callback
        );
    }

    /** Get one status from the db based on the status_id. */
    getOneById(id:number, callback:any){
        super.query("SELECT * FROM StatusTable WHERE status_id = ?",[id],callback);
    }

     /** Get one status from the db based on the description.
            Will be added if necessary /status rest api unable to divide strings id
    getOneByDescription(description:string, callback:any){
        super.query("SELECT * FROM Status WHERE status_id = ?",[description],callback);
    }*/


}