// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BaseNerdz is ERC721 {
    uint16 constant MAX_SUPPLY = 777;
    uint256 constant MINT_FEE = 0.0025 ether;
    string constant NAME = "BaseNerdz";
    string constant SYMBOL = "BN";

    bool private s_isSaleActive;
    uint256 private s_tokenId;

    mapping(uint256 => string) private s_tokenIdToUri;

    constructor() ERC721(NAME, SYMBOL) {
        s_tokenId = 0;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {}
}
