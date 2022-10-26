// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Positive Even Number Setter -- the contract which sets a value of the positive even number.
 *
 * @dev This contract includes the following functionality:
 *  - Setting of the positive even number by the owner.
 *  - Getting of a value of the set number.
 */
contract PositiveEvenSetter is Ownable {
    // _______________ Storage _______________

    /// @dev A positive even number.
    uint256 public positiveEven;

    // _______________ Errors _______________

    /// @dev Reverse when setting of `positiveEven` to zero.
    error SetPositiveNumberToZero();

    /**
     * @dev Reverse when setting of `positiveEven` to an odd number (`_oddNumber`).
     *
     * @param _oddNumber   An odd number attempted to be assigned to the variable `positiveEven`.
     */
    error SetEvenToOddNumber(uint256 _oddNumber);

    // _______________ Events _______________

    /**
     * @dev Emitted when the positive even number (`positiveEven`) is set to a value `_newPositiveEven`.
     *
     * @param _prevPositiveEven   The previous value of `positiveEven`.
     * @param _newPositiveEven   The new value of `positiveEven` which was set.
     */
    event PositiveEvenSet(uint256 _prevPositiveEven, uint256 _newPositiveEven);

    // _______________ Constructor ______________

    /// @dev Initializes the contract setting the deployer as the initial owner and the variable `positiveEven` with 2.
    constructor() Ownable() {
        positiveEven = 2; // It is set to the first positive even number.
    }

    // _______________ External functions _______________

    /**
     * @dev Sets a value of the variable `positiveEven` to `_positiveEven`.
     *
     * Requirements:
     *  - The caller should be the owner of this contract.
     *  - `_positiveEven` should be a positive even number.
     *
     * @param _positiveEven   A number that is assigned to `positiveEven`.
     */
    // prettier-ignore
    function setPositiveEven(uint256 _positiveEven) external onlyOwner {
        if (_positiveEven == 0)
            revert SetPositiveNumberToZero();
        if (_positiveEven % 2 != 0)
            revert SetEvenToOddNumber(_positiveEven);

        emit PositiveEvenSet(positiveEven, _positiveEven);
        positiveEven = _positiveEven;
    }
}
