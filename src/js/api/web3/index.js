import Web3 from 'web3'
import Contract from 'truffle-contract'

let web3, web3Provider, accountId

export const init = async () => {
  if (window.ethereum) {
      try {
          // Request account access if needed
          await ethereum.enable()
          web3Provider = ethereum
      } catch (error) {
        // User denied account access...
      }
  } else if(window.web3) {
    web3Provider = web3.currentProvider
  } else {
    // If no injected web3/metamask instance is detected, fallback to Truffle
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545')
  }

  web3 = new Web3(web3Provider)
  return web3.eth.net.isListening()
}

export const getAccountId = async () => {
  if(!accountId) {
    const accounts = await web3.eth.getAccounts()
    accountId = accounts[0]
  }
  return accountId
}

export const getProviderName = () => {
  return web3Provider.constructor.name
}

export const getBalance = async () => {
  const accountId = await getAccountId()
  const balance = await web3.eth.getBalance(accountId)
  return web3.utils.fromWei(balance, 'ether')
}

export const getNetworkType = async () => {
  const networkType = await web3.eth.net.getNetworkType()
  return networkType
}

export const getContractInstance = async () => {
  const scoreToken = require('../../../contracts/ScoreToken.json')
  console.log('scoreToken', scoreToken)
  const scoreTokenContract = Contract(scoreToken)
  scoreTokenContract.setProvider(web3Provider)

  // const artifact = artifacts.require(contractName) // globally injected artifacts helper
  // const deployedAddress = artifact.networks[artifact.network_id].address
  // const instance = new web3.eth.Contract(artifact.abi, deployedAddress)
  const instance = await scoreTokenContract.deployed()
  return instance
}

export const getWeb3 = () => {
  return web3
}