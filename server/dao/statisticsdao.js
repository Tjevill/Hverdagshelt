const Dao = require("./dao.js");


module.exports = class StatisticsDao extends Dao {
	
	/**
	 * Get statistics for registered cases past 7 days
	 * @param callback
	 */
	getCaseRegPast7Days(callback: mixed){
		super.query(
			"SELECT 'I dag' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases\n" +
			"    WHERE timestamp >= CURDATE()\n" +
			"  UNION ALL\n" +
			"    SELECT 'I går' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases \n" +
			"    WHERE timestamp >= CURDATE() - INTERVAL 1 DAY\n" +
			"          AND timestamp  < CURDATE()\n" +
			"  Union ALL\n" +
			"  \tSELECT 'I forrigår' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases \n" +
			"    WHERE timestamp >= CURDATE() - INTERVAL 2 DAY\n" +
			"      AND timestamp  < CURDATE() - INTERVAL  1 DAY\n" +
			"  UNION ALL\n" +
			"  \tSELECT '3 dager siden' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases \n" +
			"    WHERE timestamp >= CURDATE() - INTERVAL 3 DAY\n" +
			"      AND timestamp  < CURDATE() - INTERVAL  2 DAY\n" +
			"  UNION ALL\n" +
			"  \tSELECT '4 dager siden' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases \n" +
			"    WHERE timestamp >= CURDATE() - INTERVAL 4 DAY\n" +
			"      AND timestamp  < CURDATE() - INTERVAL  3 DAY\n" +
			"  UNION ALL\n" +
			"  \tSELECT '5 dager siden' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases \n" +
			"    WHERE timestamp >= CURDATE() - INTERVAL 5 DAY\n" +
			"      AND timestamp  < CURDATE() - INTERVAL  4 DAY\n" +
			"  UNION ALL\n" +
			"  \tSELECT '6 dager siden' AS 'Dag', COUNT(*) AS 'Registrerte' \n" +
			"    FROM Cases \n" +
			"    WHERE timestamp >= CURDATE() - INTERVAL 6 DAY\n" +
			"      AND timestamp  < CURDATE() - INTERVAL  5 DAY",
			[],
			callback
		)
	}
	
	/**
	 * Gets a count of cases registered on categories in database
	 * @param callback
	 */
	getAllCasesCategory(callback: mixed){
		super.query(
			"SELECT COUNT(Cases.category_id) AS 'antall', Category.description, Cases.category_id FROM Cases INNER JOIN Category ON Category.category_id = Cases.category_id GROUP BY Category.category_id",
			[],
			callback
		)
	}
	
	/**
	 * Gets count of all users of the system in one table
	 * @param callback {bruker, antall}
	 */
	getCountAllUsers(callback: mixed){
		super.query(
			"SELECT 'Hverdagshelter' AS 'bruker', COUNT(*) AS 'antall' FROM User " +
			"UNION ALL " +
			"SELECT 'Kommuneansatte' AS 'bruker', COUNT(*) AS 'antall' FROM Employee " +
			"UNION ALL " +
			"SELECT 'Bedrifter' AS 'bruker', COUNT(*) AS 'antall' FROM Organization ",
			[],
			callback
		)
	}

};