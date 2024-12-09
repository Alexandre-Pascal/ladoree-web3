import {
  OwnershipTransferred as OwnershipTransferredEvent,
  TokensDistributed as TokensDistributedEvent,
} from "../generated/TokenDistribution/TokenDistribution"
import { OwnershipTransferred, TokensDistributed } from "../generated/schema"

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

export function handleTokensDistributed(event: TokensDistributedEvent): void {
  let entity = new TokensDistributed(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.user = event.params.user
  entity.amountSpent = event.params.amountSpent
  entity.tokensDistributed = event.params.tokensDistributed

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
