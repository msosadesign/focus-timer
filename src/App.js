import './scss/styles.scss';
import { IconContext } from 'react-icons/lib';

// import Timer from './components/timer'
import LandingPage from './components/landing';
// import Settings from './components/settings'

function App() {
  return (


    <IconContext.Provider value={{ size:"20px" }}>
      <main>

        {/* <Timer /> */}
        <LandingPage />
        {/* <Settings /> */}
      </main>
    </IconContext.Provider>
  );
}

export default App;
