const Block = require('./block');
const { GENESIS_DATA } = require('./config');
describe ('Block',()=>{
    const timestamp='zaman damgası';
    const lastHash='öylesine bir hash';
    const hash='kendi hashi';
    const data=['block','chain'];


    const block = new Block ({timestamp,lastHash,hash,data});

    it('has timestamp, lasthash, hash, data',() =>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });
    describe('genesis()',()=>{
        const genesisBlock = Block.genesis();

        console.log('genesisBlock',genesisBlock);

        it('returns a Block instance',()=>{
            expect(genesisBlock instanceof Block).toBe(true);

        });
        it('returns the genesis data',()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);

        });
    });

    describe('mineBlock()', ()=>{
        const lastBlock = Block.genesis();
        const data = 'minde data';
        const mindeBlock = Block.mindeBlock({lastBlock,data});

        it('returns a block instance', () => {
            expect(mindeBlock instanceof Block).toBe(true);

        });
        
    });

});