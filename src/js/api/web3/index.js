import Web3 from 'web3'
import Contract from 'truffle-contract'

let web3, web3Provider, accountId

let instance = null
export class Web3Client {
  contructor() {
    if(!instance) {
      instance = this
    }

    return instance
  }

  static async getInstance() {
    const web3Client = new Web3Client()
    await web3Client.init()
    return web3Client
  }

  static metamaskInstalled() {
    return window.ethereum || window.web3
  }

  async getAccountId() {
    if(!this.accountId) {
      const accounts = await this.web3.eth.getAccounts()
      this.accountId = accounts[0]
    }
    return this.accountId
  }

  async isListening() {
    const result = await this.web3.eth.net.isListening()
    return result
  }

  async connectMetamask() {
    await ethereum.enable()
  }

  getProviderName() {
    return this.web3Provider.constructor.name
  }

  async getBalance() {
    const accountId = await this.getAccountId()
    const balance = await this.web3.eth.getBalance(accountId)
    return this.web3.utils.fromWei(balance, 'ether')
  }

  async getNetworkType() {
    const networkType = await this.web3.eth.net.getNetworkType()
    return networkType
  }

  async getContractInstance() {
    const scoreToken = require('../../../../truffle/build/contracts/ScoreToken.json')
    const scoreTokenContract = Contract(scoreToken)
    scoreTokenContract.setProvider(this.web3Provider)

    // const artifact = artifacts.require(contractName) // globally injected artifacts helper
    // const deployedAddress = artifact.networks[artifact.network_id].address
    // const instance = new web3.eth.Contract(artifact.abi, deployedAddress)
    const instance = await scoreTokenContract.deployed()
    return instance
  }

  async init() {
    if (window.ethereum) {
      try {
          // Request account access if needed
          //await ethereum.enable()
          this.web3Provider = ethereum
      } catch (error) {
        // User denied account access...
      }
    } else if(window.web3) {
      this.web3Provider = web3.currentProvider
    } else {
      // If no injected web3/metamask instance is detected, fallback to Truffle
      this.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545')
    }

    this.web3 = new Web3(this.web3Provider)
  }
}

