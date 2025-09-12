import { useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import '../styles/login.css';

const Login = ({ onLogin, users, setUsers }) => {
    // Username state
    const [username, setUsername] = useLocalStorage('username', '');

    // Custom validation: username exists and > 4 chars
    const [isValidUser, setIsValidUser] = useState(users.includes(username) && username.length >= 4);

    //hook for isValidUser based on typing
    useEffect(() => {
        console.log("user is valid");
        setIsValidUser(users.includes(username) && username.length >= 4)
    }, [username])

    // Optional: auto-login if valid user
    useEffect(() => {
        if (isValidUser) {
            console.log("user is valid");
            onLogin(username);
        }
    }, [isValidUser, onLogin]);

    // Register new user
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && !users.includes(username)) { 
            console.log("newuser: ", [...users, username]);
            setUsers([...users, username]);
            onLogin(username);
        }
    };

    return (
        <div className='form-container'>
            {/* Circles are moved outside the form to prevent clipping */}
            <div className="circles login-circ">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
            </div>
            
            <form onSubmit={handleSubmit}>
                <div className="form__field">
                    <input
                        type="text"
                        className={`form__input ${isValidUser ? 'form__input--valid' : 'form__input--invalid'}`}
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                    <span className="icon">{isValidUser ? '😃' : '😳'}</span>
                </div>
            </form>
            
        </div>
    );
};

export default Login;
