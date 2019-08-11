import React, { Component } from 'react'
import 'regenerator-runtime/runtime'
import { Web3Client } from './api/web3'
import BounceLoader from 'react-spinners/BounceLoader'
import DetectMetamask from './components/detect-metamask'
import Phaser from 'phaser'
import playGame from './game'

export const config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: 400,
  height: 600,
  scene: playGame,
  physics: {
    default: 'matter',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  }
}

const game = new Phaser.Game(config)

class App extends React.Component {
  state = {
    isConnected: false,
    loading: true,
    provider: 'None',
    networkType: 'None',
    balance: 0,
    transactionReceipt: ''
  }

  componentDidMount() {
    if(!Web3Client.metamaskInstalled())
      return

    Web3Client.getInstance()
      .then( async (web3Client) => {
        const accountId = await web3Client.getAccountId()
        if(accountId) {
          this.setState({
            loading: false,
            isConnected: true,
            provider: web3Client.getProviderName(),
            networkType: await web3Client.getNetworkType(),
            balance: await web3Client.getBalance(),
            accountId: await web3Client.getAccountId()
          })

          const scoreContract = await web3Client.getContractInstance()
          const contract = new web3Client.web3.eth.Contract(scoreContract.abi, scoreContract.address);
          const res = await contract.methods.setScore(55).send({ from: accountId})
          // console.log('setScore', res)

          const web3 = web3Client.web3
          const receipt = await web3.eth.getTransactionReceipt(res.transactionHash)
          this.setState({transactionReceipt: JSON.stringify(receipt, null, 2) })
          // console.log('receipt', receipt)
        }
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Crypto Stacker</h1>
        </header>
        <div className="row">
          <div className="col">
            <div id="game"></div>
          </div>
          <div className="col">
            <p>React version { React.version }</p>
            <DetectMetamask></DetectMetamask>
            Ethereum Blockchain Connection:
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
            <pre className="receipt">
              Transaction Receipt:
              {this.state.transactionReceipt}
            </pre>
          </div>
        </div>
      </div>
    )
  }
}

export default App