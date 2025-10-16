// Validation functions for escape room challenges

export interface ValidationResult {
  valid: boolean;
  error?: string;
  message?: string;
}

/**
 * Validates code formatting by checking formatting rules
 * Checks if the logic is the same, then validates formatting quality
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

  // Clean up code: trim and remove trailing whitespace from each line
  const cleanLines = (code: string) =>
    code.trim().split('\n').map(line => line.trimEnd());

  const userLines = cleanLines(userCode);

  // Check for basic formatting issues
  const issues: string[] = [];

  // 1. Check for consistent indentation (must be 2 or 4 spaces)
  let detectedIndentSize: number | null = null;
  const indentSizes: number[] = [];

  for (let i = 0; i < userLines.length; i++) {
    const line = userLines[i];

    // Skip empty lines
    if (line.trim() === '') continue;

    // Get indentation
    const indentMatch = line.match(/^( +)/);
    if (indentMatch) {
      const indentCount = indentMatch[1].length;

      // Detect indent size from first indented line
      if (detectedIndentSize === null && indentCount > 0) {
        detectedIndentSize = indentCount;

        // Validate it's 2 or 4 spaces
        if (detectedIndentSize !== 2 && detectedIndentSize !== 4) {
          issues.push(`Use either 2 or 4 spaces for indentation (detected ${detectedIndentSize} spaces on line ${i + 1})`);
        }
      }

      indentSizes.push(indentCount);
    }
  }

  // Check indentation consistency (all indents should be multiples of the base)
  if (detectedIndentSize !== null && detectedIndentSize > 0) {
    for (let i = 0; i < userLines.length; i++) {
      const line = userLines[i];
      if (line.trim() === '') continue;

      const indentMatch = line.match(/^( +)/);
      if (indentMatch) {
        const indentCount = indentMatch[1].length;
        if (indentCount % detectedIndentSize !== 0) {
          issues.push(`Line ${i + 1}: Inconsistent indentation (${indentCount} spaces, expected multiple of ${detectedIndentSize})`);
        }
      }
    }
  }

  // 2. Check for spaces around operators (JavaScript/C++ specific)
  if (language === 'javascript' || language === 'cpp') {
    for (let i = 0; i < userLines.length; i++) {
      const line = userLines[i].trim();

      // Check for missing spaces around binary operators: =, +, -, *, /, >, <, ==, !=
      // But avoid false positives for negative numbers, increment operators, etc.
      const operatorPatterns = [
        { regex: /\w[+\-*/<>=!]=?\w/, message: 'Add spaces around operators' },
        { regex: /\([^,\s]+,[^\s]/, message: 'Add space after commas in parameters' },
        { regex: /,\S/, message: 'Add space after commas' }
      ];

      for (const { regex, message } of operatorPatterns) {
        if (regex.test(line)) {
          issues.push(`Line ${i + 1}: ${message}`);
          break;
        }
      }
    }
  }

  // 3. Check for proper line breaks (functions should be on multiple lines)
  const userCodeNormalized = userCode.trim();

  if (language === 'javascript') {
    // Check if function has opening brace on same line or next line
    if (/function\s+\w+\([^)]*\)\s*\{/.test(userCodeNormalized)) {
      // This is good - brace on same line
    } else if (/function\s+\w+\([^)]*\)\s*\n\s*\{/.test(userCodeNormalized)) {
      // This is also acceptable - brace on next line
    } else if (userCodeNormalized.includes('function') && !userCodeNormalized.includes('\n')) {
      issues.push('Function should be split across multiple lines with proper indentation');
    }

    // Check if function body is on its own line
    if (/\{[^}\n]+return/.test(userCodeNormalized.replace(/\s/g, ''))) {
      // Body is on same line as opening brace - should be on separate line
      if (!userCodeNormalized.includes('{\n')) {
        issues.push('Function body statements should be on separate lines from braces');
      }
    }
  }

  // 4. Check for proper bracket placement
  if (language === 'javascript' || language === 'cpp') {
    // Count braces
    const openBraces = (userCodeNormalized.match(/\{/g) || []).length;
    const closeBraces = (userCodeNormalized.match(/\}/g) || []).length;

    if (openBraces !== closeBraces) {
      issues.push('Mismatched braces - check your opening and closing brackets');
    }

    // Check if closing braces are on their own line (for multi-line functions)
    if (userLines.length > 1) {
      for (let i = 0; i < userLines.length; i++) {
        const line = userLines[i];
        const trimmed = line.trim();

        // If line has closing brace with other content, might be an issue
        if (trimmed.includes('}') && trimmed !== '}' && !trimmed.startsWith('}')) {
          // Allow "} else {" or "});" patterns
          if (!/^\}\s*(else|catch|finally)/.test(trimmed) && trimmed !== '});') {
            issues.push(`Line ${i + 1}: Closing brace should typically be on its own line`);
          }
        }
      }
    }
  }

  // If there are issues, return the first few
  if (issues.length > 0) {
    return {
      valid: false,
      error: issues.slice(0, 3).join('. ') + (issues.length > 3 ? `... (${issues.length - 3} more issues)` : '')
    };
  }

  return {
    valid: true,
    message: 'Perfect! Code is properly formatted.'
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
      message: 'All tests passed! Code is bug-free.'
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
      message: `Perfect! All ${expected.length} numbers generated correctly.`
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
