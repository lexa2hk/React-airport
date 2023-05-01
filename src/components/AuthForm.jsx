import React, {useState} from 'react';
import Cookies from 'universal-cookie';

function AuthForm(props) {
    const cookies = new Cookies();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [registerStatus, setRegisterStatus] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleRegisterClick = () => {
        console.log(`Register: username=${username} password=${password}`);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": username,
            "email": email,
            "password": password
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/auth/register", requestOptions)
            .then(response => {
                if(response.status !== 200) {
                    throw new Error(response.status);
                }
                return response;
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                cookies.set('Bearer', result.token, { path: '/' });
                props.handleBearer(result.token);
                setRegisterStatus('Success register');
            })
            .catch(error => {
                console.log('error', error);
                setRegisterStatus('Error register');
            });
    };

    const handleLoginClick = () => {
        console.log(`Login: username=${username} password=${password}`);

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            "username": username,
            "password": password
        });

        console.log(raw);
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/auth/login", requestOptions)
            .then(response => response.json())
            .then(response => {
                if(response.status !== 200) {
                    console.log(response.status);
                }
                return response;
            })
            .then(result => {
                console.log(result);
                cookies.set('Bearer', result.token, { path: '/' });
                props.handleBearer(result.token);
                setRegisterStatus('Success login');
            })
            .catch(error => {
                console.log('error', error);
                setRegisterStatus('Error login');
            });
    };

    return (
        <div>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} required/>
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={handleEmailChange} />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} required />
            </label>
            <p>{registerStatus}</p>
            <button onClick={handleRegisterClick}>Register</button>
            <button onClick={handleLoginClick}>Login</button>
        </div>
    );
}

export default AuthForm;