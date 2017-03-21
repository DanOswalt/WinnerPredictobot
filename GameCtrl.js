const prompt = require('prompt');
const Player = require('./Player.js');
const Team = require('./Team.js');
const Tools = require('./Tools.js');
const repeat = require('repeat-string');

class GameCtrl {

  static displayGames(teamA, teamB, match, round, attackerIsTeamA, attackerIndex, defenderIndex, goal) {

    if(match === 0) {
      console.reset();
    }

    //build header
    const spacesTemplate = repeat(' ', 20);
    const teamAHeader = Tools.placeInto(spacesTemplate, teamA.name, 'right');
    const teamBHeader = Tools.placeInto(spacesTemplate, teamB.name, 'left');
    const header = `${teamAHeader} ${teamA.currentGoals} - ${teamB.currentGoals} ${teamBHeader}`;

    //build player rows
    const playerRows = [];

    for (let i = 2; i >= 0; i -= 1) {
      const actionsLine = this.buildActionLine(i, attackerIsTeamA, attackerIndex, defenderIndex, goal);
      const statsA = this.buildStatLine(teamA.players[i].stats.game);
      const statsB = this.buildStatLine(teamB.players[i].stats.game);
      const leftSideWithStats = Tools.placeInto(spacesTemplate, statsA, 'right');
      const leftSide = Tools.placeInto(leftSideWithStats, teamA.players[i].name, 'left');

      const rightSideWithName = Tools.placeInto(spacesTemplate, teamB.players[i].name, 'right');
      const rightSide = Tools.placeInto(rightSideWithName, statsB, 'left');

      playerRows.push(leftSide + actionsLine + rightSide);
    }


    console.log(` `);
    console.log(header);
    console.log(` `);
    playerRows.forEach(row => {
      console.log(row);
    })
    console.log(' ');
    this.displayCountdown(round);
  }

  static displayCountdown(round) {
    let template = repeat('...', 15);
    let bar = repeat('   ', round);
    const countdown = Tools.placeInto(template, bar, 'left');
    console.log(countdown);
  }

  static displayMainMenu() {
    //display menu
    //shows current season summary and options
    //1. Play next match
    //2. Show standings
    //3. Show stats of all sorts

    console.reset();
    console.log('Current Season Top Standings');
    console.log('1 Someone');
    console.log('2 kLKhk');
    console.log('3 aosdifuaopisduf');
    console.log(' ');
    console.log('Top Scorer');
    console.log('Top Blocker');
    console.log('Best Offense');
    console.log('Best Defense');
    console.log('Best Overall');
    console.log(' ');
    console.log('Week 19 of 20');
    console.log('1. Play next match');
    console.log('2. Start new');

    prompt.get(['selection'], (err, result) => {
      if (result.selection == 1) {
        this.playNextMatch();
      } else if (result.selection == 2) {
        this.playNewSeason();
      } else {
        this.displayMainMenu();
      }


    })
  }

  static playNextMatch() {
    console.log('okie dokie');
  };

  static playMatches() {
    for (let i = 0; i < this.matches.length; i += 1) {
      this.playMatch(this.matches[i].teamA, this.matches[i].teamB, i);
    }
  }

  static playMatch(teamA, teamB, match) {
    const rounds = 15;
    const delay = 3000;

    for (let round = 1; round <= rounds; round += 1) {
      setTimeout(() => { this.playRound(teamA, teamB, round, match) }, delay * round);
    }
  }

  static playRound(teamA, teamB, round, match) {
    const attackerIsTeamA = Tools.randNum(0,1);
    const attackerIndex = Tools.randNum(0,2);
    const defenderIndex = Tools.randNum(0,2);
    const attackingTeam = attackerIsTeamA ? teamA : teamB;
    const defendingTeam = attackingTeam === teamA ? teamB : teamA;
    const attackingPlayer = attackingTeam.players[attackerIndex];
    const defendingPlayer = defendingTeam.players[defenderIndex];
    const attackRoll = Tools.randNum(1, attackingPlayer.attack); //+ bonus?
    const defenseRoll = Tools.randNum(1, defendingPlayer.defense); //+ bonus?
    let goal = false;

    const winner = attackRoll > defenseRoll ? attackingPlayer : defendingPlayer;

    //update stats
    if(winner === attackingPlayer) {
      attackingPlayer.stats.game.goals += 1;
      defendingPlayer.stats.game.beats += 1;
      attackingTeam.currentGoals += 1;
      goal = true;
    } else {
      attackingPlayer.stats.game.misses += 1;
      defendingPlayer.stats.game.blocks += 1;
    }

    this.displayGames(teamA, teamB, match, round, attackerIsTeamA, attackerIndex, defenderIndex, goal);
  }

  static createTeams(numTeams) {
    this.teams = [];

    for(let i = 0, young = 1, middle = 6, old = 11; i < numTeams; i += 1) {
      this.teams.push(new Team(young, middle, old));
      if (young === 5) {
        young = 1;
        middle = 6;
        old = 11;
      } else {
        young += 1;
        middle += 1;
        old += 1;
      }
    }
  }

  static buildStatLine(gameStats) {
    const template = '  ';
    const goals = Tools.placeInto(template, '' + gameStats.goals, 'right');
    const misses = Tools.placeInto(template, '' + gameStats.misses, 'left');
    const blocks = Tools.placeInto(template, '' + gameStats.blocks, 'right');
    const beats = Tools.placeInto(template, '' + gameStats.beats, 'left');
    return `${goals}/${misses} ${blocks}/${beats}`;
  }

  static buildActionLine(i, attackerIsTeamA, attackerIndex, defenderIndex, goal) {
    const attackChar = goal ? 'o' : 'x';
    const defenseChar = '|';
    let teamAChar = ' ';
    let teamBChar = ' ';

    //left side
    if (attackerIsTeamA && i === attackerIndex) {
      teamAChar = attackChar;
    };

    if (!attackerIsTeamA && i === defenderIndex) {
      teamAChar = defenseChar;
    };

    //right side
    if (!attackerIsTeamA && i === attackerIndex) {
      teamBChar = attackChar;
    };

    if (attackerIsTeamA && i === defenderIndex) {
      teamBChar = defenseChar;
    };

    return ` ${teamAChar}   ${teamBChar} `;
  }

  static playNewSeason() {
    //this is to be run only when starting for first-time
    this.createTeams(16);

    this.setSchedule();
    this.playMatches();
  }

  static setSchedule() {
    this.matches = [];

    this.matches = [
      {
        teamA : this.teams[0],
        teamB : this.teams[1]
      },
      {
        teamA : this.teams[2],
        teamB : this.teams[3]
      },
      {
        teamA : this.teams[4],
        teamB : this.teams[5]
      },
      {
        teamA : this.teams[6],
        teamB : this.teams[7]
      }
    ]
  }

  static startUp(){
    //this.fetchCurrentSeasonData(); async
    this.displayMainMenu();
  }
}

module.exports = GameCtrl;
