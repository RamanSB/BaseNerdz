// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {DeployBaseNerdz} from "../../script/DeployBaseNerdz.s.sol";
import {BaseNerdz} from "../../src/BaseNerdz.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract BaseNerdzTest is Test {
    using Strings for uint256;

    address OWNER = 0x1804c8AB1F12E6bbf3894d4083f33e07309d1f38;
    BaseNerdz baseNerdz;

    uint256 INITIAL_USER_BALANCE = 10 ether;
    uint256 INITIAL_MINT_FEE = 0.0025 ether;
    uint256 MAX_SUPPLY = 777;
    address USER = makeAddr("userA");

    function setUp() public {
        DeployBaseNerdz deployer = new DeployBaseNerdz();
        vm.deal(USER, INITIAL_USER_BALANCE);
        baseNerdz = deployer.run();
    }

    function testUserCanMintWhenSaleIsActiveAndTokenIdBelowMaxSupply() public {
        // given
        vm.prank(OWNER);
        baseNerdz.setIsSaleActive(true);
        assert(baseNerdz.getActiveSale() == true);
        uint256 tokenId = baseNerdz.getTokenId();
        assert(tokenId < MAX_SUPPLY);
        uint256 price = baseNerdz.getPrice();
        assert(price == INITIAL_MINT_FEE);
        // when
        vm.startPrank(USER);
        baseNerdz.mint{value: INITIAL_MINT_FEE}();
        vm.stopPrank();
        // then - User is owner of that token & assert tokenURI format
        address owner = baseNerdz.ownerOf(tokenId);
        assertEq(owner, USER);
        string memory tokenURI = baseNerdz.tokenURI(0);
        string memory expectedTokenURI = string.concat(baseNerdz.getBaseURI(), uint256(0).toString());
        assert(keccak256(abi.encode(tokenURI)) == keccak256(abi.encode(expectedTokenURI)));
    }

    function testUserCannotMintWhenSaleIsInactive() public {
        // given
        assert(baseNerdz.getActiveSale() == false);
        uint256 tokenId = baseNerdz.getTokenId();
        assert(tokenId < MAX_SUPPLY);
        uint256 price = baseNerdz.getPrice();
        assert(price == INITIAL_MINT_FEE);
        // when
        vm.startPrank(USER);
        vm.expectRevert(BaseNerdz.BaseNerdz__SaleIsNotActive.selector);
        baseNerdz.mint{value: INITIAL_MINT_FEE}();
        vm.stopPrank();
    }

    function testUserCannotMintIfTheyAlreadyHaveMinted() public {
        // given - user has already minted a BaseNerd
        uint256 price = baseNerdz.getPrice();
        vm.prank(OWNER);
        baseNerdz.setIsSaleActive(true);
        uint256 tokenId = baseNerdz.getTokenId();
        vm.startPrank(USER);
        baseNerdz.mint{value: price}();
        assert(baseNerdz.ownerOf(tokenId) == USER);
        assert(baseNerdz.balanceOf(USER) > 0);
        // when - attempting to mint again - then revert.
        uint256 nextTokenId = baseNerdz.getTokenId();
        assert(tokenId != nextTokenId);
        assert(tokenId == 0);
        assert(nextTokenId == 1);
        vm.expectRevert(abi.encodeWithSelector(BaseNerdz.BaseNerdz__OnlyAllowedOneMint.selector, USER));
        baseNerdz.mint{value: price}();
        vm.stopPrank();
        assert(baseNerdz.getTokenId() == 1);
    }

    function testUserCannotMintWithInsufficientFunds() public {
        // given - user has already minted a BaseNerd
        uint256 price = baseNerdz.getPrice();
        vm.prank(OWNER);
        baseNerdz.setIsSaleActive(true);

        // when - attempting to mint for a lower price than required.
        vm.startPrank(USER);
        uint256 amountToMint = price / 2;
        assert(amountToMint < price);
        vm.expectRevert(abi.encodeWithSelector(BaseNerdz.BaseNerdz__InsufficientMintAmount.selector, amountToMint));
        baseNerdz.mint{value: amountToMint}();
    }

    function testRevertIfNonOwnerSetsSaleState() public {
        vm.startPrank(USER);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, USER));
        baseNerdz.setIsSaleActive(true);
    }

    function testOnlyOwnerCanSetSaleState() public {
        vm.startPrank(OWNER);
        baseNerdz.setIsSaleActive(true);
        assert(baseNerdz.getActiveSale() == true);
    }

    function testPriceScalesCorrectly() public {
        assertEq(baseNerdz.getTokenId(), 0);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE);
        vm.startPrank(OWNER);
        baseNerdz.setTokenId(99);
        assertEq(baseNerdz.getTokenId(), 99);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE);
        baseNerdz.setTokenId(100);
        assertEq(baseNerdz.getTokenId(), 100);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE * 2);
        baseNerdz.setTokenId(299);
        assertEq(baseNerdz.getTokenId(), 299);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE * 2);
        baseNerdz.setTokenId(300);
        assertEq(baseNerdz.getTokenId(), 300);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE * 4);
        baseNerdz.setTokenId(599);
        assertEq(baseNerdz.getTokenId(), 599);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE * 4);
        baseNerdz.setTokenId(600);
        assertEq(baseNerdz.getTokenId(), 600);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE * 10);
        baseNerdz.setTokenId(776);
        assertEq(baseNerdz.getTokenId(), 776);
        assertEq(baseNerdz.getPrice(), INITIAL_MINT_FEE * 10);
    }

    function testSaleIsClosedAfterLastTokenMint() public {
        vm.startPrank(OWNER);
        baseNerdz.setIsSaleActive(true);
        baseNerdz.setTokenId(776);
        assertEq(baseNerdz.getTokenId(), 776);
        uint256 mintPrice = baseNerdz.getPrice();
        assertEq(mintPrice, INITIAL_MINT_FEE * 10);
        vm.stopPrank();
        vm.startPrank(USER);
        baseNerdz.mint{value: mintPrice}();
        assertEq(baseNerdz.getTokenId(), 777);
        address owner = baseNerdz.ownerOf(776);
        assert(owner == USER);
        assert(baseNerdz.getActiveSale() == false);
    }

    // TotalSupplyMinted error should never be emitted as the token sale should be closed.
    function testRevertWithTotalSupplyMintedWhenMintingBeyondMaxSupply() public {
        vm.startPrank(OWNER);
        baseNerdz.setIsSaleActive(true);
        baseNerdz.setTokenId(777);
        uint256 mintPrice = baseNerdz.getPrice();
        assertEq(mintPrice, INITIAL_MINT_FEE * 10);
        vm.stopPrank();
        vm.startPrank(USER);
        vm.expectRevert(BaseNerdz.BaseNerdz__TotalSupplyMinted.selector);
        baseNerdz.mint{value: mintPrice}();
    }

    function testRevertWithdrawWhenContractHasNoFunds() public {
        assert(address(baseNerdz).balance == 0);
        vm.startPrank(OWNER);
        vm.expectRevert("No funds to withdraw");
        baseNerdz.withdraw();
    }

    function testOwnerCanWithdrawFunds() public {
        assert(address(baseNerdz).balance == 0);
        vm.deal(OWNER, 0);
        uint256 ownerInitialBalance = address(OWNER).balance;
        console.log("Owner Balance: ", ownerInitialBalance);
        vm.startPrank(OWNER);
        baseNerdz.setIsSaleActive(true);
        vm.stopPrank();
        vm.prank(USER);
        baseNerdz.mint{value: INITIAL_MINT_FEE}();
        vm.startPrank(OWNER);
        baseNerdz.withdraw();
        vm.stopPrank();
        uint256 ownerFinalBalance = address(OWNER).balance;
        assertEq(ownerInitialBalance + INITIAL_MINT_FEE, ownerFinalBalance);
        console.log("Owner new balance: ", address(OWNER).balance);
    }

    // tokenURI from ERC721.sol requires the tokens to be minted.
    /* function testTokenUri() public {
        for (uint256 i = 0; i < MAX_SUPPLY; i++) {
            string memory tokenURI = baseNerdz.tokenURI(i);
            string memory expectedTokenURI = string.concat(baseNerdz.getBaseURI(), i.toString());
            assert(keccak256(abi.encode(tokenURI)) == keccak256(abi.encode(expectedTokenURI)));
        }
    } */
}
