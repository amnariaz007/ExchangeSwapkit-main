/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./css/App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { Web3ReactProvider } from "@web3-react/core";
import { POLLING_INTERVAL } from "./hooks/connectors";
import { Web3Provider } from "@ethersproject/providers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="App">
      <ToastContainer />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Header openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <Main />
        <Footer />
      </Web3ReactProvider>
    </div>
  );
}

export default App;
//mainApp