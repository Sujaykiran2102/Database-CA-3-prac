import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

const AddFriend = () => {
    const [friend, setFriend] = useState({
        name: "",
        age: "",
        location: "",
        image: "",
        quote: "",
    });

    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFriend({ ...friend, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post("/friends/add", friend);
            navigate("/"); // Redirect to home page
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <div className="container">
            <h2>Add a New Friend</h2>
            <form onSubmit={handleSubmit} className="friend-form">
                <input type="text" name="name" placeholder="Name" required onChange={handleChange} />
                <input type="number" name="age" placeholder="Age" required onChange={handleChange} />
                <input type="text" name="location" placeholder="Location" required onChange={handleChange} />
                <input type="text" name="image" placeholder="Image URL (optional)" onChange={handleChange} />
                <input type="text" name="quote" placeholder="Quote (optional)" onChange={handleChange} />
                <button type="submit">Add Friend</button>
            </form>
        </div>
    );
};

export default AddFriend;
