'use strict';

module.exports = (argsArr) => {
  const dieNums = {};
  dieNums.count = argsArr[1] ? argsArr[0] : 1;
  dieNums.sides = argsArr[1] || argsArr[0] || 6;

  return dieNums
}
