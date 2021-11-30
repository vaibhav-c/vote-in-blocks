/*
 * This is an example of an AssemblyScript smart contract with two simple,
 * symmetric functions:
 *
 * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
 *    user (account_id) who sent the request
 * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
 *    defaulting to "Hello"
 *
 * Learn more about writing NEAR smart contracts with AssemblyScript:
 * https://docs.near.org/docs/develop/contracts/as/intro
 *
 */

import { Context, logging, storage, PersistentUnorderedMap } from 'near-sdk-as'

const DEFAULT_MESSAGE = 'Hello'

let elections = new PersistentUnorderedMap<string, string>("candidatesToElection");

let candidates = new PersistentUnorderedMap<string, u64>("votesPerCandidate");

let voted = new PersistentUnorderedMap<string, string[]>("userVotedElection");

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!
export function getGreeting(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function getResults(accountId: string): string | null {
  // This uses raw `storage.get`, a low-level way to interact with on-chain
  // storage for simple contracts.
  // If you have something more complex, check out persistent collections:
  // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
  return storage.get<string>(accountId, DEFAULT_MESSAGE)
}

export function setGreeting(message: string): void {
  const accountId = Context.sender
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(`Saving greeting "${message}" for account "${accountId}"`)
  storage.set(accountId, message)
}

export function setUpElection(electionId: string, candidateIds:string[]):void{
  for(let i = 0; i < candidateIds.length; i++) {
    elections.set(candidateIds[i], electionId);
    candidates.set(candidateIds[i], 0);
  }
  voted.set(electionId, []);
  logging.log(`Saved`)
}

export function sendVote(electionId: string, candidateId: string, userId: string):void{
  if(elections.contains(candidateId)) {
    logging.log(`${elections.getSome(candidateId)}`)
    if(elections.getSome(candidateId) == electionId) {
      let usersVoted = voted.getSome(electionId);
      if(usersVoted.includes(userId)) {
        logging.log(`Voted already`)
      } else {
        let currentVotes = candidates.getSome(candidateId)
        let tick: i32 = 1;
        candidates.set(candidateId, currentVotes + tick);
        usersVoted.push(userId);
        voted.set(electionId, usersVoted);
      }
    } else {
      logging.log(`Candidate and Election Do Not Match`);
    }
  } else {
    logging.log(`Candidate DNE`);
  }
}
