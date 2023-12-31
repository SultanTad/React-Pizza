//Import React Engine
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

//Import Styles
import "./scss/app.scss";

//Import Components
import Header from "./components/Header";

//Import Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";



function App() {
  const [searchValue, setSearchValue] = useState("")
  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue}/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
