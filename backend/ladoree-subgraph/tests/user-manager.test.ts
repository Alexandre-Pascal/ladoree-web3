import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { MintPermissionUpdated } from "../generated/schema"
import { MintPermissionUpdated as MintPermissionUpdatedEvent } from "../generated/UserManager/UserManager"
import { handleMintPermissionUpdated } from "../src/user-manager"
import { createMintPermissionUpdatedEvent } from "./user-manager-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let canMint = "boolean Not implemented"
    let newMintPermissionUpdatedEvent = createMintPermissionUpdatedEvent(
      user,
      canMint
    )
    handleMintPermissionUpdated(newMintPermissionUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("MintPermissionUpdated created and stored", () => {
    assert.entityCount("MintPermissionUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "MintPermissionUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "MintPermissionUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "canMint",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
