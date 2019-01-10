// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Category {
    category_id: number;
    description: string;
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

class User {
	user_id: number;
	name: string;
	address: string;
	zipcode: string;
	tel: number;
	email: string;
	username: string;
	subscription: number

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
  getAllCases(): Promise <Cases[]> {
    return axios.get(url+'/allCases');
  }

  /** Get number of cases in the db */
  countCases(): Promise <number>{
    return axios.get(url+'/countCases');
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
  updateCase(casee: Case): Promise<void>{
    return axios.put(url+'/updateCase/'+casee.case_id, casee);
  } 

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
  searchCaseByCat(category_id: number): Promise<Case[]>{
    return axios.get(url+'/searchCaseCategory/'+category_id);
  }

  /** Search for case by description */
  searchCaseByDesc(description: string): Promise<Case[]>{
    return axios.get(url+'/searchCaseDesc/'+description);
  }



  //Det under var her fra før.
  getCases(): Promise<Cases[]> {

    return axios.get(url + '/cases');
  }

    getCategories(): Promise<Category[]> {
        return axios.get(url + '/categories');
    }

  getCase(id: number): Promise<Cases> {
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
}
export let caseService = new CaseService();

class UserService {
  addUser(newuser: Register): Promise<void> {
    console.log("DATA TIL SERVICE: ", newuser);
    // console.log(axios.post(domain + '/admin/legginn', article, axiosConfig));
    return axios.put(url + "/newuser", newuser);
  }

  getUserByUsername(username: string): Promise<void> {
    // console.log(axios.get(domain + "/news/artikkel/" + id));
    return axios.get(url + "/user/" + username);
  }

  login(login: Login): Promise<void> {
    // console.log(axios.post(domain + "/login", login));
    return axios.post(url + "/login", login);
  }

  getDistricts(): Promise<Districts[]> {
      return axios.get(url + '/getdistricts');
  }

    getProvince(province: number): Promise<Province[]> {
        return axios.get(url + '/getdistricts/' + province);
    }

  getAllUsers(): Promise<User[]>{
    return axios.get('/user');
  }

	getUserByID(id: number): Promise<User[]>{
    return axios.get('/user/' + id);
  }

	updateOne(user: User): Promise<void>{
		return axios.put('/user/' + user.user_id, user);
	}

	deleteUser(id: number): Promise<void>{
    return axios.delete('/user/' + id);
  }

  getCountUsers(): Promise<number>{
    return axios.put('/userCount');
  }




}

export let userService = new UserService();


class EmployeeService {

    addEmployee(newemployee: Register): Promise<void> {
        console.log("DATA TIL SERVICE: ", newemployee);
        // console.log(axios.post(domain + '/admin/legginn', article, axiosConfig));
        return axios.put(url + "/newuser", newemployee);
    }


}
export let employeeService = new EmployeeService();

