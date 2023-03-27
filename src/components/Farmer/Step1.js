import React from "react";
import step1 from "../images/step1.png";
import arrow from "../images/arrow.png";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
const Step1 = () => {
  return (
    <div className="flex justify-center gap-12">
      <div className="w-1/2 text-center flex justify-center flex-col">
        <h1 className="text-[#3B841F] text-5xl my-4">Step 1 : Plan</h1>

        <p className="my-4 w-[80%] mx-auto flex gap-2">
          <IoMdCheckmarkCircle className="text-[#7DD959] text-2xl" />
          <p>Select Your Location</p>
        </p>
        <p className="my-4 w-[80%] mx-auto flex gap-2">
          <IoMdCheckmarkCircle className="text-[#7DD959] text-2xl" />
          <p>
            Get Personalized Advise on Best Crops to Grow .
            <p className="text-start">
              This will be based on your location and soil type
            </p>
          </p>
        </p>

        <p className="my-4 w-[80%] mx-auto flex gap-2">
          <IoMdCheckmarkCircle className="text-[#7DD959] text-2xl" />
          <p>Get Weather and Soil Advisory from Verified Data</p>
        </p>

        <p className="my-4 w-[80%] mx-auto flex gap-2">
          <IoMdCheckmarkCircle className="text-[#7DD959] text-2xl" />
          <p>Get Approximate Production Costs</p>
        </p>
        <div className="flex justify-center">
          <Link to="/SelectCrop">
            <button className="bg-[#7DD959] gap-2 px-4 py-2 rounded-2xl font-bold text-white mt-12 justify-center place-content-center flex text-md">
              Get Started
              <div className="flex mt-2 ">
                <img src={arrow} alt="arrow" className="h-[10px]" />
                <img src={arrow} alt="arrow" className="h-[10px]" />
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div>
        <img src={step1} alt="step1" className="h-[75vh]" />
      </div>
    </div>
  );
};

export default Step1;
