import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  MintPermissionUpdated,
  OwnershipTransferred,
  UserRegistered
} from "../generated/UserManager/UserManager"

export function createMintPermissionUpdatedEvent(
  user: Address,
  canMint: boolean
): MintPermissionUpdated {
  let mintPermissionUpdatedEvent = changetype<MintPermissionUpdated>(
    newMockEvent()
  )

  mintPermissionUpdatedEvent.parameters = new Array()

  mintPermissionUpdatedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  mintPermissionUpdatedEvent.parameters.push(
    new ethereum.EventParam("canMint", ethereum.Value.fromBoolean(canMint))
  )

  return mintPermissionUpdatedEvent
}

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

export function createUserRegisteredEvent(user: Address): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return userRegisteredEvent
}
