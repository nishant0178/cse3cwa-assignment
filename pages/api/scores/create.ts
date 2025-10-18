import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

/**
 * API Route: POST /api/scores/create
 *
 * Creates a new score entry in the database after a player completes the escape room.
 *
 * Request Body:
 * {
 *   playerName?: string,
 *   difficulty: 'easy' | 'medium' | 'hard',
 *   language: 'javascript' | 'python' | 'cpp',
 *   completionTime: number,  // in seconds
 *   totalAttempts: number,
 *   totalHints: number
 * }
 *
 * Response:
 * - 201: Score created successfully
 * - 400: Invalid input data
 * - 405: Method not allowed
 * - 500: Server error
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      playerName,
      difficulty,
      language,
      completionTime,
      totalAttempts,
      totalHints,
    } = req.body;

    // Validation: Required fields
    if (!difficulty || !language || completionTime === undefined) {
      return res.status(400).json({
        error: 'Missing required fields: difficulty, language, completionTime',
      });
    }

    // Validation: Difficulty enum
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({
        error: 'Invalid difficulty. Must be: easy, medium, or hard',
      });
    }

    // Validation: Language enum
    if (!['javascript', 'python', 'cpp'].includes(language)) {
      return res.status(400).json({
        error: 'Invalid language. Must be: javascript, python, or cpp',
      });
    }

    // Validation: Numeric values
    const time = parseInt(completionTime);
    const attempts = parseInt(totalAttempts) || 0;
    const hints = parseInt(totalHints) || 0;

    if (isNaN(time) || time < 0) {
      return res.status(400).json({
        error: 'Invalid completionTime. Must be a positive number',
      });
    }

    if (attempts < 0 || hints < 0) {
      return res.status(400).json({
        error: 'Invalid totalAttempts or totalHints. Must be positive numbers',
      });
    }

    // Create score in database
    const score = await prisma.score.create({
      data: {
        playerName: playerName || null, // null for anonymous
        difficulty,
        language,
        completionTime: time,
        totalAttempts: attempts,
        totalHints: hints,
      },
    });

    // Return created score
    return res.status(201).json({
      success: true,
      score,
      message: 'Score saved successfully!',
    });
  } catch (error) {
    console.error('Error creating score:', error);

    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        return res.status(500).json({
          error: 'Database error',
          details: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }
    }

    return res.status(500).json({
      error: 'Failed to save score',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}
