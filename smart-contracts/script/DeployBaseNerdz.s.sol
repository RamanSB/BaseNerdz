// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {BaseNerdz} from "../src/BaseNerdz.sol";

contract DeployBaseNerdz is Script {
    BaseNerdz baseNerdz;

    function run() external returns (BaseNerdz) {
        vm.startBroadcast();
        baseNerdz = new BaseNerdz();
        vm.stopBroadcast();
        return baseNerdz;
    }
}
