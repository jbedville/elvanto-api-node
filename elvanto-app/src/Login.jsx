import { useState } from "react"
import axios from "axios"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/auth/login`,
                { email, password }
            );

            localStorage.setItem("token", response.data.token)
            window.location.href = "/"
        } catch (err) {
            alert("Login failed. Check your email and password.")
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                /><br/>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

// const response = await axios.post(
//     `${import.meta.env.VITE_API_URL}/auth/login`,
//     { email, password }
//   );
  
//   localStorage.setItem("token", response.data.token);
//   window.location.href = "/";