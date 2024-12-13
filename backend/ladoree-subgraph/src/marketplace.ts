import {
  ItemListed as ItemListedEvent,
  ItemSold as ItemSoldEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
} from "../generated/Marketplace/Marketplace"
import { ItemListed, ItemSold, OwnershipTransferred } from "../generated/schema"

export function handleItemListed(event: ItemListedEvent): void {
  let entity = new ItemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.itemId = event.params.itemId

  entity.tokenId = event.params.tokenId
  entity.seller = event.params.seller
  entity.creator = event.params.creator
  entity.name = event.params.name
  entity.description = event.params.description
  entity.kind = event.params.kind
  entity.price = event.params.price
  entity.creationDate = event.params.creationDate
  entity.imageURI = event.params.imageURI


  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleItemSold(event: ItemSoldEvent): void {
  let entity = new ItemSold(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.itemId = event.params.itemId
  entity.buyer = event.params.buyer
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent,
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
