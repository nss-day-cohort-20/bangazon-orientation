'use strict';

const { randomInt } = require('./math');

// dicenotation is something like "3d20"
module.exports.roll = (diceNotation) => {
  let [rollCount, sides] = diceNotation.split("d");
  let diceTotal = 0;

  for (let i = 0; i < rollCount; i++) {
    diceTotal += randomInt(1, sides);
  }
  return diceTotal;
};

module.exports.toDiceNotation = ({count, sides}) => `${count}d${sides}`;
