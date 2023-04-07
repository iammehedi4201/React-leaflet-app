import logo from "./logo.svg";
import "./App.css";
import Maps from "./Components/Maps/Maps";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
     
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
}

export default App;
