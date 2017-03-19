class Tools {

  static randNum(min, max) {
      return Math.floor(Math.random()*(max-min+1)+min);
  }

  static randomName() {
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

  static shuffle(array) {
    var counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        var index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
  }

  static capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  static placeInto(template, stringToInsert, alignment) {
    //to be used to pad a string with spaces or leading zeroes
    //a la replaceOn('right', '-----', 'hi') => '---hi'

    if (typeof template === 'string' &&
        typeof stringToInsert === 'string' &&
        template.length >= stringToInsert.length) {
      if (alignment === 'left') {
        return stringToInsert + template.substr(stringToInsert.length);
      } else if (alignment === 'right') {
        return String(template + stringToInsert).slice(-template.length);
      } else {
        console.log("sliceAndReplace: can't recognize '" + alignment + "' alignment." );
        return "";
      }
    } else {
      console.log('sliceAndReplace: something is wrong with string args.');
      return "";
    }
  }
}

module.exports = Tools;
