import React from "react"
import Button from '@mui/material/Button';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"


function NavBar(){
    const navigate = useNavigate();
    return(
        <header>
            <div className="container">
                <Link to ="/">
                    <h1>ClipHub</h1>
                </Link>
                <nav>
                    <div>
                        <Button variant="contained" style={{ display: "inline", margin: "0 auto" }}  onClick={()=>navigate("/Login")}>Login</Button>
                        <Button variant="contained" style={{ display: "inline", margin: "0 auto" }}  onClick={()=>navigate("/Signup")}>Signup</Button>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default NavBar;