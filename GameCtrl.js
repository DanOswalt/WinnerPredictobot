const prompt = require('prompt');
const Player = require('./Player.js');
const Team = require('./Team.js');
const Tools = require('./Tools.js');
const repeat = require('repeat-string');
const fs = require('fs');
let data = require('./data.json');

class GameCtrl {

  //run
  static startUp(){
    if (data.length === 0) {
      data = {
        season: 1,
        week: 0,
        teams: [],
        schedule: []
      }
    }
    this.displayMainMenu();
  }


  //display info
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
    console.log(`As of week ${data.week}`);
    console.log('Leaderboard');
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
    console.log('1. Play next match');
    console.log('2. Start new');

    prompt.get(['selection'], (err, result) => {
      if (result.selection == 1) {
        GameCtrl.playWeek();
      } else if (result.selection == 2) {
        GameCtrl.startNewGame();
      } else {
        GameCtrl.displayMainMenu();
      }
    })
  }


  //play
  static playWeek() {
    data.week += 1;
    const matches = data.schedule.weeks[data.week];

    for (let i = 0; i < matches.length ; i += 1) {
      //console.log('this', this);
      GameCtrl.playMatch(matches[i].teamA, matches[i].teamB, i);
    }

  }

  static playMatch(teamA, teamB, match) {
    const rounds = 15;
    const delay = 3000;

    for (let round = 1; round <= rounds; round += 1) {
      setTimeout(() => {
        this.playRound(teamA, teamB, round, match)
      }, delay * round);
    }

    setTimeout(() => {
      // console.log(data);
      //prompt to exit to main menu, maybe show a week summary
      //on exit, increment week, check for season finish, save data
      this.save(data, this.displayMainMenu);
    }, delay * rounds + 1);
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


  //configure brand new
  static startNewGame() {
    data = {
      season: 1,
      week: 0,
      teams: [],
      schedule: []
    }

    this.createTeams(8);
    this.setSchedule(8);
    this.save(data, this.playWeek);
  }

  static createTeams(numTeams) {
    data.teams = [];

    for(let i = 0, young = 1, middle = 6, old = 11; i < numTeams; i += 1) {
      data.teams.push(new Team(young, middle, old));
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

  static setSchedule(numWeeks) {
    data.schedule.weeks = [];
    const numMatches = data.teams.length / 2;

    for (let i = 1; i <= numWeeks; i += 1) {
      const week = [];
      //each week, make a shallow copy of the teams and shuffle it
      //pluck off the teams 2 at a time from shuffled teams array

      const teams = data.teams.slice();
      Tools.shuffle(teams);
      for (let i = 1; i <= numMatches; i += 1) {
        const match = {
          teamA: teams.pop(),
          teamB: teams.pop()
        };
        week.push(match);
      }

      data.schedule.weeks.push(week)
    }
  }

  //data
  static save(data, next) {
    fs.writeFile('./data.json', JSON.stringify(data), "utf8", next);
  }

}

module.exports = GameCtrl;
