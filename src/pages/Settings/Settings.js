import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';
// import { SliderValueLabelUnstyled } from '@mui/base';
// import { placeHolder } from 'react-bootstrap';
// import { AirlineSeatIndividualSuiteSharp } from '@mui/icons-material';

const Settings = ({token}) => {
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [name, setName] = useState();
    const navigate = useNavigate();
    const [tokenchanging, setTokenchanging] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, name)
        const userData = {
            email: email,
            name: name,
        } 
        const currentToken = localStorage.getItem("token")
        // const decoded = req.headers?.authorization?.split(" ").pop()
        // if(JSON.parse(localStorage.getItem("type")) === "customers"){
        fetch('https://cliphub-backendserver.herokuapp.com/api/customer/', {
            method: 'PUT',
            // mode: 'cors',

            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentToken}` 
            },
            body: JSON.stringify(userData)
        }).then(placeHolder => {
            console.log(currentToken)
            if (!placeHolder.ok) {
                console.log('updated account failed failed')
            }
            else {
                return placeHolder.json()
                    .then(placeHolder => {
                        console.log(placeHolder)
                        localStorage.setItem('token', "")

                        setTokenchanging(true)



                        console.log('successfully updated account', currentToken)
                    })
            }
        })


    }
    useEffect(() => {
        const currentToken = localStorage.getItem("token")
        if(!currentToken){
            navigate("/login")
        }
    }, [tokenchanging])


    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Update Account</h3>

            <label>Name:</label>
            <input
                type="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder='Customer Name'
            />
            <br></br>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder='Email'
            />
            <br></br>
            <label>Phone Number:</label>
            <input
                type="phonenumber"
                onChange={(e) => setPhonenumber(e.target.value)}
                value={phonenumber}
                placeholder='xxx-xxx-xxxx'
            />
            <br></br>
            <Button variant="contained" style={{ display: "block", margin: "0 auto" }} type="submit" >Save</Button>{''}
            <br />
            <Button variant="contained" style={{ display: "block", margin: "0 auto" }} type="submit" >Delete Account</Button>{''}
        </form>
    )
}
// const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(email)
//         const userData = {
//             email: email,
//         }
//      const   token = localStorage.getItem('token')
//         fetch (`http://localhost:3001/api/customer/${token.id}`, {
//             method: 'PUT',
//             body: JSON.stringify(userData),
//             headers: {'Content-Type': 'application/json'}
//         }).then(placeHolder=>{
//             if(
//                 !placeHolder
//             ){console.log('update failed')}
//             console.log('successfully updated')
//             navigate('/');
//         })
//     }

export default Settings;