const prompt = require('prompt');
const Player = require('./Player.js').player;
const Team = require('./Team.js').team;


console.reset = () => {
  return process.stdout.write('\033c');
}

const playMatches = (matches) => {

  for (let match = 1; match <= matches.length; match += 1) {
    playMatch(matches[match].teamA, matches[match].teamB, match);
  }

  console.log(" ");
}

const playMatch = (teamA, teamB, match) => {
  const rounds = 21;
  const delay = 1000;

  for (let round = 1; round <= rounds; round += 1) {
    setTimeout(() => { playRound(teamA, teamB, round) }, delay * round);
  }
}

const playRound = (teamA, teamB, round, match) => {
  const attackingTeam = randBetween(0,1) ? teamA : teamB;
  const defendingTeam = attackingTeam === teamA ? teamB : teamA;
  const attackingPlayer = attackingTeam.players[randBetween(0,2)];
  const defendingPlayer = defendingTeam.players[randBetween(0,2)];
  const attackRoll = randBetween(1, attackingPlayer.attack); //+ bonus?
  const defenseRoll = randBetween(1, defendingPlayer.defense); //+ bonus?

  const winner = attackRoll > defenseRoll ? attackingPlayer : defendingPlayer;

  //update stats
  if(winner === attackingPlayer) {
    attackingPlayer.gameStats.goals += 1;
    defendingPlayer.gameStats.beats += 1;
    attackingTeam.currentGoals += 1;
  } else {
    attackingPlayer.gameStats.misses += 1;
    defendingPlayer.gameStats.blocks += 1;
  }

  console.reset();
  console.log(`(${match}) ${teamA.name} vs ${teamB.name}`);
  console.log(`${round}. ${teamA.name} ${teamA.currentGoals} - ${teamB.name} ${teamB.currentGoals}`);
  console.log(` `);
  console.log(`${teamA.players[0].name} ${teamA.players[0].gameStats.goals}/${teamA.players[0].gameStats.misses} ${teamA.players[0].gameStats.blocks}/${teamA.players[0].gameStats.blocks}`);
  console.log(`${teamA.players[1].name} ${teamA.players[1].gameStats.goals}/${teamA.players[1].gameStats.misses} ${teamA.players[1].gameStats.blocks}/${teamA.players[1].gameStats.blocks}`);
  console.log(`${teamA.players[2].name} ${teamA.players[2].gameStats.goals}/${teamA.players[2].gameStats.misses} ${teamA.players[2].gameStats.blocks}/${teamA.players[2].gameStats.blocks}`);
  console.log(`${teamB.players[0].name} ${teamB.players[0].gameStats.goals}/${teamB.players[0].gameStats.misses} ${teamB.players[0].gameStats.blocks}/${teamB.players[0].gameStats.blocks}`);
  console.log(`${teamB.players[1].name} ${teamB.players[1].gameStats.goals}/${teamB.players[1].gameStats.misses} ${teamB.players[1].gameStats.blocks}/${teamB.players[1].gameStats.blocks}`);
  console.log(`${teamB.players[2].name} ${teamB.players[2].gameStats.goals}/${teamB.players[2].gameStats.misses} ${teamB.players[2].gameStats.blocks}/${teamB.players[2].gameStats.blocks}`);
}

const randBetween = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}





//run on open
console.reset();
const teamA = new Team().init(1, 4, 7);
const teamN = new Team().init(2, 5, 8);
const matches = [
  {
    teamA: teamA,
    teamB: teamB
  }
];
playMatches(matches);
