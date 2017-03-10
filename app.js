const prompt = require('prompt');

console.reset = () => {
  return process.stdout.write('\033c');
}

const onErr = (err) => {
  console.log(err);
  return 1;
}

const randBetween = (min, max) => {
    return Math.floor(Math.random()*(max-min+1)+min);
}

const getWinner = (err, result) => {
  if (err) {
    return onErr(err);
  }

  const ranksTotal = parseInt(result.hi_rank) + parseInt(result.low_rank);
  const randomNum = randBetween(0, ranksTotal);
  const winner = randomNum >= parseInt(result.low_rank) ? result.lower_ranked_team : result.higher_ranked_team;

  console.log('The winner is...');

  setTimeout( () => {
    console.log(winner);
    go();
  }, 2000);

};

const go = () => {
  prompt.start();
  console.log('');
  console.log('Feed me the teams.');
  prompt.get(['higher_ranked_team', 'hi_rank', 'lower_ranked_team', 'low_rank'], getWinner);
}

//run on open
console.reset();
go();
