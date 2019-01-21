const Dao = require("./dao.js");

type jsonCategory = {
	category_id: number,
	description: string
}

module.exports = class CategoryDao extends Dao{
	
	/**	Get all categories from the database */
	getAll (callback: mixed) {
		super.query(
			"select * FROM Category ORDER BY description",
			[],
			callback);
	}

    /**	 Get one category base on category_id
     *	@param id - category_id
     */
    getOneByID (id: number, callback: mixed) {
        super.query(
            "select * FROM Category WHERE category_id = ?",
            [id],
            callback
        );
    }

    /**	 Get one category base on category_id
     *	@param id - category_id
     */
    checkIfCheckedOrgCat(cat: number, org: number, callback: mixed) {
        let val = [org, cat];
        console.log("val fra checkifchecked:", val)
        super.query(
            "select * FROM Org_cat WHERE org_id = ? AND category_id = ?",
            val,
            callback
        );
    }

    /**	Update category in the database
     *	@param json - json object with the edited category information
     */
    updateCategory (json: jsonCategory, callback: mixed){
        let val = [json.description, json.category_id];
        super.query(
            "update Category set description = ? where category_id = ?",
            val,
            callback
        );
    }

    /**	Add category to the database
     *	@param json - json object with the edited category information
     */

    addCategory(json, callback) {
        var val = [json.description];
        console.log("val: " + val);
        super.query(
            "insert into Category (description) values (?)",
            val,
            callback
        );
    }


    /**	Delete one category in the db based on category_id
     *	@param id - the category_id
     */
    deleteCategoryByOrgID(id: number, callback: mixed) {
        let val = id;
        super.query(
            "delete from Org_cat where org_id = ?",
            [val],
            callback
        );
    }

    /**	Delete all categories in the db based on org_id
     *	@param id - the category_id
     */
    deleteCategoryByID(id: number, callback: mixed) {
        let val = id;
        super.query(
            "delete from Category where category_id = ?",
            [val],
            callback
        );
    }

    /**	Count all the categories in the db. */
	getCountCategories(callback: mixed) {
		super.query(
			"select COUNT(*) as x from Category",
			[],
			callback
		);
	}
	
	/**
	 * Gets the categories (and categories id) connected to one organization
	 * @param id The organizations id number
	 * @param callback
	 */
	getCategoriesForOrganization(id: number, callback: mixed){
		super.query(
			"SELECT DISTINCT Category.category_id, Category.description FROM Category INNER JOIN Org_cat ON Org_cat.category_id = Category.category_id WHERE Org_cat.org_id = ?",
			[id],
			callback
		)
	}
	
};