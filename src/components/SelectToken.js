import React, { useState } from "react";
import { CrossIcon } from "../assets";

const SelectToken = ({ setOpen, setSelectedToken }) => {
  const [availableTokens] = useState([
    { TokenImg: "./images/bng-logo.svg", tokenName1: "BNB", tokenName2: "BNB" , id : 3 },
    {
      TokenImg: "./images/ustd-logo.png",
      tokenName1: "USDT",
      tokenName2: "USDT",
      id : 1

    },
    {
      TokenImg: "./images/busd-logo.png",
      tokenName1: "BUSD",
      tokenName2: "BUSD",
      id : 2
    },
  ]);

  return (
    <div className="select-token flex flex-col">
      <div className="select-token-wrap flex flex-col">
        <div className="hdr flex aic justify-between">
          <div className="lbl s24 b6 cfff">Select a Token</div>
          <div
            className="cross-icon cursor-pointer"
            onClick={(e) => setOpen(false)}
          >
            <CrossIcon />
          </div>
        </div>
        <div className="token-list flex flex-col">
          {availableTokens.map((item, i) => (
            <div
              className="token-box flex aic cursor-pointer mb-3"
              onClick={(e) => {
                setOpen(false);
                setSelectedToken({
                  tokenLogo: item.TokenImg,
                  tokeName: item.tokenName1,
                  id : item.id
                });
              }}
            >
              <img src={item.TokenImg} alt="opsdn" className="token-logo" />
              <div className="token-names flex flex-col">
                <div className="token-name-l ml-3 mr-1 text-base">
                  {item.tokenName1}
                </div>
                <div className="token-name-s ml-3 mr-1 text-base">
                  {item.tokenName2}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectToken;
