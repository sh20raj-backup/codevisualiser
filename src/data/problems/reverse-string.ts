import { Problem } from '../schema';

export const reverseString: Problem = {
  id: 344,
  slug: 'reverse-string',
  title: 'Reverse String',
  difficulty: 'Easy',
  tags: ['Two Pointers', 'String'],
  leetcodeUrl: 'https://leetcode.com/problems/reverse-string/',
  hasVisualization: true,
  visualizationComponent: 'ReverseStringViz',
  approaches: [
    {
      name: 'Two Pointers (In-place)',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      intuition: 'Use two pointers at the start and end of the string. Swap the characters and move the pointers towards each other until they meet.',
      codes: [
        {
          language: 'typescript',
          code: `function reverseString(s: string[]): void {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]];
    left++;
    right--;
  }
};`
        },
        {
          language: 'python',
          code: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1`
        }
      ]
    }
  ]
};
