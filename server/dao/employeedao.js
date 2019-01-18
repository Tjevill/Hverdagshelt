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
        var val = [json.name, json.tel, json.email, json.province, json.district, passwordData.passwordHash, passwordData.salt];

        super.query(
            "INSERT INTO Employee (name, tel, email, province, district, password, secret) VALUES (?,?,?,?,?,?,?)",
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

    /** Get all employees in based on province
    *   @param province - province id.
    */
    getAllEmpProvince(province: number, callback: any){
        super.query(
            "SELECT * FROM Employee WHERE province = ?",
            [province],
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
    */
    updateEmp(json: jsonUpdate, emp_id, callback: mixed){

        let val = [json.name, json.tel, json.email, json.province, json.district, emp_id];
        super.query(
            "UPDATE Employee SET name = ?, tel = ?, email = ?, province = ?, district = ? WHERE employee_id = ? ",
            val,
            callback
        );
    }

    /** Change password for an employee in the db
    *   @param json - json-object with the edited password.
    */
    updateEmpPassword(json: jsonUpdatePWordEmp, callback: any){

        let salt = genRandomString(32);
        let passwordData = sha512(json.password, salt);
        let val = [passwordData.passwordHash, passwordData.salt, json.employee_id];

        super.query(
            "UPDATE Employee SET password = ?, secret = ? WHERE employee_id = ?",
            val,
            callback
        );
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


        /** Get number of employees in province
         *   @param province - province number.
         */
        countEmpsProvince(province: number, callback: any){
            super.query(
                "SELECT COUNT(*) AS x FROM Employee WHERE province = ?",
                [province],
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


};