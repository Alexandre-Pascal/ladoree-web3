import {
  MintPermissionUpdated as MintPermissionUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  UserRegistered as UserRegisteredEvent
} from "../generated/UserManager/UserManager"
import {
  MintPermissionUpdated,
  OwnershipTransferred,
  UserRegistered
} from "../generated/schema"

export function handleMintPermissionUpdated(
  event: MintPermissionUpdatedEvent
): void {
  let entity = new MintPermissionUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.canMint = event.params.canMint

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = new UserRegistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
