export interface Stroke {
  endTimestamp?: number;
  startTimestamp: number;
  correctlyTyped?: boolean;
  characterToBeTyped: string;
  actuallyTypedCharacter?: string;
}

export interface TypeCharacter {
  index: number;
  toType: string;
  actuallyTyped?: string;
}

export interface GetWordDetailsReturn {
  word: string;
  wpm?: number;
  isCorrect?: boolean;
  actuallyTypedWord?: string;
  characterDetails: TypeCharacter[];
}

export interface UseCopyHolder {
  wpm: number;
  text: string;
  chunks: GetChunksReturn;
  handleCopyHolderInput: HandleCopyHolderInput;
  firstChunkWordDetails: GetWordDetailsReturn[];
}

export interface WordPos {
  word: string;
  indexOfWordsFirstCharacter: number;
}

export interface CharacterPos {
  character: string;
  indexOfCharacter: number;
}

export interface GetChunksArgs {
  text: string;
  activeIndex: number;
}

export interface GetChunksReturn {
  active: string;
  lastChunk: string;
  hiddenLast: string;
  firstChunk: string;
  hiddenFirst: string;
  lastChunkWords: WordPos[];
  firstChunkWords: WordPos[];
  activeIndexWithinActiveChunk: number;
}

export type GetWordsReturn = WordPos[];
export type Strokes = { [indexOfCharacterToBeTyped: string]: Stroke };
export type RegisterInput = (indexOfCharacterToBeTyped: number) => void;
export type UnregisterInput = (indexOfCharacterToBeTyped: number) => void;
export type UpdateInput = (indexOfCharacterToBeTyped: number, actuallyTypedCharacter: string) => void;
export type HandleCopyHolderInput = (arg: { keyCode: number; key: string; isShiftActive: boolean }) => void;
