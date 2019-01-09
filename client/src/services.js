// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Category {
    category_id: number;
    description: string;
}



class Case {
  id: number;
  headline: string;
  description: string;
  picture: string;
  longitude: number;
  latitude: number;
  status_id: number;
  user_id: number;
  category_id: number;
  zipcode: number;
  employee_id: number;
  org_id: number;
}

class User {
    id: number;
    name: string;
    address: string;
    tlf: number;
    email: string;
    password: number;
    subscription: boolean;
    zipcode: number;
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

const url = "http://localhost:8080";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "x-access-token": sessionStorage.getItem("storedtoken")
  }
};


class CaseService {
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
