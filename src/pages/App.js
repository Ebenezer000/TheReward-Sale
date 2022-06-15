import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { RoutePages } from '../components/RoutePages';
import BodyWrapper from '../components/BodyWrapper';
import { ethereum } from '../constants';
import { isMobile } from 'react-device-detect';

if(!isMobile){
  ethereum.autoRefreshOnNetworkChange = false;
}

export default function App() {
  return (
    <Router>
      <BodyWrapper>
          <RoutePages />
      </BodyWrapper>
    </Router>
  )
}

