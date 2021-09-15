# Interface: IMamChannelState

Definition of a channel object.

## Table of contents

### Properties

- [seed](IMamChannelState.md#seed)
- [mode](IMamChannelState.md#mode)
- [sideKey](IMamChannelState.md#sidekey)
- [security](IMamChannelState.md#security)
- [start](IMamChannelState.md#start)
- [count](IMamChannelState.md#count)
- [nextRoot](IMamChannelState.md#nextroot)
- [nextCount](IMamChannelState.md#nextcount)
- [index](IMamChannelState.md#index)

## Properties

### seed

• **seed**: `string`

The seed for the channel.

___

### mode

• **mode**: [`MamMode`](../api.md#mammode)

The mode for the channel.

___

### sideKey

• `Optional` **sideKey**: `string`

Side key used for restricted mode.

___

### security

• **security**: `number`

The security level for the channel.

___

### start

• **start**: `number`

The start index for the channel.

___

### count

• **count**: `number`

The count for the channel.

___

### nextRoot

• `Optional` **nextRoot**: `string`

The next root for the channel.

___

### nextCount

• **nextCount**: `number`

The next count for the channel.

___

### index

• **index**: `number`

The index for the channel.
