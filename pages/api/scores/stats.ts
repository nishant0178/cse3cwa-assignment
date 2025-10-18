import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

/**
 * API Route: GET /api/scores/stats
 *
 * Fetches statistical data about all scores in the database.
 *
 * Response:
 * {
 *   totalGames: number,
 *   fastestTime: number,
 *   averageTime: number,
 *   byDifficulty: {
 *     easy: { count: number, avgTime: number },
 *     medium: { count: number, avgTime: number },
 *     hard: { count: number, avgTime: number }
 *   },
 *   byLanguage: {
 *     javascript: { count: number },
 *     python: { count: number },
 *     cpp: { count: number }
 *   }
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
    // Total number of games played
    const totalGames = await prisma.score.count();

    // Fastest completion time
    const fastest = await prisma.score.findFirst({
      orderBy: { completionTime: 'asc' },
      select: { completionTime: true },
    });

    // Average completion time
    const avgResult = await prisma.score.aggregate({
      _avg: { completionTime: true },
    });

    // Statistics by difficulty
    const byDifficulty = {
      easy: await getStatsForDifficulty('easy'),
      medium: await getStatsForDifficulty('medium'),
      hard: await getStatsForDifficulty('hard'),
    };

    // Statistics by language
    const byLanguage = {
      javascript: {
        count: await prisma.score.count({ where: { language: 'javascript' } }),
      },
      python: {
        count: await prisma.score.count({ where: { language: 'python' } }),
      },
      cpp: {
        count: await prisma.score.count({ where: { language: 'cpp' } }),
      },
    };

    // Return statistics
    return res.status(200).json({
      totalGames,
      fastestTime: fastest?.completionTime || 0,
      averageTime: Math.round(avgResult._avg.completionTime || 0),
      byDifficulty,
      byLanguage,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);

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
      error: 'Failed to fetch statistics',
      details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}

/**
 * Helper function to get statistics for a specific difficulty level
 */
async function getStatsForDifficulty(difficulty: 'easy' | 'medium' | 'hard') {
  const count = await prisma.score.count({ where: { difficulty } });

  const avgResult = await prisma.score.aggregate({
    where: { difficulty },
    _avg: { completionTime: true },
  });

  return {
    count,
    avgTime: Math.round(avgResult._avg.completionTime || 0),
  };
}
