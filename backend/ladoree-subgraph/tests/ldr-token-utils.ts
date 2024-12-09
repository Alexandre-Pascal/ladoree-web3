import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  BuyerDiscountBought,
  MintAdjusted,
  MintAttemptedWithMaxBalance,
  OwnershipTransferred,
  SellerDiscountBought,
  TokenBurned,
  TokensMinted,
  Transfer
} from "../generated/LDRToken/LDRToken"

export function createApprovalEvent(
  owner: Address,
  spender: Address,
  value: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("spender", ethereum.Value.fromAddress(spender))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return approvalEvent
}

export function createBuyerDiscountBoughtEvent(
  from: Address,
  amount: BigInt
): BuyerDiscountBought {
  let buyerDiscountBoughtEvent = changetype<BuyerDiscountBought>(newMockEvent())

  buyerDiscountBoughtEvent.parameters = new Array()

  buyerDiscountBoughtEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  buyerDiscountBoughtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return buyerDiscountBoughtEvent
}

export function createMintAdjustedEvent(
  to: Address,
  originalAmount: BigInt,
  adjustedAmount: BigInt
): MintAdjusted {
  let mintAdjustedEvent = changetype<MintAdjusted>(newMockEvent())

  mintAdjustedEvent.parameters = new Array()

  mintAdjustedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  mintAdjustedEvent.parameters.push(
    new ethereum.EventParam(
      "originalAmount",
      ethereum.Value.fromUnsignedBigInt(originalAmount)
    )
  )
  mintAdjustedEvent.parameters.push(
    new ethereum.EventParam(
      "adjustedAmount",
      ethereum.Value.fromUnsignedBigInt(adjustedAmount)
    )
  )

  return mintAdjustedEvent
}

export function createMintAttemptedWithMaxBalanceEvent(
  to: Address,
  currentBalance: BigInt
): MintAttemptedWithMaxBalance {
  let mintAttemptedWithMaxBalanceEvent =
    changetype<MintAttemptedWithMaxBalance>(newMockEvent())

  mintAttemptedWithMaxBalanceEvent.parameters = new Array()

  mintAttemptedWithMaxBalanceEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  mintAttemptedWithMaxBalanceEvent.parameters.push(
    new ethereum.EventParam(
      "currentBalance",
      ethereum.Value.fromUnsignedBigInt(currentBalance)
    )
  )

  return mintAttemptedWithMaxBalanceEvent
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

export function createSellerDiscountBoughtEvent(
  from: Address,
  amount: BigInt
): SellerDiscountBought {
  let sellerDiscountBoughtEvent = changetype<SellerDiscountBought>(
    newMockEvent()
  )

  sellerDiscountBoughtEvent.parameters = new Array()

  sellerDiscountBoughtEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  sellerDiscountBoughtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return sellerDiscountBoughtEvent
}

export function createTokenBurnedEvent(
  from: Address,
  amount: BigInt
): TokenBurned {
  let tokenBurnedEvent = changetype<TokenBurned>(newMockEvent())

  tokenBurnedEvent.parameters = new Array()

  tokenBurnedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  tokenBurnedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokenBurnedEvent
}

export function createTokensMintedEvent(
  to: Address,
  amount: BigInt
): TokensMinted {
  let tokensMintedEvent = changetype<TokensMinted>(newMockEvent())

  tokensMintedEvent.parameters = new Array()

  tokensMintedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  tokensMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return tokensMintedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  value: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferEvent
}
