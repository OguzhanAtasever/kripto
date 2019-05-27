const Wallet = require('./index');
const Transaction = require('./transaction')
const { verifySignature } = require('../util')
const Blockchain = require('../blockchain');
const {STARTING_BALANCE} = require('../config');

describe('Wallet',() =>{
    let wallet;

    beforeEach(()=>{
        wallet = new Wallet();
    });

    it('has `balance`',()=>{
        expect(wallet).toHaveProperty('balance');
    })
    it('has a`publikKey`',()=>{
        expect(wallet).toHaveProperty('publicKey');
    });
    describe('singing data',()=>{
        const data = 'foobar';
        it('verifies a signature',()=> {
            expect(
                verifySignature({
                publicKey: wallet.publicKey, 
                data,
                signature: wallet.sign(data)
                })
            ).toBe(true);            
        });
        it('does not verifiy an invalid signature',()=>{
            expect(
                verifySignature({
                publicKey:wallet.publicKey, 
                data,
                signature: new Wallet().sign(data)
                })
            ).toBe(false);
        });
    });
  

    describe('createTransaction()',()=>{
        describe('and the amount exceeds the balance',()=>{
            it('throws an error',() => {
                expect(() => wallet.createTransaction({amount: 999999 , recipent: 'foo-recipent'}))
                    .toThrow('Amount exceeds balance');
            });
        });

        describe('and the amount is valid',()=>{
            let transaction,amount,recipent;

            beforeEach(()=>{
                amount = 50;
                recipent = 'foo-recipent';
                transaction = wallet.createTransaction({amount, recipent});

            });
            it('creates an instance of `Transaction`',()=>{
                expect(transaction instanceof Transaction).toBe(true);
            });
            it('marches the transaction input with the wallet',()=>{
                expect(transaction.input.address).toEqual(wallet.publicKey);
            });
            it('outputs the amount the recipent',()=>{
                expect(transaction.outputMap[recipent]).toEqual(amount);
            });
        });
    });

    describe('calculateBalance()',()=>{
        let blockchain;

        beforeEach(() => {
            blockchain = new Blockchain();
        });

        describe('and there are no outputs for the wallet',() => {
            it('returns the `STARTING_BALANCE`',() => {
                expect(
                    Wallet.calculateBalance({
                        chain : blockchain.chain,
                        address : wallet.publicKey
                    })
                ).toEqual(STARTING_BALANCE)                
            });
        });
        describe('and there are outputs for the wallet',() => {
            let transactionOne, transactionTwo;

            beforeEach(() =>{
                transactionOne = new Wallet().createTransaction({
                    recipent: wallet.publicKey,
                    amount:50
                });
                transactionTwo = new Wallet().createTransaction({
                    recipent: wallet.publicKey,
                    amount: 60
                });

                blockchain.addBlock({ data: [transactionOne,transactionTwo] });
            });
            it('adds the sum all outputs to the wallet balance',() => {
                expect(Wallet.calculateBalance({
                    chain: blockchain.chain,
                    address: wallet.publicKey
                })).toEqual(
                    STARTING_BALANCE +
                    transactionOne.outputMap[wallet.publicKey] +
                    transactionTwo.outputMap[wallet.publicKey]
                    );
            });            
        });
    });
});