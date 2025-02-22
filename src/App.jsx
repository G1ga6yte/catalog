import './App.scss';
import {Route, Routes} from "react-router-dom";
import Main from "./pages/main/main";
import NavBar from "./pages/navBar/navBar";
import ProductsCont from "./pages/productsCont/productsCont";
import Loading from "./pages/loading/loading";
import {useCartContext} from "./cartContext";
import ProductPage from "./pages/productPage/productPage";
import Favorites from "./pages/favorites/favorites";
import LoginCont from "./pages/loginCont/loginCont";
import History from "./pages/history/history";

function App() {
    const {loading, authenticated, loginCont} = useCartContext()
  return (
    <div className="App">
        <NavBar/>

        {loginCont && <LoginCont/>}


        {loading && <Loading/>}

      <Routes>
        <Route path="/" element={<Main/>} />
          <Route path="/products" element={<ProductsCont/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
          <Route path="/favorites" element={<Favorites/>}/>
          <Route path="/history" element={<History/>}/>
      </Routes>
    </div>
  );
}

export default App;
