// import React from 'react'
// import { DatePicker } from '@mui/lab';
// import { useState, useMemo, useCallback } from 'react';
// import Button from '@mui/material/Button';


// class Scheduler extends React.Component {
//   constructor(props) { 
//     super(props);

//     this.state = {
//       isOpen: false,
//     };
//   }

  

//   render() {
//     return (
//       <div>
//         {/* <Button variant="contained" style={{ display: "block", margin: "0 auto" }} onClick={() => this.setState({ isOpen: true})}>Schedule Now!</Button>
//         <PopupModal
//           url="https://calendly.com/thenoahac/barber-appointment"
//           pageSettings={this.props.pageSettings}
//           utm={this.props.utm}
//           prefill={this.props.prefill}
//           onModalClose={() => this.setState({ isOpen: false })}
//           open={this.state.isOpen}
//           rootElement={document.getElementById("root")}
//         /> */}
        
//       </div>
//     );
//   }
// }

import React, { useState, useEffect } from "react";
import moment from "moment";
import { Grid, Typography, Button } from "@mui/material";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import Constants from "../../utils/constants";
import { useNavigate } from "react-router-dom";

function Scheduler(props) {
	const navigate = useNavigate();
	const [appointments, setAppointments] = useState([]);
	const [selectedDate, setSelectedDate] = useState(
		moment().format("DD MMM YYYY")
	);
	const [selectedTime, setSelectedTime] = useState("10:00");

	useEffect(() => {
		if (!localStorage.getItem(Constants.LOCALSTORAGE_TOKEN_KEY)) {
			navigate("/login");
		}
	}, []);

	useEffect(() => {
		reload();
	}, []);

	const reload = () => {
		let t =
			JSON.parse(
				localStorage.getItem(Constants.LOCALSTORAGE_CUSTOMER_KEY)
			) || false;
		if (!t) return;

		fetch(`http://localhost:3001/api/appointment/customer/${t.id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" }
		})
			.then(placeHolder => placeHolder.json())
			.then(placeHolder => {
				let temp = [];
				placeHolder.forEach(k => {
					let date = k.appointment_date;
					let hrs = k.appointment_time.split(":")[0];
					let mins = k.appointment_time.split(":")[1];
					let strt = moment(date)
						.startOf("day")
						.add(hrs, "hours")
						.add(mins, "minutes")
						.format("YYYY-MM-DD");

					temp.push({
						id: k.id,
						title: `Appointment #${k.id}`,
						start: strt
					});
				});
				setAppointments(temp);
			});
	};

	const handleBooking = e => {
		e.preventDefault();
		let t =
			JSON.parse(
				localStorage.getItem(Constants.LOCALSTORAGE_CUSTOMER_KEY)
			) || false;
		if (t) {
			fetch("http://localhost:3001/api/appointment/", {
				method: "POST",
				body: JSON.stringify({
					customerId: t.id,
					appointment_date: selectedDate.startOf("day"),
					appointment_time: selectedTime
				}),
				headers: { "Content-Type": "application/json" }
			})
				.then(placeHolder => placeHolder.json())
				.then(placeHolder => {
					if (placeHolder.hasOwnProperty("msg")) {
						alert(placeHolder.msg);
						reload();
					}
				});
		}
	};

	return (
		<Grid container style={{ margin: 20 }}>
			<Grid item xs={12} style={{ padding: 10, textAlign: "center" }}>
				<Typography noWrap variant="h4">
					Scheduling your booking @{" "}
					{moment(selectedDate).format("DD MMM YYYY")} {selectedTime}
				</Typography>
			</Grid>
			<Grid item xs={6} style={{ padding: 10 }}>
				<div style={{ height: 400 }}>
					<FullCalendar
						initialView="dayGridMonth"
						plugins={[dayGridPlugin, interactionPlugin]}
						events={appointments}
						selectable={true}
						dateClick={t => setSelectedDate(moment(t.date))}
					/>
				</div>
			</Grid>
			<Grid item xs={6} style={{ padding: 10 }}>
				<div style={{ textAlign: "center" }}>
					<TimePicker
						onChange={setSelectedTime}
						value={selectedTime}
						format={"HH:mm"}
						style={{ margin: 50 }}
						hour12Format={false}
					/>
				</div>
				<br />
				<Button
					variant="contained"
					style={{ display: "block", margin: "0 auto" }}
					onClick={handleBooking}
				>
					Schedule Now!
				</Button>
			</Grid>
		</Grid>
	);
}

export default Scheduler;
