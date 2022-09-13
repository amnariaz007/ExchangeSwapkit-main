import React from "react";

const Header = ({ openSidebar, setOpenSidebar }) => {
  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex aic">
        <div className="left flex aic">
          <a href="https://www.smartmoneycoin.io/" rel="noreferrer"  target="_blank" >
            <img src="./images/logo.svg" alt="dcdc" className="logo-img cursor-pointer" />
          </a>
        </div>
        <div className="right flex aic justify-end">
          <div className="items-list flex aic">
            <div className="item"><a href="https://www.smartmoneycoin.io/" rel="noreferrer"  target="_blank" >SMC Coin</a></div>
            <div className="item"><a href="https://dapps.smartmoneycoin.net/" rel="noreferrer"  target="_blank" >Staking</a></div>
            <div className="item"><a href="https://www.smartmoneycoin.io/whhitepaper" rel="noreferrer"  target="_blank" >Whitepaper</a></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
