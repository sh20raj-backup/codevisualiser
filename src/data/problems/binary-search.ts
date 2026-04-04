import { Problem } from '../schema';

export const binarySearch: Problem = {
  id: 704,
  slug: 'binary-search',
  title: 'Binary Search',
  difficulty: 'Easy',
  tags: ['Array', 'Binary Search'],
  leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
  hasVisualization: true,
  visualizationComponent: 'BinarySearchViz',
  approaches: [
    {
      name: 'Iterative Binary Search',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      intuition: 'Divide the search space in half at each step by comparing the target with the middle element.',
      codes: [
        {
          language: 'typescript',
          code: `function search(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1;
};`
        },
        {
          language: 'python',
          code: `class Solution:
    def search(self, nums: List[int], target: number) -> int:
        left, right = 0, len(nums) - 1
        
        while left <= right:
            mid = (left + right) // 2
            if nums[mid] == target:
                return mid
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid - 1
                
        return -1`
        }
      ]
    }
  ]
};
