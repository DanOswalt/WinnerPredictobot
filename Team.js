const Tools = require('./Tools.js');
const Player = require('./Player.js');

class Team {
  constructor (young, middle, old) {
    this.name = Tools.randomName();
    this.players = [
      new Player(young),
      new Player(middle),
      new Player(old)
    ];
    this.stats = {
      game : {
        wins: 0,
        losses: 0
      },
      season : {
        wins: 0,
        losses: 0
      },
      career : {
        wins: 0,
        losses: 0
      }
    }
    this.currentGoals = 0;
  }
}

module.exports = Team;
