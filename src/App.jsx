import './App.scss';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/main/main";
import NavBar from "./pages/navBar/navBar";
import ProductsCont from "./pages/productsCont/productsCont";
import Loading from "./pages/loading/loading";
import {useCartContext} from "./cartContext";

function App() {
    const {loading} = useCartContext()
  return (
    <div className="App">
        <NavBar/>

        {loading && <Loading/>}

      <Routes>
        <Route path="/" element={<Main/>} />
          <Route path="/products" element={<ProductsCont/>}/>
      </Routes>
    </div>
  );
}

export default App;
