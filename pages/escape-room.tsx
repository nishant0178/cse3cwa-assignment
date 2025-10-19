import { useState, useEffect, useCallback } from 'react';
import Timer from '../components/EscapeRoom/Timer';
import ProgressBar from '../components/EscapeRoom/ProgressBar';
import Stage1 from '../components/EscapeRoom/Stage1';
import Stage2 from '../components/EscapeRoom/Stage2';
import Stage3 from '../components/EscapeRoom/Stage3';
import Stage4 from '../components/EscapeRoom/Stage4';
import GameOverModal from '../components/EscapeRoom/GameOverModal';
import PauseModal from '../components/EscapeRoom/PauseModal';
import { getChallenge, getTimerDuration, Language, Difficulty } from '../lib/challenges';

type GameState = 'setup' | 'playing' | 'paused' | 'won' | 'lost';

const EscapeRoomPage = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3 | 4>(1);
  const [stagesCompleted, setStagesCompleted] = useState<boolean[]>([false, false, false, false]);

  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [language, setLanguage] = useState<Language>('javascript');
  const [customTimerMinutes, setCustomTimerMinutes] = useState<number | ''>('');

  const [timerDuration, setTimerDuration] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [totalAttempts, setTotalAttempts] = useState(0);
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Save score states
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string>('');

  useEffect(() => {
    const saved = localStorage.getItem('escapeRoomBestTime');
    if (saved) setBestTime(parseInt(saved));
  }, []);

  useEffect(() => {
    const handleDarkMode = (e: any) => setDarkMode(e.detail.darkMode);
    window.addEventListener('darkModeChange', handleDarkMode);
    return () => window.removeEventListener('darkModeChange', handleDarkMode);
  }, []);

  const handleStartGame = () => {
    const duration = customTimerMinutes
      ? Number(customTimerMinutes) * 60
      : getTimerDuration(difficulty);

    setTimerDuration(duration);
    setTimeRemaining(duration);
    setCurrentStage(1);
    setStagesCompleted([false, false, false, false]);
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
    const newStages = [...stagesCompleted];
    newStages[currentStage - 1] = true;
    setStagesCompleted(newStages);

    if (currentStage === 4) {
      setIsTimerRunning(false);
      setGameState('won');

      const timeElapsed = timerDuration - timeRemaining;
      if (!bestTime || timeElapsed < bestTime) {
        setBestTime(timeElapsed);
        localStorage.setItem('escapeRoomBestTime', timeElapsed.toString());
      }
    } else {
      setCurrentStage((prev) => (prev + 1) as 1 | 2 | 3 | 4);
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
    setSaveSuccess(false);
    setSaveError('');
    handleStartGame();
  };

  const handleExit = () => {
    setGameState('setup');
    setIsTimerRunning(false);
    setTimeRemaining(0);
    setSaveSuccess(false);
    setSaveError('');
  };

  const handleHintUsed = () => {
    setTotalHintsUsed(prev => prev + 1);
  };

  const handleAttempt = () => {
    setTotalAttempts(prev => prev + 1);
  };

  const handleSaveScore = async (playerName: string) => {
    setIsSaving(true);
    setSaveError('');

    try {
      const completionTime = timerDuration - timeRemaining;

      const response = await fetch('/api/scores/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playerName: playerName || null,
          difficulty,
          language,
          completionTime,
          totalAttempts,
          totalHints: totalHintsUsed,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save score');
      }

      setSaveSuccess(true);
      console.log('Score saved successfully:', data);
    } catch (error) {
      console.error('Error saving score:', error);
      setSaveError(error instanceof Error ? error.message : 'Failed to save score. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Render setup screen
  if (gameState === 'setup') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/escape-room-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '40px 20px',
        color: '#fff',
        position: 'relative'
      }}>
        {/* Dark overlay for readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 0
        }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '36px',
              fontWeight: '700',
              marginBottom: '15px',
              color: '#fff',
              textTransform: 'uppercase',
              letterSpacing: '2px'
            }}>
              Escape Room: Code Challenge
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#ccc',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Complete four programming challenges before time expires.
              <br />
              Choose difficulty and language to begin.
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
                      backgroundColor: difficulty === diff ? '#2563eb' : 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: `2px solid ${difficulty === diff ? '#2563eb' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
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
                    {diff}
                    <div style={{ fontSize: '12px', color: '#aaa', marginTop: '8px', textTransform: 'none', letterSpacing: 'normal' }}>
                      {diff === 'easy' ? '45 minutes' : diff === 'medium' ? '30 minutes' : '20 minutes'}
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
                      backgroundColor: language === lang ? '#059669' : 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: `2px solid ${language === lang ? '#059669' : 'rgba(255, 255, 255, 0.2)'}`,
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
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
                Note: Stages 2, 3 & 4 use JavaScript only
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
                backgroundColor: 'rgba(202, 138, 4, 0.1)',
                border: '2px solid #ca8a04',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                textAlign: 'center',
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                Personal Best: <span style={{ fontWeight: '700', color: '#ca8a04' }}>
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
                backgroundColor: '#059669',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#047857';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#059669';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Start Challenge
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
      backgroundImage: 'url(/images/escape-room-bg.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      padding: '20px',
      color: '#fff',
      position: 'relative'
    }}>
      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
              backgroundColor: '#ca8a04',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: gameState === 'playing' ? 'pointer' : 'not-allowed',
              opacity: gameState === 'playing' ? 1 : 0.5,
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Pause
          </button>
          <button
            onClick={handleExit}
            style={{
              padding: '10px 20px',
              backgroundColor: '#b91c1c',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            Exit
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
          totalStages={4}
          stagesCompleted={stagesCompleted}
        />

        {/* Current stage */}
        <div style={{ marginTop: '30px' }}>
          {currentStage === 1 && (
            <Stage1
              challenge={challenge}
              language={language}
              onComplete={handleStageComplete}
              onHintUsed={handleHintUsed}
              onAttempt={handleAttempt}
            />
          )}
          {currentStage === 2 && (
            <Stage2
              challenge={challenge}
              onComplete={handleStageComplete}
              onHintUsed={handleHintUsed}
              onAttempt={handleAttempt}
            />
          )}
          {currentStage === 3 && (
            <Stage3
              challenge={challenge}
              difficulty={difficulty}
              onComplete={handleStageComplete}
              onHintUsed={handleHintUsed}
              onAttempt={handleAttempt}
            />
          )}
          {currentStage === 4 && (
            <Stage4
              challenge={challenge}
              difficulty={difficulty}
              onComplete={handleStageComplete}
              onHintUsed={handleHintUsed}
              onAttempt={handleAttempt}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      {gameState === 'paused' && (
        <PauseModal
          timeRemaining={timeRemaining}
          currentStage={currentStage}
          totalStages={4}
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
          totalStages={4}
          hintsUsed={totalHintsUsed}
          attempts={totalAttempts}
          onPlayAgain={handleRestart}
          onExit={handleExit}
          isBestTime={gameState === 'won' && (!bestTime || (timerDuration - timeRemaining) < bestTime)}
          difficulty={difficulty}
          language={language}
          onSaveScore={gameState === 'won' ? handleSaveScore : undefined}
          isSaving={isSaving}
          saveSuccess={saveSuccess}
          saveError={saveError}
        />
      )}
    </div>
  );
};

export default EscapeRoomPage;