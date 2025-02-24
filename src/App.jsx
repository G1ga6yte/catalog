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
import {useEffect} from "react";
import {InterProducts} from "./products/inter";
import {MasterProducts} from "./products/master";

function App() {
    const {loading, loginCont} = useCartContext()


    useEffect(() => {
        let favorites = localStorage.getItem("favorites");
        let newFavorites = [];

        if (favorites) {
            newFavorites = JSON.parse(favorites);

            newFavorites.forEach(fav => { // Changed from map() to forEach()

                if (fav.type) {
                    let item;

                    if (fav.type === "Inter") {
                        item = InterProducts.find(el => el.productCode === fav.productCode); // Using find() instead of some()
                    } else if (fav.type === "Master") {
                        item = MasterProducts.find(el => el.productCode === fav.productCode); // Using find() instead of some()
                    }

                    if (item) {
                        if (item.newPrice) {
                            fav.price = item.newPrice; // Directly modifying fav object
                        } else {
                            fav.price = item.price;
                        }
                    }
                }
            });
        }

        localStorage.setItem("favorites", JSON.stringify(newFavorites)); // Save the updated array to localStorage


    }, []);

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
