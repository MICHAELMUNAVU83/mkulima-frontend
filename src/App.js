import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Farmer/Home";
import SupplierHome from "./pages/Supplier/SupplierHome";
import AddSuppliedInput from "./pages/Supplier/AddSuppliedInput";
import SupplierNavBar from "./components/Navbars/SupplierNavBar";
import Login from "../src/pages/Login";
import SignUp from "../src/pages/SignUp";
import SplashScreen from "../src/pages/SplashScreen";
import SelectCrop from "./pages/Farmer/SelectCrop";
import FarmerNavBar from "./components/Navbars/FarmerNavBar";
import MySupplies from "./pages/Supplier/MySupplies";
import MySelectedCrops from "./pages/Farmer/MySelectedCrops";
import EachOfMySelectedCrop from "./pages/Farmer/EachOfMySelectedCrop";
import AddProductsForSale from "./pages/Farmer/AddProductsForSale";
import MySoldProducts from "./pages/Farmer/MySoldProducts";
import ProduceBuyerHome from "./pages/ProduceBuyer/ProduceBuyerHome";
import AllProducts from "./pages/ProduceBuyer/AllProducts";
import ProduceBuyerNavbar from "./components/Navbars/ProduceBuyerNavbar";
import AddAnimalFeeds from "./pages/Farmer/AddAnimalFeeds";
import MyAnimalFeeds from "./pages/Farmer/MyAnimalFeeds";
import AllAnimalFeeds from "./pages/AnimalFeedsBuyer/AllAnimalFeeds";
import AnimalFeedsBuyerHome from "./pages/AnimalFeedsBuyer/AnimalFeedsBuyerHome";
import AnimalFeedsBuyerNavBar from "./components/Navbars/AnimalFeedsBuyerNavBar";
import InputsForCrop from "./pages/Farmer/InputsForCrop";
import InputsForManagement from "./pages/Farmer/InputsForManagement";
import AdminHome from "./pages/AdminDashboard/AdminHome";
import AdminNavBar from "./components/Navbars/AdminNavBar";
import Approve from "./pages/AdminDashboard/Approve";
import CommunityPage from "./pages/Farmer/CommunityPage";
import EachCommunity from "./pages/Farmer/EachCommunity";
import AskQuestion from "./pages/Farmer/AskQuestion";
function App() {
  const [loggedInUserRole, setLoggedInUserRole] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const [storedToken, setStoredToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    fetch("http://127.0.0.1:3000/api/v1/profile ", {
      method: "GET",
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoggedInUserRole(data.user.role);
        setLoggedInUserId(data.user.id);
      });
  }, [storedToken]);

  return (
    <div>
      <Router>
        {storedToken && (
          <>
            {loggedInUserRole === "farmer" && (
              <FarmerNavBar setStoredToken={setStoredToken} />
            )}
            {loggedInUserRole === "supplier" && (
              <SupplierNavBar setStoredToken={setStoredToken} />
            )}
            {loggedInUserRole === "produce_buyer" && (
              <ProduceBuyerNavbar setStoredToken={setStoredToken} />
            )}
            {loggedInUserRole === "animal_feeds_buyer" && (
              <AnimalFeedsBuyerNavBar setStoredToken={setStoredToken} />
            )}
            {loggedInUserRole === "admin" && (
              <AdminNavBar setStoredToken={setStoredToken} />
            )}
          </>
        )}
        <Routes>
          {storedToken ? (
            <>
              {loggedInUserRole === "farmer" && (
                <Route
                  path="/"
                  element={<Home setStoredToken={setStoredToken} />}
                />
              )}
              {loggedInUserRole === "supplier" && (
                <Route
                  path="/"
                  element={<SupplierHome setStoredToken={setStoredToken} />}
                />
              )}
              {loggedInUserRole === "produce_buyer" && (
                <Route
                  path="/"
                  element={<ProduceBuyerHome setStoredToken={setStoredToken} />}
                />
              )}
              {loggedInUserRole === "animal_feeds_buyer" && (
                <Route
                  path="/"
                  element={
                    <AnimalFeedsBuyerHome loggedInUserId={loggedInUserId} />
                  }
                />
              )}
              {loggedInUserRole === "admin" && (
                <Route
                  path="/"
                  element={<AdminHome loggedInUserId={loggedInUserId} />}
                />
              )}
              <Route
                path="/SelectCrop"
                element={
                  <SelectCrop
                    setStoredToken={setStoredToken}
                    loggedInUserId={loggedInUserId}
                  />
                }
              />
              <Route
                path="/AskQuestion"
                element={<AskQuestion loggedInUserId={loggedInUserId} />}
              />

              <Route
                path="/MySelectedCrops"
                element={<MySelectedCrops loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/CommunityPage"
                element={<CommunityPage loggedInUserId={loggedInUserId} />}
              />

              <Route
                path="/EachOfMySelectedCrop/:id"
                element={<EachOfMySelectedCrop />}
              />
              <Route
                path="/AddAnimalFeeds"
                element={<AddAnimalFeeds loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/MySupplies"
                element={<MySupplies loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/MySoldProducts"
                element={<MySoldProducts loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/MyAnimalFeeds"
                element={<MyAnimalFeeds loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/Approve"
                element={<Approve loggedInUserId={loggedInUserId} />}
              />
              <Route path="/InputsForCrop/:name" element={<InputsForCrop />} />
              <Route
                path="/InputsForManagement/:name"
                element={<InputsForManagement />}
              />
              <Route
                path="/EachCommunity/:id"
                element={<EachCommunity loggedInUserId={loggedInUserId} />}
              />

              <Route
                path="/AllAnimalFeeds"
                element={<AllAnimalFeeds loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/AddSuppliedInput"
                element={<AddSuppliedInput loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/AddProductsForSale"
                element={<AddProductsForSale loggedInUserId={loggedInUserId} />}
              />
              <Route
                path="/AllProducts"
                element={<AllProducts loggedInUserId={loggedInUserId} />}
              />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={<SplashScreen setStoredToken={setStoredToken} />}
              />

              <Route
                path="/signup"
                element={<SignUp setStoredToken={setStoredToken} />}
              />
              <Route
                path="/login"
                element={<Login setStoredToken={setStoredToken} />}
              />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
