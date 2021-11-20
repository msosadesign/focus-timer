import React from "react";
import { BsPauseFill, BsPlayFill, BsGearFill } from "react-icons/bs";

class LandingPage extends React.Component {
    render() {
        return (
            <div className="landing">
                <BsGearFill className="settings-icon" /><br></br>
                <h1 className="h2">Focus Timer</h1>
                <p className="subtitle">A timer designed to keep you focused on what matters to you</p>
                <div className="landing-fabs">
                    <button className="fab-secondary"><BsPauseFill className="btn-icon" />Start Pause (15min)</button>
                    <button className="fab"><BsPlayFill className="btn-icon" />Start Focus (1hr)</button>
                </div>
            </div>
        )
    }
}

export default LandingPage;