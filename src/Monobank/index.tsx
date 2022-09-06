import './style.css';

function Monobank() {
    return (
        <div className="wrapper">
            <div className='monobank-container'>
                <div className='left-side'>
                    <h3>Donato</h3>
                    <img src='./images/jar.png'></img>
                    <p className='name'>Сергій С. збирає</p>
                    <h2>На 100 коптерів!</h2>
                    <p>Збираємо на...</p>
                    <div className='stats-container'>
                        <div className='stats-side'>
                            <img src='./images/collected.svg'></img>
                            <div>
                                <p className='amount-title'>Накопичено</p>
                                <p className='money-amount'>4 640 643 $</p>
                            </div>
                        </div>
                        <div className='vertical-line'></div>
                        <div className='stats-side'>
                            <img src='./images/target.svg'></img>
                            <div>
                                <p className='amount-title'>Ціль</p>
                                <p className='money-amount'>9 300 000 $</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='right-side'>
                    <div className='input-amount-container'>
                        <h4 style={{ margin: '30px' }}>Сума поповнення</h4>
                        <input
                            placeholder='0$'
                            type='text'
                        ></input>
                        <div className='buttons-container'>
                            <button>+100 $</button>
                            <button>+500 $</button>
                            <button>+1 000 $</button>
                        </div>
                    </div>
                    <div className='inputs-container'>
                        <input
                            placeholder="Ваше ім'я (необв'язково)"
                            type='text'
                        ></input>
                        <input
                            placeholder="Коментар (необв'язково)"
                            type='text'
                        ></input>
                        <button>Pay with Metamask</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Monobank;