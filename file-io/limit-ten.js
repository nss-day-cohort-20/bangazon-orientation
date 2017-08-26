const { Transform } = require('stream');

let count = 0;

// This never gets called if it isn't passed anything, because it's only called if a data event is emitted. 
// A data event is not fired if no data is passed. Therefore, the writable stream never logs "no results found", 
// since it relies on this transform to call 'next', which would then invoke the last 'pipe' 
// that triggers the write stream. Whew.
module.exports = () => Transform({
  transform (word, _, next) {
    count++;
    count <= 10 ? next(null, word) : next(null, "limit reached")
  }
});
