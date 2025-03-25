import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

function FriendCard({friend}) {
  const navigate = useNavigate();
  const handleDelete = async()=>{
    try {
      await API.delete(`/friends/delete/${friend._id}`);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting friend: ",error);
    }
  }
  return (
    <div className="friend-card">
      <h3>{friend.name}</h3>
      <p>Age: {friend.age}</p>
      <p>Location : {friend.location}</p>
      {friend.image && <img src={friend.image} alt={friend.name}/>}
      {friend.quote && <p>"{friend.quote}"</p>}

      <button onClick={navigate(`/update/${friend._id}`)}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default FriendCard