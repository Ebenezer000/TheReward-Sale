import React, { useState } from 'react'
import Countdown from 'react-countdown';
import LOGO from '../../assets/afi_logo.png'
import CONTRACT_LOGO from '../../assets/presale_assets/contract_logo.png'
import AceDEFi from '../../abis/AceDEFi.json'
import AFiICO from '../../abis/AfiICO.json'
import AFI_ILLU from "../../assets/presale_assets/afi_token_illus.png";
import { Link } from 'react-router-dom';
import { PieChart } from 'react-minimal-pie-chart';
import { isMobile } from 'react-device-detect';
import { ethers } from 'ethers';
import { hex2Int } from '../../utils/utilities';
import { notify } from '../../components/Notify';
import { alertifyCloseAllPrompt, alertifyPrompt } from '../../components/Alertify';
import { initPendingInterval } from '../../hooks/AceTrack';

export const Home = ({idx, address, provider}) => {
    
    const [afiAmount, setAfiAmount] = useState(0);
    const [afiExchangeRate, setAfiExchangeRate] = useState(0);
    const [bonusRate, setBonusRate] = useState(0);
    const [afiAmountBonus, setAfiAmountBonus] = useState(0);
    const [totalAfiAmount, setTotalAfiAmount] = useState(0);

    const [saleProgress] = useState('65%');
    const [icoRuntime, setIcoRuntime] = useState(0);
    const [endTime, setEndTime] = useState(0);
    const [initConfig, setInitConfig] = useState(1);

    const [ethBuyAmount, setEthBuyAmount] = useState(afiExchangeRate || 0);
    
    const calculateSale = (event) =>{
        const amount =parseFloat(event.target.value);
        setEthBuyAmount(amount);
        const eqiAmount = amount/afiExchangeRate;
        setAfiAmount(eqiAmount.toPrecision(3));
        const eqiBonus = _calBonus(eqiAmount);
        setAfiAmountBonus(eqiBonus.toPrecision(3));
        const afiTokenAmount = +eqiAmount + +eqiBonus;
        setTotalAfiAmount(afiTokenAmount.toPrecision(6));
        //setAfiAmount(parseFloat(event.target.value))
    }

    const _calBonus = (amount) => {
        return amount * bonusRate / 100; 
    }

    const SaleStatus = () => <span>Presale ended!</span>;
    const timerRenderer = ({days, hours, minutes, seconds, completed }) =>{
        if (completed) {
            // Render a completed state
            return <SaleStatus />;
          } else {
            // Render a countdown
            return(
                <div className="text-center small">
                    {days} <span className="small">days</span>, {hours} <span className="small">hours</span>, {minutes} <span className="small">minutes</span>, {seconds} <span className="small">seconds</span> left
                </div>
            ) 
          }
    }

    const initAfiConfig = async () =>{
        if(initConfig === 1 && idx){
            await setInitConfig(2);
            const contract = new ethers.Contract(AFiICO.contract.address, AFiICO.abi, provider);
            //console.log(contract)
            const exchangeRate = await contract.exchangeRate();
            setAfiExchangeRate(ethers.utils.formatEther(exchangeRate))
            const bonusRate = await contract.bonusRate()
            setBonusRate(hex2Int(bonusRate._hex)/100)
            let now = new Date();
            const icoRuntime = await contract.icoRuntime(now.getTime())
            setIcoRuntime(hex2Int(icoRuntime._hex));
            const endTime = await contract.endTime()
            setEndTime(hex2Int(endTime._hex))
        }
        
    }

    const buyICO = async () =>{
        const signer = provider.getSigner();

        try {
            alertifyPrompt(
                `<div class="text-center small mb-4"><div>Payment request sent to ${address} wallet! Please <b>Authorize/Reject</b> request</div><div class="loader-spin"></div><small class="mb-4"><b> info: </b> restart metamask or any compatible wallet connect app to trigger request. refresh page if unable to trigger request.</small></div>`
            )
            await signer.sendTransaction({
                to: AFiICO.contract.address,
                value: ethers.utils.parseEther(`${ethBuyAmount}`)
            }).then((tx)=>{
                alertifyPrompt(
                    `<div class="text-center small mb-4"><div>Transaction submitted! Waiting for confirmation</div><div class="loader-spin"></div><small class="mb-4"><b> info: </b> ${AceDEFi.contract.symbol} will be transfered after block confirmation.</small></div>`
                )
                initPendingInterval(tx.hash)
                console.log('txHash', tx.hash);
            });
            
        } catch (error) {
            alertifyCloseAllPrompt()
            notify(`${error.code} | ${error.message}`, 4);
        }
        
    }


    initAfiConfig();
 
    const AFI_DISTRIBUTION = [
        {title: 'Private sale', value: 5000, color: '#ffcebb'},
        {title: 'Public sale', value: 10000, color: '#f7dfd6'},
        {title: 'Ecosystem', value: 17500, color: '#7c93c5'},
        {title: 'Airdrop', value: 2500, color: '#546a9c'},
        {title: 'Development', value: 2500, color: '#9c9ea4'},
        {title: 'Team and Partners', value: 2500, color: '#ffc1aa'},
        {title: `${AceDEFi.contract.symbol}:Treasury`, value: 5000, color: '#ffc1aa'},
        {title: `${AceDEFi.contract.symbol}:Staking`, value: 5000, color: '#ffc1aa'}
    ];

    
    return(
        <>
        <div className="row">
            <div className="col-lg-12">

                <div className="panel panel-filled" style={{borderRadius: '10px'}}>
                    <div className="panel-heading text-center" style={{fontSize: '2em', color: '#2f323b', fontWeight: '800'}}>
                        {AceDEFi.contract.name}
                    </div>
                    <div className="panel-body">

                        <div className="row">
                            <div className="col-lg-6 col-sm-12 my-4">
                                <img src={AFI_ILLU} alt="afi_illust" style={{maxHeight: '300px'}} />
                            </div>
                            <div className="col-lg-6 col-sm-12" style={{fontSize: '1em'}}>

                            <div className="my-4" style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                                <p className="mb-3" style={{fontSize: '1.5em', fontWeight: '800'}}>What's {AceDEFi.contract.symbol}?</p>
                                
                                <p className="my-3">
                                    {AceDEFi.contract.name} is a fork of top Defi projects, improving implemented protocols with target to be an independent Staking, liquidity mining, yield farming and much more!
                                </p>

                                <p className="my-3">
                                    {AceDEFi.contract.name} needs community support for its long term growth and achievement. To secure our community growth, we have issued a yeilding token: {AceDEFi.contract.symbol}
                                </p>

                                <p className="my-3">
                                    Invest in real world assets. Get Instant Staking Rewards or Earn {AceDEFi.contract.name} on your pooled assets.
                                </p>
                            
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-6">
                                <div className="panel panel-filled p-2 text-center" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)', backgroundColor: '#ffffff'}}>
                                    <div className="small">{
                                                (endTime >= icoRuntime) ? 'STARTING' : 'CURRENT'
                                            }  STAGE</div>
                                    <div className="my-1" style={{color: '#2f323b'}}><strong>1 {AceDEFi.contract.symbol} = {afiExchangeRate} ETH</strong></div>
                                    <div className="mt-1">
                                        <span style={{color: '#55d873'}}>+{bonusRate}%</span> bonus
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-sm-6">
                                <div className="panel panel-filled p-2 text-center" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)', backgroundColor: '#ffffff'}}>
                                <div className="small mb-1">ICO {
                                    (endTime >= icoRuntime) ? 'STARTS' : 'ENDS'
                                } IN </div>
                                 <div className="progress full my-2" style={{borderRadius: '10px'}}>
                                    <div style={{width: saleProgress}} className="progress-bar progress-bar-presale"></div>
                                </div>
                                 <div className="mt-1" style={{padding: '4px'}}>
                                 {
                                        icoRuntime ? 
                                            <Countdown 
                                                date={icoRuntime}
                                                renderer={timerRenderer}
                                            />
                                        :

                                        <span>loading...</span>
                                    }
                                 </div>
                                </div>
                            </div>
                            
                            <div className="col-lg-7 col-md-7 col-sm-12 container-center">
                            <form
                                onSubmit={(event)=>{
                                    event.preventDefault()
                                    buyICO()
                                }}
                                >
                                    <div className="panel panel-filled" style={{borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)', backgroundColor: '#ffffff'}}>
                                        <div className="panel-heading text-center" style={{fontSize: '2em', color: '#2f323b', fontWeight: '800'}}>
                                            BUY {AceDEFi.contract.symbol}
                                        </div>
                                            <div className="panel-body">
                                                <div className="form-group m-2">
                                                    <label htmlFor="saleAmount">ETH Amount</label> 
                                                    <input name="amountEther" onChange={calculateSale}
                                                         className="form-control" step=".0500000000" min={0.0500000000} max={5.00000000} placeholder="0.00 ETH" 
                                                        style={{backgroundColor: '#ffffff', border: '1px solid #d3d3d3', color: '#2f323b'}} />
                                                </div>
                                                
                                                <div className="form-group m-2">
                                                    <label htmlFor="buyAmount">{AceDEFi.contract.symbol} Amount</label> 
                                                    <div className="form-control" style={{backgroundColor: '#ffffff', border: '1px solid #d3d3d3', color: '#2f323b'}}>
                                                        {afiAmount} {AceDEFi.contract.symbol} + {afiAmountBonus} Bonus &asymp; {totalAfiAmount} {AceDEFi.contract.symbol}
                                                    </div>
                                                </div>
                                                
                                                
                                                <div className="text-center">
                                                    You will receive {AceDEFi.contract.symbol} + {bonusRate}% Bonus Tokens Automatically after Depositing ETH!
                                                </div>
                                            </div>
                                            <div className="panel-footer text-center">
                                                <button type="submit" className="btn btn-w-md" style={{boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)', backgroundColor: '#ffffff'}}>BUY TOKENS</button>
                                            </div>
                                    </div>
                            
                                </form>
                            </div>
                        </div>

                    </div>
                    {/* <div className="panel-footer text-center">
                        <div>
                            Presale Price: 30 {AceDEFi.contract.symbol} | 1 ETH
                        </div>
                        <div>
                            Public Price: 20 {AceDEFi.contract.symbol} | 1 ETH
                        </div>
                        <div>
                            <span role="img" aria-label="uniwsap">🦄</span> Listing Price : 10 {AceDEFi.contract.symbol} | 1 ETH <span role="img" aria-label="uniwsap">🦄</span>
                        </div>
                    </div> */}
                </div>

            </div>

        </div>
        
        <div className="row">
            <div className="col-lg-12">
                <div className="panel panel-filled" style={{borderRadius: '10px', backgroundColor: '#ffffff'}}>
                    <div className="panel-body" style={{borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', backgroundColor: '#ffffff'}}>
                    <div className="row">
                            <div className="col-lg-6 col-sm-12">
                                <div className="panel panel-filled" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)', backgroundColor: '#ffffff'}}>
                                    <div className="panel-body text-center">
                                        <div>
                                            <img className="my-3" src={LOGO} alt="AceTrack Finance" style={{width: '50px', height: '50px', border: '2px dashed #949ba2', borderRadius: '50%'}}/>
                                        </div>
                                        <div className="my-3">
                                            👉 Add the {AceDEFi.contract.symbol} token contract to your wallet:
                                            <br/>
                                            <Link className="small" to="#">{AceDEFi.contract.address}</Link>
                                        </div>
                                         
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-sm-12">
                                <div className="panel panel-filled" style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1), 0 6px 20px 0 rgba(0, 0, 0, 0.10)', backgroundColor: '#ffffff'}}>
                                    <div className="panel-body text-center">
                                    <div>
                                            <img className="my-3" src={CONTRACT_LOGO} alt="Aero Finance" style={{width: '50px', height: '50px', borderRadius: '50%'}}/>
                                        </div>
                                        <div className="my-3">
                                            👉 The ICO contract address:
                                            <br/>
                                            <Link className="small" to="#">{AFiICO.contract.address}</Link>
                                        </div>
                                         
                                    </div>
                                </div>
                            </div>
  
                        </div>






                        <div className="row">
                            <div className="col-lg-12 col-sm-12" style={{fontSize: '1em'}}>

                            <div className="my-4" style={{textAlign: 'justify', textJustify: 'inter-word'}}>
                                <p className="mb-3" style={{fontSize: '1.5em', fontWeight: '800'}}>{AceDEFi.contract.symbol} Distribution</p>
                                
                                <p className="my-3">
                                    The {AceDEFi.contract.name} will create 50,000 {AceDEFi.contract.symbol} token once deployed to the Ethereum main-network.
                                </p>

                                <p className="my-3">
                                    {AceDEFi.contract.symbol} are sold in diverse private and public sales to foster the ecosystem's growth and decentralization over an extended period.
                                </p>

                                <p className="my-3">
                                    All unsold {AceDEFi.contract.symbol} will be transfered to the {AceDEFi.contract.symbol} Treasury, 5% of the total supply of {AceDEFi.contract.symbol} Token will be issued as airdrops.
                                </p>

                                <PieChart
                                    paddingAngle={18}
                                    rounded
                                    totalValue={50000}
                                    label={({ dataEntry }) => `${dataEntry.title} - ${Math.round(dataEntry.percentage)}%`
                                    }
                                    labelStyle={() => ({
                                      fontSize: '2px',
                                    })}
                                    labelPosition={112}
                                    lineWidth={15}
                                    radius={isMobile ? 32 : 20}
                                    data={AFI_DISTRIBUTION}
                                    animate
                                    
                                />
                            
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>





        </>
    )

}
