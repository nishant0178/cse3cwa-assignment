// Validation functions for escape room challenges

export interface ValidationResult {
  valid: boolean;
  error?: string;
  message?: string;
}

/**
 * Validates code formatting by comparing normalized versions
 * Checks if the logic is the same, then validates formatting
 */
export function validateFormatting(
  userCode: string,
  expectedCode: string,
  language: 'javascript' | 'python' | 'cpp'
): ValidationResult {
  // Normalize code by removing all whitespace for logic comparison
  const normalize = (code: string) => code.replace(/\s+/g, '').toLowerCase().trim();

  const userNormalized = normalize(userCode);
  const expectedNormalized = normalize(expectedCode);

  // Check if the logic matches
  if (userNormalized !== expectedNormalized) {
    return {
      valid: false,
      error: 'The code logic doesn\'t match the original. Make sure you only changed formatting, not the code itself.'
    };
  }

  // Check if formatting matches expected (with some tolerance)
  const userTrimmed = userCode.trim();
  const expectedTrimmed = expectedCode.trim();

  // Split into lines for comparison
  const userLines = userTrimmed.split('\n');
  const expectedLines = expectedTrimmed.split('\n');

  if (userLines.length !== expectedLines.length) {
    return {
      valid: false,
      error: `Expected ${expectedLines.length} lines but got ${userLines.length}. Make sure each statement is on the correct line.`
    };
  }

  // Check indentation and spacing
  const indentSize = language === 'python' || language === 'cpp' ? 4 : 2;

  for (let i = 0; i < userLines.length; i++) {
    const userLine = userLines[i];
    const expectedLine = expectedLines[i];

    // Get indentation level
    const userIndent = userLine.match(/^\s*/)?.[0].length || 0;
    const expectedIndent = expectedLine.match(/^\s*/)?.[0].length || 0;

    if (userIndent !== expectedIndent) {
      return {
        valid: false,
        error: `Line ${i + 1}: Incorrect indentation. Expected ${expectedIndent} spaces but got ${userIndent}.`
      };
    }

    // Compare trimmed lines
    if (userLine.trim() !== expectedLine.trim()) {
      return {
        valid: false,
        error: `Line ${i + 1}: Spacing issue. Expected: "${expectedLine.trim()}" but got: "${userLine.trim()}"`
      };
    }
  }

  return {
    valid: true,
    message: 'Perfect! Code is properly formatted. 🔓'
  };
}

/**
 * Validates debugged code by running test cases
 */
export function validateDebuggedCode(
  userCode: string,
  testCases: Array<{ input: any[]; expected: any }>
): ValidationResult {
  try {
    // Try to extract function from user code
    let funcToTest: Function;

    // Check if it's a function declaration
    if (userCode.includes('function ')) {
      // Extract function name
      const funcNameMatch = userCode.match(/function\s+(\w+)/);
      if (!funcNameMatch) {
        return {
          valid: false,
          error: 'Could not find function declaration. Make sure your function is named correctly.'
        };
      }

      const funcName = funcNameMatch[1];

      // Create function in isolated scope and test it
      try {
        // Use Function constructor to create the function
        const funcBody = userCode;
        const testCode = `
          ${funcBody}
          return ${funcName};
        `;
        funcToTest = new Function(testCode)();
      } catch (e: any) {
        return {
          valid: false,
          error: `Syntax error: ${e.message}`
        };
      }
    } else {
      return {
        valid: false,
        error: 'Please provide a complete function declaration.'
      };
    }

    // Run test cases
    for (let i = 0; i < testCases.length; i++) {
      const test = testCases[i];
      try {
        const result = funcToTest(...test.input);
        if (result !== test.expected) {
          return {
            valid: false,
            error: `Test ${i + 1} failed: Expected ${test.expected} but got ${result} for input [${test.input.join(', ')}]`
          };
        }
      } catch (e: any) {
        return {
          valid: false,
          error: `Test ${i + 1} error: ${e.message}`
        };
      }
    }

    return {
      valid: true,
      message: 'All tests passed! Code is bug-free. 🔓'
    };
  } catch (e: any) {
    return {
      valid: false,
      error: `Error running code: ${e.message}`
    };
  }
}

/**
 * Validates number generation code
 * Checks if code generates all numbers from 0 to maxNumber
 */
export function validateNumberGeneration(
  userCode: string,
  maxNumber: number = 1000,
  evenOnly: boolean = false,
  primesOnly: boolean = false
): ValidationResult {
  try {
    const output: number[] = [];

    // Create a mock console.log that captures output
    const mockConsole = {
      log: (...args: any[]) => {
        args.forEach(arg => {
          const num = Number(arg);
          if (!isNaN(num)) {
            output.push(num);
          }
        });
      }
    };

    // Execute user code with mocked console
    try {
      const func = new Function('console', userCode);
      func(mockConsole);
    } catch (e: any) {
      return {
        valid: false,
        error: `Runtime error: ${e.message}`
      };
    }

    // Generate expected output
    let expected: number[];

    if (primesOnly) {
      // Generate prime numbers
      expected = [];
      for (let i = 2; i <= maxNumber; i++) {
        if (isPrime(i)) {
          expected.push(i);
        }
      }
    } else if (evenOnly) {
      // Generate even numbers
      expected = [];
      for (let i = 0; i <= maxNumber; i += 2) {
        expected.push(i);
      }
    } else {
      // Generate all numbers
      expected = Array.from({ length: maxNumber + 1 }, (_, i) => i);
    }

    // Compare output with expected
    if (output.length !== expected.length) {
      return {
        valid: false,
        error: `Expected ${expected.length} numbers but got ${output.length}. Make sure you're generating the correct range.`
      };
    }

    for (let i = 0; i < expected.length; i++) {
      if (output[i] !== expected[i]) {
        return {
          valid: false,
          error: `Number mismatch at position ${i + 1}: Expected ${expected[i]} but got ${output[i]}`
        };
      }
    }

    return {
      valid: true,
      message: `Perfect! All ${expected.length} numbers generated correctly. 🔓`
    };
  } catch (e: any) {
    return {
      valid: false,
      error: `Error executing code: ${e.message}`
    };
  }
}

/**
 * Helper function to check if a number is prime
 */
function isPrime(num: number): boolean {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  return true;
}

/**
 * Validates code based on stage and difficulty
 */
export function validateStage(
  stage: 1 | 2 | 3,
  userCode: string,
  expectedCode: string | undefined,
  language: 'javascript' | 'python' | 'cpp',
  difficulty: 'easy' | 'medium' | 'hard',
  testCases?: Array<{ input: any[]; expected: any }>
): ValidationResult {
  switch (stage) {
    case 1:
      if (!expectedCode) {
        return { valid: false, error: 'Expected code not provided' };
      }
      return validateFormatting(userCode, expectedCode, language);

    case 2:
      if (!testCases || testCases.length === 0) {
        return { valid: false, error: 'Test cases not provided' };
      }
      return validateDebuggedCode(userCode, testCases);

    case 3:
      // Stage 3 validation based on difficulty
      if (difficulty === 'easy') {
        return validateNumberGeneration(userCode, 1000, false, false);
      } else if (difficulty === 'medium') {
        return validateNumberGeneration(userCode, 1000, true, false);
      } else {
        return validateNumberGeneration(userCode, 100, false, true);
      }

    default:
      return { valid: false, error: 'Invalid stage' };
  }
}
