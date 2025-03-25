import axios from "axios";

const API = axios.create({
    baseURL:"http://localhost:5000/api"
})

// this thing down here attaches the token to the api whenever the token is available
API.interceptors.request.use((req)=>{
    const token = localStorage.getItem("token");
    if(token){
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
})


export default API;