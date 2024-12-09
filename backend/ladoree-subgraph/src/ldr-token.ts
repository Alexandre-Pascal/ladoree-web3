import {
  Approval as ApprovalEvent,
  BuyerDiscountBought as BuyerDiscountBoughtEvent,
  MintAdjusted as MintAdjustedEvent,
  MintAttemptedWithMaxBalance as MintAttemptedWithMaxBalanceEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SellerDiscountBought as SellerDiscountBoughtEvent,
  TokenBurned as TokenBurnedEvent,
  TokensMinted as TokensMintedEvent,
  Transfer as TransferEvent,
} from "../generated/LDRToken/LDRToken"
import {
  ApprovalToken,
  BuyerDiscountBought,
  MintAdjusted,
  MintAttemptedWithMaxBalance,
  OwnershipTransferred,
  SellerDiscountBought,
  TokenBurned,
  TokensMinted,
  TransferToken,
} from "../generated/schema"

export function handleApprovalToken(event: ApprovalEvent): void {
  let entity = new ApprovalToken(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBuyerDiscountBought(
  event: BuyerDiscountBoughtEvent,
): void {
  let entity = new BuyerDiscountBought(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintAdjusted(event: MintAdjustedEvent): void {
  let entity = new MintAdjusted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.to = event.params.to
  entity.originalAmount = event.params.originalAmount
  entity.adjustedAmount = event.params.adjustedAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleMintAttemptedWithMaxBalance(
  event: MintAttemptedWithMaxBalanceEvent,
): void {
  let entity = new MintAttemptedWithMaxBalance(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.to = event.params.to
  entity.currentBalance = event.params.currentBalance

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

export function handleSellerDiscountBought(
  event: SellerDiscountBoughtEvent,
): void {
  let entity = new SellerDiscountBought(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenBurned(event: TokenBurnedEvent): void {
  let entity = new TokenBurned(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensMinted(event: TokensMintedEvent): void {
  let entity = new TokensMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.to = event.params.to
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferToken(event: TransferEvent): void {
  let entity = new TransferToken(
    event.transaction.hash.concatI32(event.logIndex.toI32()),
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
