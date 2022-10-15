import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
	AppBar,
	Box,
	Toolbar,
	Button,
	IconButton,
	Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Constants from "../../utils/constants";

function NavBar(props) {
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		if (!localStorage.getItem(Constants.LOCALSTORAGE_TOKEN_KEY)) {
			setIsLoggedIn(false);
		} else {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogout = e => {
		e.preventDefault();
		props.setIsLoggedIn(false);
		localStorage.removeItem(Constants.LOCALSTORAGE_CUSTOMER_KEY);
		localStorage.removeItem(Constants.LOCALSTORAGE_TOKEN_KEY);
		window.location.href = "/login";
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{ flexGrow: 1 }}
						onClick={() => navigate("/")}
						style={{ cursor: "pointer" }}
					>
						ClipHub
					</Typography>
					{!props.isLoggedIn && (
						<>
							<Button
								color="inherit"
								onClick={() => navigate("/Login")}
							>
								Login
							</Button>
							<Button
								color="inherit"
								onClick={() => navigate("/Signup")}
							>
								Signup
							</Button>
						</>
					)}
					{props.isLoggedIn && (
						<>
							<Button
								color="inherit"
								onClick={() => navigate("/Scheduler")}
							>
								Schedules
							</Button>
							<Button
								color="inherit"
								onClick={() => navigate("/Settings")}
							>
								Settings
							</Button>
							<Button color="inherit" onClick={handleLogout}>
								Logout
							</Button>
						</>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	);
}
export default NavBar;