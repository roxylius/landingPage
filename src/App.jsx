import { useState } from 'react';
import Login from './components/Login';
import TaskForm from './components/TaskForm';
import './styles/App.css';
import { useLocalStorage } from './hooks/useLocalStorage';


// component, which handles routing between the login and task form.
function App() {
  // State for current user's username.
  const [user, setUser] = useLocalStorage('username', '');

  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isLoggedIn', false);

  // Lift the users state to the App component
  const [users, setUsers] = useLocalStorage('users', []);


  // Handles the login action.
  const handleLogin = (username) => {
    setUser(username);
    setIsLoggedIn(true);
  };

  // Handles the logout action.
  const handleLogout = () => {
    console.log("logout");
    setUser('');
    setIsLoggedIn(false);
    localStorage.removeItem('username');
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <TaskForm username={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} users={users} setUsers={setUsers} />
      )}
    </div>
  );
}

export default App;