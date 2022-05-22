# To run

1. run `cd ethereum`
2. run `yarn compile`
3. run `yarn deploy --network rinkeby`
4. the output should look something like this

```javascript
Deploying contracts with the account: 0xf17aFe5237D982868B8A97424dD79a4A50c36412
Deployed WETH9 contract on address:  0x1eA4E8dbbeFFB02b06206Cb5646A544c155538A9
Deployed ICO contract on address:  0xeCD1E3Ad1e2D4d6EbE5A0868224AD2331B5206C4
Deployed SCM contract on address:  0x4d3915A4FD5f2DC44A51F61f18A7c8cCb6904e65
Done in 35.08s.
```

5. Copy those addresses somewhere
6. run `cd ../client-app`
7. Go to file `src/constants/tokens` and replace the addresses for WETH, ICO and SCM
8. run `yarn dev` to start the client app
