import React, { Component } from 'react'
import 'regenerator-runtime/runtime'
import { Web3Client } from './api/web3'
import BounceLoader from 'react-spinners/BounceLoader'
import DetectMetamask from './components/detect-metamask'
import Phaser from 'phaser'
import playGame from './game'

export const config = {
  type: Phaser.AUTO,
  parent: 'phaser',
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
    balance: 0
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
          // const res = await contract.methods.setScore(55).send({ from: accountId})
          // console.log('setScore', res)

          web3.eth.filter({
            address: scoreContract.address,
            from: 0,
            to: 'latest'
            }).get(function (err, result) {
              console.log(err, result)
          })
        }
      })

    // const web3 = web3Client.getWeb3()

    // var myContract = new web3.eth.Contract(contract.abi, contract.address);
    // console.log(myContract)
    // const res = await myContract.methods.setScore(55).send({ from: this.state.accountId})
    // console.log('setScore', res)
    // const res2 = await myContract.methods.getScore(this.state.accountId).call()
    // console.log('getScore', res2)
    // //contract.totalSupply().then(d => console.log(d))

    // console.log(web3.utils.toWei('0.05', 'ether'))

    // web3.eth.sendTransaction({
    //   from: this.state.accountId,
    //   to: contract.address,
    //   value: web3.utils.toWei('0.05', 'ether')
    // })
    // .on('transactionHash', function(hash){
    //   console.log('transactionHash', hash)
    // })
    // .on('receipt', function(receipt){
    //   console.log('receipt', receipt)
    // })
    // .on('confirmation', function(confirmationNumber, receipt){
    //   console.log('confirmationNumber', confirmationNumber, receipt)
    // })
    // .on('error', (error, receipt) => { console.log('error', error, receipt) } ) // If a out of gas error, the second parameter is the receipt.

    //contract.sendTransaction()
    // contract.send(web3.utils.toWei('0.05', 'ether')).then(function(result) {
    //   console.log('result', result)
    // }).catch(e  => console.log('Transaction failed', e))

    //  const myContract = getInstance('ScoreToken')
    //  console.log(myContract)

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Crypto Stacker</h1>
        </header>
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
      </div>
    )
  }
}

export default App