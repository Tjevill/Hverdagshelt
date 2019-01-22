// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Category {
    category_id: number;
    description: string;
}

class County { //Fylke
	id: number;
	county: string;
}

class Case {
  case_id: number;
  description: string;
  longitude: number;
  latitude: number;
  status_id: number;
  user_id: number;
  category_id: number;
  zipcode: number;
  headline: string;
  picture: string;
  employee_id: number;
  org_id: number;
}

class Employee{
  employee_id: number;
  name: string;
  tel: string;
  email: string;
  password: string;
  commune: string;
  county: string;
  superuser: boolean;
}

class Place {
	zipcode: number;
	commune: string;
}

class ResetToken {
  token: string;
}

class Status {
  status_id: number;
  description: string;
}

class Event{
  event_id: number;
  name: string;
  date: string; //date / string ?
  description: string;
  zipcode: string;
  address: string;
  venue: string;
}


class User {
  user_id: number;
  name: string;
  address: string;
  zipcode: string;
  tel: number;
  email: string;
  subscription: number;
  resetPasswordToken: string;
  resetPasswordExpire: number;

}

class UserSubscriptionUpdate {
  user_id: number;
  subscription: number;
}

class UserUpdatePWord {
  user_id: number;
  password: string;
}

class EmployeeUpdatePWord {
  emp_id: number;
  password: string;
}

class UserVerifyOldPWordAndUpdate {
	user_id: number;
	oldPassword: string;
}

class Organization {
  org_id: number;
  organizationnumber: string;
  name: string;
  email: string;
}

class OrganizationUpdatePWord {
  org_id: number;
  password: string;
}

class Districts {
  district: string;
  zipcode: string;
}

const url = "http://localhost:8080";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "x-access-token": sessionStorage.getItem("storedtoken")
  }
};



/** Service-class for cases */
class CaseService {

  /** Get all cases from the db  */
  getAllCases(): Promise <Case[]> {
    return axios.get(url+'/allCases');
  }

  getCaseOnUser(user_id: number): Promise <Case[]>{
    return axios.get(url+'/getCaseUserId/'+user_id);
  }

  /** Get number of cases in the db */
  countCases(): Promise <number>{
    return axios.get(url+'/countCases');
  }

  /** Get every case with a certain status_id
  * Status number range is 1 - 4.
  */
  getCaseOnStatus(status_id: number): Promise <Case[]>{
    return axios.get(url+'/allCases/status/'+status_id);
  }

  /** Get case by id */
  getCaseById(case_id : number): Promise <Case[]>{
    return axios.get(url+'/getCase/'+case_id);
  }

  /** Get case by zipcode
  *   Intended for filtering cases on zip
   */
  getCaseByZip(zipcode : string): Promise <Case[]>{
    return axios.get(url+'/getOnZip/'+zipcode);
  }

  /** Get case by category_id
  *   Intended for filtering cases on category
   */
  getCaseByCat(category_id : number): Promise <Case[]>{
    return axios.get(url+'/getOnCategory/'+category_id);
  }

  /**  Update one case */
  updateCase(case_id: number, info: json): Promise<void>{
    return axios.put(url+'/updateCase/'+case_id, info,{
      headers: {
        "Content-Type": "application/json"
      }
    });

  }



   /**  Update one case_status */
   /*
  updateCaseStatus(case_id: number, info: json): Promise<void>{
    return axios.put(url+'/updateCaseStatus/'+case_id, info,{
      headers: {
        "Content-Type": "application/json"
      }
    });

  }*/

  /** Delete one case by case_id */
  deleteById(case_id : number): Promise<void>{
    return axios.delete(url+'/deleteCase/'+case_id);
  }

  /** Create case (User)
  *   For use on the user-frontend.
  *   Sets status_id = 1.
  */
  createUserCase(casee: Case): Promise<void>{
    return axios.post(url+'/createUserCase', casee);
  }

  /** Search for case by category */
  searchCaseByCat(description: string): Promise<Case[]>{
    return axios.get(url+'/searchCaseCategory/'+description);
  }

  /** Search for case by description */
  searchCaseByDesc(description: string): Promise<Case[]>{
    return axios.get(url+'/searchCaseDesc/'+description);
  }

  /** Search for case by province */
  searchCaseByProv(province: string): Promise<Case[]>{
    return axios.get(url+'/allCases/'+province);
  }



