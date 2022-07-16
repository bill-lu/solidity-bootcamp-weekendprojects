// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC721} from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

interface IERC20MintableBurnable is IERC20 {
    function mint(address, uint256) external;

    function burnFrom(address, uint256) external;
}

interface IERC721MintableBurnable is IERC721 {
    function safeMint(address, uint256) external;

    function burn(uint256) external;
}

contract Shop is Ownable {
    uint256 public purchaseRatio;
    uint256 public mintPrice;
    uint256 public ownerPool;
    uint256 public publicPool;
    IERC20MintableBurnable public paymentToken;
    IERC721MintableBurnable public collection;

    constructor(
        uint256 _purchaseRatio,
        uint256 _mintPrice,
        address _paymentToken,
        address _collection
    ) {
        purchaseRatio = _purchaseRatio;
        mintPrice = _mintPrice;
        paymentToken = IERC20MintableBurnable(_paymentToken);
        collection = IERC721MintableBurnable(_collection);
    }

    function purchaseTokens() public payable {
        paymentToken.mint(msg.sender, msg.value / purchaseRatio);
    }

    function returnTokens(uint256 amount) public {
        paymentToken.burnFrom(msg.sender, amount);
        payable(msg.sender).transfer(amount * purchaseRatio);
    }

    function purchaseNft(uint256 tokenId) public {
        paymentToken.transferFrom(msg.sender, address(this), mintPrice);
        uint256 ownerShare = mintPrice / 2;
        ownerPool += ownerShare;
        publicPool += mintPrice - ownerShare;
        collection.safeMint(msg.sender, tokenId);
    }

    function returnNft(uint256 tokenId) public {
        collection.burn(tokenId);
        uint256 returnValue = mintPrice / 2;
        paymentToken.transfer(msg.sender, returnValue);
        publicPool -= returnValue;
    }

    function ownerWithdraw(uint256 amount) public onlyOwner {
        require(amount <= ownerPool);
        ownerPool -= amount;
        paymentToken.transfer(msg.sender, amount);
    }
}
