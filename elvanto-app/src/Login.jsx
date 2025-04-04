import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login( onLogin) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName, password })
            });
            
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Something went wrong')
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        onLogin();
        navigate('/services')
        alert('Logged in!');
        } catch (err) {
            alert('Login failed: ', err.message)
        }
    } 

    return (
        <div>
            <input placeholder='Username' value={userName} onChange={e => setUserName(e.target.value)} />
            <input placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default Login