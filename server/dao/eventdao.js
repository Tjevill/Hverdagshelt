const Dao = require("./dao.js");

module.exports = class EventDao extends Dao {
    
    /** Get all events from the db. */
    getAllEvents(callback) {
        super.query(
            "SELECT * FROM Events ORDER BY date ASC",
            [],
            callback
        );
    }

    /** Get one event from the db based on the event_id. */
    getOne(id:number, callback){
        super.query("SELECT * FROM Events WHERE event_id = ?",[id],callback);
    }

    /** Search feature. Get every event with name containing a keyword 
    *   @param keyword - keyword you are searching for in the event db.
    */
    searchEvent(keyword:string, callback){
        super.query("SELECT * FROM Events WHERE name LIKE '%"+keyword+"%' ",[keyword], callback);
    }

    /** Search feature. Get every event that happens on the given date
    *   @param date - The date your searching for.
     */
    onDateAsc(date:string, callback){
        super.query("SELECT * FROM Events WHERE date LIKE '"+date+"%' ORDER BY date ASC ", [date], callback);
    }

    /** Search feature. Get every event that happens on the given date in a descending order. 
    *   @param date - The date your searching for.
    */
    onDateDesc(date:string, callback){
        super.query("SELECT * FROM Events WHERE date LIKE '"+date+"%' ORDER BY date DESC ", [date], callback);
    }

    /** Create event and add in the db.
    *   @param json - json object with all the needed attributes to create an event.
     */
    createEvent(json, callback){
        let val = [json.name, json.date, json.description, json.zipcode];
        super.query(
            "INSERT into Events (name, date, description, zipcode) VALUES (?, ?, ?, ?)",
            val,
            callback
        );
    }

    /** Delete an event in the db based on event_id
    *   @param event_id - The id of the event you wish to delete.
     */
    deleteEvent(event_id, callback){
        super.query(
            "DELETE FROM Events WHERE event_id = ?",
            [event_id],
            callback
        );
    };

    /** Update an already existing event in the db.
    *   @param event_id - the id of the event you wish to update.
    *   @param json - the json object with the changes you wish to update.
     */
    updateEvent(event_id, json, callback){
        let val = [json.name, json.date, json.description, json.zipcode, event_id];
        super.query(
            "UPDATE Events SET name = ?, date = ?, description = ?, zipcode = ? WHERE event_id = ?",
            val,
            callback
        );
    }

}

