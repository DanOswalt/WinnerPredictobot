function Player() {
  this.name = null,
  this.attack = 0,
  this.defense = 0,
  this.age = 0,
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
}

Player.prototype.levelUp = () => {
  this.age += 1;

}

Player.prototype.init = (start_age) => {
  this.name = this.randomName();
  for(let i = 0; i < start_age; i+=1) {
    this.levelUp();
  }
}

Player.prototype.randomName = () => {
  const chars = this.randNum(3,8);
  const pattern = this.randNum(0,2);
  let word;

  const vowels = ['a','a','a','a','a','a','a','a','a','a',
               'e','e','e','e','e','e','e','e','e','e',
               'o','o','o','o','o','o','o','o','o','o',
               'i','i','i','i','i','u','u','u','u','u',
               'ae','ai','au','aa','ea','ee','ei','eu','ia','ie',
               'io','ua','ue','ui','uo','eau','oa','oi','ou','ea'
              ];

  const first_conson = ['B','C','D','F','G','H','J','K','L','M',
                     'N','N','P','Q','R','S','T','V','W','X',
                     'Y','Z','Ch','Sh','Ph','Th','Sh','Str','Sk','Sp',
                     'Kr','Kl','Qu','Fr','Bl','Pl','Tr','Tw','Dr','Br',
                     'Gh','Gr','Gl','Pr','Zh','Fl','Cl','Cr','Chr','Spr',
                     'R','S','T','L','N','R','S','T','L','N'
                    ];

  const other_conson = ['b','c','d','f','g','h','j','k','l','m',
                     'n','n','p','q','r','s','t','u','v','x',
                     'y','z','ch','sh','ph','th','st','str','sk','sp',
                     'ss','tt','qu','mm','nn','gg','tr','rt','lt','ft',
                     'gh','rg','dd','rp','ll','ck','rf','cr','chr','spr',
                     'r','s','t','l','n','r','s','t','l','n'
                    ];

  if(pattern < 2 ) {
  word = first_conson[this.randNum(0,59)] +
                vowels[this.randNum(0,59)] +
                other_conson[this.randNum(0,59)] +
                vowels[this.randNum(0,59)] +
                other_conson[this.randNum(0,59)];

  } else {
  word = vowels[this.randNum(0,59)] +
                other_conson[this.randNum(0,59)] +
                vowels[this.randNum(0,59)] +
                other_conson[this.randNum(0,59)] +
                vowels[this.randNum(0,59)];
  word = this.capitalise(word);
  }

  word = word.substr(0,chars);

  return word;
};
module.exports.player = Player;
