import { Problem } from '../schema';
import { twoSum } from './two-sum';
import { binarySearch } from './binary-search';
import { validAnagram } from './valid-anagram';
import { reverseString } from './reverse-string';
import { containsDuplicate } from './contains-duplicate';
import { validParentheses } from './valid-parentheses';

export const problems: Problem[] = [
  twoSum,
  binarySearch,
  validAnagram,
  reverseString,
  containsDuplicate,
  validParentheses,
];

export const getProblemBySlug = (slug: string) => {
  return problems.find((p) => p.slug === slug);
};
