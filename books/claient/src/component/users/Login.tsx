import React, { useState } from 'react'
import { login } from '../../api/users/userApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate()

    const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
        try {
            ev.preventDefault()
            const data = await login(email, password)
            console.log(data)

            if (!data) throw new Error("login failed, please register first");
            navigate("/booksPage")

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <form className="loginForm" onSubmit={handleSubmit}>
                <input type='email' name='email' autoComplete='given-name' placeholder='Email' value={email} onInput={(ev) => setEmail((ev.target as HTMLInputElement).value)}></input>
                <input type='password' name='password' autoComplete='off' placeholder='Password' value={password} onInput={(ev) => setPassword((ev.target as HTMLInputElement).value)}></input>
                <button type='submit'>Login</button>
            </form>
            <button onClick={() => { navigate("/register")}}>Register First</button>
        </>
    )
}

export default Login
