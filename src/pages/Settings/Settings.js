import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';

// const Settings = () => {
//     const [values, setValues] = useState({
//         email: "",
//         phone: ""
//     })
const Settings = () => {
    const [email, setEmail] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email)
        const userData = {
            email: email,
        }
        fetch ('cliphub-back.herokuapp.com/api/customer/settings', {
            method: 'PUT',
            body: JSON.stringify(userData),
            headers: {'Content-Type': 'application/json'}
        }).then(placeHolder=>{
            if(
                !placeHolder
            ){console.log('update failed')}
            console.log('successfully updated')
            navigate('/');
        })
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Update Account</h3>

            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
                <label>Phone Number:</label>
            <input
                type="phonenumber"
                onChange={(e) => setPhonenumber(e.target.value)}
                value={phonenumber}
            />

            <br/>
            <Button variant="contained" style={{ display: "block", margin: "0 auto" }} type="submit" >Save</Button>{''}
            <br/>
            <Button variant="contained" style={{ display: "block", margin: "0 auto" }} type="submit" >Delete Account</Button>{''}
        </form>
    )
}

export default Settings;