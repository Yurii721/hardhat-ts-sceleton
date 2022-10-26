import type { BigNumber, BigNumberish } from "ethers";
import { parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";

function ntos(num: BigNumberish): string {
    return typeof(num) === "string" ? num : num.toString();
}

/*
 * Converts a value in units to wei.
 *
 * .ether(value): Converts a value in Ether to wei.
 *     Equal to parseUnits(val, 18), parseUnits(val, "ether").
 * .decimals(value, decimalsOrUnitName):
 *     Like value * 10 ** decimalsOrUnitName. Equal to parseUnits(val, decimalsOrUnitName).
 *     Without the `decimalsOrUnitName` argument it is equal to .ether(val).
 *     decimalsOrUnitName Number of decimals (e.g., 18, 9) or name of an ethereum unit (e.g., "ether", "gwei").
 */
const units = {
        wei:    (val: BigNumberish): BigNumber => parseUnits(ntos(val), "wei"),
        kwei:   (val: BigNumberish): BigNumber => parseUnits(ntos(val), "kwei"),
        mwei:   (val: BigNumberish): BigNumber => parseUnits(ntos(val), "mwei"),
        gwei:   (val: BigNumberish): BigNumber => parseUnits(ntos(val), "gwei"),
        szabo:  (val: BigNumberish): BigNumber => parseUnits(ntos(val), "szabo"),
        finney: (val: BigNumberish): BigNumber => parseUnits(ntos(val), "finney"),
        ether:  (val: BigNumberish): BigNumber => parseUnits(ntos(val), "ether"),
        decimals: (val: BigNumberish, decimalsOrUnitName?: BigNumberish): BigNumber =>
            parseUnits(ntos(val), decimalsOrUnitName)
    };

// Aliases.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toBN = (value: any) => ethers.BigNumber.from(value);

// It is equal to ethers.utils.parseUnits(), but extended for different number types.W
const addDecimals = units.decimals;

export { units, toBN, addDecimals };
