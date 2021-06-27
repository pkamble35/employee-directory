import axios from "axios";

function usersList() {
    console.log('in use usersList');
  return axios.get("https://randomuser.me/api/?results=200&nat=US");
}

export default {
  usersList
};