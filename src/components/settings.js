import React from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";

class Settings extends React.Component {
  render() {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className={`settings ${
          this.props.settingsVisible ? "display-flex" : "display-none"
        }`}
      >
        <form>
          <fieldset className="time-selectors">
            <div>
              <div className="title-w-icon">
                <BsPlayFill />
                <p className="caption">Focus Time:</p>
              </div>
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
                  min="1"
                  onInput={(e) => {
                    e.target.value = Math.floor(e.target.value);
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
              <label className="caption" htmlFor="break-min">
                Minutes
                <br />
                <input
                  disabled={this.props.timerStatus === "activeBreak"}
                  id="break-min"
                  className="time-field"
                  type="number"
                  name="break-mm"
                  min="1"
                  placeholder="00"
                  value={this.props.definedBreakMinutes}
                  onInput={(e) => {
                    e.target.value = Math.floor(e.target.value);
                    this.props.setDefinedBreakMinutes(+e.target.value);
                    if (this.props.timerStatus === "standbyFocus") {
                      this.props.setMinutes(+e.target.value);
                    }
                  }}
                />
              </label>
            </div>
          </fieldset>

          <div className="dialog-buttons"></div>
        </form>
      </div>
    );
  }
}

export default Settings;
