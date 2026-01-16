import { Diff } from 'diff-match-patch';
export type DiffResult = Diff[];
export declare function computeDiff(text1: string, text2: string): DiffResult;
