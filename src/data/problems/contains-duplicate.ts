import { Problem } from '../schema';

export const containsDuplicate: Problem = {
  id: 217,
  slug: 'contains-duplicate',
  title: 'Contains Duplicate',
  difficulty: 'Easy',
  tags: ['Array', 'Hash Table', 'Sorting'],
  leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
  hasVisualization: true,
  visualizationComponent: 'ContainsDuplicateViz',
  approaches: [
    {
      name: 'Hash Set',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      intuition: 'Iterate through the array and store each element in a hash set. If an element is already in the set, we found a duplicate.',
      codes: [
        {
          language: 'typescript',
          code: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
};`
        },
        {
          language: 'python',
          code: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        seen = set()
        for num in nums:
            if num in seen:
                return True
            seen.add(num)
        return False`
        }
      ]
    }
  ]
};
