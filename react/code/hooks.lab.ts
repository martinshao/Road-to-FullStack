export type ExpirationTime = number;

export type Update<S, A> = {
  expirationTime: ExpirationTime,
  action: A,
  eagerReducer: ((arg0: S, arg1: A) => S) | null,
  eagerState: S | null,
  next: Update<S, A> | null,
};
