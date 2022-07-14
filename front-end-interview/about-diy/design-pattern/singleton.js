class Singleton {
  constructor(name) {
    this.name = name;
  }

  static instance = null;

  static getInstance(name) {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton(name);
    }
    return Singleton.instance;
  }
}

const lily1 = Singleton.getInstance('Lily');
const lily2 = Singleton.getInstance('Lily');

class Beauty {
  constructor(name) {
    this.name = name;
  }

  static instance = null;

  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Beauty(name);
    }
    console.info('...', this.instance);
    return this.instance;
  }

  hello() {
    console.info(Beauty.instance);
  }
}

const rose1 = Beauty.getInstance('Rose');
const rose2 = Beauty.getInstance('Rose');

const arrowFunc = (name) => {
  console.info('print name', name, this);
};

function func(name) {
  console.info('print name', name, this);
}
