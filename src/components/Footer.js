import React from "react";

const Footer = () => {
  return (
    <div className="footer-comp flex flex-col">
      <div className="wrapWidth wrap flex jc aic">
        <div className="left flex aic flex-1 jc">
          <div className="lbl s18 b6 c333">© 2022 Proudly created by SMC</div>
        </div>
        <div className="right flex  justify-end">
          <a href="http://twitter.com/smartmoneycoin" rel="noreferrer"  target="_blank" className="social flex aic">
            <img
              src="./images/twitter.png"
              className="s-img w-7 h-7 cursor-pointer ml-4"
              alt="skchscj"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
