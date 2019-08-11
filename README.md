# Crypto Stacker

Classic Stacker game. User submits their high score to a blockchain through a Solidity contract.

![Alt text](screenshots/main.png?raw=true "Crypto game screenshot")

## Requirements

- Node >= 8.0.0 <= 11.15.0
- Yarn - on Mac install with `brew install yarn`
- Truffle - install with `yarn global add truffle`

## Install

1. Clone the repo
```
git clone git@github.com:mickeyren/cryptostacker.git
```

2. Install the game and test dependencies with `yarn`

```
yarn
```

## Usage

1. Start truffle:

```
cd truffle && truffle develop
```

2. In the truffle prompt, deploy the contract

```
deploy
```

3. Run the crypto game

```
yarn dev
```

## Metamask connection

Make sure your Metamask is connected to your local Truffle server.

![Alt text](screenshots/customrpc.png?raw=true "Custom RPC")

## Production

To build for production:

```
yarn build
```

Parcel will create a `dist` folder containing all the necessary files. You can deploy this anywhere that serve static assets.

## Tech Stack
- [React 16.8.6](https://github.com/facebook/react) - JS component-based framework for building the UI.
- [Phaser3.18.1](https://github.com/photonstorm/phaser/releases) - 2D game framework use to build the game
- [Jest](https://github.com/facebook/jest) - JS testing framework
- [Enzyme](https://github.com/airbnb/enzyme) - makes testing React components easier
- [jest-canvas-mock](https://github.com/hustcc/jest-canvas-mock) - for testing Canvas
- [@babel/plugin-proposal-class-properties](https://babeljs.io/docs/en/babel-plugin-proposal-class-properties) - allow declaration of `state` in your class instead of in the `constructor`
- [Parcel](https://github.com/parcel-bundler/parcel) - build and bundling tool
- [web3.js](https://github.com/ethereum/web3.js/) - ethereum JS api
- [truffle](https://github.com/trufflesuite/truffle) - tool for developing smart contracts
- [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts) - interface for the ERC721