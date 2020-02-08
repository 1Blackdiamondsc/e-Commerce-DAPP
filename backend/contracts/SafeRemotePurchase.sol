pragma solidity ^0.5.0;

contract SafeRemotePurchase {

  event SellerAdded(uint idItem);  //used in market page for getting all seller details
  event BuyerAdded(uint idItem); //used in process order page for getting buyer details
  event OrderReceived(uint idItem); //used in market page to disable confirm button
  struct Item {
    uint idItem;
    string sellerHash;
    string buyerHash;
    uint productPrice;
    uint totalPrice;
    address payable sellerAddress;
    address payable buyerAddress;
  }

  //count number of product available in market
  uint numberOfItemAvailableForSale;

  //Mapping
  mapping(uint=>Item) items;

  //Set and get Seller hash for perticular product
  function addSellerHash(string memory sellerHash) public {
    uint idItem = numberOfItemAvailableForSale++;
    items[idItem].sellerHash = sellerHash;
    emit SellerAdded(idItem);
  }
   function getSellerHash(uint idItem) public view returns (string memory) {
    return items[idItem].sellerHash;
  }

  //Set and get Buyer Hash for perticular product
  function addBuyerHash(string memory buyerHash, uint idItem) public {
    items[idItem].buyerHash = buyerHash;
    emit BuyerAdded(idItem);
  }

   function getBuyerHash(uint idItem) public view returns (string memory) {
    return items[idItem].buyerHash;
  }

  /* main bussiness logic  */

  //for seller payment
  function sellerPayment() public payable {
    uint idItem = numberOfItemAvailableForSale;
    items[idItem].productPrice = msg.value/2;
    items[idItem].sellerAddress = msg.sender;
    items[idItem].totalPrice = msg.value;
  }

  //for buyer payment
  function buyerPayment(uint idItem) public payable {
    require(msg.value == 2*items[idItem].productPrice,"Please deposite double value");
    items[idItem].buyerAddress = msg.sender;
    items[idItem].totalPrice += msg.value;
  }

  // once buyer confirm the order
  function confirmOrder(uint idItem) public {
    require(items[idItem].buyerAddress == msg.sender,"only authorised user can confirm it.");
    require(items[idItem].totalPrice == items[idItem].productPrice*4,"Please do Payment First then confirm it.");
    items[idItem].buyerAddress.transfer(items[idItem].productPrice);
    items[idItem].sellerAddress.transfer(items[idItem].totalPrice - items[idItem].productPrice);
    emit OrderReceived(idItem);
  }

  // get seller address
  function getSellerAddress(uint idItem) public view returns(address sellerAddress) {
    sellerAddress = items[idItem].sellerAddress;
  }

  // get buyer address
  function getBuyerAddress(uint idItem) public view returns(address buyerAddress) {
    buyerAddress = items[idItem].buyerAddress;
  }

  //get Total price
  function getTotal(uint idItem ) public view returns(uint total) {
    total = items[idItem].totalPrice;
  }

}
