import { GetWordDetailsReturn } from 'hooks/useCopyHolder/interface';

export interface WordProps {
  variant: 'isFirstPart' | 'isActive' | 'isLastPart';
  wordDetails?: GetWordDetailsReturn;
  word: string;
}
