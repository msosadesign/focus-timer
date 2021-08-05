import React from "react";

class Settings extends React.Component {
    render() {
        return (
            <div className="settings">
                <h1 className="body">Settings</h1>
                <form>

                    <fieldset className="time-selectors">
                        <div>
                            <p className="caption">Focus Time:</p>
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
                            <p className="caption">Break Time:</p>
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
                            <label htmlFor="radio-focus" className="body">Focus Timer</label><br />
                        </div>
                        <div className="radio-button">
                            <input type="radio" id="radio-pomodoro" name="timer-type" value="pomodoro" />
                            <label htmlFor="radio-pomodoro" className="body">Pomodoro Timer</label>
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