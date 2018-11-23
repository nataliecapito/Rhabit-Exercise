// @flow
import axios from 'axios'

export default {
  // USERS
  // shows all users without custom hierarchy
  showAllList: () => {
    return axios.get('http://localhost:3001/api/v1/users.json');
  },

  // shows users specific to their individual hierarchy input by the user
  showSelectList: (id: number) => {
    return axios.get(`http://localhost:3001/api/v1/users/${id}`);
  },

  // add a user
  addUser: (firstName: string, lastName: string, title: string, managerID: number) => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      title: title,
      manager_id: managerID,
    };

    return axios.post('http://localhost:3001/api/v1/users',
      {
        user: user,
      }
    )
    .then(json => {
      console.log(`Create new user success: ${json}`)
    })
    .catch(error => console.log(`Create new user failure: ${error}`));
  },

  // delete a user
  deleteUser: (id: number) => {
    return axios.delete(`http://localhost:3001/api/v1/users/${id}`)
    .then(json => {
      console.log(`Delete user success: ${json}`)
    })
    .catch(error => console.log(`Delete user failure: ${error}`));
  },

  // updates user content
  showUpdatedList: (
    id: number,
    firstName: string,
    lastName: string,
    title: string,
    managerID: number
  ) => {
    const user = {
      first_name: firstName,
      last_name: lastName,
      title: title,
      manager_id: managerID,
    };

    return axios.put(`http://localhost:3001/api/v1/users/${id}`,
      {
        user: user,
      }
    )
    .then(json => {
      console.log(`Update user success: ${json}`)
    })
    .catch(error => console.log(`Update user failure: ${error}`));
  },
};
