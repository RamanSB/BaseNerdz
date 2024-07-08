// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

/**
 * Contract Elements should be laid out in the following order:
 *     Pragma statements
 *     Import statements
 *     Events
 *     Errors
 *     Interfaces
 *     Libraries
 *     Contracts
 *
 * Inside each contract, library or interface, use the following order:
 *     Type declarations
 *     State variables
 *     Events
 *     Errors
 *     Modifiers
 *     Functions
 *
 *
 * Layout of Functions:
 *     constructor
 *     receive function (if exists)
 *     fallback function (if exists)
 *     external
 *     public
 *     internal
 *     private
 */
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract BaseNerdz is ERC721 {
    uint16 constant MAX_SUPPLY = 777;
    uint256 constant MINT_FEE = 0.0025 ether;
    string constant NAME = "BaseNerdz";
    string constant SYMBOL = "BN";
    string private constant BASE_URI = "https://ipfs.io/ipfs/QmSrewhNEvkJ3122Gup85jJdyUHUZQt22QZVHc1xTKxbFc/";

    bool private s_isSaleActive;
    uint256 private s_tokenId;

    // Events
    event BaseNerdz__MintedNFT(address indexed minter, uint256 indexed tokenId, uint256 amountPaid);

    // Errors
    error BaseNerdz__InsufficientMintAmount(uint256 amount);
    error BaseNerdz__OnlyAllowedOneMint(address minter);
    error BaseNerdz__SaleIsNotActive();

    constructor() ERC721(NAME, SYMBOL) Ownable(msg.sender) {
        s_tokenId = 0;
    }

    /**
     * @dev mint() follows CEI.
     * @notice The mint price of this NFT will be structured as follows:
     * 1. 0.0025 ETH (100 [0-99])
     * 2. 0.005 ETH (200 [100-299])
     * 3. 0.01 ETH (300 [300-599])
     * 4. 0.025 ETH (177 [600-776])
     *
     *  Sale must be active. Users can only mint 1 BaseNerd per wallet.
     */
    function mint() external payable {
        if (!s_isSaleActive) {
            revert BaseNerdz__SaleIsNotActive();
        }
        if (super.balanceOf(msg.sender) > 0) {
            revert BaseNerdz__OnlyAllowedOneMint(msg.sender);
        }
        uint256 mintPrice = MINT_FEE * getMultiplier();
        if (msg.value < mintPrice) {
            revert BaseNerdz__InsufficientMintAmount(msg.value);
        }
        _safeMint(msg.sender, s_tokenId);
        emit BaseNerdz__MintedNFT(msg.sender, s_tokenId, msg.value);
        s_tokenId++;
        if (s_tokenId == MAX_SUPPLY) {
            setIsSaleActive(false);
        }
    }

    function getMultiplier() internal returns (uint8) {
        if (s_tokenId < 100) {
            return 1;
        } else if (s_tokenId >= 100 && s_tokenId < 300) {
            return 2;
        } else if (s_tokenId >= 300 && s_tokenId < 600) {
            return 4;
        } else {
            return 10;
        }
    }

    function _baseURI() internal view override returns (string memory) {
        return BASE_URI;
    }

    function setIsSaleActive(bool saleState) public {
        s_isSaleActive = saleState;
    }
}
