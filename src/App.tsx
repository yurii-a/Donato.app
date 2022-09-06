import './style.css';
import { useEffect, useState } from 'react';
import { ethers } from "ethers";
import Monobank from './Monobank';
declare var window: any

function App() {
  //const [tokenBalances, setTokenBalances] = useState([0]);
  const [account, setAccount] = useState('');

  const { ethereum } = window;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();

  /*  const getBalances = async () => {
      if (!account) return;
      try {
        let balanceBOB1 = await tokenContract1.balanceOf(account);
        let balanceBOB2 = await tokenContract2.balanceOf(account);
        setTokenBalances([
          Number(balanceBOB1) / Math.pow(10, 18),
          Number(balanceBOB2) / Math.pow(10, 18)
        ]);
      } catch (e) {
        console.log(e);
      }
    };*/

  const checkIfWalletIsConnected = async () => {
    try {
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setAccount(account);
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      console.log('Account addr: ', accounts[0]);
      setAccount(accounts.length ? accounts[0] : '');
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  /*useEffect(() => {
    getBalances();
  }, [account]);*/

  return (
    <div className='app-container'>
      <Monobank />
    </div>
  );
}

export default App;