import React from 'react'
import { Web3Client } from '../api/web3'

import imgMetamask from '../../img/metamask.png'

const imgStyle = {
  width: '300px'
}

export default class DetectMetamask extends React.Component {
  state = {
    noWeb3: true,
    locked: true
  }

  constructor(props) {
    super(props)
    this.connectMetamask = this.connectMetamask.bind(this)
  }

  componentWillMount() {
   if(Web3Client.metamaskInstalled()) {
     this.setState({noWeb3: false})

     Web3Client.getInstance()
      .then( async (web3Client) => {
        this.web3Client = web3Client
         const accountId = await web3Client.getAccountId()
         if(accountId) {
           this.setState({locked: false})
         }
      })
    }
  }

  connectMetamask() {
    this.web3Client.connectMetamask()
      .then( res => {
        console.log('connected', res)
      })
  }

  render() {
    return(
      <div>
      { this.state.noWeb3 &&
        <div>
          <p>In order to play and submit your score, you will need to install <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">MetaMask</a>.</p>
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank"><img src={imgMetamask} style={imgStyle} /></a>
          <p>Once installed, <a href=".">try again</a>.</p>
        </div>
      }
      { ! this.state.noWeb3 && this.state.locked &&
        <div>
          <p>Your MetaMask is locked!</p>
          <button onClick={this.connectMetamask}>Connect</button>
          <p>Please open MetaMask and follow the instructions to unlock it.</p>
          <p>Once unlocked, <a href=".">try again</a>.</p>
        </div>
      }
      </div>
    )
  }
}