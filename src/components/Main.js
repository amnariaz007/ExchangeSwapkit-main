import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import SelectToken from "./SelectToken";
import { useWeb3React } from "@web3-react/core";

import {
  ReloadIcon,
  ArrowDownIcon,
  DropDownIcon,
} from "../assets";
import ConnectButton from "../helper/ConnectButton";
import * as constdata from '../hooks/constant';
import { parseEther, parseUnits } from '@ethersproject/units';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap-button-loader';
import * as contractfile from '../helper/contractData';

const Main = () => {
  const [open, setOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState({
    tokenLogo: "./images/bng-logo.svg",
    tokeName: "BNB",
    id: 3
  });
  const context = useWeb3React();
  const { account, library } = context;
  const [loading, setLoading] = useState(false);
  const [isApprove, setIsApprove] = useState(true);
  const [busdapprove, setBusdapprove] = useState(false);
  const [usdtapprove, setUsdtapprove] = useState(false);
  const [userbal, setUserBal] = useState(0);
  const [busdbal, setBusdbal] = useState(0);
  const [usdtbal, setUsdtbal] = useState(0);
  const [bnbBal, setBnbbal] = useState(0);
  // const [refresh, setRefresh] = useState(new Date());
  const [onetabBal, setonetabBal] = useState(0);

  const [bnbperUsd, setBnbperUsd] = useState(0);
  const [tokenPerUSD, setTokenPerUSD] = useState(0);


  const [amount, setAmount] = useState('0.0');
  const [token, setToken] = useState('0.0');
  const [error_msg, setError_msg] = useState('');


  useEffect(() => {
    async function checkApprove() {
      try {
        if (account) {
          let busdconatrct = await contractfile.getBusdContract();
          let usdtconatrct = await contractfile.getUsdtContract();

          let busdcheck = await contractfile.checkApprove(busdconatrct, account);
          let usdtcheck = await contractfile.checkApprove(usdtconatrct, account);

          if (parseFloat(busdcheck) > 10000) {
            setBusdapprove(true);
          }

          if (parseFloat(usdtcheck) > 10000) {
            setUsdtapprove(true);
          }

        }
      }
      catch (err) {
        console.log(err.message);
      }
    }

    checkApprove();
  }, [account]);


  useEffect(() => {
    async function getUserBal() {
      let contract = await contractfile.getContract();

      let UsdtoBnb = await contract.UsdtoBnb();
      UsdtoBnb = UsdtoBnb.toString() / Math.pow(10, 18);

      setBnbperUsd(UsdtoBnb);

      let perDollarPrice = await contract.perDollarPrice();
      perDollarPrice = perDollarPrice.toString() / Math.pow(10, 9);
      setTokenPerUSD(perDollarPrice);
      if (account) {


        let userB = await contract.ikeBalance(account);
        userB = userB.toString() / Math.pow(10, 9);
        setUserBal(parseFloat(userB).toFixed(5));



        let bnb_balance = await library.getBalance(account);
        bnb_balance = bnb_balance.toString() / Math.pow(10, 18);
        setBnbbal(parseFloat(bnb_balance).toFixed(5));

        let busdconatrct = await contractfile.getBusdContract();
        let usdtconatrct = await contractfile.getUsdtContract();

        let bbal = await busdconatrct.balanceOf(account);
        bbal = bbal.toString() / Math.pow(10, 18);
        setBusdbal(parseFloat(bbal).toFixed(5));


        let ubal = await usdtconatrct.balanceOf(account);
        ubal = ubal.toString() / Math.pow(10, 18);
        setUsdtbal(parseFloat(ubal).toFixed(5));

      }
    }

    getUserBal();
  }, [account, library]);





  useEffect(() => {
    if (selectedToken.id === 1) {
      if (usdtapprove === true) {
        setIsApprove(true);
      }
      else {
        setIsApprove(false);
      }
      setonetabBal(usdtbal);
      setToken(parseFloat((amount * tokenPerUSD * 10).toFixed(6)));
    }
    else if (selectedToken.id === 2) {
      if (busdapprove === true) {
        setIsApprove(true);
      }
      else {
        setIsApprove(false);
      }
      setonetabBal(busdbal);
      setToken(parseFloat((amount * tokenPerUSD * 10).toFixed(6)));
    }
    else {
      setIsApprove(true);
      setonetabBal(bnbBal);
      setToken(parseFloat(((amount / bnbperUsd) * tokenPerUSD * 10).toFixed(6)));
    }

  }, [selectedToken, amount, busdapprove, usdtapprove, bnbBal, busdbal, usdtbal, bnbperUsd, tokenPerUSD]);


  const handleAmountChange = (e) => {
    setAmount(e.target.value);

    if (isNaN(e.target.value)) {
      setToken(0);
      setError_msg('(please enter valid amount.)');
      return;
    }
    else if (parseFloat(e.target.value) === 0 || e.target.value === '') {
      setToken(0);
      setError_msg('(please enter valid amount.)');
      return;
    }
    else if (parseFloat(e.target.value) < parseFloat(constdata.minInvest) && (selectedToken.id === 1 || selectedToken.id === 2)) {
      setError_msg(`amount must be greater ${constdata.minInvest} USD`);
      setToken(0);
      return;
    }
    else if (parseFloat(e.target.value) < parseFloat(bnbperUsd * 10) && selectedToken.id === 3) {
      setError_msg(`amount must be greater ${parseFloat(bnbperUsd * 10).toFixed(6)} USD`);
      setToken(0);
      return;
    }
    else {
      setError_msg('');
      if (selectedToken.id === 1 || selectedToken.id === 2) {
        setToken(parseFloat((e.target.value * tokenPerUSD * 10).toFixed(6)));
      }
      else {
        setToken(parseFloat(((e.target.value / bnbperUsd) * tokenPerUSD * 10).toFixed(6)));
      }
    }

  }


  const handleBuynow = async (e) => {
    try {
      setLoading(true);
      if (account) {
        if ((selectedToken.id === 1 || selectedToken.id === 2) && !isNaN(amount) && amount > 0) {

          
          
            let contract = await contractfile.getContract(library);
            let token = parseEther(amount.toString());
            let value = parseEther(parseFloat(bnbperUsd * 2).toString());

            let tx = await contract.buyfromToken(selectedToken.id, token, { 'from': account, "value": value });
            let response = await tx.wait();
            if (response) {
              if (response.status === 1) {
                toast.success('success ! Your Last Transaction is Successfull.');
                setLoading(false);
                setIsApprove(true);
                // setRefresh(new Date());
                window.location.reload();

              }
              else if (response.status === 0) {
                toast.error('error ! Your Last Transaction is Failed.');
                setLoading(false);
                window.location.reload();
                // setRefresh(new Date());
              }
              else {
                toast.error('error ! something went wrong.');
                setLoading(false);
                window.location.reload();
                // setRefresh(new Date());
              }
            }
            else {
              toast.error('Opps ! something went wrong!');
              setLoading(false);
              window.location.reload();
            }
          
        }
        else if (selectedToken.id === 3 && !isNaN(amount) && amount > 0) {
          
            // let addr = AddressZero;

            // if (window.location.href.includes("?ref=")) {
            //     addr = window.location.href.substring(
            //         window.location.href.indexOf("=") + 1
            //     );
            // }
            let contract = await contractfile.getContract(library);
            let final = parseFloat(amount) + parseFloat(bnbperUsd * 2);
            let value = parseEther(final.toString());

            let tx = await contract.buyFromNative({ 'from': account, "value": value });
            let response = await tx.wait();
            if (response) {
              if (response.status === 1) {
                toast.success('success ! Your Last Transaction is Successfull.');
                setLoading(false);
                setIsApprove(true);
                // setRefresh(new Date());
                window.location.reload();

              }
              else if (response.status === 0) {
                toast.error('error ! Your Last Transaction is Failed.');
                setLoading(false);
                window.location.reload();
                // setRefresh(new Date());
              }
              else {
                toast.error('error ! something went wrong.');
                setLoading(false);
                window.location.reload();
                // setRefresh(new Date());
              }
            }
            else {
              toast.error('Opps ! something went wrong!');
              setLoading(false);
              window.location.reload();
            }
          
        }
        else {
          toast.error('Please enter valid details ! try again');
          setLoading(false);
        }
      }
      else {
        toast.error('Please Connect Wallet !');
        setLoading(false);
      }
    }
    catch (err) {
       toast.error(err.reason ? err.reason : err.message);
      setLoading(false);
    }
  }

  const handleApproveToken = async (e) => {
    try {
      setLoading(true);
      if (account) {
        if (selectedToken.id !== '' || selectedToken.id !== 'undefined') {

          let contract;
          if (selectedToken.id === 1) {
            contract = await contractfile.getUsdtContract(library);
          }
          else if (selectedToken.id === 2) {
            contract = await contractfile.getBusdContract(library);
          }
          else {
            toast.error('something went wrong ! please try again later');
            setLoading(false);
            return false;
          }
          let amount = parseUnits('10000000000000000000000000000000000');
          let tx = await contract.approve(constdata.presale_address, amount);
          let response = await tx.wait();
          if (response) {
            if (response.status === 1) {
              toast.success('success ! Your Last Transaction is Successfull.');
              setLoading(false);
              setIsApprove(true);

            }
            else if (response.status === 0) {
              toast.error('error ! Your Last Transaction is Failed.');
              setLoading(false);
            }
            else {
              toast.error('error ! something went wrong.');
              setLoading(false);
            }
          }
          else {
            toast.error('Opps ! something went wrong!');
            setLoading(false);
          }
        }
        else {
          toast.error('Please select payment type !');
          setLoading(false);
        }
      }
      else {
        toast.error('Please Connect Wallet !');
        setLoading(false);
      }
    }
    catch (err) {
      toast.error(err.reason ? err.reason : err.message);
      setLoading(false);
    }
  }


  return (
    <div className="home-page flex flex-col">
      <div className="page-hdr flex items-end jc">
        <div className="item flex aic">Swap</div>
      </div>
      <div className="wrap wrapWidth flex flex-col aic jc">
        <div className="box flex flex-col">
          <div className="box-hdr flex aic">
            <div className="icon cursor-pointer">
              <ReloadIcon />
            </div>
            <div className="box-heading flex flex-col flex-1 aic jc">
              <div className="tag s18 b7">Swap</div>
              <div className="tag-desc s14">Trade tokens in an instant</div>
            </div>
          </div>
          <div className="row flex flex-col mt-10">
            <div
              className="lbl-box flex aic cursor-pointer mb-3"
              onClick={(e) => setOpen(true)}
            >
              <img src={selectedToken.tokenLogo} alt="dhnh" className="token-logo" />
              <div className="token-name ml-3 mr-1 text-base">
                {selectedToken.tokeName}
              </div>
              <div className="icon">
                <ArrowDownIcon />
              </div>
            </div>
            <input type="number" value={amount} onChange={(e) => handleAmountChange(e)} className="txt cleanbtn text-right" />
            <span>Balance : {onetabBal}</span>
            <span><small className="text-danger">{error_msg}</small></span>
          </div>
          <div className="row flex aic jc my-3">
            <div className="icon-arrow flex aic jc">
              <DropDownIcon />
            </div>
          </div>
          <div className="row flex flex-col">
            <div className="lbl-box flex aic cursor-pointer mb-3">
              <img src="./images/logo.svg" alt="ddfjef" className="token-logo" />
              <div className="token-name ml-3 mr-1 text-base">SMC</div>
              {/* <div className="icon">
                <ArrowDownIcon />
              </div> */}
            </div>
            <input type="number" readOnly={true} value={token} className="txt cleanbtn text-right" />
            <span>Balance : {userbal}</span>
          </div>

          <div className="row flex aic justify-between">
            <div className="val-lbl">Slippage Tolerance</div>
            <div className="val2">0.5%</div>
          </div>
          <div className="row flex aic jc mt-4">
            {account ? (
              <>
                {isApprove ? (
                  <Button loading={loading} className="btn button aic jc" onClick={handleBuynow}>Buy Now</Button>
                ) :
                  (<Button loading={loading} className="btn button aic jc" onClick={handleApproveToken}>Approve</Button>)
                }
              </>
            ) : (<ConnectButton />)}
          </div>
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <SelectToken setOpen={setOpen} setSelectedToken={setSelectedToken} />
      </Modal>
    </div>
  );
};

export default Main;
