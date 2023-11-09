const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const purify = (dirty) => {
  if (typeof dirty === 'string') {
    return DOMPurify.sanitize(dirty);
  } else if (typeof dirty === 'object' && dirty !== null) {
    return Object.fromEntries(
      Object.entries(dirty).map(([key, value]) => [key, purify(value)])
    );
  }
  return dirty;
};

module.exports = purify;
