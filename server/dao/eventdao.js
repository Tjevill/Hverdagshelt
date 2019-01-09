const Dao = require("./dao.js");

module.exports = class EventDao extends Dao {
    
    getAllEvents(callback) {
        super.query(
            "SELECT * FROM Events ORDER BY date ASC",
            [],
            callback
        );
    }

    getOne(id, callback){
        super.query("SELECT * FROM Events WHERE event_id = ?",[id],callback);
    }

    searchEvent(keyword, callback){
        super.query("SELECT * FROM Events WHERE name LIKE '%"+keyword+"%' ",[keyword], callback);
    }

    onDateAsc(date,callback){
        super.query("SELECT * FROM Events WHERE date LIKE '"+date+"%' ORDER BY date ASC ", [date], callback);
    }

    onDateDesc(date,callback){
        super.query("SELECT * FROM Events WHERE date LIKE '"+date+"%' ORDER BY date DESC ", [date], callback);
    }

    

}

