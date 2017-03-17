const prompt = require('prompt');
const Player = require('./Player.js');
const Team = require('./Team.js');
const Tools = require('./Tools.js');


console.reset = () => {
  return process.stdout.write('\033c');
}


const playMatches = (matches) => {
  for (let i = 0; i < matches.length; i += 1) {
    playMatch(matches[i].teamA, matches[i].teamB, i);
  }
}

const playMatch = (teamA, teamB, match) => {
  const rounds = 21;
  const delay = 1000;

  for (let round = 1; round <= rounds; round += 1) {
    setTimeout(() => { playRound(teamA, teamB, round, match) }, delay * round);
  }
}

const playRound = (teamA, teamB, round, match) => {
  const attackingTeam = Tools.randNum(0,1) ? teamA : teamB;
  const defendingTeam = attackingTeam === teamA ? teamB : teamA;
  const attackingPlayer = attackingTeam.players[Tools.randNum(0,2)];
  const defendingPlayer = defendingTeam.players[Tools.randNum(0,2)];
  const attackRoll = Tools.randNum(1, attackingPlayer.attack); //+ bonus?
  const defenseRoll = Tools.randNum(1, defendingPlayer.defense); //+ bonus?

  const winner = attackRoll > defenseRoll ? attackingPlayer : defendingPlayer;

  //update stats
  if(winner === attackingPlayer) {
    attackingPlayer.stats.game.goals += 1;
    defendingPlayer.stats.game.beats += 1;
    attackingTeam.currentGoals += 1;
  } else {
    attackingPlayer.stats.game.misses += 1;
    defendingPlayer.stats.game.blocks += 1;
  }

  if (match === 0) {
    console.reset();
  }

  //next thing TODO is to make a better display method...
  console.log(`${teamA.name} vs ${teamB.name}`);
  console.log(`${round}. ${teamA.name} ${teamA.currentGoals} - ${teamB.name} ${teamB.currentGoals}`);
  console.log(` `);
  console.log(`${teamA.players[0].name} ${teamA.players[0].stats.game.goals}/${teamA.players[0].stats.game.misses} ${teamA.players[0].stats.game.blocks}/${teamA.players[0].stats.game.blocks}`);
  console.log(`${teamA.players[1].name} ${teamA.players[1].stats.game.goals}/${teamA.players[1].stats.game.misses} ${teamA.players[1].stats.game.blocks}/${teamA.players[1].stats.game.blocks}`);
  console.log(`${teamA.players[2].name} ${teamA.players[2].stats.game.goals}/${teamA.players[2].stats.game.misses} ${teamA.players[2].stats.game.blocks}/${teamA.players[2].stats.game.blocks}`);
  console.log(' ');
  console.log(`${teamB.players[0].name} ${teamB.players[0].stats.game.goals}/${teamB.players[0].stats.game.misses} ${teamB.players[0].stats.game.blocks}/${teamB.players[0].stats.game.blocks}`);
  console.log(`${teamB.players[1].name} ${teamB.players[1].stats.game.goals}/${teamB.players[1].stats.game.misses} ${teamB.players[1].stats.game.blocks}/${teamB.players[1].stats.game.blocks}`);
  console.log(`${teamB.players[2].name} ${teamB.players[2].stats.game.goals}/${teamB.players[2].stats.game.misses} ${teamB.players[2].stats.game.blocks}/${teamB.players[2].stats.game.blocks}`);
  console.log(' ');
  console.log(' ');
}






//run on open
console.reset();
const A = new Team(1, 6, 11);
const B = new Team(2, 7, 12);
const C = new Team(3, 8, 13);
const D = new Team(4, 9, 14);
// const teamE = new Team(5, 10, 15);


const matches = [
  {
    teamA: A,
    teamB: B
  },
  {
    teamA: C,
    teamB: D
  }

];

// console.dir(teamA.players);
// console.dir(teamB.players);
// console.dir(teamC.players);
// console.dir(teamD.players);
// console.dir(teamE.players);

playMatches(matches);
