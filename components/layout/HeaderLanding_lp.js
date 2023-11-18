import dynamic from 'next/dynamic';
import Link from "next/link";
import React, { useState } from "react";
import useClickOutside from './../../util/outsideClick';

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { walletConnectProvider, EIP6963Connector } from '@web3modal/wagmi'

import { WagmiConfig, configureChains, createConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { mainnet } from 'viem/chains'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const ThemeSwitch = dynamic(() => import('../../components/elements/ThemeSwitch'), {
    ssr: false
})
function HeaderLanding() {

    const projectId = '0ace6c3f019d28808c4ce3607cc51741'

    const { chains, publicClient } = configureChains(
        [mainnet],
        [walletConnectProvider({ projectId }), publicProvider()]
      )

    const metadata = {
        name: 'Web3Modal',
        description: 'Web3Modal Example',
        url: 'https://web3modal.com',
        icons: ['https://avatars.githubusercontent.com/u/37784886']
    }

    const wagmiConfig = createConfig({
        autoConnect: true,
        connectors: [
          new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }),
          new EIP6963Connector({ chains }),
          new InjectedConnector({ chains, options: { shimDisconnect: true } }),
          new CoinbaseWalletConnector({ chains, options: { appName: metadata.name } })
        ],
        publicClient
    })

    createWeb3Modal({ wagmiConfig, projectId, chains })

    

    const [isToggled, setToggled] = useState(false);
    const toggleTrueFalse = () => setToggled(!isToggled);
    


    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    const handleToggle = (key) => {
        if (isActive.key === key) {
            setIsActive({
                status: false,
            });
        } else {
            setIsActive({
                status: true,
                key,
            });
        }
    };


    return (
        <>

            <div className="header landing">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="navigation">
                                <nav className="navbar navbar-expand-lg navbar-dark">
                                    <div className="brand-logo">
                                        <Link href="/"><a>
                                            <img src="/images/logo.png" alt="" className="logo-primary" />
                                            <img src="/images/logow.png" alt="" className="logo-white" />
                                        </a></Link>
                                    </div>
                                    <div className={isToggled ? "collapse navbar-collapse show" : "collapse navbar-collapse"}>
                                        
                                    </div>

                                    <div className="signin-btn2 d-flex align-items-center">

                                    <WagmiConfig config={wagmiConfig}>

                                    <w3m-button balance='hide' />
     
                                    </WagmiConfig>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HeaderLanding;
