// about extends usage


interface Mailable {
  send(email: string): boolean
  queue(email: string): boolean
}

interface FutureMailable extends Mailable {
  later(email: string, after: number): boolean
}

class Mail implements FutureMailable {
  
  later(email: string, after: number): boolean {
      console.log(`Send email to ${email} in ${after} ms.`);
      return true;
  }
  send(email: string): boolean {
      console.log(`Sent email to ${email}. `);
      return true;
  }
  queue(email: string): boolean {
      console.log(`Queue an email to ${email}.`);
      return true;
  }
}

class Control {
  private state: boolean;
}

interface StatefulControl extends Control {
  enable(): void
}

class Button extends Control implements StatefulControl {
  enable() { }
}
class TextBox extends Control implements StatefulControl {
  enable() { }
}
class Label extends Control { }


// Error: cannot implement
// class Chart implements StatefulControl {
//   enable() { }

// }

function fail(message: string): never {
  throw new Error(message);
}

interface Foo {
  type: 'foo'
}

interface Bar {
  type: 'bar'
}

type All = Foo | Bar

function handleValue(val: All) {
  switch (val.type) {
    case 'foo':
      // 这里 val 被收窄为 Foo
      break
    case 'bar':
      // val 在这里是 Bar
      break
    default:
      // val 在这里是 never
      const exhaustiveCheck: never = val
      break
  }
}

type CommonKeys = Extract<'a'| 'b' | 'c', 'd'|'c'> // => 'c'