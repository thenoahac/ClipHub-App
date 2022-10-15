import { useEffect, useState } from "react";
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

const Settings = ({ token }) => {
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [name, setName] = useState("");
	const [id, setId] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		let t =
			JSON.parse(
				localStorage.getItem(Constants.LOCALSTORAGE_CUSTOMER_KEY)
			) || false;
		if (!t) return;

		setName(t.name);
		setEmail(t.email);
		setPhone(t.phone);
		setId(t.id);
	}, []);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!id) return;
		const userData = {
			email: email,
			name: name,
			phone: phone
		};

		fetch(`http://localhost:3001/api/customer/${id}`, {
			method: "PUT",
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
					Constants.LOCALSTORAGE_CUSTOMER_KEY,
					JSON.stringify(placeHolder.customer)
				);

				alert("Profile updated successfully!");
			})
			.catch(err => {
				console.log(err);
			});
	};

	useEffect(() => {
		if (!localStorage.getItem(Constants.LOCALSTORAGE_TOKEN_KEY)) {
			navigate("/login");
		}
	}, []);

	return (
		<form className="signup" onSubmit={handleSubmit}>
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
					Your Profile
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
					Save changes
				</Button>
			</Grid>
		</form>
	);
};

export default Settings;