import { useState, useEffect } from "react";
import logo from '../logo.svg';
import { BsPlayFill } from "react-icons/bs";


export default function Timer() {
    const [seconds, setSeconds] = useState(5);
    const [minutes, setMinutes] = useState(25);

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                } else {
                    alert("Timer finished!")
                }
            } else {
                setSeconds(seconds - 1)
            }
        }, 1000);

    }, [seconds, minutes]);

    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return (
        <div className="timer time">
            <div className="timeCounter">
                <h1 className="h1">{formatMinutes}:{formatSeconds}</h1>
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
    );
}

// export default Timer;