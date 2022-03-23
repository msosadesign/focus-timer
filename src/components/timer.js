import { useState, useEffect } from "react";
import logo from '../logo.svg';
import { BsPlayFill, BsFillPauseFill } from "react-icons/bs";


export default function Timer() {
    const [seconds, setSeconds] = useState(5);
    const [minutes, setMinutes] = useState(0);
    const [timerOn, setTimerOn] = useState(false);
    const [extraSeconds, setExtraSeconds] = useState(0);
    const [extraMinutes, setExtraMinutes] = useState(0);

    const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
    const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formatExtraSeconds = extraSeconds < 10 ? `0${extraSeconds}` : extraSeconds;
    const formatExtraMinutes = extraMinutes < 10 ? `0${extraMinutes}` : extraMinutes;

    const notifyMe = () => {
        // Let's check if the browser supports notifications
        if (!("Notification" in window)) {
            alert("This browser does not support desktop notification");
        }

        // Let's check whether notification permissions have already been granted
        else if (Notification.permission === "granted") {
            // If it's okay let's create a notification
            let notification = new Notification("Timer finished!");
            // let audio = new Audio('276607__mickleness__ringtone-foofaraw.mp3');
            // audio.play();
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
        let interval = null;
        let extraInterval = null;

        if (timerOn) {
            clearInterval(extraInterval);
            interval = setInterval(() => {
                clearInterval(interval);

                if (extraSeconds === 0) {
                    if (extraMinutes !== 0) {
                        setExtraSeconds(59)
                        setExtraMinutes(extraMinutes - 1)
                    }
                } else {
                    setExtraSeconds(extraSeconds - 1)
                }

                 if (extraMinutes===0 && extraSeconds===0) {
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
                }
            }, 1000);
        } else {
            clearInterval(interval);
            // add code for extra time

            extraInterval = setInterval(() => {
                clearInterval(extraInterval);

                setExtraSeconds(extraSeconds+1)
                if(extraSeconds=== 59) {
                    setExtraSeconds(0);
                    setExtraMinutes(extraMinutes+1);
                }

            }, 1000);
        }

        return () => { 
            clearInterval(interval)
            clearInterval(extraInterval)
         }


    }, [extraMinutes, extraSeconds, minutes, seconds, timerOn]);



    return (
        <div className="timer time">
            <div className="timeCounter">
                <h1 className="h1">{formatMinutes}:{formatSeconds}</h1>
                <span className={`extraTime ${timerOn ? "extraTime-ticking" :"" } ${extraMinutes ===0 && extraSeconds===0 ? "display-none" : "display-inline"}`}>+{formatExtraMinutes}:{formatExtraSeconds}</span>
            </div>
            <img src={logo} className="App-logo progress" alt="logo" /><br></br>

            <div className="quote">
                <q className="subtitle">
                    Do what you can, with what you have, where you are.
                </q>
                <p className="boldBody">– Theodore Roosevelt.</p>

                <button onClick={() => setTimerOn(true)} className={`btn timer-btn ${timerOn ? "display-none" : "display-flex"}`}><BsPlayFill />Start Timer</button>
                <button onClick={() => setTimerOn(false)} className={`btn-outlined-dark timer-btn ${timerOn ? "display-flex" : "display-none"}`}><BsFillPauseFill />Stop Timer</button>
            </div>
        </div>
    );
}