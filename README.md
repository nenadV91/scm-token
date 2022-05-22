# To run

1. run `cd ethereum` and `yarn`
2. rename the `.env.example` file to `.env` and provide your private Rinkeby account key and alchemy api key

- Private Rinkeby key you can get from Metamask wallet
- Alchemy api key you can get from https://dashboard.alchemyapi.io/

3. run `yarn compile`
4. run `yarn deploy --network rinkeby`. This will deploy contracts and save addresses in to addresses.json file in the client
5. run `cd ../client-app`
6. rename the `.env.example` file to `.env` and provide the infura key for rinkeby

- Infura key you can get from https://infura.io/dashboard

6. run `yarn dev` to start the client app