    getCategories(): Promise<Category[]> {
        return axios.get(url + '/categories');
    }

  getCase(id: number): Promise<Case> {
    return axios.get(url + '/cases/' + id);
  }
    createCase(headline: string, description: string, longitude: number, latitude: number, picture: string, category_id: number): Promise<void> {
        return axios.post('/cases', {
            headline: headline,
            description: description,
            longitude: longitude,
            latitude: latitude,
            picture: picture,
            category_id: category_id
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

	changeCaseStatus (case_id: number): Promise<void> {
		return axios.put(url + '/updateCaseStatusToDeleted/' + case_id);
	}

	updateStatusAndCommentForOrg(case_id: number, status: number, comment: string): Promise<void>{
    return axios.put(url + '/updateStatusAndComment/' + case_id, {
      status: status,
      comment: comment
    });
  }

	/**
	 * Gets all cases for one organization
	 * @param id The organizations id number
	 * @returns {AxiosPromise<any>}
	 */
	getCasesForOrganization(id: number): Promise<Case[]>{
		return axios.get(url + '/getCasesOnOrgID/' + id);
	}

}
export let caseService = new CaseService();

class UserService {
  addUser(newuser: Register): Promise<void> {
    console.log("DATA TIL SERVICE: ", newuser);
    // console.log(axios.post(domain + '/admin/legginn', article, axiosConfig));
    return axios.put(url + "/newuser", newuser);
  }


    loginHverdagshelt(login: Login[]): Promise<void> {
        return axios.post(url + "/loginhh", login);
    }

    loginBedrift(login: Login): Promise<void> {
        return axios.post(url + "/loginb", login);
    }

    loginKommune(login: Login): Promise<void> {
        return axios.post(url + "/logink", login);
    }

  getDistricts(): Promise<Districts[]> {
      return axios.get(url + '/getdistricts');
  }

    getProvince(province: number): Promise<Province[]> {
        return axios.get(url + '/getdistricts/' + province);
    }

  getAllUsers(): Promise<User[]>{
    return axios.get(url + '/user');
  }

  getUserByID(id: number): Promise<User[]>{
    return axios.get(url + '/user/' + id);
  }

  updateOne(user: User): Promise<void>{
    return axios.put(url + '/user/' + user.user_id, user);
  }

  deleteUser(id: number): Promise<void>{
    return axios.delete(url + '/user/' + id);
  }

  getCountUsers(): Promise<number>{
    return axios.put(url + '/userCount');
  }

  getEmailUserByID(id: number): Promise<string>{
    return axios.get(url + '/userEmail/' + id);
  }

  updateSubscription(userSubUpdate: UserSubscriptionUpdate): Promise<void>{
    return axios.put(url + '/userSubscriptionUpdate', userSubUpdate);
  }

  updateUserPWord(userPWordUpdate: UserUpdatePWord): Promise<void>{
    return axios.put(url + '/updateUserPWord', userPWordUpdate);
  }

  getUsersProviceFromUserID(id: number): Promise<string>{
    return axios.put(url + '/userProvince/' + id);
  }


	/**
	 * Service object for verifying old password
	 * @param updatePassword Includes variables {user_id, oldPassword}
	 */
	verifyOldPassword (updatePassword: UserVerifyOldPWordAndUpdate): Promise<number> {
		return axios.post(url + '/userVerification', updatePassword);

	}

  

	getUsersBySearchingOnName(searchString: string): Promise<User[]>{
	  return axios.get(url + '/userNameSearch/' + searchString)
  }

  verifyResetToken (resetToken : string): Promise<User[]> {
    return axios.get(url + '/tokenVerification/user/'+ resetToken);
  }

  sendResetLink(email: string): Promise<void> {
    return axios.post(url + '/reset/user/' + email);
  }

}

export let userService = new UserService();


class OrgService{

	/**
	 * Service object for verifying and changing password for logged in users.
	 * @param updatePassword Includes variables {org_id, oldPassword}
	 */
	verifyOldPassword (org_id: number, oldPassword: string): Promise<number> {
		return axios.post(url + '/organizationVerification', {org_id: org_id, oldPassword: oldPassword});

	}

  getAllOrg(): Promise<Organization[]>{
    return axios.get(url + '/org');
  }

  getOrgByID(id: number): Promise<Organization[]>{
    return axios.get(url + '/org/' + id);
  }

  updateOrgByID(org: Organization): Promise<void>{
    return axios.put(url + '/org/' + org.org_id, org);
  }

  updateOrgPWordByID(org: OrganizationUpdatePWord): Promise<void>{
    return axios.put(url + '/updateOrgPWord', org);
  }

  deleteOrgByID(id: number): Promise<void>{
    return axios.delete(url + '/org/' + id);
  }

  addNewOrg(org: Organization): Promise<void>{
    return axios.post(url + '/newOrg', org);
  }

  getCountOrg(): Promise<number>{
    return axios.get(url + '/orgCount');
  }


  addOrganization(newemployee: Register): Promise<void> {
      console.log("ORG TIL SERVICE: ", newemployee);
      return axios.put(url + "/neworganization", newemployee);
  }

  verifyResetToken (resetToken : string): Promise<Organization[]> {
    return axios.get(url + '/tokenVerification/org/'+ resetToken);
  }

  sendResetLink(email: string): Promise<void> {
    return axios.post(url + '/reset/org/' + email);
  }
}

export let orgService = new OrgService();


class CategoryService {

  getAllCategories(): Promise<Category[]>{
    return axios.get(url + '/category');
  }

  getCategoryByID(id: number): Promise<Category[]>{
    return axios.get(url + '/category/' + id);
  }

  updateCategoryByID(category: Category): Promise<void>{
    return axios.put(url + '/category/' + category.category_id, category);
  }

    checkIfChecked(cat: number, org: number): Promise<Category[]>{
        return axios.get(url + '/categoryorg/' + cat + '/' + org);
    }

  addCategory(newcat: Category): Promise<void> {
    console.log("CATEGORY TIL SERVICE: ", newcat);
    return axios.post(url + "/addcategory", newcat);
  }

    deleteCategoryByID(id: number): Promise<void>{
        return axios.delete(url + '/category/' + id);
    }

    deleteCategoryByOrgID(id: number): Promise<void>{
        return axios.delete(url + '/category_org/' + id);
    }

  getCountCategories(): Promise<number>{
    return axios.get(url + '/categoryCount');
	}


	addOrgCat (newemployee: Register, company_id: number): Promise<void> {
		console.log("KOBLINGSTABELL TIL SERVICE: ", newemployee);
		return axios.put(url + "/neworgcat/" + company_id, newemployee);
	}

	/**
   * Gets all categories (and its id) connected to an organization
	 * @param id The organizations id number
	 * @returns {AxiosPromise<any>} {category_id, description}
	 */
	getCategoriesForOrganization (id: number): Promise<Category[]> {
		return axios.get(url + "/categoriesOrg/" + id);
	}

  

}


export let categoryService = new CategoryService();

export default class EmployeeService {

	/**
	 * Service object for verifying old password.
	 * @param updatePassword Includes variables {employee_id, oldPassword}
	 */
	verifyOldPassword (employee_id: number, oldPassword: string): Promise<number> {
		return axios.post(url + '/employeeVerification', {employee_id: employee_id, oldPassword: oldPassword});

	}
    getCategories(): Promise<Category[]> {
        return axios.get(url + '/getAllCategories');
    }

    addEmployee(newemployee: Register): Promise<void> {
        console.log("EMPLOYEE TIL SERVICE: ", newemployee);
        return axios.put(url + "/newemployee", newemployee);
    }



  /** Create employee
  * JSON sent in postman:
  * { "name": "Ben Oscar Strømstrømstrøm",
      "tel": "12345678",
      "email": "benstrom@strom.ben",
      "password": "bentricity",
      "province":1,
      "district":1 }
  */


  /** Delete an employee with employee_id. Yolo */
  deleteEmp(employee_id): Promise<void>{
    return axios.delete(url + '/employee/'+employee_id);
  }




  /** Change password */
  updateEmpPw(emp: EmployeeUpdatePWord): Promise<void>{
    return axios.put(url+'/updateEmpPW', emp);
  }

  /** Change employee data on employee_id - NOT PASSWORD!
  * Example on JSON in postman:
  *   {	"name":"Bento", "tel":4123444, "email":"test@test.no", "province":1, "district" : 22  	}
  */
  updateEmpData(emp: Employee) : Promise<void>{
    return axios.put(url+'/employee/' + emp.employee_id, emp);
  }

  /** Get all employees */
  getAll(): Promise<Employee[]>{
    return axios.get(url+'/employee');
  }

  /** Get one employee with employee_id */
  getOne(employee_id : number): Promise<Employee[]>{
    return axios.get(url+'/employee/'+employee_id);
  }

  /** Get all employees in a given Commune with commuune_id */
  getEmpCommune(commune : number): Promise<Employee[]>{
    return axios.get(url+'/employee/commune/'+commune);
  }

  /** Get the number of employees in the db */
  countEmps(): Promise<Employee[]>{
    return axios.get(url+'/countEmp');
  }

  /** Get the number of employees in a given province with province_id */
  countEmpsProvince(province_id : number): Promise<Employee[]>{
    return axios.get(url+'/countEmp/'+province_id);
  }


  /** Get all employees in a given Commune with commuune_id */
  getCommuneName(commune : number): Promise<Commune[]>{
    return axios.get(url+'/CommuneName/'+commune);
  }

  getCasesOnOnCommuneID(commune_ID: number): Promise<Case[]>{
    return axios.get(url + '/getCasesOnCommuneID/' + commune_ID);
  }

	/**
   * Gets all cases connected to an employee by employee_id
	 * @param emp_id The id of the employee
	 * @returns {AxiosPromise<any>} Returns Case array
	 */
  getCaseByEmployeeID(emp_id: number): Promise<Case[]>{
    return axios.get(url + '/getCaseOnEmployeeID/' + emp_id);
  }
	
	/**
   * Verify if email exists.
	 * @param email The employees email
	 * @returns {AxiosPromise<any>} 1 if true, 0 if not
	 */
  searchForEmail(email: string): Promise<{verify: number}>{
    return axios.get(url + '/searchEmail/' + email);
  }

  verifyResetToken (resetToken : string): Promise<Employee[]> {
    return axios.get(url + '/tokenVerification/emp/'+ resetToken);
  }

  sendResetLink(email: string): Promise<void> {
    return axios.post(url + '/reset/emp/' + email);
  }


}
export let employeeService = new EmployeeService();

class MapService {

  getMapInfo(lat: number, long: number){
    return axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyDNsdJJIvghqZOflTCuKk-tPumXWdutCBA");
  }

  getProvince(zip: number){
    return axios.get("http://data.sortere.no/api/sted/" + zip);
  }

}

export let mapService = new MapService();

class EventService {

  /**
   * Get every event in the db.
   * @returns {AxiosPromise<Event[]>}
   */
  getAllEvents(): Promise<Event[]>{
    return axios.get(url + "/events");
  }

    /**
     * Get one event from the db based on the event_id.
     * @param event_id - the id of the event you wish to retrieve.
     * @returns the event on the selected event_id.
     */
  getOne(event_id: number): Promise<Event[]>{
    return axios.get(url+"/getEvent/"+event_id);
  }

  /**
   * Create an event in the db
   * @param event - event object.
   */
  createEvent(event:Event):Promise<Void> {
    return axios.post(url+"/createEvent", event);

  }

  deleteEvent(event_id: number): Promise<Void>{
    return axios.delete(url+"/deleteEvent/"+event_id);
  }



    /**
     * Get all events in one commune.
     * Intended to be used on the administration of events for an employee.
     * @param commune_id - the id of the commmune the employee works in.
     * @returns an array of events in the employee commune.
     */
  getEventsCommune(commune_id: number): Promise<Event[]>{
      return axios.get(url + "/events/"+commune_id);
  }

  updateEvent(event_id:number, event:Event):Promise<Void>{
      return axios.put(url+/updateEvent/+event_id, event);
  }


}
export let eventService = new EventService();


class StatusService {

  getAllStatuses(): Promise<Status[]> {
    return axios.get(url + "/status")
  }

  getOneById(id:number): Promise<Status[]> {
    return axios.get(url + "/status/" + id);
  }
}

class GeoService {

	/** Get all communes from Place ordered by zip code.*/
	getAllCommunes(): Promise<Place[]> {
		return axios.get(url + "/getCommunes");
	}

   getCommuneName(commune: number): Promise<Place> {
     return axios.get(url + "/CommuneName/" + commune);
   }

	getCommunesCounty(county_id: number): Promise<County[]> {
		return axios.get(url + "/getCommunesCounty/", county_id);
	}

	getCommunesKommune(): Promise<{ID: number, navn: string, fylke_id: number}>{
		return axios.get(url + "/getCommunesKommune");
	}


}

export let geoService = new GeoService();
