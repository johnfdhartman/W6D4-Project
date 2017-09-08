class DOMNodeCollection {
  constructor (elArr) {
    this.elArr = elArr;
  }

  html(string=null) {
    if (string===null) {
      return this.elArr[0].innerHTML;
    } else {
      for (let i = 0; i < this.elArr.length; i++) {
        this.elArr[i].innerHTML = string;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(something) {
    if (something instanceof DOMNodeCollection) {
      for (let i =0; i < something.elArr.length; i++) {
        this.html(this.html() +something.elArr[i].outerHTML);
      }
    } else if (something instanceof String){
      this.html(this.html() + something);
    } else {
      this.html(this.html() + something.outerHTML);
    }
  }

  attr(attributeName, value = null) {
    if (value===null) {
      return this.showAttr(attributeName);
    } else {
      return this.changeAttr(attributeName, value);
    }
  }

  showAttr(attributeName) {
    return this.elArr[0].getAttribute(attributeName);
  }

  changeAttr(attributeName, value) {
    for (let i = 0; i < this.elArr.length; i++ ) {
      this.elArr[i].setAttribute(attributeName, value);
    }
  }

  addClass( className ){
    this.changeAttr('class',className);
  }

  removeClass( className = null) {
    if (className === null) {
      for (let i = 0; i < this.elArr.length; i++ ) {
        this.elArr[i].removeAttribute('class');
      }
    } else if (className instanceof String) {
      this.removeSingleClass(className);
    } else if (className instanceof Array) {
      for (let i = 0; i < className.length; i++) {
        this.removeSingleClass(className[i]);
      }
    }
  }

  removeSingleClass(className) {
    for (let i = 0; i< this.elArr.length; i++) {
      this.elArr[i].classList.remove(className);
    }
  }
}

module.exports = DOMNodeCollection;
