import React from "react";
import { BsPauseFill, BsPlayFill, BsGearFill } from "react-icons/bs";
import Settings from './settings'
import Timer from './timer'

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            settingsVisible: false,
            timerVisible: false
        };
        this.toggleSettingsVisibility = this.toggleSettingsVisibility.bind(this)
    }
    toggleSettingsVisibility = () => {this.setState({ settingsVisible: !this.state.settingsVisible })};
    toggleTimerVisibility = () => {this.setState({ timerVisible: !this.state.timerVisible })};

    render() {
        return (
            <div className="landing">
                <div className={`timer-bg ${this.state.timerVisible ? "display-flex" : "display-none"}`}><Timer /></div>
                <div className={`settings-container ${this.state.settingsVisible ? "display-flex" : "display-none"}`}>
                    <Settings toggleSettingsVisibility={this.toggleSettingsVisibility} />
                </div>
                <BsGearFill onClick={this.toggleSettingsVisibility} className="settings-icon" /><br></br>
                <h1 className="h2">Focus Timer</h1>
                <p className="subtitle">A timer designed to keep you focused on what matters to you</p>
                <div className="landing-fabs">
                    <button className="fab-secondary"><BsPauseFill className="btn-icon" />Start Pause (15min)</button>
                    <button onClick={this.toggleTimerVisibility} className="fab"><BsPlayFill className="btn-icon" />Start Focus (1hr)</button>
                </div>
            </div>
        )
    }
}

export default LandingPage;