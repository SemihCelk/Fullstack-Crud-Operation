import { useState } from 'react'
import "./login.css";


function Login({setToken }) {
    const [username, setName] = useState()
    const [password, setPasword] = useState()

    const sendLogin = (e) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ username, password }),
            redirect: 'follow'
        };
        const url = "http://localhost:5000/api/login";
        fetch(url, requestOptions)
            .then(response =>response.json()) 
            .then((res)=>{
                if(typeof res.accessToken === "string"){
                    setToken(res.accessToken)
                    localStorage.setItem("token",res.accessToken)                }
            })
                }

    return (
        <div className='Mainlogindiv'>
            <div className='login-box'>
                <h2>Log in</h2>
                <form>
                    <div className='user-box'>
                        <input type="text" placeholder='User Name' name='username' onChange={e => setName(e.target.value)}></input>
                        <label>User Name</label>
                    </div>
                    <div className='user-box'>
                        <input type="password" placeholder='Password' name='password' onChange={e => setPasword(e.target.value)}></input>
                        <label>Password</label>
                    </div>
                    <p onClick={sendLogin}>
                        Submit
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login