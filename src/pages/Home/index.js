import React, { useState, useEffect } from 'react'
import ReactPlayer from "react-player";
import TOKENICO_ABI from '../../abis/tokenSale.json'
import ERC20 from '../../abis/erc20.json'
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css"
import { ethers } from 'ethers';
import { notify } from '../../components/Notify';
import { alertifyCloseAllPrompt, alertifyPrompt } from '../../components/Alertify';
import { initPendingInterval } from '../../hooks/AceTrack';
import { hex2Int, ether2wei } from '../../utils/utilities'

export const Home = ({ address, provider, ethBalance, chain, connect, disconnect }) => {

    const [afiAmount, setAfiAmount] = useState(0);
    const [afiExchangeRate, setAfiExchangeRate] = useState(0.000103);
    const [rwtBalance, setRwtBalance] = useState('');

    const [ethBuyAmount, setEthBuyAmount] = useState(afiExchangeRate || 0);

    const calculateSale = (event) => {
        const amount = parseFloat(event.target.value);
        setEthBuyAmount(amount);
        const eqiAmount = amount / afiExchangeRate;
        setAfiAmount(eqiAmount.toPrecision(10));
    }

    const REF_ADDRESS = '0x0000000000000000000000000000000000000000';

    const getRWTBalance = async (address) => {

        try {
            const signer = provider.getSigner();
            const contract = new ethers.Contract('0x80803D835A1Aba452261eeD93e0976a779Ea82C0', TOKENICO_ABI, signer);
            const fullBal = await contract.BUYERS(address);
            const bal = fullBal[1];
            console.log({ bal: parseFloat(hex2Int(bal._hex), 15) })
            return parseFloat(bal);
        } catch (e) {
            console.log({ balanceError: e })
        }
    }

    const loadWallet = async () => {
        const rwtBalance = await getRWTBalance(address)
        setRwtBalance(rwtBalance);
    }

    useEffect(() => {
        async function fetchData() {
            loadWallet()
        }
        if (provider !== null) {
            fetchData();
        }

    }, [address]);


    const buyICO = async () => {
        const signer = provider.getSigner();

        try {
            {/**
            alertifyPrompt(
                `<div class="text-center small mb-4"><div>Payment request sent to 0x80803D835A1Aba452261eeD93e0976a779Ea82C0 wallet! Please <b>Authorize/Reject</b> request</div><div class="loader-spin"></div><small class="mb-4"><b> info: </b> restart metamask or any compatible wallet connect app to trigger request. refresh page if unable to trigger request.</small></div>`
            )
            **/}
            const contract = new ethers.Contract('0x80803D835A1Aba452261eeD93e0976a779Ea82C0', TOKENICO_ABI, signer);
            console.log(contract)
            await contract.userDeposit(
                0,
                REF_ADDRESS, {
                from: address,
                gasPrice: ethers.utils.parseUnits('10', 'gwei'),
                gasLimit: 240000,
                value: ethers.utils.parseEther(`${ethBuyAmount}`)
            }).then((tx) => {
                {/**
                alertifyPrompt(
                    `<div class="text-center small mb-4"><div>Transaction submitted! Waiting for confirmation</div><div class="loader-spin"></div><small class="mb-4"><b> info: </b> RWT will be transfered after block confirmation.</small></div>`
                )
                **/}
                initPendingInterval(tx.hash)
                console.log('txHash', tx.hash);
            });

        } catch (error) {
            alertifyCloseAllPrompt()
            notify(`${error.code} | ${error.message}`, 4);
        }

    }

    const courImages = [
        {
            original: 'wp-content/themes/therewardtoken/img/c2.jpg',
            description: 'Tickets for Comic Con? ',
            sizes: '100px'
        },
        {
            original: 'wp-content/themes/therewardtoken/img/nc3.jpg',
            description: 'Seven Star Burj Al Arab Evening',
        },
        {
            original: 'wp-content/themes/therewardtoken/img/c5.jpg',
            description: 'Gucci bags, Loui Vuitton Shoes, Iphone Latest & Chanel Dresses ',
        },
    ]


    return (
        <>

            <div className="user-wraper">
                <div className="container-fluid">
                    <div className="d-flex">
                        <div className="user-sidebar">
                            <div className="user-sidebar-overlay" />
                            <div className="user-box d-none-1 d-lg-block-1">
                                <div className="user-image">
                                    <img id="user_logo" src="user-thumb-sm.png" alt="thumb" />
                                    <span
                                        id="logo_loader"
                                        className="loader-icon"
                                        style={{ display: "none" }}
                                    >
                                        <i className="fa fa-spinner fa-spin fa-fw" />
                                    </span>
                                </div>
                                <h6 className="user-name"> RWT HOLDER </h6>
                            </div>
                            {/* .user-box */}
                            <ul className="user-icon-nav">
                                {/* <li className>
                                    <a href="https://icodev.space/rwt/dashboard" target="_blank">
                                        <em className="ti ti-dashboard" />
                                        Dashboard
                                    </a>
                                </li>
                                <li className>
                                    <a href="https://icodev.space/rwt/account" target="_blank">
                                        <em className="ti ti-user" />
                                        Account
                                    </a>
                                </li> */}
                                <li className="active">
                                    <a href="#">
                                        <em className="ti ti-control-shuffle" />
                                        Buy Token
                                    </a>
                                </li>
                                {/* <li className>
                                    <a href="https://icodev.space/rwt/contribution" target="_blank">
                                        <em className="ti ti-pie-chart" />
                                        Purchase Info
                                    </a>
                                </li>
                                <li className>
                                    <a href="https://icodev.space/rwt/referrals" target="_blank">
                                        <em className="ti ti-infinite" />
                                        Referrals
                                    </a>
                                </li>
                                <li className>
                                    <a
                                        href="https://icodev.space/rwt/transaction-history"
                                        target="_blank"
                                    >
                                        <em className="ti ti-pie-chart" />
                                        Transaction
                                    </a>
                                </li> */}
                            </ul>
                            {/* .user-icon-nav */}
                            <div className="user-sidebar-sap" />
                            {/* .user-sidebar-sap */}
                            {/*  <ul class="user-nav">
               <li><a href="https://icodev.space/rwt/how-to">How to buy?</a></li>
               <li><a href="https://icodev.space/rwt/faq">Faqs</a></li>
               </ul> */}
                            {/* .user-nav */}
                            <div className="d-lg-none">
                                <div className="user-sidebar-sap" />
                                <div className="gaps-1x" />
                                <ul className="topbar-action-list">
                                    <li className="topbar-action-item topbar-action-link">
                                        <a href="#">
                                            <em className="ti ti-home" />
                                            Go to Home
                                        </a>
                                    </li>
                                    {/* .topbar-action-item */}
                                </ul>
                                {/* .topbar-action-list */}
                            </div>
                        </div>
                        {/* .user-sidebar */}
                        <style
                            dangerouslySetInnerHTML={{
                                __html:
                                    "\n               #network p {\n                  color: #d0ae65\n               }\n\n               .table {\n                  color: #FFF;\n               }\n\n               section {\n                  top: -140px;\n               }\n\n               #footer {\n                  top: 0px;\n               }\n\n               .inspiro-slider .slide .slide-captions>p {\n                  color: #fff;\n                  font-size: 13px;\n                  line-height: 19px;\n                  font-weight: 400;\n                  margin-bottom: 16px;\n               }\n            "
                            }}
                        />
                        <div className="user-content">
                            <div className="user-panel">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="progress-card tile-item tile-primary">
                                            <h4>Token Sale Progress</h4>
                                            <div className="progress track-progress">
                                                <span className="start-point">
                                                    Softcap <span>700 BNB</span>
                                                </span>
                                                <span className="end-point">
                                                    Hardcap <span>2,500 BNB</span>
                                                </span>
                                                <div
                                                    className="progress  progress-striped track-progress progress-bar progress-bar-striped progress-bar-animated"
                                                    style={{ width: "0%" }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="tile-item tile-primary">
                                            <div className="row">
                                                <div className="col-md-3">
                                                    <div className="tile-bubbles" />
                                                    <h6 className="tile-title">RWT BALANCE</h6>
                                                    <h1 className="tile-info"> {rwtBalance ? rwtBalance : 0.000} RWT</h1>
                                                </div>

                                                <div className="col-md-7">
                                                    <div className="tile-bubbles" />
                                                    <h6 className="tile-title"> Wallet Address </h6>
                                                    <h1 className="tile-info"> {address ? address : '0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'} </h1>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="tile-bubbles" />
                                                    <h6 className="tile-title"> BNB BALANCE</h6>
                                                    <h1 className="tile-info"> {ethBalance} BNB </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="user-panel-title">Buy The Reward Token (RWT)</h2>
                                <p>Ref ID: https://buy.therewardtoken.com?ref={address ? address : '0xXXXXXX'}</p>
                                <div className="body-inner">
                                    {/* We use simple <template> templating for the example */}
                                    <div id="templates" style={{ display: "none" }}>
                                        <template id="template-balance" />
                                    </div>
                                    <section className="background-colored" id="home">
                                        <div id="particles-dots" className="particles" />
                                        <div className="containerr">
                                            <div className="rowr">
                                                <div className="col-md-12r">
                                                    <div className="rt-space" />
                                                    <div className="rt-space" />
                                                    <div className="rt-space" />
                                                    <div className="slide-captions text-light">
                                                        <h2
                                                            className="rt-big-head "
                                                            data-animate="fadeInUp"
                                                            data-animate-delay={300}
                                                            style={{ textAlign: "left" }}
                                                        >
                                                            <span
                                                                className="gold"
                                                                style={{ fontWeight: 200, color: "#ddb053" }}
                                                            />
                                                        </h2>
                                                        <form onSubmit={(event) => {
                                                            event.preventDefault()
                                                            buyICO()
                                                        }}>
                                                            <div className="token_info">
                                                                <div className="row">
                                                                    <div className="col-lg-8">
                                                                        <div className="token_m_info mb-3">
                                                                            <div className="input-item input-with-label">
                                                                                <label
                                                                                    htmlFor="first-name"
                                                                                    className="input-item-label"
                                                                                >
                                                                                    {" "}
                                                                                    BNB token receving Wallet address <sup>*</sup>
                                                                                </label>

                                                                                <input
                                                                                    placeholder={address}
                                                                                    className="input-bordered"
                                                                                    type="text"
                                                                                    defaultValue={address}
                                                                                    readOnly
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                1 BNB = <span>9708</span> RWT
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-lg-8">
                                                                        <div className="token_m_info mb-3">
                                                                            <div className="input-item input-with-label">
                                                                                <label
                                                                                    htmlFor="first-name"
                                                                                    className="input-item-label"
                                                                                >
                                                                                    How Many BNB you want to purchase?<sup>*</sup>
                                                                                </label>
                                                                                <input
                                                                                    onChange={calculateSale}
                                                                                    placeholder="Minimum: 0.05 BNB"
                                                                                    className="input-bordered"
                                                                                    type="text"
                                                                                    maxLength={20}
                                                                                />
                                                                            </div>
                                                                            <p>
                                                                                You will get <span>{afiAmount}</span> RWT
                                                                            </p>
                                                                        </div>
                                                                        {
                                                                            address &&

                                                                            <>
                                                                                <button
                                                                                    type="submit"
                                                                                    className="btn btn-primary rel cw"
                                                                                    id="btn-submit"
                                                                                    style={{
                                                                                        float: "left",
                                                                                        margin: 0,
                                                                                        padding: "14px 21px",
                                                                                        color: "#ffffff",
                                                                                        textTransform: "uppercase",
                                                                                        display: "table",
                                                                                        borderWidth: 2,
                                                                                        borderRadius: 30,
                                                                                        left: 15,
                                                                                        position: "relative",
                                                                                        borderColor: "#ddb053 !important",
                                                                                        background: "#cda439",
                                                                                        marginBottom: 30
                                                                                    }}
                                                                                >
                                                                                    BUY
                                                                                </button>
                                                                            </>
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div id="prepare">
                                                                    {address ?
                                                                        <button
                                                                            onClick={disconnect}
                                                                            className="btn btn-primary rel cw"
                                                                            id="btn-disconnect"
                                                                            style={{
                                                                                float: "left",
                                                                                margin: 0,
                                                                                padding: "14px 21px",
                                                                                color: "#ffffff",
                                                                                textTransform: "uppercase",
                                                                                display: "table",
                                                                                borderWidth: 2,
                                                                                borderRadius: 30,
                                                                                left: 15,
                                                                                position: "relative",
                                                                                borderColor: "#ddb053 !important",
                                                                                background: "#cda439",
                                                                                marginBottom: 30
                                                                            }}
                                                                        >
                                                                            Disconnect wallet
                                                                        </button>
                                                                        :
                                                                        <button
                                                                            onClick={connect}
                                                                            className="btn btn-primary rel cw"
                                                                            id="btn-connect"
                                                                            style={{
                                                                                float: "left",
                                                                                margin: 0,
                                                                                padding: "14px 21px",
                                                                                color: "#ffffff",
                                                                                textTransform: "uppercase",
                                                                                display: "table",
                                                                                borderWidth: 2,
                                                                                borderRadius: 30,
                                                                                left: 15,
                                                                                position: "relative",
                                                                                borderColor: "#ddb053 !important",
                                                                                background: "#cda439",
                                                                                marginBottom: 30
                                                                            }}
                                                                        >
                                                                            Connect wallet
                                                                        </button>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="rt-space" />
                                                        </div>
                                                    </div>
                                                    <div className="rt-space" />
                                                    <div className="rt-space" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <hr />
                            </div>
                        </div>
                        <style
                            dangerouslySetInnerHTML={{
                                __html:
                                    "\n               tspan {\n                  color: #FFF !important\n               }\n\n               .full-width {\n                  width: 100%\n               }\n\n               .test {\n                  background-size: 100%;\n                  height: 300px;\n                  width: 100%\n               }\n            "
                            }}
                        />
                    </div>
                    {/* .d-flex */}
                </div>
                {/* .container */}
            </div>

        </>
    )

}
