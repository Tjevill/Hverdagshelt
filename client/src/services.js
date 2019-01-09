// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Cases {
  id: number;
  description: string;
  longitude: number;
  latitude: number;
  status_id: number;
  user_id: number;
  category_id: number;
  zipcode: number;
}

var url = "http://localhost:8080";

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

  getCase(id: number): Promise<Cases> {
    return axios.get(url + '/cases/' + id);
  }

  /* updateStudent(case: Cases): Promise<void> {
    return axios.put('/cases', case);
  }*/
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



}

export let userService = new UserService();
