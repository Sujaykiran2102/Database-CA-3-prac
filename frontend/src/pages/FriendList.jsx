import {React,useState,useEffect} from 'react';
import API from '../api';
import FriendCard from "../components/FriendCard";
import { useNavigate } from 'react-router-dom';

function FriendList() {
  const [friends,setFriends] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    API.get("/friends")
    .then((res)=>setFriends(res.data))
    .catch((err)=> console.error("Error fetching friends",err))
  },[]);

  return (
    <div className="container">
      <h1>Friends List</h1>
      <button onClick={navigate("/add")}>Add Friend</button>
      <div className="friends-grid">
        {friends.map((friend)=>{
          <FriendCard key={friend._id} friend={friend}/>
        })}
      </div>
    </div>
  )
}

export default FriendList