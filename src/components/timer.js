import { Component } from "react";
import logo from '../logo.svg';
import { BsPlayFill } from "react-icons/bs";

class Timer extends Component {
    render() {
        return (
            <div className="timer time">
                <div className="timeCounter">
                    <h1 className="h1">24:30</h1>
                    <span className="extraTime">+12:24</span>
                </div>
                <img src={logo} className="App-logo progress" alt="logo" /><br></br>

                <div className="quote">
                    <q className="subtitle">
                        Do what you can, with what you have, where you are.
                    </q>
                    <p className="boldBody">– Theodore Roosevelt.</p>

                    <button className="btn timer-btn"><BsPlayFill />Start Timer</button>
                </div>
            </div>
        )
    }
}

export default Timer;