// @flow

const Dao = require("./dao.js");

module.exports = class EventDao extends Dao {
    
    /** Get all events from the db. */
    getAllEvents(callback) {
        super.query(
            "SELECT * FROM Events WHERE date>=NOW() ORDER BY date ASC",
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
        let val = [json.name, json.date, json.description, json.zipcode, json.address, json.venue];
        super.query(
            "INSERT into Events (name, date, description, zipcode, address, venue) VALUES (?, ?, ?, ?, ?, ?)",
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
        let val = [json.name, json.date, json.description, json.zipcode, json.address, json.venue, event_id];
        super.query(
            "UPDATE Events SET name = ?, date = ?, description = ?, zipcode = ?, address = ?, venue = ? WHERE event_id = ?",
            val,
            callback
        );
    }

    /** Get every event for one commune.
     *  This method is intended for the employee to get all events in his commune.
     *  @param commune_id - the id of the commune.
     */
    getEventInCommune(commune_id, callback){
        super.query(
            "SELECT * FROM Events INNER JOIN Place ON Place.zipcode = Events.zipcode WHERE Place.province = (SELECT navn FROM kommune WHERE ID = ?) ORDER BY Events.date ASC",
            [commune_id],
            callback
        );
    }

}

