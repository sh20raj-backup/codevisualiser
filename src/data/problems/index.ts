import { Problem } from '../schema';
import { twoSum } from './two-sum';
import { binarySearch } from './binary-search';
import { validAnagram } from './valid-anagram';
import { reverseString } from './reverse-string';

export const problems: Problem[] = [
  twoSum,
  binarySearch,
  validAnagram,
  reverseString,
];

export const getProblemBySlug = (slug: string) => {
  return problems.find((p) => p.slug === slug);
};
