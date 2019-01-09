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

    onDateAsc(date, callback){
        super.query("SELECT * FROM Events WHERE date LIKE '"+date+"%' ORDER BY date ASC ", [date], callback);
    }

    onDateDesc(date, callback){
        super.query("SELECT * FROM Events WHERE date LIKE '"+date+"%' ORDER BY date DESC ", [date], callback);
    }

    createEvent(json, callback){
        let val = [json.name, json.date, json.description, json.zipcode];
        super.query(
            "INSERT into Events (name, date, description, zipcode) VALUES (?, ?, ?, ?)",
            val,
            callback
        );
    }

    deleteEvent(event_id, callback){
        super.query(
            "DELETE FROM Events WHERE event_id = ?",
            [event_id],
            callback
        );
    };

    updateEvent(event_id, json, callback){
        let val = [json.name, json.date, json.description, json.zipcode, event_id];
        super.query(
            "UPDATE Events SET name = ?, date = ?, description = ?, zipcode = ? WHERE event_id = ?",
            val,
            callback
        );
    }

}

