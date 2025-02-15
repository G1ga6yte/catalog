import './App.scss';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/main/main";
import NavBar from "./pages/navBar/navBar";

function App() {

  return (
    <div className="App">
        <NavBar/>

      <Routes>
        <Route path="/" element={<Main/>} />
      </Routes>
    </div>
  );
}

export default App;
