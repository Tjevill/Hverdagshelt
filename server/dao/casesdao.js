const Dao = require("./dao.js");

module.exports = class CasesDao extends Dao {

    getAllCases(callback){
        super.query(
            "SELECT * FROM Cases ORDER BY timestamp", 
            [],
            callback
        );
    }

    getOne(caseid, callback){
        super.query("SELECT * FROM Cases WHERE case_id = ?", [caseid], callback);
    }

    create(json: any, callback:any) {
        var val = [
            json.description,
            json.longitude,
            json.latitude,
            json.status_id,
            json.user_id,
            json.category_id,
            json.zipcode,
            json.headline,
            json.picture,
            json.employee_id,
            json.org_id
        ];
        super.query(
            "INSERT INTO Cases " +
            "(description, longitude, latitude, status_id, user_id, category_id,"+
            "zipcode, headline, picture, employee_id, org_id) values (?,?,?,?,?,?,?,?,?,?,?)",

            val,
            callback
        );
    }



    getOneZip(zipcode, callback){
        super.query("SELECT * FROM Cases WHERE zipcode = ?", [zipcode], callback);
    }

    getOneCategory(category_id, callback){
        super.query("SELECT * FROM Cases WHERE category_id = ?", [category_id], callback);
    }

    updateCase(case_id, json, callback){
        let val = [
                    json.description, 
                    json.longitude, 
                    json.latitude, 
                    json.status_id, 
                    json.user_id, 
                    json.category_id, 
                    json.zipcode, 
                    json.headline,
                    json.picture, 
                    json.employee_id, 
                    json.org_id, 
                    case_id
                    ];
        super.query(
            "UPDATE Cases SET description = ?, longitude = ?, latitude = ?, status_id = ?, user_id = ?, category_id = ?, zipcode = ?, headline = ?, picture = ?, employee_id = ?, org_id = ? WHERE case_id = ? ",
            val,
            callback
        );
    }

    deleteCase(case_id, callback){
        super.query(
            "DELETE FROM Cases WHERE case_id = ?",
            [case_id],
            callback
        );
    };

}