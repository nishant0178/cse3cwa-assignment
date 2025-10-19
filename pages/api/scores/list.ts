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
  // INSTRUMENTATION: Log incoming request
  const requestId = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${requestId}] GET /api/scores/list - Request received`);
  console.log(`[${timestamp}] [${requestId}] Query params:`, req.query);

  const startTime = Date.now();

  // Only allow GET requests
  if (req.method !== 'GET') {
    console.log(`[${timestamp}] [${requestId}] Method not allowed: ${req.method}`);
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

    // INSTRUMENTATION: Log parsed filters
    console.log(`[${timestamp}] [${requestId}] Filters:`, {
      difficulty,
      language,
      limit,
      sortBy,
      order
    });

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

    // INSTRUMENTATION: Log database queries start
    const dbStartTime = Date.now();
    console.log(`[${timestamp}] [${requestId}] Starting database queries (findMany + 2x count)...`);

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

    // INSTRUMENTATION: Log database queries completion
    const dbDuration = Date.now() - dbStartTime;
    console.log(`[${timestamp}] [${requestId}] Database queries completed in ${dbDuration}ms`);
    console.log(`[${timestamp}] [${requestId}] Results: ${scores.length} scores returned, ${filteredCount} filtered, ${total} total`);

    // INSTRUMENTATION: Log total request duration
    const totalDuration = Date.now() - startTime;
    console.log(`[${timestamp}] [${requestId}] GET /api/scores/list - Success (200) - Total time: ${totalDuration}ms`);

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
    // INSTRUMENTATION: Log error details
    const errorDuration = Date.now() - startTime;
    console.error(`[${timestamp}] [${requestId}] ERROR in /api/scores/list after ${errorDuration}ms:`, error);
    console.error(`[${timestamp}] [${requestId}] Error type:`, error instanceof Error ? error.constructor.name : typeof error);
    if (error instanceof Error) {
      console.error(`[${timestamp}] [${requestId}] Error message:`, error.message);
    }

    // Handle Prisma-specific errors
    if (error instanceof Error) {
      if (error.message.includes('Prisma')) {
        console.error(`[${timestamp}] [${requestId}] Prisma database error detected`);
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
