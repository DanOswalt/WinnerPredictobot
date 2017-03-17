const Tools = require('./Tools.js');

class Player {
  constructor (start_age) {
    this.name = Tools.randomName();
    this.attack = 0;
    this.defense = 0;
    this.age = 0;
    this.peak_age = Tools.randNum(6, 15);
    this.attack_roll_min = Tools.randNum(1, 15);
    this.attack_roll_max = Tools.randNum(16, 30);
    this.defense_roll_min = Tools.randNum(1, 15);
    this.defense_roll_max = Tools.randNum(16, 30);
    this.stats = {
      game : {
        goals: 0,
        misses: 0,
        blocks: 0,
        beats: 0
      },
      season : {
        goals: 0,
        misses: 0,
        blocks: 0,
        beats: 0
      },
      career : {
        goals: 0,
        misses: 0,
        blocks: 0,
        beats: 0
      }
    }

    for(let i = 0; i < start_age; i+=1) {
      this.ageUp();
      this.levelUp();
    };
  }

  levelUp() {
    const modifier = this.peak_age - this.age;
    const realAttackMin = modifier + this.attack_roll_min;
    const realAttackMax = modifier + this.attack_roll_max;
    const realDefenseMin = modifier + this.defense_roll_min;
    const realDefenseMax = modifier + this.defense_roll_max;
    this.attack += Tools.randNum(realAttackMin, realAttackMax);
    this.defense += Tools.randNum(realDefenseMin, realDefenseMax);
  };

  ageUp() {
    this.age += 1;
  }

}

module.exports = Player;
