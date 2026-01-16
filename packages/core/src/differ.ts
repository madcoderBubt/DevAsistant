import { diff_match_patch, Diff } from 'diff-match-patch';

export type DiffResult = Diff[];

export function computeDiff(text1: string, text2: string): DiffResult {
    const dmp = new diff_match_patch();
    const diffs = dmp.diff_main(text1, text2);
    dmp.diff_cleanupSemantic(diffs);
    return diffs;
}
