import { useEffect, useState } from 'react';
import Link from 'next/link';

// API URL - configurable via environment variable
const APIURL = process.env.NEXT_PUBLIC_API_URL || '/api/scores';

export interface Score {
  id: string;
  playerName: string | null;
  completionTime: number; // in seconds
  difficulty: 'easy' | 'medium' | 'hard';
  language: 'javascript' | 'python' | 'cpp';
  totalAttempts: number;
  totalHints: number;
  completedAt: string; // ISO date string
}

export interface LeaderboardStats {
  totalGames: number;
  fastestTime: number;
  averageTime: number;
  byDifficulty: {
    easy: { count: number; avgTime: number };
    medium: { count: number; avgTime: number };
    hard: { count: number; avgTime: number };
  };
  byLanguage: {
    javascript: { count: number };
    python: { count: number };
    cpp: { count: number };
  };
}

export default function LeaderboardPage() {
  const [scores, setScores] = useState<Score[]>([]);
  const [stats, setStats] = useState<LeaderboardStats | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Filters
  const [filterDifficulty, setFilterDifficulty] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [filterLanguage, setFilterLanguage] = useState<'all' | 'javascript' | 'python' | 'cpp'>('all');
  const [limit, setLimit] = useState(50);
  const [sortBy, setSortBy] = useState<'completionTime' | 'completedAt' | 'totalAttempts' | 'totalHints'>('completionTime');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch scores from API
  const fetchScores = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        difficulty: filterDifficulty,
        language: filterLanguage,
        limit: limit.toString(),
        sortBy: sortBy,
        order: sortOrder,
      });

      const res = await fetch(`${APIURL}/list?${params}`);
      if (res.ok) {
        const data = await res.json();
        setScores(data.scores || []);
      } else {
        console.error('Failed to fetch scores:', res.status);
      }
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const res = await fetch(`${APIURL}/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchScores();
    fetchStats();
  }, [filterDifficulty, filterLanguage, limit, sortBy, sortOrder]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchScores();
      fetchStats();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh, filterDifficulty, filterLanguage, limit, sortBy, sortOrder]);

  // Dark mode listener
  useEffect(() => {
    const handleDarkMode = (e: any) => setDarkMode(e.detail.darkMode);
    window.addEventListener('darkModeChange', handleDarkMode);
    return () => window.removeEventListener('darkModeChange', handleDarkMode);
  }, []);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Format relative time (e.g., "2 hours ago")
  const formatRelativeTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  // Get difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981'; // green
      case 'medium': return '#f59e0b'; // yellow/orange
      case 'hard': return '#ef4444'; // red
      default: return '#6b7280'; // gray
    }
  };

  // Toggle sort
  const handleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Styles
  const borderColor = darkMode ? '#555' : '#000';
  const bgColor = darkMode ? '#2d2d2d' : '#f8f8f8';
  const textColor = darkMode ? '#fff' : '#000';
  const cardBg = darkMode ? '#1a1a1a' : '#fff';

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#1a1a1a' : '#fff',
      color: textColor,
      padding: '20px'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          borderBottom: `3px solid ${borderColor}`,
          paddingBottom: '20px'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            🏆 Escape Room Leaderboard
          </h1>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '10px 20px',
              backgroundColor: borderColor,
              color: darkMode ? '#000' : '#fff',
              border: `2px solid ${borderColor}`,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              ← Back to Home
            </button>
          </Link>
        </div>

        {/* Statistics Summary */}
        {stats && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '30px'
          }}>
            <div style={{
              padding: '20px',
              border: `2px solid ${borderColor}`,
              backgroundColor: cardBg
            }}>
              <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '5px' }}>TOTAL GAMES</div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>{stats.totalGames}</div>
            </div>
            <div style={{
              padding: '20px',
              border: `2px solid ${borderColor}`,
              backgroundColor: cardBg
            }}>
              <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '5px' }}>FASTEST TIME</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>
                {stats.fastestTime > 0 ? formatTime(stats.fastestTime) : 'N/A'}
              </div>
            </div>
            <div style={{
              padding: '20px',
              border: `2px solid ${borderColor}`,
              backgroundColor: cardBg
            }}>
              <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '5px' }}>AVERAGE TIME</div>
              <div style={{ fontSize: '28px', fontWeight: '700' }}>
                {stats.averageTime > 0 ? formatTime(Math.floor(stats.averageTime)) : 'N/A'}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div style={{
          padding: '20px',
          border: `2px solid ${borderColor}`,
          backgroundColor: cardBg,
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            marginBottom: '15px'
          }}>
            {/* Difficulty Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '5px' }}>
                DIFFICULTY
              </label>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: textColor,
                  fontSize: '14px'
                }}
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Language Filter */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '5px' }}>
                LANGUAGE
              </label>
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value as any)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: textColor,
                  fontSize: '14px'
                }}
              >
                <option value="all">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            {/* Limit */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '5px' }}>
                SHOW TOP
              </label>
              <select
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: darkMode ? '#333' : '#fff',
                  color: textColor,
                  fontSize: '14px'
                }}
              >
                <option value={10}>Top 10</option>
                <option value={25}>Top 25</option>
                <option value={50}>Top 50</option>
                <option value={100}>Top 100</option>
                <option value={500}>All</option>
              </select>
            </div>

            {/* Auto-refresh Toggle */}
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '5px' }}>
                AUTO-REFRESH
              </label>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: `1px solid ${borderColor}`,
                  backgroundColor: autoRefresh ? '#10b981' : darkMode ? '#333' : '#fff',
                  color: autoRefresh ? '#fff' : textColor,
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                {autoRefresh ? 'ON (30s)' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Manual Refresh Button */}
          <button
            onClick={() => { fetchScores(); fetchStats(); }}
            disabled={loading}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2563eb',
              color: '#fff',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              opacity: loading ? 0.5 : 1
            }}
          >
            {loading ? 'Loading...' : '🔄 Refresh Now'}
          </button>
        </div>

        {/* Leaderboard Table */}
        <div style={{
          border: `2px solid ${borderColor}`,
          backgroundColor: cardBg,
          overflowX: 'auto'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px'
          }}>
            <thead>
              <tr style={{
                backgroundColor: darkMode ? '#333' : '#f0f0f0',
                borderBottom: `2px solid ${borderColor}`
              }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>RANK</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>PLAYER</th>
                <th
                  style={{ padding: '12px', textAlign: 'left', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => handleSort('completionTime')}
                >
                  TIME {sortBy === 'completionTime' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>DIFFICULTY</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '700' }}>LANGUAGE</th>
                <th
                  style={{ padding: '12px', textAlign: 'center', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => handleSort('totalAttempts')}
                >
                  ATTEMPTS {sortBy === 'totalAttempts' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  style={{ padding: '12px', textAlign: 'center', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => handleSort('totalHints')}
                >
                  HINTS {sortBy === 'totalHints' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
                <th
                  style={{ padding: '12px', textAlign: 'left', fontWeight: '700', cursor: 'pointer' }}
                  onClick={() => handleSort('completedAt')}
                >
                  DATE {sortBy === 'completedAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                </th>
              </tr>
            </thead>
            <tbody>
              {scores.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                    {loading ? 'Loading scores...' : 'No scores found. Be the first to complete the escape room!'}
                  </td>
                </tr>
              ) : (
                scores.map((score, index) => (
                  <tr
                    key={score.id}
                    style={{
                      borderBottom: `1px solid ${darkMode ? '#444' : '#e0e0e0'}`,
                      backgroundColor: index < 3 ? (darkMode ? '#2a2a2a' : '#fffbeb') : 'transparent'
                    }}
                  >
                    {/* Rank */}
                    <td style={{ padding: '12px', fontWeight: '700' }}>
                      {index === 0 && '🥇'}
                      {index === 1 && '🥈'}
                      {index === 2 && '🥉'}
                      {index > 2 && `#${index + 1}`}
                    </td>

                    {/* Player Name */}
                    <td style={{ padding: '12px' }}>
                      {score.playerName || <span style={{ opacity: 0.5 }}>Anonymous</span>}
                    </td>

                    {/* Completion Time */}
                    <td style={{
                      padding: '12px',
                      fontWeight: '700',
                      color: index === 0 ? '#10b981' : textColor,
                      fontFamily: 'monospace'
                    }}>
                      {formatTime(score.completionTime)}
                    </td>

                    {/* Difficulty */}
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: getDifficultyColor(score.difficulty),
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        borderRadius: '3px'
                      }}>
                        {score.difficulty}
                      </span>
                    </td>

                    {/* Language */}
                    <td style={{ padding: '12px', textTransform: 'uppercase', fontSize: '12px' }}>
                      {score.language === 'javascript' && '🟨 JS'}
                      {score.language === 'python' && '🐍 Python'}
                      {score.language === 'cpp' && '⚙️ C++'}
                    </td>

                    {/* Attempts */}
                    <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'monospace' }}>
                      {score.totalAttempts}
                    </td>

                    {/* Hints */}
                    <td style={{ padding: '12px', textAlign: 'center', fontFamily: 'monospace' }}>
                      {score.totalHints}
                    </td>

                    {/* Date */}
                    <td style={{ padding: '12px', fontSize: '12px', opacity: 0.7 }}>
                      {formatRelativeTime(score.completedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          border: `1px solid ${borderColor}`,
          backgroundColor: cardBg,
          fontSize: '12px',
          opacity: 0.7,
          textAlign: 'center'
        }}>
          Showing {scores.length} score{scores.length !== 1 ? 's' : ''}
          {autoRefresh && ' • Auto-refreshing every 30 seconds'}
          {loading && ' • Loading...'}
        </div>
      </div>
    </div>
  );
}
