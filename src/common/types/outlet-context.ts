import {SetState} from './react';

export type WindowSize = {width: number; height: number};

export type OutletContext<T> = {
	settings: T;
	updateSettings: SetState<T>;
	windowSize: WindowSize;
};
