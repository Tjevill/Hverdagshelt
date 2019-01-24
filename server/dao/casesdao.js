const Dao = require("./dao.js");

type jsonUpdateCommentNStatus = {
	status: number,
  comment: string
}

type jsonUpdateCaseByEmployee = {
	status: number,
	comment: string,
	case_id: number,
	org_id: number,
	employee_id: number
}

module.exports = class CasesDao extends Dao {

    /** Get all cases from db ordered by timestamp.*/
    getAllCases(callback){
        super.query(
            "SELECT * FROM Cases ORDER BY timestamp DESC",
            [],
            callback
        );
    }

    /** Get one case on case_id. */
    getOne(caseid, callback){
        super.query("SELECT * FROM Cases WHERE case_id = ?", [caseid], callback);
    }

    /** Get every case with status_id = ?. 
    *   @param status_id - the status_id for the cases you wish to retrieve from the db.
    */
    getStatus(status_id, callback){
        super.query("SELECT * FROM Cases WHERE status_id = ?",
        [status_id],
        callback);
    }

    /** Get all cases from one user based on user_id */
    getCaseOnUser(user_id, callback){
        super.query("SELECT * FROM Cases WHERE user_id = ?", [user_id], callback);
    }

    /** Create case 
    *   @param json : json object with attributes.
     */
    create(json: any, callback:any) {
        var val = [
            json.headline,
            json.description,
            json.longitude,
            json.latitude,
            json.zipcode,
            json.user_id,
            json.category_id,
            json.picture,
            json.email
        
        ];
        super.query(
            "INSERT INTO Cases (headline, description, longitude, latitude, zipcode, user_id, category_id, picture) values (?,?,?,?,?,?,?,?)",
            val,
            callback
        );
    }


    /** Get all cases based on zipcode
    *   @param zipcode - area zipcode you want to get cases from.
     */
    getOneZip(zipcode: number, callback){
        super.query("SELECT * FROM Cases WHERE zipcode = ?", [zipcode], callback);
    }
    
    //decrecated
    getOneCategory(category_id:number , callback){
        super.query("SELECT * FROM Cases WHERE category_id = ?", [category_id], callback);
    }

    /** Update one case on case_id.
    *   @param case_id : case_id.
    *   @param json : json object with changes.
     */
     updateCase(json, callback){
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
                   json.org_id,
                   json.case_id
        ];
        super.query(
            "UPDATE Cases SET description = ?, longitude = ?, latitude = ?, status_id = ?, user_id = ?, category_id = ?, zipcode = ?, headline = ?, picture = ?, employee_id = ?, org_id = ? WHERE case_id = ? ",
            val,
            callback
        );
    }




