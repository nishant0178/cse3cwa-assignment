import { useState, useEffect, useCallback } from 'react';
import Timer from '../components/EscapeRoom/Timer';
import ProgressBar from '../components/EscapeRoom/ProgressBar';
import Stage1 from '../components/EscapeRoom/Stage1';
import Stage2 from '../components/EscapeRoom/Stage2';
import Stage3 from '../components/EscapeRoom/Stage3';
import GameOverModal from '../components/EscapeRoom/GameOverModal';
import PauseModal from '../components/EscapeRoom/PauseModal';
import { getChallenge, getTimerDuration, Language, Difficulty } from '../lib/challenges';

type GameState = 'setup' | 'playing' | 'paused' | 'won' | 'lost';

const EscapeRoomPage = () => {
  // Game state
  const [gameState, setGameState] = useState<GameState>('setup');
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);
  const [stagesCompleted, setStagesCompleted] = useState<boolean[]>([false, false, false]);

  // Settings
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [language, setLanguage] = useState<Language>('javascript');
  const [customTimerMinutes, setCustomTimerMinutes] = useState<number | ''>('');

  // Timer
  const [timerDuration, setTimerDuration] = useState(0); // in seconds
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Stats
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Load best time from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('escapeRoomBestTime');
    if (saved) {
      setBestTime(parseInt(saved));
    }
  }, []);

  // Dark mode listener
  useEffect(() => {
    const handleDarkModeChange = (event: CustomEvent) => {
      setDarkMode(event.detail.darkMode);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('darkModeChange', handleDarkModeChange as EventListener);
      return () => window.removeEventListener('darkModeChange', handleDarkModeChange as EventListener);
    }
  }, []);

  const handleStartGame = () => {
    const duration = customTimerMinutes
      ? Number(customTimerMinutes) * 60
      : getTimerDuration(difficulty);

    setTimerDuration(duration);
    setTimeRemaining(duration);
    setCurrentStage(1);
    setStagesCompleted([false, false, false]);
    setTotalAttempts(0);
    setTotalHintsUsed(0);
    setGameState('playing');
    setIsTimerRunning(true);
  };

  const handleTimerTick = useCallback((newTime: number) => {
    setTimeRemaining(newTime);
  }, []);

  const handleTimerExpire = useCallback(() => {
    setIsTimerRunning(false);
    setGameState('lost');
  }, []);

  const handleStageComplete = () => {
    const newStagesCompleted = [...stagesCompleted];
    newStagesCompleted[currentStage - 1] = true;
    setStagesCompleted(newStagesCompleted);

    if (currentStage === 3) {
      // Game won!
      setIsTimerRunning(false);
      setGameState('won');

      // Check if this is a new best time
      const timeElapsed = timerDuration - timeRemaining;
      if (!bestTime || timeElapsed < bestTime) {
        setBestTime(timeElapsed);
        localStorage.setItem('escapeRoomBestTime', timeElapsed.toString());
      }
    } else {
      // Move to next stage
      setCurrentStage((prev) => (prev + 1) as 1 | 2 | 3);
    }
  };

  const handlePause = () => {
    setIsTimerRunning(false);
    setGameState('paused');
  };

  const handleResume = () => {
    setIsTimerRunning(true);
    setGameState('playing');
  };

  const handleRestart = () => {
    handleStartGame();
  };

  const handleExit = () => {
    setGameState('setup');
    setIsTimerRunning(false);
    setTimeRemaining(0);
  };

  // Render setup screen
  if (gameState === 'setup') {
    return (
      <div style={{
        minHeight: '100vh',
        background: darkMode
          ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
          : 'linear-gradient(135deg, #2d3436 0%, #000000 100%)',
        padding: '40px 20px',
        color: '#fff'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔐</div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 'bold',
              marginBottom: '15px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Escape Room Challenge
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#aaa',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              You're trapped in an abandoned coding lab. Solve three programming challenges
              before time runs out to escape!
            </p>
          </div>

          {/* Setup form */}
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '16px',
            padding: '40px',
            border: '2px solid rgba(255, 255, 255, 0.1)'
          }}>
            {/* Difficulty selection */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#fff'
              }}>
                Select Difficulty:
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {(['easy', 'medium', 'hard'] as Difficulty[]).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      setDifficulty(diff);
                      setCustomTimerMinutes('');
                    }}
                    style={{
                      flex: 1,
                      padding: '16px',
                      backgroundColor: difficulty === diff ? '#007bff' : 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: `2px solid ${difficulty === diff ? '#007bff' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textTransform: 'capitalize'
                    }}
                    onMouseEnter={(e) => {
                      if (difficulty !== diff) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (difficulty !== diff) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '5px' }}>
                      {diff === 'easy' ? '⭐' : diff === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
                    </div>
                    {diff}
                    <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                      {diff === 'easy' ? '45 min' : diff === 'medium' ? '30 min' : '20 min'}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language selection */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#fff'
              }}>
                Select Language (Stage 1):
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {(['javascript', 'python', 'cpp'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    style={{
                      flex: 1,
                      padding: '14px',
                      backgroundColor: language === lang ? '#28a745' : 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: `2px solid ${language === lang ? '#28a745' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      if (language !== lang) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (language !== lang) {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      }
                    }}
                  >
                    {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'C++'}
                  </button>
                ))}
              </div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '8px' }}>
                Note: Stages 2 & 3 use JavaScript only
              </div>
            </div>

            {/* Custom timer */}
            <div style={{ marginBottom: '30px' }}>
              <label style={{
                display: 'block',
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#fff'
              }}>
                Custom Timer (Optional):
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={customTimerMinutes}
                onChange={(e) => setCustomTimerMinutes(e.target.value ? parseInt(e.target.value) : '')}
                placeholder={`Default: ${difficulty === 'easy' ? '45' : difficulty === 'medium' ? '30' : '20'} minutes`}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  fontSize: '14px',
                  color: '#fff',
                  outline: 'none'
                }}
              />
            </div>

            {/* Best time display */}
            {bestTime && (
              <div style={{
                backgroundColor: 'rgba(255, 193, 7, 0.1)',
                border: '2px solid #ffc107',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                textAlign: 'center',
                fontSize: '14px'
              }}>
                🏆 Your Best Time: <span style={{ fontWeight: '600', color: '#ffc107' }}>
                  {Math.floor(bestTime / 60)}:{(bestTime % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            {/* Start button */}
            <button
              onClick={handleStartGame}
              style={{
                width: '100%',
                padding: '18px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 4px 15px rgba(40, 167, 69, 0.4)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#218838';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#28a745';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(40, 167, 69, 0.4)';
              }}
            >
              🚀 Start Game
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render game screen
  const challenge = getChallenge(
    currentStage === 1 ? language : 'javascript',
    difficulty,
    currentStage
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode
        ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
        : 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '20px',
      color: '#fff',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Control buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <button
            onClick={handlePause}
            disabled={gameState !== 'playing'}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ffc107',
              color: '#000',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: gameState === 'playing' ? 'pointer' : 'not-allowed',
              opacity: gameState === 'playing' ? 1 : 0.5,
              transition: 'all 0.2s'
            }}
          >
            ⏸️ Pause
          </button>
          <button
            onClick={handleExit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            🚪 Exit
          </button>
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '20px' }}>
          <Timer
            timeRemaining={timeRemaining}
            isRunning={isTimerRunning}
            onTick={handleTimerTick}
            onExpire={handleTimerExpire}
          />
        </div>

        {/* Progress bar */}
        <ProgressBar
          currentStage={currentStage}
          totalStages={3}
          stagesCompleted={stagesCompleted}
        />

        {/* Current stage */}
        <div style={{ marginTop: '30px' }}>
          {currentStage === 1 && (
            <Stage1
              challenge={challenge}
              language={language}
              onComplete={handleStageComplete}
            />
          )}
          {currentStage === 2 && (
            <Stage2
              challenge={challenge}
              onComplete={handleStageComplete}
            />
          )}
          {currentStage === 3 && (
            <Stage3
              challenge={challenge}
              difficulty={difficulty}
              onComplete={handleStageComplete}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {gameState === 'paused' && (
        <PauseModal
          timeRemaining={timeRemaining}
          currentStage={currentStage}
          totalStages={3}
          stagesCompleted={stagesCompleted}
          hintsUsed={totalHintsUsed}
          attempts={totalAttempts}
          onResume={handleResume}
          onRestart={handleRestart}
          onExit={handleExit}
        />
      )}

      {(gameState === 'won' || gameState === 'lost') && (
        <GameOverModal
          won={gameState === 'won'}
          timeElapsed={timerDuration - timeRemaining}
          totalTime={timerDuration}
          stagesCompleted={stagesCompleted.filter(Boolean).length}
          totalStages={3}
          hintsUsed={totalHintsUsed}
          attempts={totalAttempts}
          onPlayAgain={handleRestart}
          onExit={handleExit}
          isBestTime={gameState === 'won' && (!bestTime || (timerDuration - timeRemaining) < bestTime)}
        />
      )}
    </div>
  );
};

export default EscapeRoomPage;