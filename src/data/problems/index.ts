import { Problem } from '../schema';
import { twoSum } from './two-sum';

export const problems: Problem[] = [
  twoSum,
];

export const getProblemBySlug = (slug: string) => {
  return problems.find((p) => p.slug === slug);
};
