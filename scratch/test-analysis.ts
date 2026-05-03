import { analyzeText } from '../packages/core/src/text-analyzer';

const sampleText = `Hello world 123!
This is a test.
Another paragraph here.
With 2 sentences.`;

const results = analyzeText(sampleText);
console.log(results);
