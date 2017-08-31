"use strict";

process.title = 'Dice Roll';

const { argv: [,, ...args] } = process,
      { count, sides } = require('./parse-args')(args),
      { roll, toDiceNotation } = require('./dice');

console.log('args', args, 'count', count, 'sides', sides);

const dice = toDiceNotation({count, sides}),
      total = roll(dice);

console.log("total", total);
