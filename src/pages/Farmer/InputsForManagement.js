import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BudPayCheckout from "../BudPayScript.js";

const InputsForManagement = () => {
  const { name } = useParams();
  const [suggested_inputs, setSuggestedInputs] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedInput, setSelectedInput] = useState({});
  const [totalKgs, SetTotalKgs] = useState(1);
  const [totalPrice, SetTotalPrice] = useState(0);

  useEffect(() => {
    SetTotalPrice(Number(totalKgs) * Number(selectedInput.price_per_kg));
  }, [totalKgs, selectedInput]);

  function payWithBudPay(e) {
    e.preventDefault();
    BudPayCheckout({
      key: "pk_live_0syy9e7bnjeduyf1wzct57rzyndbphtduo6bop", // Replace with your public key
      email: "michaelmunavu83@gmail.com",
      amount: String(totalPrice),
      first_name: "Michael",
      last_name: "Munavu",
      currency: "KES", // Use GHS for Ghana Cedis or USD for US Dollars
      reference:
        "" +
        Math.floor(Math.random() * 100000000000 + 1) +
        new Date().getSeconds() +
        new Date().getMilliseconds(), // generates a pseudo-unique reference. Please replace with a reference you generated. or remove the line entirely so our API will generate one for you
      callback: function (response) {
        //this happens after the payment is completed successfully
        var reference = response.reference;
        alert(
          "Payment complete! Reference: " +
            reference +
            ", Status: " +
            response.status
        );
      },
      onClose: function (response) {
        console.log(response);
        alert("Transaction was not completed, window closed.");
      },
    });
  }

  useEffect(() => {
    fetch("http://127.0.0.1:3000/input_supplies")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSuggestedInputs(data);
      });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const displaySuggestedInputs =
    suggested_inputs &&
    name &&
    suggested_inputs.map(
      (input) =>
        input.approved === true &&
        input.type_of_supply === "management_inputs" &&
        input.crop_for === name && (
          <div className="flex flex-col rounded-3xl  gap-4 w-[400px] bg-[#f9f9f9]">
            <img
              src={input.product_image}
              alt="tomatoes"
              className="w-[400px] h-[300px] rounded-t-3xl object-cover"
            />
            <div className="p-2 flex flex-col gap-2">
              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000] font-bold ">{input.name}</p>
              </div>

              <div className="flex justify-start flex-col  mx-8">
                <p className="font-bold text-gray-500 ">{input.description}</p>
              </div>
              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000]">Price</p>
                <p className="bg-[#3B841F] gap-2 px-4 py-2 rounded-xl text-white ">
                  {input.price_per_kg} per kg
                </p>
              </div>
              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000]">Location</p>
                <p className="bg-[#3B841F] gap-2 px-4 py-2 rounded-xl text-white ">
                  {input.location}
                </p>
              </div>

              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000]">Contact</p>
                <p className="bg-[#3B841F] gap-2 px-4 py-2 rounded-xl text-white ">
                  {input.contact}
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                className="bg-gray-100 gap-2 px-6 py-4 rounded-xl font-bold text-[#3B841F] my-2 justify-center place-content-center flex text-md"
                onClick={(e) => {
                  setShowOrderModal(true);
                  setSelectedInput(input);
                  SetTotalPrice(input.price_per_kg);
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        )
    );
  return (
    <div className="pt-24">
      {showOrderModal && (
        <div className="fixed kulim-park bg-white shadow-xl h-[700px] my-auto w-[900px] inset-0 bg-opacity z-10 flex flex-col items-center justify-center w-[400px]  mx-auto">
          <div className="flex justify-end w-full p-4">
            <button
              className="bg-[#3B841F] text-white px-4 py-2 rounded-lg"
              onClick={() => {
                setShowOrderModal(false);
                SetTotalKgs(1);
                SetTotalPrice(0);
              }}
            >
              X
            </button>
          </div>
          <div className="flex flex-row justify-center rounded-3xl  gap-4 w-[400px] ">
            <img
              src={selectedInput.product_image}
              alt="tomatoes"
              className="w-[400px] h-[300px] rounded-t-3xl object-cover"
            />
            <div className="p-2  flex flex-col gap-2">
              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000] font-bold ">
                  {selectedInput.name}
                </p>
              </div>

              <div className="flex justify-between w-[300px] mx-8">
                <p className="text-xl text-[#000]">Price</p>
                <p className="bg-[#3B841F] gap-2 px-4 py-2 rounded-xl text-white ">
                  {selectedInput.price_per_kg} per kg
                </p>
              </div>
              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000]">Location</p>
                <p className="bg-[#3B841F] gap-2 px-4 py-2 rounded-xl text-white ">
                  {selectedInput.location}
                </p>
              </div>

              <div className="flex justify-between mx-8">
                <p className="text-xl text-[#000]">Contact</p>
                <p className="bg-[#3B841F] gap-2 px-4 py-2 rounded-xl text-white ">
                  {selectedInput.contact}
                </p>
              </div>
              <p className="w-[300px] mx-auto">
                Select the number of kgs you want to Buy
              </p>
              <select
                className="w-[300px] h-[50px] focus:outline-none border border-2 rounded-2xl mx-auto"
                onChange={(e) => {
                  SetTotalKgs(Number(e.target.value));
                }}
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </select>

              <p className="w-[300px] mx-auto text-center">
                Total price is {totalPrice}ksh for {totalKgs} kgs
              </p>

              <div className="flex justify-center">
                <button
                  className="bg-gray-100 gap-2 px-6 py-4 rounded-xl font-bold text-[#3B841F] my-2 justify-center place-content-center flex text-md"
                  onClick={(e) => {
                    payWithBudPay(e);
                    setShowOrderModal(false);
                  }}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-[#3B841F] text-center font-bold text-5xl">
        Management Inputs for {name}
      </h1>

      <p className="edunswact text-center text-xl text-xl">
        Here are some suggested inputs for {name} that you can buy from our
        local input suppliers.
      </p>
      <div className="flex justify-center flex-wrap my-4 gap-12">
        {displaySuggestedInputs}
      </div>
    </div>
  );
};

export default InputsForManagement;
