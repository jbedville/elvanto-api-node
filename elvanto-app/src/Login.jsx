import { useState } from 'react'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await fetch("http://localhost:8000/api/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });
            
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Something went wrong')
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        alert('Logged in!');
        } catch (err) {
            alert('Login failed: ', err.message)
        }
    } 

    return (
        <div>
            <input placeholder='Email' value={email} onChange={e => setEmail(e.target.value)} />
            <input placeholder='Password' type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}