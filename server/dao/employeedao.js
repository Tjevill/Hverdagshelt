const Dao = require("./dao.js")


'use strict';
var crypto = require('crypto');

var genRandomString = function(length){

    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};

var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');

    return {
        salt:salt,
        passwordHash:value
    };
};

module.exports = class UserDao extends Dao {





    /** Create an employee and add in the db
    *   @param json - employee json object.
    */
    addEmployee(json: any, callback) {

        var salt = genRandomString(32); /** Creates a salt of 32 bytes. BYTES ARE CHEAP! */
        var passwordData = sha512(json.password, salt);
        var val = [json.name, json.tel, json.email, json.commune, json.county, passwordData.passwordHash, passwordData.salt, json.superuser];

        super.query(
            "INSERT INTO Employee (name, tel, email, commune, county, password, secret) VALUES (?,?,?,?,?,?,?)",
            val,
            callback
        );
    }



    addManyRefrences(json, company_id, callback) {
        console.log("json; ", company_id);
        console.log("testing: " + json.length);

        json.map(hm =>

            console.log("catid: " + hm.catid)

          /super.query(
                "INSERT INTO Org_cat (org_id, category_id) values (?,?)",
                [company_id, hm.catid],
                callback
            )

        );


    }
    /** Get all employees */
    getAllEmp(callback: any){
        super.query(
            "SELECT * FROM Employee",
            [],
            callback
        );
    }

    /** Get all employees in based on commune
    *   @param commune - commune id.
    */
    getAllEmpCommune(commune: number, callback: any){
        super.query(
            "SELECT * FROM Employee WHERE commune = ?",
            [commune],
            callback
        );
    }

    /** Delete an employee in the db on employee_id
    *   @param employee_id - employee_id in the database.
    */
    deleteEmpById(employee_id: number, callback: any){
        let val = employee_id;
        super.query(
            "DELETE FROM Employee WHERE employee_id = ?",
            [val],
            callback
        );
    }

	/** Update employee personal data, except password
	 *   @param json - json object with all the edited data.
	 * @param emp_id
	 * @param callback
	 */
    updateEmp(json: any, emp_id, callback: mixed){

        let val = [json.name, json.tel, json.email, json.commune, json.county, emp_id];
        super.query(
            "UPDATE Employee SET name = ?, tel = ?, email = ?, commune = ?, county = ? WHERE employee_id = ? ",
            val,
            callback
        );
    }

    /** Change password for an employee in the db
    *   @param json - json-object with the edited password.
    */
    updateEmpPassword(json: any, callback: any){

        let salt = genRandomString(32);
        let passwordData = sha512(json.password, salt);
        let val = [passwordData.passwordHash, passwordData.salt, json.emp_id];
        super.query(
            "UPDATE Employee SET password = ?, secret = ? WHERE employee_id = ?",
            val,
            callback
        );
    }

	getHashedPWord(id: number, callback: mixed){
		super.query(
			"select * from Employee where employee_id = ?",
			[id],
			callback
		);

	}

	/**
   * Get cases in selected commune when logged in as employee by commune ID
	 * @param id Commune ID in kommune table
	 * @param callback
	 */
	getCasesOnCommuneID(id: number, callback: mixed){
        super.query(
          "SELECT * FROM Cases INNER JOIN Place ON Place.zipcode = Cases.zipcode WHERE Place.province = (SELECT navn FROM kommune WHERE ID = ?)",
          [id],
          callback
        )
  }


    getBedriftByEmail(email, callback) {
        console.log("Getting Bedrift based on its email: " + email);
        super.query(
            "select * from Organization where email = ?",
            [email],
            callback
        );
    }

        /** Get one employee on employee_id
         *   @param employee_id - the id of the employee you want to find.
         */
        getOne(employee_id:number, callback: any){
            super.query(
                "SELECT * FROM Employee WHERE employee_id = ?",
                [employee_id],
                callback
            );
        }


        /** Get number of employees in the db.
         */
        countEmps(callback){
            super.query(
                "SELECT COUNT(*) AS x FROM Employee",
                [],
                callback
            );
        }


        /** Get number of employees in commune
         *   @param commune - province number.
         */
        countEmpsProvince(commune: number, callback: any){
            super.query(
                "SELECT COUNT(*) AS x FROM Employee WHERE commune = ?",
                [commune],
                callback
            );
        }

    getEmployeeByEmail(email, callback) {
        super.query(
            "select * from Employee where email = ?",
            [email],
            callback
        );
    }

    getAllCategories(callback: mixed) {
        super.query(
            "select * FROM Category",
            [],
            callback);
    }



    /** Get Commune Name based on its ID */
    getCommuneName(commune: number, callback: any) {
        super.query(
            "SELECT navn FROM kommune WHERE ID = ?",
            [commune],
            callback
        );
    }

	/**
   * Gets all cases connected to an employee
	 * @param id The employee id
	 * @param callback
	 */
	getCaseOnEmployeeID(id: number, callback: mixed){
		super.query(
			"SELECT * FROM Cases WHERE employee_id = ?",
			[id],
			callback
		);
    }
	
	/**
	 * Verify if email exists
	 * @param email the email to search for
	 * @param callback
	 */
	searchEmail (email: string, callback: mixed) {
		super.query(
			"SELECT COUNT(email) as verify FROM Employee WHERE Employee.email = ?",
			[email],
			callback
		)
	}

    updateResetPasswordToken(json: json, employee_id: number, callback: any) {
		let val = [json.resetPasswordToken, json.resetPasswordExpire, employee_id];
		super.query(
			"update Employee set resetPasswordToken = ?, expirePasswordToken = ? where employee_id = ?",
			val,
			callback
		);
	}
 	
	 getUserFromResetToken(token: string, callback: any) {

		 super.query(
			"SELECT * FROM Employee WHERE resetPasswordToken = ?",
			[token],
			callback 
		 );
	 }


};
