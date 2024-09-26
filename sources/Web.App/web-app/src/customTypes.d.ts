import { Moment } from 'moment';
import { DashboardTileTypeEnum } from './Lib/Enums/DashboardTileTypeEnum';

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

export interface IDimensionSize {
  xs: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'grow';
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'grow';
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'grow';
}

type DashboardTileConfiguration = {
  size: IDimensionSize;
  type: DashboardTileTypeEnum;
};
