import React from 'react'
import { PopupModal } from "react-calendly";
import Button from '@mui/material/Button';

class Scheduler extends React.Component {
  constructor(props) { 
    super(props);

    this.state = {
      isOpen: false,
    };
  }

  render() {
    return (
      <div>
        <Button variant="contained" style={{ display: "block", margin: "0 auto" }} onClick={() => this.setState({ isOpen: true})}>Schedule Now!</Button>
        <PopupModal
          url="https://calendly.com/thenoahac/barber-appointment"
          pageSettings={this.props.pageSettings}
          utm={this.props.utm}
          prefill={this.props.prefill}
          onModalClose={() => this.setState({ isOpen: false })}
          open={this.state.isOpen}
          rootElement={document.getElementById("root")}
        />
      </div>
    );
  }
}

export default Scheduler;