import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import FriendList from "./pages/FriendList";
import UpdateFriend from "./pages/UpdateFriend";
import AddFriend from "./pages/AddFriend";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FriendList/>}/>
        <Route path="/add" element={<AddFriend/>}/>
        <Route path="/update/:id" element={<UpdateFriend/>}/>
      </Routes>
    </Router>
  )
}

export default App