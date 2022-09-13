import React from "react";
import "../App.css";
import Spinner from "react-svg-spinner";
import TypeWriterEffect from "react-typewriter-effect";
const Loader = () => {
  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="">
        <div className="block mb-6">
          <Spinner color="white" size="100px" thickness={2} />
        </div>
        <TypeWriterEffect
          textStyle={{ fontFamily: "inherit", color: "white" }}
          startDelay={100}
          cursorColor="white"
          text="Now Loading..."
          typeSpeed={150}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Loader;
