const { ethers } = require("ethers");
const bip39 = require("bip39");
const hdkey = require("ethereumjs-wallet").hdkey;

const provider = new ethers.JsonRpcProvider('https://sepolia.infura.io/v3/YourApiKey');

async function generateWallet() {
  const mnemonic = bip39.generateMnemonic();
  console.log("Mnemonic:", mnemonic);

  const seed = await bip39.mnemonicToSeed(mnemonic);
  const hdWallet = hdkey.fromMasterSeed(seed);
  
  const paths = [
    "m/44'/60'/0'/0/0", // Address 1
    "m/44'/60'/0'/0/1", // Address 2
    "m/44'/60'/0'/0/2"  // Address 3
  ];

  for (let path of paths) {
    const wallet = hdWallet.derivePath(path).getWallet();
    const address = wallet.getAddressString();

    console.log(`Fetching balance for address: ${address}`);

    try {
      const balance = await provider.getBalance(address);
      if (balance) {
        console.log(`Address: ${address}`);
        console.log("Balance:", ethers.utils.formatEther(balance));
      } else {
        console.log(`No balance found for address: ${address}`);
      }
    } catch (err) {
      console.log(`Error fetching balance for address ${address}:`, err.message);
    }
  }
}

generateWallet();
