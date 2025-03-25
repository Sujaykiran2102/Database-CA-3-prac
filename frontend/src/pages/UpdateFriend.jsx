import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

const UpdateFriend = () => {
    const { id } = useParams(); // Get friend ID from URL
    const navigate = useNavigate();
    
    const [friend, setFriend] = useState({
        name: "",
        age: "",
        location: "",
        image: "",
        quote: "",
    });

    // Fetch existing friend details
    useEffect(() => {
        API.get(`/friends/${id}`)
            .then((res) => setFriend(res.data))
            .catch((err) => console.error("Error fetching friend:", err));
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        setFriend({ ...friend, [e.target.name]: e.target.value });
    };

    // Handle form submission (update friend)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/friends/update/${id}`, friend);
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error updating friend:", error);
        }
    };

    return (
        <div className="container">
            <h2>Update Friend</h2>
            <form onSubmit={handleSubmit} className="friend-form">
                <input type="text" name="name" value={friend.name} onChange={handleChange} required />
                <input type="number" name="age" value={friend.age} onChange={handleChange} required />
                <input type="text" name="location" value={friend.location} onChange={handleChange} required />
                <input type="text" name="image" value={friend.image} onChange={handleChange} />
                <input type="text" name="quote" value={friend.quote} onChange={handleChange} />
                <button type="submit">Update Friend</button>
            </form>
        </div>
    );
};

export default UpdateFriend;
