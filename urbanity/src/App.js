import logo from './logo.svg';
import './App.css';
import Maper from './components/Map';
import Navbar from './components/Nav';
import { Beak,AssistantWindow } from "@beakjs/react";

function App() {
  return (
    <div>
      <Beak
    __unsafeOpenAIApiKey__="."
    instructions="Assistant is running in a web app and helps the user with XYZ."
  >
      <Navbar/>
    <Maper/>
    <AssistantWindow />
  </Beak>
 
    </div>
  );
}

export default App;
