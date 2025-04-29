
//ethereum etkileşimi 
const {ethers} = require("ethers");
//12,24, kelimeden oluşan seed oluşturma
const bip39 = require("bip39");
//master seedden türetilmiş adresler oluşturma 
const hdkey = require("ethereumjs-wallet").hdkey;




async function generateWallet(){

const mnemonic =  bip39.generateMnemonic();
console.log("Mnemonic",mnemonic);

const seed = await bip39.mnemonicToSeed(mnemonic);

const hdWallet = hdkey.fromMasterSeed(seed);

//bu patrh sayesinde aynı mnemonic ile aynı adres üretilir
const path = "m/44'/60'/0'/0/0"; // ✅ Ethereum'daki ilk hesap için standart yol


const wallet =hdWallet.derivePath(path).getWallet();

const privateKey = wallet.getPrivateKeyString();

const address = wallet.getAddressString();


console.log("Private Key",privateKey);
console.log("Address",address);

}

generateWallet();






