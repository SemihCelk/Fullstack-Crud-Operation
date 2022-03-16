import { useState } from "react"
import Login from "./Login"
import Router from "./Router";
import "./app.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  if (!token) {
    return (
      <Login
        setToken={setToken} />
    )
  }
  return (
    <div>
      <div className="navbar">
        <span id="span">MyPage</span>
        <div className="logout" onClick={() => {
          setToken(localStorage.setItem("token", ""))
        }}>LogOut</div>
      </div>
      <h1 id="h1">Users</h1>
      <Router/>
    </div>
  )

}
export default App;
