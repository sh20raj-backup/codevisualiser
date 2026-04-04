import { Problem } from '../schema';

export const twoSum: Problem = {
  id: 1,
  slug: 'two-sum',
  title: 'Two Sum',
  difficulty: 'Easy',
  tags: ['Array', 'Hash Table'],
  leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
  hasVisualization: true,
  visualizationComponent: 'TwoSumViz',
  approaches: [
    {
      name: 'Brute Force',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      intuition: 'Check every possible pair of numbers in the array to see if they add up to the target.',
      codes: [
        {
          language: 'typescript',
          code: `function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
};`,
        },
        {
          language: 'python',
          code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]`,
        },
      ],
    },
    {
      name: 'One-pass Hash Map',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      intuition: 'Store the numbers we have seen so far in a hash map. For each number, check if its "complement" already exists in the map.',
      codes: [
        {
          language: 'typescript',
          code: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
};`,
        },
        {
          language: 'python',
          code: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        prevMap = {} # val : index
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prevMap:
                return [prevMap[diff], i]
            prevMap[n] = i`,
        },
      ],
    },
  ],
};
