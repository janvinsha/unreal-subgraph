import { BigInt } from "@graphprotocol/graph-ts";
import {
  UnrealMarketContract,
  Approval,
  ApprovalForAll,
  CollectionCreated,
  MarketItemCreated,
  ProfileCreated,
  ProfileEdited,
  Transfer,
} from "../generated/UnrealMarketContract/UnrealMarketContract";
import {
  ExampleEntity,
  Collection,
  Profile,
  MarketItem,
} from "../generated/schema";

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex());

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex());

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0);
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1);

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner;
  entity.approved = event.params.approved;

  // Entities can be written to the store with `.save()`
  entity.save();

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.balanceOf(...)
  // - contract.fetchCollection(...)
  // - contract.fetchCollections(...)
  // - contract.fetchCollectionsOfAddress(...)
  // - contract.fetchItemsListed(...)
  // - contract.fetchMarketItems(...)
  // - contract.fetchMyNFTs(...)
  // - contract.getApproved(...)
  // - contract.getListingPrice(...)
  // - contract.getProfile(...)
  // - contract.isApprovedForAll(...)
  // - contract.name(...)
  // - contract.ownerOf(...)
  // - contract.supportsInterface(...)
  // - contract.symbol(...)
  // - contract.tokenURI(...)
}

export function handleTransfer(event: Transfer): void {}
export function handleCollectionCreated(event: CollectionCreated): void {
  let id = event.transaction.from.toHex();
  let collection = new Collection(id);
  collection.collectionId = event.params.collectionId;
  collection.banner = event.params.banner;
  collection.dp = event.params.dp;
  collection.owner = event.params.owner;
  collection.name = event.params.name;
  collection.totalSupply = event.params.totalSupply;
  collection.noHolders = event.params.noHolders;
  collection.description = event.params.description;
  collection.tags = event.params.tags;
  collection.save();
}

export function handleMarketItemCreated(event: MarketItemCreated): void {
  let marketItem = new MarketItem(event.transaction.from.toHex());
  marketItem.tokenId = event.params.tokenId;
  marketItem.seller = event.params.seller;
  marketItem.owner = event.params.owner;
  marketItem.price = event.params.price;
  marketItem.sold = event.params.sold;
  marketItem.collection = event.params.collection;
  marketItem.name = event.params.name;
  marketItem.image = event.params.image;
  marketItem.category = event.params.category;
  marketItem.description = event.params.description;
  marketItem.tags = event.params.tags;
  marketItem.save();
}

export function handleProfileCreated(event: ProfileCreated): void {
  let profile = Profile.load(event.params.profileId.toHex());
  if (profile == null) {
    profile = new Profile(event.params.profileId.toHex());
  }
  profile.profileId = event.params.profileId;
  profile.banner = event.params.banner;
  profile.dp = event.params.dp;
  profile.name = event.params.name;
  profile.bio = event.params.bio;
  profile.save();
}

export function handleProfileEdited(event: ProfileEdited): void {
  let profile = Profile.load(event.params.profileId.toHex());
  if (profile == null) {
    profile = new Profile(event.params.profileId.toHex());
  }
  profile.profileId = event.params.profileId;
  profile.banner = event.params.banner;
  profile.dp = event.params.dp;
  profile.name = event.params.name;
  profile.bio = event.params.bio;
  profile.save();
}
