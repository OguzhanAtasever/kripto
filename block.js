const { GENESIS_DATA } = require('./config');

class Block {
    constructor({timestamp,lastHash,hash,data}){ //blockların yapıcı metodu özellikler burada olacak
        this.timestamp = timestamp; // zaman damgası
        this.lastHash = lastHash; //bir önceki bloğun hash kodu
        this.hash = hash; // kendi hash kodu    
        this.data = data; // data
       
    }
    
    static genesis() {
        return new this(GENESIS_DATA);
    }
}
module.exports  = Block;