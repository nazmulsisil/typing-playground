import { GetWordsReturn } from '../interface';

// TODO: optimize
export const getWords = (indexOffset: number, chunk: string): GetWordsReturn => {
  if (typeof chunk !== 'string') throw new Error('Chunk is not string. It must be at least an empty string');
  if (chunk === '') return [];
  if (chunk.indexOf(' ') === -1 || (chunk.length === 1 && chunk === ' '))
    return [{ word: chunk, indexOfWordsFirstCharacter: indexOffset }];

  const arr = chunk.split(' '),
    finalArr = [];
  let indNum = 0;

  for (let i = 0; i < arr.length; i++) {
    let elem = arr[i];
    elem !== undefined && i > 0 ? (indNum += arr[i - 1].length + 1) : (indNum = 0);
    const indexNum = chunk.indexOf(elem, indNum) + indexOffset;

    if (arr.length - 1 !== i && elem !== '' && elem !== undefined) {
      finalArr.push({ word: elem, indexOfWordsFirstCharacter: indexNum });
      finalArr.push({ word: ' ', indexOfWordsFirstCharacter: indexNum + elem.length });
    } else {
      finalArr.push({ word: elem === '' ? ' ' : elem, indexOfWordsFirstCharacter: indexNum });
    }
  }
  if (chunk[chunk.length - 1] === ' ') {
    finalArr.pop();
  }
  if (finalArr.length < 1) throw new Error('Words array should not be empty where chunk is not empty.');
  return finalArr;
};

/*
// TODO: spec:
// TODO: DELETE after test review:
const sampleText1 = 'I am about to go there.';
const sampleText2 = 'I am about to go there. ';
const sampleText3 = ' I am about to go there. ';
const sampleText4 = '  I am about to go there. ';
const sampleText5 = '  I am   about to go there. ';
const sampleText6 = 'This and that, so and so on.;
const sampleText7 = 'awesome';
const sampleText8 = ' ';
const assertion1 = getWords(0, sampleText1);
const assertion2 = getWords(999, sampleText2);
const assertion3 = getWords(123, sampleText3);
const assertion4 = getWords(987, sampleText4);
const assertion5 = getWords(542, sampleText5);
const assertion6 = getWords(367, sampleText6);
const assertion7 = getWords(367, sampleText7);
const assertion8 = getWords(234, sampleText8);
const assertion9 = getWords(678, '');
// const assertion10 = getWords(234, undefined); // this line is commented out because it throws error in the application, but in test suit somehow you should be able to test if it throws the error or not.
*/
