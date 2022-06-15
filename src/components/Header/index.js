import React from 'react';

export const Header = ({ address, ethBalance, disconnect }) => {

    return (
        <>
            <div className="topbar">
                <div className="topbar-md d-lg-none">
                    <div className="container-fluid">
                        <div className="d-flex align-items-center justify-content-between">
                            <a href="" className="toggle-nav">
                                <div className="toggle-icon">
                                    <span className="toggle-line" />
                                    <span className="toggle-line" />
                                    <span className="toggle-line" />
                                    <span className="toggle-line" />
                                </div>
                            </a>
                            {/* .toggle-nav */}
                            <div className="site-logo">
                                <a href="" className="site-brand">
                                    <img
                                        src="https://icodev.space/rwt/public/uploads/2021/08/logo-2.png"
                                        alt="logos"
                                        style={{ maxHeight: 80 }}
                                    />
                                </a>
                            </div>
                            {/* .site-logo */}
                            <ul></ul>
                            <div className="dropdown topbar-action-item topbar-action-user">
                                <a href="" data-toggle="dropdown">
                                    <img className="icon" src="files/user-thumb-sm.png" alt="thumb" />
                                </a>
                                {
                                    address ?
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <div className="user-dropdown">
                                                <div className="user-dropdown-balance">
                                                    <h6>BALANCE</h6>
                                                    <h3>{ethBalance} BNB</h3>
                                                </div>
                                                <div className="gaps-1x" />
                                                <ul className="user-dropdown-links">
                                                    <li>
                                                        <a onClick={disconnect} href="#">
                                                            <i className="ti ti-power-off" /> Disconnect{" "}
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        :
                                        null}
                            </div>
                            {/* .toggle-action */}
                        </div>
                        {/* .container */}
                    </div>
                    {/* .container */}
                </div>
                {/* .topbar-md */}
                <div className="container-fluid">
                    <div className="d-lg-flex align-items-center justify-content-between">
                        <div className="topbar-lg d-none d-lg-block">
                            <div className="site-logo">
                                <a
                                    href=""
                                    taregt=""
                                    className="site-brand"
                                >
                                    <img
                                        src="https://icodev.space/rwt/public/uploads/2021/08/logo-2.png"
                                        alt="logo"
                                        style={{ maxHeight: 80 }}
                                    />
                                </a>
                            </div>
                            {/* .site-logo */}
                        </div>
                        {/* .topbar-lg */}
                        <p></p>
                        <div className="topbar-action d-none d-lg-block">
                            <ul className="topbar-action-list">
                                <li className="topbar-action-item"></li>
                                <li className="topbar-action-item topbar-action-link">
                                    <a href="">
                                        <em className="ti ti-home" />
                                        Go to Home
                                    </a>
                                </li>
                                {/* .topbar-action-item */}
                                <li className="dropdown topbar-action-item topbar-action-user">
                                    <a href="#" data-toggle="dropdown">
                                        <img className="icon" src="user-thumb-sm.png" alt="thumb" />
                                    </a>
                                    {
                                        address ?
                                            <div className="dropdown-menu dropdown-menu-right">
                                                <div className="user-dropdown">
                                                    <div className="user-dropdown-head">
                                                        <h6 className="user-dropdown-name"> HOLDER </h6>
                                                    </div>
                                                    <div className="user-dropdown-balance">
                                                        <h6>BALANCE</h6>
                                                        <h3>{ethBalance} BNB</h3>
                                                    </div>
                                                    <div className="gaps-1x" />
                                                    <ul className="user-dropdown-links">
                                                        <li>
                                                            <a onClick={disconnect} href="#">
                                                                <i className="ti ti-power-off" /> Disconnect{" "}
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            null}
                                </li>
                                {/* .topbar-action-item */}
                            </ul>
                            {/* .topbar-action-list */}
                        </div>
                        {/* .topbar-action */}
                    </div>
                    {/* .d-flex */}
                </div>
                {/* .container */}
            </div>

        </>
    )
}
