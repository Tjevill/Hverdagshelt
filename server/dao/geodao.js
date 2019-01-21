const Dao = require("./dao.js");


module.exports = class GeoDao extends Dao {
	
	/** Get all communes from Place ordered by zip code.*/
	getAllCommunes (callback: mixed) {
		super.query(
			"SELECT * FROM Place ORDER BY zipcode ASC",
			[],
			callback
		);
	}
	
	/**
	 * Get the communes county by county_id
	 * @param county_id The county_id to send to DB
	 * @param callback
	 */
	getCommunesCounty(county_id: number, callback: mixed){
		super.query(
			"SELECT * FROM fylke WHERE ID = ?",
			[county_id],
			callback
		)
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
	 * Get all communes from kommune table
	 * @param callback
	 */
	getCommunesFromKommune(callback: mixed){
    	super.query("SELECT * FROM kommune ORDER BY navn",
				[],
				callback
			)
		}
    
};