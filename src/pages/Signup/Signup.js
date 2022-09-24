import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
// import API from "../../utils/API";

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [name, setName] = useState('')
    // const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password,
            name: name,
        }
        console.log(userData)
        fetch('http://localhost:3001/api/customer/', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: { 'Content-Type': 'application/json' }
        }).then(placeHolder => {
            if (
                !placeHolder.ok
            ) { console.log('login failed') }
            else {
                return placeHolder.json()
            }
        }).then(placeHolder => {

            console.log(placeHolder)
            localStorage.setItem('token', placeHolder.token)



            console.log('successfully logged in')

            // navigate('/');
        })
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>Name:</label>
            <input
                type="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Customer Name'
            />

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
            <label>Phone Number:</label>
            <input
                type="phonenumber"
                onChange={(e) => setPhonenumber(e.target.value)}
                value={phonenumber}
                placeholder='xxx-xxx-xxxx'
            />

            <Button variant="contained" style={{ display: "block", margin: "0 auto" }} type="submit" value="Submit" >Sign Up</Button>{''}
        </form>
    )
}
// const SignUp = ({changePage, changeUser}) => {
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [checkPassword, setCheckPassword] = useState("");
//     const [message, setMessage] = useState("");

//     const isSamePassword = () => {
//         let passMatch = password === checkPassword;
//         setMessage(passMatch ? "" : "Passwords must match");
//         return passMatch;
//     }

//     const handleInputChange = (e) => {
//         switch (e.target.id){
//             case "signUp-user":
//                 setUsername(e.target.value);
//                 break;
//             case "signUp-pass":
//                 setPassword(e.target.value);
//                 break;
//             case "signUp-check":
//                 setCheckPassword(e.target.value);
//                 break;
//         }
//     }

//     const handleSubmit = async () => {
//         if (username && password && isSamePassword()){
//             if (await API.checkName(username)){

//                 let userToAdd = {
//                     name: username,
//                     password: password
//                 }

//                 let added = await API.addUser(userToAdd);

//                 if (added?.username){
//                     changeUser(added.username, added.userId);
//                     changePage("imageAdd");
//                 }
//             };
//         }
//     }

//     return (
//         <div>
//             <div>{message}</div>
//             <input type="text" id="signUp-user" onChange={handleInputChange} />
//             <input type="password" id="signUp-pass" onChange={handleInputChange} />
//             <input type="password" id="signUp-check" onChange={handleInputChange} />
//             <button onClick={handleSubmit}>Sign Up</button>
//             <div><a onClick={()=>changePage("logIn")}>Log In instead!</a></div>
//         </div>
//     )
// }

export default Signup;