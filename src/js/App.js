import React from 'react'
import Web3 from 'web3'
import 'regenerator-runtime/runtime'

window.addEventListener('load', async () => {
  let web3Provider
  if (window.ethereum) {
      try {
          // Request account access if needed
          await ethereum.enable()
          web3Provider = ethereum
          document.getElementById('provider').textContent = web3Provider.constructor.name
      } catch (error) {
        // User denied account access...
      }
  } else if(window.web3) {
    web3Provider = web3.currentProvider
    document.getElementById('provider').textContent = web3Provider.constructor.name
  } else {
    // If no injected web3/metamask instance is detected, fallback to Truffle
    web3Provider = new Web3.providers.HttpProvider('http://localhost:9545')
    document.getElementById('provider').textContent = 'HttpProvider'
  }

  const web3 = new Web3(web3Provider)
  web3.eth.net.isListening()
   .then(() => console.log('is connected'))
   .catch(e => console.log('Wow. Something went wrong'));

  console.log('web3Provider is', web3 )
})

const App = () => {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p id="provider"></p>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
}

export default App