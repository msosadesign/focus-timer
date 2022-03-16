import './scss/styles.scss';
import React from "react";
import { IconContext } from 'react-icons/lib';

// import Timer from './components/timer'
import LandingPage from './components/landing';
// import Settings from './components/settings'

class App extends React.Component {
  render() {
    return (
      <IconContext.Provider value={{ size: "20px" }}>
        <main>
          {/* <Timer /> */}
          <LandingPage />
          {/* <Settings /> */}
        </main>
      </IconContext.Provider>
    )
  }
}

export default App;
