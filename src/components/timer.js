import { useState, useEffect } from "react";
import logo from '../logo.svg';
import { BsPlayFill } from "react-icons/bs";


export default function Timer() {
    const [seconds, setSeconds] = useState(5);
    const [minutes, setMinutes] = useState(0);

    const notifyMe = () => {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            let notification = new Notification("Timer finished!");
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== "denied") {
            Notification.requestPermission().then(function (permission) {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                    let notification = new Notification("Timer finished!");
                }
            });
        }

        // At last, if the user has denied notifications, and you
        // want to be respectful there is no need to bother them any more.
    }

    useEffect(() => {
        let interval = setInterval(() => {
            clearInterval(interval);

            if (seconds === 0) {
                if (minutes !== 0) {
                    setSeconds(59)
                    setMinutes(minutes - 1)
                } else {
                    notifyMe();
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