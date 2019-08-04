import React, { Component } from 'react'
import 'regenerator-runtime/runtime'
import * as web3Client from './api/web3'

import BounceLoader from 'react-spinners/BounceLoader';

class App extends React.Component {
  state = {
    isConnected: false,
    loading: true,
    provider: 'None',
    networkType: 'None',
    balance: 0
  }

  componentDidMount() {
    web3Client.init()
    .then( async () => {
      this.setState({
        loading: false,
        isConnected: true,
        provider: web3Client.getProviderName(),
        networkType: await web3Client.getNetworkType(),
        balance: await web3Client.getBalance(),
        accountId: await web3Client.getAccountId()
     })
    })
    .catch(e => console.log('Wow. Something went wrong', e))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Crypto Stacker</h1>
        </header>
        <p>React version { React.version }</p>
        Connection:
        <BounceLoader
          css={`display:inline;`}
          sizeUnit={'rem'}
          size={1}
          color={this.state.loading?'red':'green'}
        />
        { this.state.isConnected &&
          <div>
            <p>Account Id: { this.state.accountId }</p>
            <p>Provider: { this.state.provider }</p>
            <p>Network type: { this.state.networkType }</p>
            <p>Balance: { this.state.balance }</p>
          </div>
        }
      </div>
    )
  }
}

export default App