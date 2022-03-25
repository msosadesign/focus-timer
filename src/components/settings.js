import React from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

class Settings extends React.Component {
  render() {
    return (
      <div
        className={`settings ${
          this.props.settingsVisible ? "display-flex" : "display-none"
        }`}
      >
        {/* <h1 className="subtitle">Settings</h1> */}
        <form>
          <fieldset className="time-selectors">
            <div>
              <div className="title-w-icon">
                <BsPlayFill />
                <p className="caption">Focus Time:</p>
              </div>
              {/* <label className="caption" htmlFor="focus-hour">
                HH
                <br />
                <input
                  disabled={this.props.timerStatus === "activeFocus"}
                  id="focus-hour"
                  className="time-field"
                  type="number"
                  name="focus-hh"
                  placeholder="00"
                  // onInput={(e) =>
                  //   this.props.setDefinedFocusMinutes(+e.target.value * 60)
                  // }
                />
              </label>
              <span className="time-divider">:</span> */}
              <label className="caption" htmlFor="focus-min">
                Minutes
                <br />
                <input
                  disabled={
                    this.props.timerStatus === "activeFocus" ||
                    this.props.timerStatus === "paused"
                  }
                  id="focus-min"
                  className="time-field"
                  type="number"
                  name="focus-mm"
                  placeholder="00"
                  value={this.props.definedFocusMinutes}
                  onInput={(e) => {
                    this.props.setDefinedFocusMinutes(+e.target.value);
                    if (
                      this.props.timerStatus === "standbyBreak" ||
                      this.props.timerStatus === "notStarted"
                    ) {
                      this.props.setMinutes(+e.target.value);
                    }
                  }}
                />
              </label>
            </div>

            <div className="vertical-divider"></div>

            <div>
              <div className="title-w-icon">
                <BsPauseFill />
                <p className="caption">Break Time:</p>
              </div>
              {/* <label className="caption" htmlFor="break-hour">
                HH
                <br />
                <input
                  disabled={this.props.timerStatus === "activeBreak"}
                  id="break-hour"
                  className="time-field"
                  type="number"
                  name="break-hh"
                  placeholder={"00"}
                />
              </label>
              <span className="time-divider">:</span> */}
              <label className="caption" htmlFor="break-min">
                Minutes
                <br />
                <input
                  disabled={this.props.timerStatus === "activeBreak"}
                  id="break-min"
                  className="time-field"
                  type="number"
                  name="break-mm"
                  placeholder="00"
                  value={this.props.definedBreakMinutes}
                  onInput={(e) => {
                    this.props.setDefinedBreakMinutes(+e.target.value);
                    if (this.props.timerStatus === "standbyFocus") {
                      this.props.setMinutes(+e.target.value);
                    }
                  }}
                />
              </label>
            </div>
          </fieldset>

          {/* <fieldset>
            <p className="caption">Timer type:</p>
            <div className="radio-button">
              <input
                type="radio"
                id="radio-focus"
                name="timer-type"
                value="focus"
              />
              <label htmlFor="radio-focus" className="body radio-label">
                Focus Timer
              </label>
              <br />
            </div>
            <div className="radio-button">
              <input
                type="radio"
                id="radio-pomodoro"
                name="timer-type"
                value="pomodoro"
              />
              <label htmlFor="radio-pomodoro" className="body radio-label">
                Pomodoro Timer
              </label>
            </div>
          </fieldset> */}

          <div className="dialog-buttons">
            {/* <button
              onClick={this.props.toggleSettingsVisibility}
              type="button"
              className="btn-text"
            >
              Close
            </button> */}
          </div>
        </form>
      </div>
    );
  }
}

export default Settings;
