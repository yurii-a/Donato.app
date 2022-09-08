import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { jarContractAddr } from '../constants';
// import { CryptoMono__factory } from '../typechain';
import { FaEthereum } from 'react-icons/fa';
import './style.css';
declare var window: any;

function Monobank() {

    const [account, setAccount] = useState('');
    const [amountToDonate, setAmountToDonate] = useState<string | number>('0');
    const [raisedBalance, setRaisedBalance] = useState(0);
    const [targetBalance, setTargetBalance] = useState(0);

    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    // const jarContract = CryptoMono__factory.connect(jarContractAddr, signer);

    const addFund = async () => {
        try {
            const amount = ethers.utils.parseEther(amountToDonate.toString());
            // await jarContract.addFund({ value: amount });
        } catch (e) {
            console.log(e);
        }
    };

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

    const getBalances = async () => {
        const raisedBalance = await provider.getBalance(jarContractAddr);
        const targetBalance = 10000;
        // await jarContract.target();
        console.log('Raised balance: ', Number(raisedBalance));
        console.log('Targer balance: ', Number(targetBalance));
        // setRaisedBalance(Number(raisedBalance) / Math.pow(10, 18));
        // setTargetBalance(Number(targetBalance) / Math.pow(10, 18));
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        getBalances();
    }, []);

    return (
        <div className="wrapper">
            <div className='monobank-container'>
                <div className='left-side'>
                    <h3 style={{ margin: '30px 0 45px 0' }}>Crypto Jar</h3>
                    <img
                        src='./images/jar.png'></img>
                    <p className='name'>Сергій С. збирає</p>
                    <h2>На 100 коптерів!</h2>
                    <p>Збираємо на...</p>
                    <div className='stats-container'>
                        <div className='stats-side'>
                            <img src='./images/collected.svg'></img>
                            <div>
                                <p className='amount-title'>Накопичено</p>
                                {/* <p className='money-amount'> {raisedBalance}  <FaEthereum /></p> */}
                                <p className='money-amount'> 1000 <FaEthereum /></p>
                            </div>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='stats-side'>
                            <img src='./images/target.svg'></img>
                            <div>
                                <p className='amount-title'>Ціль</p>
                                {/* <p className='money-amount'>{targetBalance} <FaEthereum /></p> */}
                                <p className='money-amount'>10 000 <FaEthereum /></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='input-amount-container'>
                        <h4 style={{ margin: '30px' }}>Сума поповнення <FaEthereum />
                        </h4>
                        <input
                            value={amountToDonate}
                            placeholder={amountToDonate + ' ETH'}
                            type='text'
                            onChange={(event) => setAmountToDonate(event.target.value)}
                        ></input>
                        <div className='buttons-container'>
                            <button
                                onClick={
                                    () => setAmountToDonate(prevState => Number(prevState) + 1)
                                }>
                                +1 <FaEthereum />
                            </button>
                            <button
                                onClick={
                                    () => setAmountToDonate(prevState => Number(prevState) + 5)
                                }>
                                +5 <FaEthereum />
                            </button>
                            <button
                                onClick={
                                    () => setAmountToDonate(prevState => Number(prevState) + 10)
                                }>
                                +10 <FaEthereum />
                            </button>
                        </div>
                    </div>
                    <div className='inputs-container'>
                        <input
                            placeholder="Ваше ім'я (необов'язково)"
                            type='text'
                        ></input>
                        <input
                            placeholder="Коментар (необов'язково)"
                            type='text'
                        ></input>
                        <button style={{ marginTop: '16px', marginBottom: '16px' }} onClick={
                            () => connectWallet() }>
                            { 'Pay with Binance'}
                        </button>

                        <button onClick={!account ?
                            () => connectWallet() :
                            () => addFund()}>
                            {!account ? 'Connect wallet' : 'Pay with Metamask'}
                        </button>
                        {/* <data android:host="app.binance.com" android:scheme="https"/> */}
                        <a className='btn btn-primary' href="intent://app.binance.com/qr/dplk5354bef1ed4d4832960aa7e61989d71d#Intent;scheme=https;package=com.binance.dev;end"> Pay with Binance </a>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Monobank;