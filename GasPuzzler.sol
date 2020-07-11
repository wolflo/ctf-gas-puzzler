/// original contract:
// https://ropsten.etherscan.io/address/0x9bc38b4a308fc70ea0f6663f06d1be7fd5175d50

/// init code:
// note that the last 2 bytes of the swarm hash were replaced with a jumpdest
// and a push instruction. Etherscan does not verify the contents of the swarm
// hash, so this is reachable and executable code that does not exist in the
// solidity source code
// 608060405260e4806100126000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063890d6908146044575b600080fd5b348015604f57600080fd5b5060566058565b005b3373ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f1935050505015801560b4573d6000803e3d6000fd5b505a5600a165627a7a72305820bf23e953e415fc69d1c483ab2461fd6cf7f9d5c31ed848df49eecb4e0f075b7a0029

/// verified source code:
/**
 *Submitted for verification at Etherscan.io on 2020-07-11
*/

pragma solidity ^0.4.0;

/**
 * GasPuzzler or GasGuzzler amirite?
 */
contract GasPuzzler {
    constructor() public payable {}

    function solve() public {
        msg.sender.transfer(address(this).balance);

        assembly {
            jump(gas)
        }
    }
}
