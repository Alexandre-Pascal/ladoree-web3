import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  TokensDistributed
} from "../generated/TokenDistribution/TokenDistribution"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokensDistributedEvent(
  user: Address,
  amountSpent: BigInt,
  tokensDistributed: BigInt
): TokensDistributed {
  let tokensDistributedEvent = changetype<TokensDistributed>(newMockEvent())

  tokensDistributedEvent.parameters = new Array()

  tokensDistributedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  tokensDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "amountSpent",
      ethereum.Value.fromUnsignedBigInt(amountSpent)
    )
  )
  tokensDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "tokensDistributed",
      ethereum.Value.fromUnsignedBigInt(tokensDistributed)
    )
  )

  return tokensDistributedEvent
}
