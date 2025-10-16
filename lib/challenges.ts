// Challenge definitions for all languages and difficulty levels

export interface Challenge {
  messy?: string;
  formatted?: string;
  buggy?: string;
  fixed?: string;
  description: string;
  requirements: string[];
  hints: string[];
  testCases?: Array<{ input: any[]; expected: any }>;
}

export interface StageDefinition {
  stage1: Challenge;
  stage2: Challenge;
  stage3: Challenge;
  stage4: Challenge;
}

export const challenges = {
  javascript: {
    easy: {
      stage1: {
        messy: 'function add(a,b){return a+b}',
        formatted: 'function add(a, b) {\n  return a + b;\n}',
        description: 'Format the code properly with correct spacing and indentation.',
        requirements: [
          'Add space after function name',
          'Space around operators',
          'Proper indentation (2 spaces)',
          'Curly braces on correct lines'
        ],
        hints: [
          'Add spaces between parameters in the function definition',
          'The return statement should be indented inside the function',
          'Use 2 spaces for indentation and add spaces around the + operator'
        ]
      },
      stage2: {
        buggy: 'function multiply(x, y) {\n  let result = x * y\n  retrun result;\n}',
        fixed: 'function multiply(x, y) {\n  let result = x * y;\n  return result;\n}',
        description: 'Find and fix the bugs in this code.',
        requirements: [
          'Fix spelling errors',
          'Ensure proper syntax',
          'Add missing semicolons'
        ],
        hints: [
          'Check the spelling of all keywords carefully',
          'Look at line 3 - there\'s a typo in a keyword',
          'The word "retrun" should be "return", and add semicolon on line 2'
        ],
        testCases: [
          { input: [5, 10], expected: 50 },
          { input: [0, 5], expected: 0 },
          { input: [-2, 3], expected: -6 }
        ]
      },
      stage3: {
        description: 'Write code to generate all numbers from 0 to 1000.',
        requirements: [
          'Generate numbers 0, 1, 2, ..., 1000',
          'Use console.log() to output each number',
          'Numbers must be in order',
          'Exactly 1001 numbers (0 through 1000)'
        ],
        hints: [
          'You can use a for loop that starts at 0 and goes up to 1000',
          'Make sure your loop condition uses <= 1000 (not < 1000)',
          'Use console.log(i) inside the loop to print each number'
        ]
      },
      stage4: {
        description: 'Write a function to transform CSV data into an array of objects.',
        requirements: [
          'Create a function named transform(input)',
          'Parse CSV format: "name,age,city\\nJohn,25,NYC\\nJane,30,LA"',
          'Return array of objects with properties: name, age, city',
          'Handle the header row correctly'
        ],
        hints: [
          'Split the input by newline characters (\\n) to get rows',
          'The first row contains the headers (column names)',
          'For each data row, create an object mapping headers to values',
          'Use split(",") to separate values in each row'
        ]
      }
    },
    medium: {
      stage1: {
        messy: 'function calculate(x,y,z){if(x>y){return x+z}else{return y+z}}',
        formatted: 'function calculate(x, y, z) {\n  if (x > y) {\n    return x + z;\n  } else {\n    return y + z;\n  }\n}',
        description: 'Format this function with proper indentation and spacing.',
        requirements: [
          'Proper spacing around operators',
          'Correct indentation (2 spaces per level)',
          'Each block statement on new line',
          'Consistent bracket placement'
        ],
        hints: [
          'Each if/else block should be on separate lines',
          'Nested code should be indented one more level (2 more spaces)',
          'Add spaces around comparison and arithmetic operators'
        ]
      },
      stage2: {
        buggy: 'function findMax(arr) {\n  let max = arr[0]\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i]\n    }\n  }\n  retrun max;\n}',
        fixed: 'function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) {\n      max = arr[i];\n    }\n  }\n  return max;\n}',
        description: 'Debug this function that finds the maximum value in an array.',
        requirements: [
          'Fix all syntax errors',
          'Ensure function returns correctly',
          'Add missing semicolons'
        ],
        hints: [
          'Multiple lines are missing semicolons',
          'Check the return statement for a typo',
          'Add semicolons after lines 2, 5, and fix "retrun" on line 8'
        ],
        testCases: [
          { input: [[1, 5, 3]], expected: 5 },
          { input: [[10, 2, 8]], expected: 10 },
          { input: [[-1, -5, -3]], expected: -1 }
        ]
      },
      stage3: {
        description: 'Write code to generate all even numbers from 0 to 1000.',
        requirements: [
          'Generate only even numbers: 0, 2, 4, ..., 1000',
          'Use console.log() to output each number',
          'Numbers must be in order',
          'Exactly 501 numbers'
        ],
        hints: [
          'You can increment by 2 in your loop: i += 2',
          'Start at 0 and increment by 2 each time',
          'Or use a condition to check if (i % 2 === 0)'
        ]
      },
      stage4: {
        description: 'Write a function to transform JSON array into a key-value object.',
        requirements: [
          'Create a function named transform(input)',
          'Parse JSON string: \'[{"id":1,"value":"a"},{"id":2,"value":"b"}]\'',
          'Return object mapping id to value: {\'1\': \'a\', \'2\': \'b\'}',
          'Handle JSON parsing correctly'
        ],
        hints: [
          'First parse the JSON string using JSON.parse()',
          'Create an empty result object',
          'Loop through the array and map each id to its value',
          'Use bracket notation to set properties: result[obj.id] = obj.value'
        ]
      }
    },
    hard: {
      stage1: {
        messy: 'function processData(items){let result=[];for(let i=0;i<items.length;i++){if(items[i]%2===0){result.push(items[i]*2)}}return result}',
        formatted: 'function processData(items) {\n  let result = [];\n  for (let i = 0; i < items.length; i++) {\n    if (items[i] % 2 === 0) {\n      result.push(items[i] * 2);\n    }\n  }\n  return result;\n}',
        description: 'Format this complex function with multiple nested blocks.',
        requirements: [
          'Proper spacing throughout',
          'Correct indentation levels (2 spaces per level)',
          'Each statement on new line',
          'Readable structure'
        ],
        hints: [
          'Start by adding line breaks after each semicolon and opening brace',
          'Each level of nesting adds 2 more spaces of indentation',
          'Add spaces around all operators (=, %, ===, *)'
        ]
      },
      stage2: {
        buggy: 'function fibonacci(n) {\n  if (n <= 1) retrun n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    let temp = a + b;\n    a = b\n    b = temp;\n  }\n  return b;\n}',
        fixed: 'function fibonacci(n) {\n  if (n <= 1) return n;\n  let a = 0, b = 1;\n  for (let i = 2; i <= n; i++) {\n    let temp = a + b;\n    a = b;\n    b = temp;\n  }\n  return b;\n}',
        description: 'Debug this Fibonacci function with multiple errors.',
        requirements: [
          'Fix typos in keywords',
          'Add missing semicolons',
          'Ensure correct logic'
        ],
        hints: [
          'There are errors on lines 2 and 6',
          'Line 2: typo in "retrun", Line 6: missing semicolon',
          'Fix "retrun" to "return" and add semicolon after "a = b"'
        ],
        testCases: [
          { input: [0], expected: 0 },
          { input: [1], expected: 1 },
          { input: [5], expected: 5 },
          { input: [10], expected: 55 }
        ]
      },
      stage3: {
        description: 'Write code to generate all prime numbers from 0 to 100.',
        requirements: [
          'Generate only prime numbers: 2, 3, 5, 7, 11, ..., 97',
          'Use console.log() to output each prime',
          'Numbers must be in order',
          'Only prime numbers (no 0, 1, or composite numbers)'
        ],
        hints: [
          'A prime number is only divisible by 1 and itself',
          'Start checking from 2 (the first prime number)',
          'For each number, check if it has any divisors from 2 to sqrt(n)'
        ]
      },
      stage4: {
        description: 'Write a function to parse XML-like string into array of objects.',
        requirements: [
          'Create a function named transform(input)',
          'Parse XML string: \'<users><user><name>John</name><age>25</age></user></users>\'',
          'Extract user data and return array: [{name: "John", age: "25"}]',
          'Handle nested XML tags correctly'
        ],
        hints: [
          'Use regular expressions to extract tag contents',
          'Match patterns like <name>content</name>',
          'Extract the name and age values from between the tags',
          'Create an object for each user and push to result array'
        ]
      }
    }
  },
  python: {
    easy: {
      stage1: {
        messy: 'def add(a,b):return a+b',
        formatted: 'def add(a, b):\n    return a + b',
        description: 'Format the Python code properly with correct spacing and indentation.',
        requirements: [
          'Add space after commas',
          'Space around operators',
          'Proper indentation (4 spaces)',
          'Colon placement'
        ],
        hints: [
          'Python uses 4 spaces for indentation',
          'Add spaces between parameters',
          'The return statement should be indented under the def'
        ]
      },
      stage2: { description: 'Placeholder', requirements: [], hints: [] },
      stage3: { description: 'Placeholder', requirements: [], hints: [] },
      stage4: { description: 'Placeholder', requirements: [], hints: [] }
    },
    medium: {
      stage1: {
        messy: 'def calculate(x,y,z):return x+z if x>y else y+z',
        formatted: 'def calculate(x, y, z):\n    if x > y:\n        return x + z\n    else:\n        return y + z',
        description: 'Format this Python function with proper structure.',
        requirements: [
          'Use if/else block instead of ternary',
          'Proper indentation (4 spaces)',
          'Spaces around operators',
          'Each statement on new line'
        ],
        hints: [
          'Convert the ternary expression to a full if/else block',
          'Each nested level adds 4 more spaces',
          'The return statements should be indented under if/else'
        ]
      },
      stage2: { description: 'Placeholder', requirements: [], hints: [] },
      stage3: { description: 'Placeholder', requirements: [], hints: [] },
      stage4: { description: 'Placeholder', requirements: [], hints: [] }
    },
    hard: {
      stage1: {
        messy: 'def process_data(items):result=[];[result.append(item*2) for item in items if item%2==0];return result',
        formatted: 'def process_data(items):\n    result = []\n    for item in items:\n        if item % 2 == 0:\n            result.append(item * 2)\n    return result',
        description: 'Format this Python code, converting list comprehension to readable loop.',
        requirements: [
          'Convert to standard for loop',
          'Proper indentation (4 spaces per level)',
          'Each statement on new line',
          'Spaces around operators'
        ],
        hints: [
          'Replace the list comprehension with a for loop',
          'Each level of nesting adds 4 spaces',
          'Split the complex line into multiple lines'
        ]
      },
      stage2: { description: 'Placeholder', requirements: [], hints: [] },
      stage3: { description: 'Placeholder', requirements: [], hints: [] },
      stage4: { description: 'Placeholder', requirements: [], hints: [] }
    }
  },
  cpp: {
    easy: {
      stage1: {
        messy: 'int add(int a,int b){return a+b;}',
        formatted: 'int add(int a, int b) {\n    return a + b;\n}',
        description: 'Format the C++ code properly with correct spacing and indentation.',
        requirements: [
          'Space after commas',
          'Space around operators',
          'Proper indentation (4 spaces)',
          'Curly braces on correct lines'
        ],
        hints: [
          'C++ typically uses 4 spaces for indentation',
          'Add spaces between parameters and around operators',
          'The return statement should be indented inside the function'
        ]
      },
      stage2: { description: 'Placeholder', requirements: [], hints: [] },
      stage3: { description: 'Placeholder', requirements: [], hints: [] },
      stage4: { description: 'Placeholder', requirements: [], hints: [] }
    },
    medium: {
      stage1: {
        messy: 'int calculate(int x,int y,int z){if(x>y){return x+z;}else{return y+z;}}',
        formatted: 'int calculate(int x, int y, int z) {\n    if (x > y) {\n        return x + z;\n    } else {\n        return y + z;\n    }\n}',
        description: 'Format this C++ function with proper indentation.',
        requirements: [
          'Proper spacing around operators',
          'Correct indentation (4 spaces per level)',
          'Each block on new lines',
          'Consistent bracket placement'
        ],
        hints: [
          'Each if/else block should be on separate lines',
          'Nested code adds 4 more spaces of indentation',
          'Add spaces around comparison and arithmetic operators'
        ]
      },
      stage2: { description: 'Placeholder', requirements: [], hints: [] },
      stage3: { description: 'Placeholder', requirements: [], hints: [] },
      stage4: { description: 'Placeholder', requirements: [], hints: [] }
    },
    hard: {
      stage1: {
        messy: 'vector<int> processData(vector<int>items){vector<int>result;for(int i=0;i<items.size();i++){if(items[i]%2==0){result.push_back(items[i]*2);}}return result;}',
        formatted: 'vector<int> processData(vector<int> items) {\n    vector<int> result;\n    for (int i = 0; i < items.size(); i++) {\n        if (items[i] % 2 == 0) {\n            result.push_back(items[i] * 2);\n        }\n    }\n    return result;\n}',
        description: 'Format this complex C++ function with multiple nested blocks.',
        requirements: [
          'Proper spacing throughout',
          'Correct indentation (4 spaces per level)',
          'Each statement on new line',
          'Readable structure'
        ],
        hints: [
          'Add line breaks after semicolons and opening braces',
          'Each nesting level adds 4 spaces',
          'Add spaces around operators and after commas'
        ]
      },
      stage2: { description: 'Placeholder', requirements: [], hints: [] },
      stage3: { description: 'Placeholder', requirements: [], hints: [] },
      stage4: { description: 'Placeholder', requirements: [], hints: [] }
    }
  }
};

export type Language = 'javascript' | 'python' | 'cpp';
export type Difficulty = 'easy' | 'medium' | 'hard';

export function getChallenge(language: Language, difficulty: Difficulty, stage: 1 | 2 | 3 | 4): Challenge {
  const difficultySet = challenges[language][difficulty];
  return difficultySet[`stage${stage}` as keyof typeof difficultySet] as Challenge;
}

export function getTimerDuration(difficulty: Difficulty): number {
  // Returns duration in seconds
  switch (difficulty) {
    case 'easy': return 45 * 60; // 45 minutes
    case 'medium': return 30 * 60; // 30 minutes
    case 'hard': return 20 * 60; // 20 minutes
    default: return 30 * 60;
  }
}
