[@iota/mam-chrysalis.js](../README.md) / [utils/trytesHelper](../modules/utils_tryteshelper.md) / TrytesHelper

# Class: TrytesHelper

[utils/trytesHelper](../modules/utils_tryteshelper.md).TrytesHelper

Helper functions for use with trytes.

## Table of contents

### Constructors

- [constructor](utils_tryteshelper.tryteshelper.md#constructor)

### Properties

- [ALPHABET](utils_tryteshelper.tryteshelper.md#alphabet)

### Methods

- [fromAscii](utils_tryteshelper.tryteshelper.md#fromascii)
- [fromTrits](utils_tryteshelper.tryteshelper.md#fromtrits)
- [isHash](utils_tryteshelper.tryteshelper.md#ishash)
- [isTag](utils_tryteshelper.tryteshelper.md#istag)
- [isTrytes](utils_tryteshelper.tryteshelper.md#istrytes)
- [objectFromTrytes](utils_tryteshelper.tryteshelper.md#objectfromtrytes)
- [objectToTrytes](utils_tryteshelper.tryteshelper.md#objecttotrytes)
- [stringFromTrytes](utils_tryteshelper.tryteshelper.md#stringfromtrytes)
- [stringToTrytes](utils_tryteshelper.tryteshelper.md#stringtotrytes)
- [toAscii](utils_tryteshelper.tryteshelper.md#toascii)
- [toTrits](utils_tryteshelper.tryteshelper.md#totrits)
- [tritsValue](utils_tryteshelper.tryteshelper.md#tritsvalue)

## Constructors

### constructor

\+ **new TrytesHelper**(): [*TrytesHelper*](utils_tryteshelper.tryteshelper.md)

**Returns:** [*TrytesHelper*](utils_tryteshelper.tryteshelper.md)

## Properties

### ALPHABET

▪ `Static` **ALPHABET**: *string*= "9ABCDEFGHIJKLMNOPQRSTUVWXYZ"

All the characters that can be used in trytes.

## Methods

### fromAscii

▸ `Static`**fromAscii**(`value`: *string*): *string*

Convert a string value into trytes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* | value to convert into trytes.   |

**Returns:** *string*

The trytes representation of the value.

___

### fromTrits

▸ `Static`**fromTrits**(`trits`: *Int8Array*): *string*

Get trytes from trits array.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trits` | *Int8Array* | The trits to convert to trytes.   |

**Returns:** *string*

Trytes.

___

### isHash

▸ `Static`**isHash**(`trytes`: *string*): *boolean*

Is the string trytes length 81.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trytes` | *string* | The trytes to test.   |

**Returns:** *boolean*

True if it is trytes 81 chars long.

___

### isTag

▸ `Static`**isTag**(`trytes`: *string*): *boolean*

Is the string trytes length 27.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trytes` | *string* | The trytes to test.   |

**Returns:** *boolean*

True if it is trytes 27 chars long.

___

### isTrytes

▸ `Static`**isTrytes**(`trytes`: *string*): *boolean*

Is the string trytes of any length.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trytes` | *string* | The trytes to test.   |

**Returns:** *boolean*

True if it is trytes.

___

### objectFromTrytes

▸ `Static`**objectFromTrytes**<T\>(`trytes`: *string*): *undefined* \| T

Convert an object from Trytes.

#### Type parameters:

Name |
:------ |
`T` |

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trytes` | *string* | The trytes to decode.   |

**Returns:** *undefined* \| T

The decoded object.

___

### objectToTrytes

▸ `Static`**objectToTrytes**(`obj`: *unknown*): *string*

Convert an object to Trytes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`obj` | *unknown* | The obj to encode.   |

**Returns:** *string*

The encoded trytes value.

___

### stringFromTrytes

▸ `Static`**stringFromTrytes**(`trytes`: *string*): *undefined* \| *string*

Convert a string from Trytes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trytes` | *string* | The trytes to decode.   |

**Returns:** *undefined* \| *string*

The decoded string.

___

### stringToTrytes

▸ `Static`**stringToTrytes**(`str`: *string*): *string*

Convert a string to Trytes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`str` | *string* | The string to encode.   |

**Returns:** *string*

The encoded trytes value.

___

### toAscii

▸ `Static`**toAscii**(`trytes`: *string*): *string*

Convert trytes into a string value.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trytes` | *string* | to convert into a string value.   |

**Returns:** *string*

The string value converted from the trytes.

___

### toTrits

▸ `Static`**toTrits**(`value`: *string*): *Int8Array*

Create a trits array from trytes.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`value` | *string* | Trytes used to create trits.   |

**Returns:** *Int8Array*

The trits array.

___

### tritsValue

▸ `Static`**tritsValue**(`trits`: *Int8Array*): *number*

Convert trits to an integer.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`trits` | *Int8Array* | The trits to convert.   |

**Returns:** *number*

The trits converted to number.
