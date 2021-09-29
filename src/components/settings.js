import React from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <h1 className="subtitle">Settings</h1>
                <form>

                    <fieldset className="time-selectors">
                        <div>
                            <div className="title-w-icon">
                                <BsPlayFill />
                                <p className="caption">Focus Time:</p>
                            </div>
                            <label className="caption" htmlFor="focus-hour">HH
                                <br />
                                <input id="focus-hour" className="time-field" type="number" name="focus-hh" placeholder="00" />
                            </label>
                            <span className="time-divider">:</span>
                            <label className="caption" htmlFor="focus-min">MM
                                <br />
                                <input id="focus-min" className="time-field" type="number" name="focus-mm" placeholder="00" />
                            </label>
                        </div>

                        <div className="vertical-divider"></div>

                        <div>
                            <div className="title-w-icon">
                            <BsPauseFill />
                                <p className="caption">Break Time:</p>
                            </div>
                            <label className="caption" htmlFor="break-hour">HH
                                <br />
                                <input id="break-hour" className="time-field" type="number" name="break-hh" placeholder="00" />
                            </label>
                            <span className="time-divider">:</span>
                            <label className="caption" htmlFor="break-min">MM
                                <br />
                                <input id="break-min" className="time-field" type="number" name="break-mm" placeholder="00" />
                            </label>
                        </div>
                    </fieldset>

                    <fieldset>
                        <p className="caption">Timer type:</p>
                        <div className="radio-button">
                            <input type="radio" id="radio-focus" name="timer-type" value="focus" />
                            <label htmlFor="radio-focus" className="body radio-label">Focus Timer</label><br />
                        </div>
                        <div className="radio-button">
                            <input type="radio" id="radio-pomodoro" name="timer-type" value="pomodoro" />
                            <label htmlFor="radio-pomodoro" className="body radio-label">Pomodoro Timer</label>
                        </div>
                    </fieldset>

                    <div className="dialog-buttons">
                        <button className="btn-text">Cancel</button>
                        <input className="btn-text" type="submit" value="Save" />
                    </div>
                </form>
            </div>
        )
    }
}


export default Settings;