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

//const DEFAULT_MESSAGE = 'Hello'

let elections = new PersistentUnorderedMap<string, string>("candidatesToElection");

let candidates = new PersistentUnorderedMap<string, u64>("votesPerCandidate");

let voted = new PersistentUnorderedMap<string, string[]>("userVotedElection");



export function getResults(candidateId: string): u64  {
  logging.log(candidates.getSome(candidateId));
  return candidates.getSome(candidateId);
}

export function getParticipation(electionId: string, userId: string): bool  {
  if (voted.contains(electionId)) {
    return voted.getSome(electionId).includes(userId);
  } else {
    return false;
  }
}



export function setUpElection(electionId: string, candidateIds:string[]):void{
  logging.log('here');
  for(let i = 0; i < candidateIds.length; i++) {
    elections.set(candidateIds[i], electionId);
    candidates.set(candidateIds[i], 0);
  }
  voted.set(electionId, []);
  logging.log(`Saved`)
}

export function sendVote(electionId: string, candidateId: string, userId: string):void{
  logging.log('here');
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
