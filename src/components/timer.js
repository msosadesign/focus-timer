import { useState, useEffect } from "react";
import brain from "../icons/brain.svg";
import coffee from "../icons/drink-coffee.svg";
import { BsPlayFill, BsFillPauseFill, BsGearFill } from "react-icons/bs";
import Settings from "./settings";

export default function Timer() {
  const [definedFocusMinutes, setDefinedFocusMinutes] = useState(25);
  const [definedBreakMinutes, setDefinedBreakMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [extraSeconds, setExtraSeconds] = useState(0);
  const [extraMinutes, setExtraMinutes] = useState(0);
  const [settingsVisible, setSettingsVisibility] = useState(false);
  const [timerStatus, setTimerStatus] = useState("notStarted"); // standbyFocus, activeFocus, activeBreak, paused, standbyBreak
  const [quote, setQuote] = useState(
    "Do what you can, with what you have, where you are"
  );
  const [quoteAuthor, setQuoteAuthor] = useState("Theodore Roosevelt");

  const formatNumber = (number) => {
    if (number < 10) {
      return `0${number}`;
    } else {
      return number;
    }
  };

  const formatSeconds = formatNumber(seconds);
  const formatMinutes = formatNumber(minutes);
  const formatExtraMinutes = formatNumber(extraMinutes);
  const formatExtraSeconds = formatNumber(extraSeconds);
  const focusFinished =
    minutes === 0 &&
    seconds === 0 &&
    extraMinutes === 0 &&
    extraSeconds === 0 &&
    timerStatus === "activeFocus";
  const breakFinished =
    minutes === 0 &&
    seconds === 0 &&
    extraMinutes === 0 &&
    extraSeconds === 0 &&
    timerStatus === "activeBreak";

  const notifyMe = (message) => {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }

    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      new Notification(message);
      // let audio = new Audio('276607__mickleness__ringtone-foofaraw.mp3');
      // audio.play();
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          new Notification(message);
        }
      });
    }

    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  };

  useEffect(() => {
    if (Notification.permission === "default") {
      notifyMe("This is how you will be notified");
    }

    if (localStorage.getItem("definedFocusMinutes")) {
      setDefinedFocusMinutes(+localStorage.getItem("definedFocusMinutes"));
    } else {
      setDefinedFocusMinutes(25);
    }

    if (localStorage.getItem("definedBreakMinutes")) {
      setDefinedBreakMinutes(+localStorage.getItem("definedBreakMinutes"));
    } else {
      setDefinedBreakMinutes(5);
    }

    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const i = Math.floor(Math.random() * data.length);
        setQuote(data[i].text);
        setQuoteAuthor(data[i].author)
        console.log(data);
      });
  }, []);

  useEffect(() => {
    let interval = null;
    let extraInterval = null;

    if (timerStatus === "activeFocus" || timerStatus === "activeBreak") {
      clearInterval(extraInterval);
      interval = setInterval(() => {
        clearInterval(interval);

        if (extraSeconds === 0) {
          if (extraMinutes !== 0) {
            setExtraSeconds(59);
            setExtraMinutes(extraMinutes - 1);
          }
        } else {
          setExtraSeconds(extraSeconds - 1);
        }

        if (extraMinutes === 0 && extraSeconds === 0) {
          if (seconds === 0) {
            if (minutes !== 0) {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          } else {
            setSeconds(seconds - 1);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);

      if (timerStatus === "paused") {
        extraInterval = setInterval(() => {
          clearInterval(extraInterval);

          setExtraSeconds(extraSeconds + 1);
          if (extraSeconds === 59) {
            setExtraSeconds(0);
            setExtraMinutes(extraMinutes + 1);
          }
        }, 1000);
      }
    }

    if (focusFinished) {
      setTimerStatus("standbyFocus");
      notifyMe("Work finished!");
    }
    if (breakFinished) {
      setTimerStatus("standbyBreak");
      notifyMe("Break finished!");
    }

    return () => {
      clearInterval(interval);
      clearInterval(extraInterval);
    };
  }, [
    extraMinutes,
    extraSeconds,
    minutes,
    seconds,
    focusFinished,
    timerStatus,
    breakFinished,
  ]);

  useEffect(() => {
    if (timerStatus === "standbyFocus") {
      setMinutes(definedBreakMinutes);
    } else if (timerStatus === "standbyBreak" || timerStatus === "notStarted") {
      setMinutes(definedFocusMinutes);
    }

    localStorage.setItem("definedFocusMinutes", definedFocusMinutes);
    localStorage.setItem("definedBreakMinutes", definedBreakMinutes);
  }, [timerStatus, definedBreakMinutes, definedFocusMinutes]);

  return (
    <div
      className={`main-div${
        timerStatus === "standbyFocus" ? " standby-focus-bg" : ""
      } ${timerStatus === "activeBreak" ? " active-break-bg" : ""}`}
      onClick={() => {
        setSettingsVisibility(false);
      }}
    >
      <div
        className={`timer time ${
          timerStatus === "activeBreak"
            ? "color-darkSurface"
            : "color-lightSurface"
        }`}
      >
        <div className="timeCounter">
          <h1 className="h1">
            {formatMinutes}:{formatSeconds}
          </h1>
          <span
            className={`extraTime ${
              timerStatus === "activeFocus" ? "extraTime-ticking" : ""
            } ${
              extraMinutes === 0 && extraSeconds === 0
                ? "display-none"
                : "display-inline"
            }`}
          >
            +{formatExtraMinutes}:{formatExtraSeconds}
          </span>
        </div>
        <img
          src={brain}
          className={`main-image progress ${
            timerStatus === "standbyBreak" ||
            timerStatus === "activeFocus" ||
            timerStatus === "notStarted" ||
            timerStatus === "paused" ||
            timerStatus === "standbyFocus"
              ? " display-block"
              : "display-none"
          }`}
          alt="logo"
        />
        <img
          src={coffee}
          className={`main-image progress ${
            timerStatus === "activeBreak" ? " display-block" : "display-none"
          }`}
          alt="logo"
        />
        <br></br>

        <div className="quote">
          <q className="subtitle">{`${quote}.`}</q>
          <p className="boldBody">{`– ${quoteAuthor}.`}</p>
          <button
            onClick={() => {
              setMinutes(definedBreakMinutes);
              setTimerStatus("activeBreak");
            }}
            className={`btn timer-btn ${
              timerStatus === "standbyFocus"
                ? "display-flex background-color-darkSurface"
                : "display-none"
            }`}
          >
            <BsPlayFill className="btn-icon" />
            Start Break
          </button>
          <button
            onClick={() => setTimerStatus("activeFocus")}
            className={`btn timer-btn ${
              timerStatus === "notStarted" ? "display-flex" : "display-none"
            }`}
          >
            <BsPlayFill className="btn-icon" />
            Start timer
          </button>
          <button
            onClick={() => {
              setMinutes(definedFocusMinutes);
              setTimerStatus("activeFocus");
            }}
            className={`btn timer-btn ${
              timerStatus === "standbyBreak" ? "display-flex" : "display-none"
            }`}
          >
            <BsPlayFill className="btn-icon" />
            Start timer
          </button>
          <button
            onClick={() => setTimerStatus("activeFocus")}
            className={`btn timer-btn ${
              timerStatus === "paused" ? "display-flex" : "display-none"
            }`}
          >
            <BsPlayFill className="btn-icon" />
            Resume
          </button>
          <button
            onClick={() => setTimerStatus("paused")}
            className={`btn-outlined-dark timer-btn ${
              timerStatus === "activeFocus" ? "display-flex" : "display-none"
            }`}
          >
            <BsFillPauseFill className="btn-icon" />
            Pause
          </button>
        </div>
        <div>
          <Settings
            timerStatus={timerStatus}
            settingsVisible={settingsVisible}
            setMinutes={setMinutes}
            setDefinedFocusMinutes={setDefinedFocusMinutes}
            definedFocusMinutes={definedFocusMinutes}
            setDefinedBreakMinutes={setDefinedBreakMinutes}
            definedBreakMinutes={definedBreakMinutes}
            toggleSettingsVisibility={() => {
              setSettingsVisibility(false);
            }}
          />
        </div>
        <BsGearFill
          onClick={(e) => {
            e.stopPropagation();
            setSettingsVisibility(!settingsVisible);
          }}
          className="settings-icon"
        />
        <br></br>
      </div>
    </div>
  );
}
