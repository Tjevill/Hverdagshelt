// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);

class Case {
  id: number;
  description: string;
  longitude: number;
  latitude: number;
  status_id: number;
  user_id: number;
  category_id: number;
  zipcode: number;
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

class CaseService {
  getCases(): Promise<Cases[]> {
    return axios.get('/cases');
  }

  getCase(id: number): Promise<Case> {
    return axios.get('/case/' + id);
  }

  // createCase(id: number, description: string, longitude: number, latitude: number, status_id: number, user_id: number, category_id: number, zipcode: number): Promise<void> {
  //       return axios.post('/articles', {
  //           title: title,
  //           content: content,
  //           picture: picture,
  //           category: category,
  //           importance: importance
  //       })
  //           .then(function (response) {
  //               console.log(response);
  //           })
  //           .catch(function (error) {
  //               console.log(error);
  //           });
  // }


  deleteCase(id: number): Promise<void> {
        return axios.delete('/case/' + id);
  }


    /* updateStudent(case: Cases): Promise<void> {
      return axios.put('/cases', case);
    }*/
}

class UserService {
    getUser(id: number): Promise<User> {
        return axios.get('/user/' + id);
    }

}
export let caseService = new CaseService();
