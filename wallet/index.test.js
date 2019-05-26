const Wallet = require('./index');
const Transaction = require('./transaction')
const { verifySignature } = require('../util')

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

});