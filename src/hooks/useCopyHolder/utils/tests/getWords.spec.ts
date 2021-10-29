import { getWords } from '../getWords';

describe('getWords', () => {
  it('Should throw if second argument is not a string', () => {
    expect.assertions(2);
    try {
      getWords(2, null);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toHaveProperty('message', 'Chunk is not string. It must be at least an empty string');
    }
  });

  it('Should return correctly when passed string with spaces', () => {
    const sampleText1 = 'I am about to go there.';
    const sampleText1Arr = getWords(0, sampleText1);
    expect(sampleText1Arr.length).toBe(11);
    expect(sampleText1Arr[0].word).toBe('I');
    expect(sampleText1Arr[1].word).toBe(' ');
    expect(sampleText1Arr[sampleText1Arr.length - 1].word).toBe('there.');
  });

  it('Should return correctly when passed string with spaces at the end', () => {
    const sampleText2 = 'I am about to go there. ';
    const sampleText2Arr = getWords(999, sampleText2);
    expect(sampleText2Arr.length).toBe(12);
    expect(sampleText2Arr[0].word).toBe('I');
    expect(sampleText2Arr[sampleText2Arr.length - 1].word).toBe(' ');
  });

  it('Should return correctly when passed string with spaces at the beginning and at the end', () => {
    const sampleText3 = ' I am about to go there. ';
    const sampleText3Arr = getWords(123, sampleText3);
    expect(sampleText3Arr.length).toBe(13);
    expect(sampleText3Arr[0].word).toBe(' ');
    expect(sampleText3Arr[1].word).toBe('I');
    expect(sampleText3Arr[sampleText3Arr.length - 1].word).toBe(' ');
  });

  it('Should return correctly when when string has multiple spaces at the start of string', () => {
    const sampleText4 = '  I am about to go there. ';
    const sampleText4Arr = getWords(987, sampleText4);
    expect(sampleText4Arr.length).toBe(14);
    expect(sampleText4Arr[0].word).toBe(' ');
    expect(sampleText4Arr[1].word).toBe(' ');
  });

  it('Should return correctly when when string has multiple spaces in between two words', () => {
    const sampleText5 = '  I am   about to go there. ';
    const sampleText5Arr = getWords(542, sampleText5);
    expect(sampleText5Arr.length).toBe(16);
    expect(sampleText5Arr[6].word).toBe(' ');
    expect(sampleText5Arr[7].word).toBe(' ');
  });

  it('Should return correctly when single/long word', () => {
    const sampleText7 = 'awesome';
    const noSpaceInBetween = sampleText7;
    expect(getWords(367, noSpaceInBetween).length).toBe(1);
    expect(getWords(367, noSpaceInBetween)[0].word).toBe(noSpaceInBetween);
  });

  it('Should return correctly when passed string " "', () => {
    const sampleText8 = ' ';
    expect(getWords(234, sampleText8).length).toBe(1);
    expect(getWords(234, sampleText8)[0].word).toBe(' ');
  });

  it('Should return empty array', () => {
    const emptyString = '';
    expect(getWords(678, emptyString).length).toBe(0);
  });
});
