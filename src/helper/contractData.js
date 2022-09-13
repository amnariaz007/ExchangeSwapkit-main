import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import * as constdata from '../hooks/constant';
import { RPC_URLS } from '../hooks/connectors';
import { RPC } from '../hooks/constant';


export let singer =  new JsonRpcProvider(RPC_URLS[RPC]);

export async function getContract (library = null) {
    try{
        singer = library ? library.getSigner() : singer;
        let contract = new Contract(constdata.presale_address, constdata.presale_abi);
        return contract.connect(singer);
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}


export async function getBusdContract(library = null){
    try{
        singer = library ? library.getSigner() : singer;
        let contract = new Contract(constdata.busd_address, constdata.token_abi);
        return contract.connect(singer);
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}

export async function getUsdtContract(library = null){
    try{
        singer = library ? library.getSigner() : singer;
        let contract = new Contract(constdata.usdt_address, constdata.token_abi);
        return contract.connect(singer);
    }
    catch(err){
        console.log(err.message);
        return false;
    }
}


export async function checkApprove(contract , userAddress = null)
{
    try{
        let check = await contract.allowance(userAddress , constdata.presale_address);
        return toFixed(check.toString() / Math.pow(10,18));
    }
    catch(err){
        console.log(err.message);
        return false;
    }    
} 


export async function checkBalance(account , type)
{
    let conatrct;
    if(type === '1'){
        conatrct = await getUsdtContract();
        
    }
    else{
        conatrct = await getBusdContract();
    }

    let check = await conatrct.balanceOf( account);
    return toFixed(check.toString() / Math.pow(10,18));
}


function toFixed(x) {
    let e;
    if (Math.abs(x) < 1.0) {
       e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
       e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }






