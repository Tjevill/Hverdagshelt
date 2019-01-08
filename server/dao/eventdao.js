const Dao = require("./dao.js");

module.exports = class EventDao extends Dao {
    getAllEvents(callback) {
        super.query(
            "select * from Events",
            [],
            callback
        );
    }
}

