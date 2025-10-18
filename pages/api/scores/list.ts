import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

/**
 * API Route: GET /api/scores/list
 *
 * Fetches scores from the database with optional filtering and sorting.
 *
 * Query Parameters:
 * - difficulty: 'all' | 'easy' | 'medium' | 'hard' (default: 'all')
 * - language: 'all' | 'javascript' | 'python' | 'cpp' (default: 'all')
 * - limit: number (default: 50, max: 500)
 * - sortBy: 'completionTime' | 'completedAt' | 'totalAttempts' | 'totalHints' (default: 'completionTime')
 * - order: 'asc' | 'desc' (default: 'asc')
 *
 * Example:
 * GET /api/scores/list?difficulty=hard&language=javascript&limit=10&sortBy=completionTime&order=asc
 *
 * Response:
 * {
 *   scores: Score[],
 *   total: number,
 *   filteredCount: number
 * }
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract and validate query parameters
    const {
      difficulty = 'all',
      language = 'all',
      limit = '50',
      sortBy = 'completionTime',
      order = 'asc',
    } = req.query;

    // Build where clause for filtering
    const where: any = {};

    // Filter by difficulty
    if (difficulty !== 'all') {
      if (!['easy', 'medium', 'hard'].includes(difficulty as string)) {
        return res.status(400).json({ error: 'Invalid difficulty filter' });
      }
      where.difficulty = difficulty;
    }

    // Filter by language
    if (language !== 'all') {
      if (!['javascript', 'python', 'cpp'].includes(language as string)) {
        return res.status(400).json({ error: 'Invalid language filter' });
      }
      where.language = language;
    }

    // Validate sortBy parameter
    const validSortFields = ['completionTime', 'completedAt', 'totalAttempts', 'totalHints'];
    if (!validSortFields.includes(sortBy as string)) {
      return res.status(400).json({
        error: `Invalid sortBy parameter. Must be one of: ${validSortFields.join(', ')}`,
      });
    }

    // Validate order parameter
    if (!['asc', 'desc'].includes(order as string)) {
      return res.status(400).json({ error: 'Invalid order. Must be: asc or desc' });
    }

    // Build orderBy clause
    const orderBy: any = {};
    orderBy[sortBy as string] = order === 'desc' ? 'desc' : 'asc';

    // Parse and validate limit
    const limitNum = parseInt(limit as string);
    if (isNaN(limitNum) || limitNum < 1) {
      return res.status(400).json({ error: 'Invalid limit. Must be a positive number' });
    }
    const finalLimit = Math.min(limitNum, 500); // Max 500 records

    // Fetch scores from database
    const scores = await prisma.score.findMany({
      where,
      orderBy,
      take: finalLimit,
    });

    // Get total count (all scores)
    const total = await prisma.score.count();

    // Get filtered count
    const filteredCount = await prisma.score.count({ where });

    // Return results
    return res.status(200).json({
      scores,
      total,
      filteredCount,
      filters: {
        difficulty: difficulty as string,
        language: language as string,
        sortBy: sortBy as string,
        order: order as string,
        limit: finalLimit,
      },
    });
  } catch (error) {
    console.error('Error fetching scores:', error);

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
      error: 'Failed to fetch scores',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}
