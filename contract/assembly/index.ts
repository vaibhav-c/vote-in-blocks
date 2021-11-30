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
//Election ID k andar Candidate ID k andar votes per candidate
let elections = new PersistentUnorderedMap<string, PersistentUnorderedMap<string, u64>>("electionPerCandidateVotes");
//User ID k andar Election ID k andar random int
let voted = new PersistentUnorderedMap<string, PersistentUnorderedMap<string, i32>>("userVotedElection");

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
  let candidates = new PersistentUnorderedMap<string, u64>("candidates");
  for(let i = 0; i < candidateIds.length; i++) {
    candidates.set(candidateIds[i], 0);
  }
  elections.set(electionId, candidates);
}

export function sendVote(electionId: string, candidateId:string, userId: string):void{
  if(elections.contains(electionId)) {
    let candidateToVote = elections.getSome(electionId);
    if(candidateToVote.contains(candidateId)) {
      let votesCurrent = candidateToVote.getSome(candidateId);
      if(voted.contains(userId)) {
        let userVoted = voted.getSome(userId);
        if(userVoted.contains(electionId)) {
          logging.log("Already Voted");
        } else {
          let tick: i32 = 1;
          candidateToVote.set(candidateId, votesCurrent + tick);
          elections.set(electionId, candidateToVote);
          let electionsVoted = new PersistentUnorderedMap<string, i32>("votedHere");
          electionsVoted.set(electionId, 1);
          voted.set(userId, electionsVoted);
        }
      } else {
        let newVoter = new PersistentUnorderedMap<string, i32>("newvoter");
        newVoter.set(electionId, 1);
        voted.set(userId, newVoter);
        let tick: i32 = 1;
        candidateToVote.set(candidateId, votesCurrent + tick);
        elections.set(electionId, candidateToVote);
      }
    } else {
      logging.log("Candidate DNE");
    }
  } else {
    logging.log("Election DNE");
  }
}
