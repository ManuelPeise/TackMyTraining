import { Moment } from 'moment';

export type CompareFunction<TState> = (originalValue: TState, compareValue: TState) => boolean;

export type CompareFunctionDictionary<TState> = {
  [P in keyof Partial<TState>]: CompareFunction<TState[P]>;
};

/**
 *  optional properties
 */

export type Partial<TState> = {
  [P in keyof TState]?: TState[P];
};

/**
 * readonly properties
 */

export type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * required properties
 */

export type Required<T> = {
  [P in keyof T]-?: T[P];
};

export type TValue = string | number | boolean | Moment;

export type InitializationProps<T> = {
  isInitialized: boolean;
  props: T;
};

export type ComponentServiceType = {
  key: string;
};
