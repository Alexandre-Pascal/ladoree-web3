import {
  MintPermissionUpdated as MintPermissionUpdatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  UserRegistered as UserRegisteredEvent,
  UserHasMinted as UserHasMintedEvent
} from "../generated/UserManager/UserManager"
import {
  MintPermissionUpdated,
  OwnershipTransferred,
  UserRegistered,
  UserHasMinted
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
  entity.userName = event.params.userName
  entity.email = event.params.email
  entity.bio = event.params.bio
  entity.isCreator = event.params.isCreator
  entity.profileImage = event.params.profileImage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUserHasMinted(event: UserHasMintedEvent): void {
  let entity = new UserHasMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
