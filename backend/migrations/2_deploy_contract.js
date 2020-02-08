
var Supplier = artifacts.require("./SafeRemotePurchase.sol");

module.exports = function(deployer) {

    /* IN TEST NETWORK, AMOUNT OF GAS IS AT DEVELOPER'S DISCRETION */
    deployer.deploy(Supplier, {gas: 2000000})
}
