import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./index.css";
import { ClipLoader } from 'react-spinners'; // Import the spinner component

interface LoginData {
    username: string,
    password: string,
    role: string
}

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("ADMIN");
    const [isError, setError] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false); // Loading state

    const navigate = useNavigate();

    const onChangingUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    }

    const onChangingPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const onSuccessfulLogin = (jwtToken: string) => {
        setLoading(false); // Stop loading when login is successful
        Cookies.set("jwtToken", jwtToken);
        console.log("JWT Token:", jwtToken);
        navigate('/'); // Navigate to the home page
    }

    const onFailedLogin = () => {
        setLoading(false); 
        setError(true);
    }

    const submitLoginDetails = async () => {
        setLoading(true); 
        const loginData: LoginData = {
            username,
            password,
            role
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        }

        const response = await fetch("https://healthcarebackendproject.onrender.com/login", options);
        console.log(response)
        if (response.ok) {
            const jsonData = await response.json();
            onSuccessfulLogin(jsonData.token);
        } else {
            onFailedLogin();
        }
    }

    const onChangingRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(event.target.value);
    }

    const onSubmittingForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        submitLoginDetails();
    }

    return (
        <div className="login-bg-container">
            <div className="bg-login-img">
                <form onSubmit={onSubmittingForm} className="login-card-container">
                    <div className="input-el-and-label-container">
                        <label className="label" htmlFor="role">Role  </label><br />
                        <select value={role} className="username-input-element role-select-element" onChange={onChangingRole} >
                            <option value="ADMIN">ADMIN</option>
                        </select>
                    </div>
                    <div className="input-el-and-label-container">
                        <input type="text" className="username-input-element" id="username" placeholder="Enter Your Email" value={username} onChange={onChangingUsername} />
                    </div>
                    <div className="input-el-and-label-container">
                        <input type="password" className="username-input-element" id="password" placeholder="Enter Your Password" value={password} onChange={onChangingPassword} />
                    </div>
                    
                    <div className='submit-btn-container'>
                        <button className="submit-btn" type="submit" disabled={isLoading}>
                            {isLoading ? <ClipLoader size={20} color={"#fff"} /> : "Submit"}
                        </button>
                    </div>
                    {isError && <div>
                        <p className="error">Invalid User Details</p>
                    </div>}
                </form>
            </div>
        </div>
    )
}

export default Login;
