import { Problem } from '../schema';

export const validParentheses: Problem = {
  id: 20,
  slug: 'valid-parentheses',
  title: 'Valid Parentheses',
  difficulty: 'Easy',
  tags: ['Stack', 'String'],
  leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
  hasVisualization: true,
  visualizationComponent: 'ValidParenthesesViz',
  approaches: [
    {
      name: 'Stack-based Matching',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      intuition: 'Use a stack to keep track of opening brackets. When a closing bracket is encountered, it must match the bracket at the top of the stack.',
      codes: [
        {
          language: 'typescript',
          code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const map: Record<string, string> = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
};`
        },
        {
          language: 'python',
          code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        mapping = {")": "(", "}": "{", "]": "["}
        
        for char in s:
            if char in mapping:
                top_element = stack.pop() if stack else '#'
                if mapping[char] != top_element:
                    return False
            else:
                stack.append(char)
                
        return not stack`
        }
      ]
    }
  ]
};
