# Solidity API

## PositiveEvenSetter

_This contract includes the following functionality:
 - Setting of the positive even number by the owner.
 - Getting of a value of the set number._

### positiveEven

```solidity
uint256 positiveEven
```

_A positive even number._

### SetPositiveNumberToZero

```solidity
error SetPositiveNumberToZero()
```

_Reverse when setting of `positiveEven` to zero._

### SetEvenToOddNumber

```solidity
error SetEvenToOddNumber(uint256 _oddNumber)
```

_Reverse when setting of `positiveEven` to an odd number (`_oddNumber`)._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _oddNumber | uint256 | An odd number attempted to be assigned to the variable `positiveEven`. |

### PositiveEvenSet

```solidity
event PositiveEvenSet(uint256 _prevPositiveEven, uint256 _newPositiveEven)
```

_Emitted when the positive even number (`positiveEven`) is set to a value `_newPositiveEven`._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _prevPositiveEven | uint256 | The previous value of `positiveEven`. |
| _newPositiveEven | uint256 | The new value of `positiveEven` which was set. |

### constructor

```solidity
constructor() public
```

_Initializes the contract setting the deployer as the initial owner and the variable `positiveEven` with 2._

### setPositiveEven

```solidity
function setPositiveEven(uint256 _positiveEven) external
```

_Sets a value of the variable `positiveEven` to `_positiveEven`.

Requirements:
 - The caller should be the owner of this contract.
 - `_positiveEven` should be a positive even number._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _positiveEven | uint256 | A number that is assigned to `positiveEven`. |

