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
//TEST
class CaseService {
  getCases(): Promise<Cases[]> {
    let url = "http://localhost:8080/cases/"
    return axios.get(url);
  }

  getCase(id: number): Promise<Cases> {
    return axios.get('/cases/' + id);
  }

  /* updateStudent(case: Cases): Promise<void> {
    return axios.put('/cases', case);
  }*/
}
export let caseService = new CaseService();
