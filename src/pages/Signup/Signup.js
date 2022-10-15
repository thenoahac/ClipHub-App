import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Constants from "../../utils/constants";
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	IconButton,
	Typography,
	TextField,
	Grid
} from "@mui/material";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

const Signup = props => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem(Constants.LOCALSTORAGE_TOKEN_KEY)) {
			navigate("");
		} else {
			navigate("/scheduler");
		}
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();

		const userData = {
			email: email,
			password: password,
			name: name,
			phone: phone
		};

		fetch("http://localhost:3001/api/customer/", {
			method: "POST",
			body: JSON.stringify(userData),
			headers: { "Content-Type": "application/json" }
		})
			.then(placeHolder => placeHolder.json())
			.then(placeHolder => {
				if (placeHolder.hasOwnProperty("err")) {
					alert(placeHolder.msg);
					return;
				}

				localStorage.setItem(
					Constants.LOCALSTORAGE_TOKEN_KEY,
					placeHolder.token
				);
				localStorage.setItem(
					Constants.LOCALSTORAGE_CUSTOMER_KEY,
					JSON.stringify(placeHolder.customer)
				);

				props.setIsLoggedIn(true);
				navigate("/scheduler");
			})
			.catch(err => {
				console.log(err);
			});
	};

	return (
		<form className="login" onSubmit={handleSubmit}>
			<Grid
				container
				alignItems="center"
				justify="center"
				direction="column"
			>
				<Typography
					variant="h3"
					style={{ marginBottom: 50, marginTop: 50 }}
				>
					Sign up
				</Typography>
				<TextField
					label="Name"
					type="text"
					variant="standard"
					value={name}
					onChange={e => setName(e.target.value)}
					style={{ width: 400, marginBottom: 10 }}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								<PersonIcon style={{ color: "#aaa" }} />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					label="Email"
					type="email"
					variant="standard"
					value={email}
					onChange={e => setEmail(e.target.value)}
					style={{ width: 400, marginBottom: 10 }}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								<EmailIcon style={{ color: "#aaa" }} />
							</InputAdornment>
						)
					}}
				/>
				<TextField
					label="Password"
					type="password"
					variant="standard"
					value={password}
					onChange={e => setPassword(e.target.value)}
					style={{ width: 400, marginBottom: 10 }}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								<KeyIcon style={{ color: "#aaa" }} />
							</InputAdornment>
						)
					}}
					helperText="Length should be between 8 to 12 characters."
				/>
				<TextField
					label="Phone"
					type="text"
					variant="standard"
					value={phone}
					onChange={e => setPhone(e.target.value)}
					style={{ width: 400, marginBottom: 10 }}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								<PhoneIcon style={{ color: "#aaa" }} />
							</InputAdornment>
						)
					}}
				/>
				<Button
					variant="contained"
					style={{ width: 400, marginTop: 30, marginBottom: 50 }}
					type="submit"
				>
					Sign Up
				</Button>
			</Grid>
		</form>
	);
};

export default Signup;
