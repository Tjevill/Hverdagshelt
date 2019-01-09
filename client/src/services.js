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

class CaseService {
  getCases(): Promise<Cases[]> {
    return axios.get('/cases');
  }

  getCase(id: number): Promise<Case> {
    return axios.get('/case/' + id);
  }

  deleteCase(id: number): Promise<void> {
        return axios.delete('/case/' + id);
  }
  getCategories(): Promise<Category[]> {
        return axios.get('/categories');
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
export let userService = new UserService();
