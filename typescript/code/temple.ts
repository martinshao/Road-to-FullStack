interface Person {
    name: string;
    age: number;
    sex: string;
}

interface Height {
    height: number;
    face: string;
    name: string;
}

type And<T, U> = T & U;

type Or<T, U> = T | U;

type PersonOfKeys = keyof Person;
type HeightOfKeys = keyof Height;

const a: PersonOfKeys = {
    name: '123'
}