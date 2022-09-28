import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// import API from "../../utils/API";
import Button from '@mui/material/Button';



const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [token, setToken] = useState(null)
    const navigate = useNavigate();
    const [tokenchanging, setTokenchanging] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // navigate('/');
        console.log(email, password)
        const userData = {
            email: email,
            password: password
        }
        fetch('https://cliphub-backendserver.herokuapp.com/api/customer/login', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' }
        }).then(placeHolder => {
            if (
                !placeHolder.ok
                ) {console.log('login failed!')}
            else {
                // setToken(placeHolder.token)
                // localStorage.setItem('token', placeHolder.token)
                // console.log('Login Successful!')
                return placeHolder.json()
            }
        }).then(placeHolder => {
            console.log(placeHolder)
            localStorage.setItem('token', "")

            setTokenchanging(true)

            console.log('Congrats you are logged in')
        })
    }
    useEffect(() => {
        const currentToken = localStorage.getItem("token")
        if(!currentToken){
            navigate("")
        }
    }, [tokenchanging])

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Email'
            />
            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Password'
            />

            <Button variant="contained" style={{ display: "block", margin: "0 auto" }} type="submit" >Log in</Button>{''}
        </form>
    )
}

export default Login;
