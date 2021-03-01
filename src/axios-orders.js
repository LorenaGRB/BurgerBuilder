import axios from "axios";
 
const instance = axios.create({
    baseURL:"https://burgerbuilder-f1037-default-rtdb.firebaseio.com/"
});
export default instance;