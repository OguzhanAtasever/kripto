const Wallet = require('./index');

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
});