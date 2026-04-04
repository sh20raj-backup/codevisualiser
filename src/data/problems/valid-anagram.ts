import { Problem } from '../schema';

export const validAnagram: Problem = {
  id: 242,
  slug: 'valid-anagram',
  title: 'Valid Anagram',
  difficulty: 'Easy',
  tags: ['Hash Table', 'String', 'Sorting'],
  leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
  hasVisualization: true,
  visualizationComponent: 'ValidAnagramViz',
  approaches: [
    {
      name: 'Frequency Counter',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)', // Since there are only 26 lowercase letters
      intuition: 'Count the occurrences of each character in both strings. If the counts match for all characters, the strings are anagrams.',
      codes: [
        {
          language: 'typescript',
          code: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  
  const count: Record<string, number> = {};
  
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  
  for (let char of t) {
    if (!count[char]) return false;
    count[char]--;
  }
  
  return true;
};`
        },
        {
          language: 'python',
          code: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
            
        count = {}
        for char in s:
            count[char] = count.get(char, 0) + 1
            
        for char in t:
            if char not in count or count[char] == 0:
                return False
            count[char] -= 1
            
        return True`
        }
      ]
    }
  ]
};
