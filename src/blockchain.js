// ./src/blockchain.js

// * Contains the class definition for a blockchain.



// * Imports

const Block = require("./block"); // Our class definition for a block



class Blockchain {

    constructor() {

        // Chain array contains all blocks in our copy of the blockchain

        this.chain = [new Block(Array(65).join("0"))]; // Create genesis block

    }

    // Returns the last block in the chain

    getLastBlock() {

        return this.chain[this.chain.length - 1];

    }

    // Returns the length of our chain

    getChainLength() {

        return this.chain.length;

    }

    // Adds a new block to the chain

    addBlock() {

        // Mine a new block with the previous block's hash

        let newBlock = new Block(this.getLastBlock().hash, global.transactions);



        // Let's add the new block to the chain, and make it immutable

        this.chain.push(Object.freeze(newBlock));

    }

    // Validates the chain

    isChainValid(blockchain = this) {

        // Iterate over the chain, skipping the genesis block (i=1)

        for (let i = 1; i < blockchain.chain.length; i++) {

            const currentBlock = blockchain.chain[i];

            const prevBlock = blockchain.chain[i - 1];



            // Validate the current block's hash from the previous

            if (

                // Check the hash, which was mined

                currentBlock.hash !== currentBlock.getHash() ||

                // Check that the current block's prevHash matches

                prevBlock.hash !== currentBlock.prevHash

            ) {

                return false;

            }



            // Check the hash validity

            let checkString = Array(global.difficulty + 1).join("0");

            if (!currentBlock.hash.startsWith(checkString)) {

                return false;

            }

        }



        // At this point, all the blocks in the chain line up with hashes

        //  so the chain is valid

        return true;

    }

    // Update the chain with a new blockchain

    replaceChain(newChain) {

        // Check the length of the new chain

        if (newChain.length <= this.chain.length) return;



        // Check that the new chain is valid

        if (!this.isChainValid(newChain)) return;



        // The new chain is valid, and longer, so let's replace ours

        this.chain = newChain;

    }

    // Returns a string representation of the blockchain

    prettify() {

        let chainStr = "";

        for (let i = 0; i < this.chain.length; i++) {

            chainStr += this.chain[i].prettify();

            chainStr += "<br><hr>";

        }

        return chainStr;

    }

}



// Export this object to be used elsewhere

module.exports = Blockchain;