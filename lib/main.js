const DOMNodeCollection = require('./dom_node_collection');

window.$l = function(selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else {
    const nodeList = document.querySelectorAll(selector);
    const arr = Array.from(nodeList);
    return new DOMNodeCollection(arr);
  }

};
