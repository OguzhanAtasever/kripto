const Transaction = require('./transaction');
const { STARTING_BALANCE} = require('../config');
const { ec, cryptoHash}= require('../util');
class Wallet{
    constructor(){
        this.balance= STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode('hex');

    }

    sign(data){
        return this.keyPair.sign(cryptoHash(data))
    }

    createTransaction({recipent, amount}){
        if( amount > this.balance)
        {
            throw new Error('Amount exceeds balance');
        }   
        return new Transaction({senderWallet: this, recipent, amount});
 }
}
module.exports = Wallet; 