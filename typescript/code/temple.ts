type Readonly<T> = {
    readonly [P in keyof T]: T[P];
}

type Partial<T> = {
    [P in keyof T]?: T[P];
}

type Nullable<T> = {
    [P in keyof T]: T[P] | null;
}

type Proxy<T> = {
    get(): T;
    set(value: T): void;
}

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Record<K extends string, T> = {
    [P in K]: T;
}

type Diff<T extends string, U extends string> =
    ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

type Overlap<T extends string, U extends string> = Diff<T, Diff<T, U>>;

type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

type Omit = Pick<T, Exclude<keyof T, K>>;

type Overwrite<T, U> = Omit<T, Diff<keyof T, Diff<keyof T, keyof U>>> & U;

type Purify<T extends string> = { [P in T]: T; }[T];

type NonNullable<T> = T & {};

type Required<T> = {
    [P in Purify<keyof T>]: NonNullable<T[P]>;
};