/*
    updateCaseStatus(json, callback) {
        var val = [
            json.status_id,
            json.case_id
        ];
        super.query(
            "UPDATE Cases set status_id = ? WHERE case_id = ?",
            val,
            callback
        );
    }
    */

	/**
	 * Updates status_id to DELETED in database when user deletes one of their cases
	 * @param id The case id
	 * @param callback From db
	 */
	updateCaseStatusToDeleted (id: number, callback: mixed) {
		super.query(
			"UPDATE Cases SET status_id = 7 WHERE case_id = ?",
			[id],
			callback
		)
	}
  

    /** Delete case on case_id
    *   @param case_id - the case_id
     */
    deleteCase(case_id: number, callback){
        super.query(
            "DELETE FROM Cases WHERE case_id = ?",
            [case_id],
            callback
        );
    };
    
    /** Create case from the user perspective.
    *   Intended to be used on the user frontend-part.
    *   @param json - json-object with the necessary attributes.
     */
    createUserCase(json:json, callback){
        console.log('::::::::::: desc: ' + json.description + ' user_id: ' + json.user_id);
        let status_id = "1";
        let val = [json.description, json.longitude, json.latitude, status_id, json.user_id, json.category_id, json.zipcode, json.headline, json.picture];
        console.log("VALVALVALVALVALVLA: ", val)
        super.query(
            "INSERT INTO Cases  ( description, longitude, latitude, status_id, user_id, category_id, zipcode, headline, picture ) VALUES ( ?, ? ,?, ?, ?, ?, ?, ?, ? )",
            val,
            callback
        );
    }

    /** Search for a case based on the category name 
    *   @param description - the category name.
    */
    searchCaseCategory(description: string, callback){
        super.query("SELECT * FROM Cases WHERE category_id = (SELECT category_id FROM Category WHERE description = ?) ORDER BY Cases.timestamp DESC", [description], callback);
    }

    /** Search for a case based on the description e.g "tett vannhull". 
    *   @param keyword - the word/phrase you want to search for in the description
    */
    searchCaseDescription(keyword, callback){
        super.query("SELECT * FROM Cases WHERE description LIKE '%"+keyword+"%' ", [keyword], callback);
    }

    /** Search for a case based on the category_id.
    *   @param category_id - the category_id your searching for
     */
    getCaseCategoryName(category_id, callback){
        super.query("SELECT * FROM Cases ")
    }

    getProvinceOnCase(province, callback){
        super.query("SELECT * FROM Cases LEFT JOIN Place ON Cases.zipcode = Place.zipcode WHERE Place.province = ? ORDER BY Cases.timestamp DESC",
        [province],
        callback
        );
    }

    /**
     * Get the 5 latest cases in your commune that has status "registrert" and no assigned employee.
     * @param id - commune_id.
     */
    getFiveLatestRegistered(id, callback){
        super.query("SELECT * FROM Cases INNER JOIN Place ON Place.zipcode = Cases.zipcode WHERE Place.province = (SELECT navn FROM kommune WHERE ID = ?) AND status_id = 1 AND Cases.employee_id IS NULL ORDER BY Cases.timestamp DESC LIMIT 5",
            [id],
            callback
        );
    }

    /** Get the number of cases in the database. */
    getNumberOfCases(callback){
        super.query(
            "SELECT COUNT(*) AS x FROM Cases",
            [],
            callback
            );
    }
	
	/**
   * For organizations to update comment and status of a case they are registered as working on
	 * @param id The case_id parameter
	 * @param json Includes status and comment to Cases table
	 * @param callback
	 */
	updateCommentAndStatusOrg(id: number, json: jsonUpdateCommentNStatus, callback: mixed){
	    const val = [json.status, json.comment, id];
	    super.query(
	      "UPDATE Cases SET status_id = ?, comment = ? WHERE case_id = ?",
        val,
        callback
      );
  }
	
	/**
   * Gets all cases to a specific organization
	 * @param id The id of the organization you want to get cases on
	 * @param callback
	 */
  getCasesForOrganization(id: number, callback: mixed){
	  super.query(
	    "SELECT * FROM Cases WHERE org_id = ? AND status_id NOT LIKE 6",
      [id],
      callback
    )
  }

	/**
	 * Update status_id on one case
	 * @param case_id The case you want to update
	 * @param status_id The new status
	 * @param callback
	 */
	updateCaseStatus ( case_id: number, status_id: number, callback: mixed) {
		const val = [status_id, case_id];
		super.query(
			"UPDATE Cases set status_id = ? WHERE case_id = ?",
			val,
			callback
		);
	}

	/**
	 * Update comment on one case
	 * @param case_id The case you want to update
	 * @param comment The comment
	 * @param callback
	 */
	updateCaseComment ( case_id: number, comment: string, callback: mixed) {
		const val = [comment, case_id];
		super.query(
			"UPDATE Cases set comment = ? WHERE case_id = ?",
			val,
			callback
		);
	}
	
	/**
	 * Update case with for employees
	 * @param json json object: {employee_id, comment, org_id, status_id, case_id}
	 * @param callback
	 */
	updateCaseByEmployee(json: jsonUpdateCaseByEmployee, callback: mixed){
		const val = [json.employee_id, json.comment, json.org_id, json.status, json.case_id];
		super.query(
			"UPDATE Cases SET employee_id = ?, comment = ?, org_id = ?, status_id = ? WHERE case_id = ?",
			val,
			callback
		);
	}

    /** Returns user.email connected to a case, and user.subscribed value */
    getCaseReplyMail(case_id: number, callback: any) {

        super.query(
            "SELECT email, subscription FROM User JOIN Cases Where User.user_id = Cases.user_id AND Cases.case_id = ?",
            [case_id],
            callback
        );
    }

};


