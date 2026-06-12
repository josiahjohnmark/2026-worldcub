'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import WaterShaderBackground from '../components/WaterShaderBackground';

export default function Page() {
  const [hoveredPlayer, setHoveredPlayer] = useState<string | null>(null);
  const [clickedPlayer, setClickedPlayer] = useState<string | null>(null);
  const [activeTeam, setActiveTeam] = useState<'argentina' | 'brazil' | 'england' | 'france' | 'spain' | 'portugal'>('argentina');

  // Loader states
  const [firstNum, setFirstNum] = useState(1);
  const [secondNum, setSecondNum] = useState(1);
  const [loaderStage, setLoaderStage] = useState<'login-screen' | 'blur-transition' | 'counting-first' | 'counting-second' | 'complete' | 'splitting' | 'dismissed'>('login-screen');

  React.useEffect(() => {
    if (loaderStage === 'blur-transition') {
      const timeout = setTimeout(() => {
        setLoaderStage('counting-first');
      }, 900);
      return () => clearTimeout(timeout);
    } else if (loaderStage === 'counting-first') {
      const timer = setInterval(() => {
        setFirstNum((prev) => {
          if (prev >= 20) {
            clearInterval(timer);
            setLoaderStage('counting-second');
            return 20;
          }
          return prev + 1;
        });
      }, 90);
      return () => clearInterval(timer);
    } else if (loaderStage === 'counting-second') {
      const timer = setInterval(() => {
        setSecondNum((prev) => {
          if (prev >= 26) {
            clearInterval(timer);
            setLoaderStage('complete');
            return 26;
          }
          return prev + 1;
        });
      }, 90);
      return () => clearInterval(timer);
    } else if (loaderStage === 'complete') {
      const timeout = setTimeout(() => {
        setLoaderStage('splitting');
      }, 1000);
      return () => clearTimeout(timeout);
    } else if (loaderStage === 'splitting') {
      const timeout = setTimeout(() => {
        setLoaderStage('dismissed');
      }, 1800);
      return () => clearTimeout(timeout);
    }
  }, [loaderStage]);

  const activePlayerId = hoveredPlayer || clickedPlayer;

  const teamKeys: ('argentina' | 'brazil' | 'england' | 'france' | 'spain' | 'portugal')[] = [
    'argentina',
    'brazil',
    'england',
    'france',
    'spain',
    'portugal'
  ];

  const handleNext = () => {
    setActiveTeam((prev) => {
      const idx = teamKeys.indexOf(prev);
      return teamKeys[(idx + 1) % teamKeys.length];
    });
    setHoveredPlayer(null);
    setClickedPlayer(null);
  };

  const handlePrev = () => {
    setActiveTeam((prev) => {
      const idx = teamKeys.indexOf(prev);
      return teamKeys[(idx - 1 + teamKeys.length) % teamKeys.length];
    });
    setHoveredPlayer(null);
    setClickedPlayer(null);
  };

  // Team configurations with exact image coordinates and chest placements under their faces/shoulders
  const teams = {
    argentina: {
      id: 'argentina',
      title: 'argentina',
      statusText: 'ALBICELESTE EDITION - LIQUID COUTURE',
      footballImage: '/argentina_football.png',
      teamImage: '/argentina_national_team.png',
      players: [
        {
          id: 'alvarez',
          name: 'Julián Álvarez',
          role: 'Forward',
          club: 'Atlético de Madrid',
          roleColor: 'text-sky-700',
          left: '14%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        },
        {
          id: 'messi',
          name: 'Lionel Messi',
          role: 'Forward',
          club: 'Inter Miami CF',
          badge: '👑 El Capitán',
          badgeColor: 'text-amber-600',
          roleColor: 'text-amber-600',
          left: '40%',
          width: '20%',
          bottom: '12%',
          height: '70%',
          chestTop: '28%'
        },
        {
          id: 'depaul',
          name: 'Rodrigo De Paul',
          role: 'Midfielder',
          club: 'Atlético de Madrid',
          roleColor: 'text-sky-700',
          left: '65%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        }
      ]
    },
    brazil: {
      id: 'brazil',
      title: 'brazil',
      statusText: 'SELEÇÃO CANARINHO EDITION - LIQUID COUTURE',
      footballImage: '/brazil_football.png',
      teamImage: '/brazil_national_team.png',
      players: [
        {
          id: 'raphinha',
          name: 'Raphinha',
          role: 'Winger',
          club: 'FC Barcelona',
          roleColor: 'text-emerald-700',
          left: '14%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        },
        {
          id: 'neymar',
          name: 'Neymar Jr',
          role: 'Forward',
          club: 'Al Hilal',
          badge: '⚡ O Mágico',
          badgeColor: 'text-yellow-600',
          roleColor: 'text-yellow-600',
          left: '40%',
          width: '20%',
          bottom: '12%',
          height: '70%',
          chestTop: '28%'
        },
        {
          id: 'vini',
          name: 'Vinícius Júnior',
          role: 'Winger',
          club: 'Real Madrid',
          roleColor: 'text-emerald-700',
          left: '65%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        }
      ]
    },
    england: {
      id: 'england',
      title: 'england',
      statusText: 'THREE LIONS EDITION - LIQUID COUTURE',
      footballImage: '/england_football.png',
      teamImage: '/england_national_team.png',
      players: [
        {
          id: 'bellingham',
          name: 'Jude Bellingham',
          role: 'Midfielder',
          club: 'Real Madrid',
          badge: '⚡ Golden Boy',
          badgeColor: 'text-blue-700',
          roleColor: 'text-blue-900',
          left: '14%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        },
        {
          id: 'kane',
          name: 'Harry Kane',
          role: 'Forward',
          club: 'Bayern Munich',
          badge: '👑 El Capitán',
          badgeColor: 'text-blue-900',
          roleColor: 'text-blue-900',
          left: '40%',
          width: '20%',
          bottom: '12%',
          height: '70%',
          chestTop: '28%'
        },
        {
          id: 'rashford',
          name: 'Marcus Rashford',
          role: 'Forward',
          club: 'Manchester United',
          roleColor: 'text-rose-700',
          left: '65%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        }
      ]
    },
    france: {
      id: 'france',
      title: 'france',
      statusText: 'LES BLEUS EDITION - LIQUID COUTURE',
      footballImage: '/france_football.png',
      teamImage: '/france_national_team.png',
      players: [
        {
          id: 'dembele',
          name: 'Ousmane Dembélé',
          role: 'Winger',
          club: 'Paris Saint-Germain',
          roleColor: 'text-blue-800',
          left: '14%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        },
        {
          id: 'mbappe',
          name: 'Kylian Mbappé',
          role: 'Forward',
          club: 'Real Madrid',
          badge: '👑 El Capitán',
          badgeColor: 'text-blue-700',
          roleColor: 'text-blue-700',
          left: '40%',
          width: '20%',
          bottom: '12%',
          height: '70%',
          chestTop: '28%'
        },
        {
          id: 'olise',
          name: 'Michael Olise',
          role: 'Winger',
          club: 'Bayern Munich',
          roleColor: 'text-blue-800',
          left: '65%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        }
      ]
    },
    spain: {
      id: 'spain',
      title: 'spain',
      statusText: 'LA ROJA EDITION - LIQUID COUTURE',
      footballImage: '/spain_football.png',
      teamImage: '/spain_national_team.png',
      players: [
        {
          id: 'yamal',
          name: 'Lamine Yamal',
          role: 'Winger',
          club: 'FC Barcelona',
          badge: '⚡ O Prodígio',
          badgeColor: 'text-amber-600',
          roleColor: 'text-amber-700',
          left: '14%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        },
        {
          id: 'pedri',
          name: 'Pedri',
          role: 'Midfielder',
          club: 'FC Barcelona',
          badge: '🪄 El Mago',
          badgeColor: 'text-red-700',
          roleColor: 'text-red-700',
          left: '40%',
          width: '20%',
          bottom: '12%',
          height: '70%',
          chestTop: '28%'
        },
        {
          id: 'rodri',
          name: 'Rodri',
          role: 'Midfielder',
          club: 'Manchester City',
          badge: '🏆 Ballon d\'Or',
          badgeColor: 'text-amber-600',
          roleColor: 'text-amber-700',
          left: '65%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        }
      ]
    },
    portugal: {
      id: 'portugal',
      title: 'portugal',
      statusText: 'SELEÇÃO DAS QUINAS EDITION - LIQUID COUTURE',
      footballImage: '/portugal_football.png',
      teamImage: '/portugal_national_team.png',
      players: [
        {
          id: 'vitinha',
          name: 'Vitinha',
          role: 'Midfielder',
          club: 'Paris Saint-Germain',
          roleColor: 'text-emerald-800',
          left: '14%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        },
        {
          id: 'ronaldo',
          name: 'Cristiano Ronaldo',
          role: 'Forward',
          club: 'Al Nassr',
          badge: '👑 O Capitão',
          badgeColor: 'text-red-700',
          roleColor: 'text-red-700',
          left: '40%',
          width: '20%',
          bottom: '12%',
          height: '70%',
          chestTop: '28%'
        },
        {
          id: 'bruno',
          name: 'Bruno Fernandes',
          role: 'Midfielder',
          club: 'Manchester United',
          badge: '⚡ O Maestro',
          badgeColor: 'text-emerald-800',
          roleColor: 'text-emerald-800',
          left: '65%',
          width: '21%',
          bottom: '8%',
          height: '62%',
          chestTop: '32%'
        }
      ]
    }
  };

  return (
    <main 
      className="relative w-screen h-screen overflow-hidden text-white font-sans flex flex-col justify-between select-none"
      id="main-app-container"
      style={{ backgroundColor: '#03060b' }}
    >
      {/* Interactive premium WebGL water background shader */}
      <WaterShaderBackground theme={activeTeam} />

      {/* Dynamic Ambient Glow depending on active team */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none z-0 transition-all duration-[1200ms]
          ${activeTeam === 'argentina' ? 'bg-amber-500/10 blur-[140px]' : ''}
          ${activeTeam === 'brazil' ? 'bg-emerald-500/15 blur-[140px]' : ''}
          ${activeTeam === 'england' ? 'bg-rose-500/10 blur-[140px]' : ''}
          ${activeTeam === 'france' ? 'bg-blue-500/10 blur-[140px]' : ''}
          ${activeTeam === 'spain' ? 'bg-amber-600/15 blur-[140px]' : ''}
          ${activeTeam === 'portugal' ? 'bg-teal-500/15 blur-[140px]' : ''}
        `}
        id="team-radial-glow"
      />

      {/* TOP CENTRALIZED ultra-transparent navigation bar utilizing glassmorphic neumorphism */}
      <header className="relative z-50 w-full px-6 py-4 md:py-6 flex items-center justify-between" id="app-header">
        {/* Top-Left: Worldcup Trophy badge - screen blending & drop shadows */}
        <div className="flex items-center justify-start w-32 md:w-52 lg:w-60" id="trophy-badge-container">
          <img 
            src="/worldcup_trophy.jpeg" 
            alt="World Cup Trophy" 
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-2xl select-none filter contrast-125 brightness-110 drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] transition-all duration-500 hover:scale-110 cursor-pointer"
            style={{ mixBlendMode: 'screen' }} 
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.mixBlendMode = 'normal';
            }}
          />
        </div>

        {/* Centered glass rail bar */}
        <nav className="flex items-center gap-1 md:gap-2.5 liquid-navbar-glass rounded-full py-2.5 px-4 md:py-4 md:px-8 shadow-[0_30px_70px_rgba(0,0,0,1)] animate-fade-in pointer-events-auto" id="desktop-nav">
          {teamKeys.map((teamKey) => {
            const isActive = activeTeam === teamKey;
            
            // Custom highlight colors depending on the active team
            const colorMap = {
              argentina: 'hover:text-sky-450 active:text-sky-350',
              brazil: 'hover:text-emerald-400 active:text-emerald-300',
              england: 'hover:text-rose-500 active:text-rose-400',
              france: 'hover:text-blue-500 active:text-blue-400',
              spain: 'hover:text-amber-500 active:text-amber-400',
              portugal: 'hover:text-teal-400 active:text-teal-300'
            };
            
            const activeColorMap = {
              argentina: 'text-sky-400 bg-sky-400',
              brazil: 'text-emerald-400 bg-emerald-400',
              england: 'text-rose-500 bg-rose-500',
              france: 'text-blue-505 bg-blue-505',
              spain: 'text-amber-500 bg-amber-500',
              portugal: 'text-teal-400 bg-teal-400'
            };

            const [textColorClass, dotBgColor] = isActive 
              ? activeColorMap[teamKey].split(' ') 
              : [colorMap[teamKey], ''];

            return (
              <button
                key={teamKey}
                onClick={() => {
                  setActiveTeam(teamKey);
                  setHoveredPlayer(null);
                  setClickedPlayer(null);
                }}
                className={`relative py-1.5 px-3 md:py-2.5 md:px-5 rounded-full text-white font-extrabold flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 text-center
                  ${isActive ? `${textColorClass} bg-white/10 font-black shadow-[0_4px_20px_rgba(0,0,0,0.5)]` : 'text-zinc-450'}`}
                id={`nav-btn-${teamKey.toLowerCase()}`}
                style={{
                  textShadow: isActive ? '0 0 12px currentColor' : '0 2px 4px rgba(0,0,0,0.9)'
                }}
              >
                {/* Button Typography */}
                <span className="font-mono text-[10px] md:text-[12px] tracking-[0.18em] uppercase">
                  {teamKey}
                </span>
                {isActive && (
                  <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.7)] ${dotBgColor}`} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Top-Right: 2026 Worldcup Logo badge - screen blending & drop shadows */}
        <div className="flex items-center justify-end w-32 md:w-52 lg:w-60" id="logo-badge-container">
          <img 
            src="/worldcup_logo.jpeg" 
            alt="2026 World Cup Logo" 
            className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain rounded-2xl select-none filter contrast-125 brightness-110 drop-shadow-[0_8px_25px_rgba(0,0,0,0.85)] transition-all duration-500 hover:scale-110 cursor-pointer"
            style={{ mixBlendMode: 'screen' }}
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.mixBlendMode = 'normal';
            }}
          />
        </div>
      </header>

      {/* Floating Swipe Left/Right arrows - completely transparent, raise on hover, black shadows */}
      <button 
        onClick={handlePrev}
        className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-55 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border border-white/5 bg-transparent text-white/50 hover:text-white hover:-translate-y-[calc(50%+4px)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0)] hover:shadow-[0_25px_50px_rgba(0,0,0,1)] cursor-pointer pointer-events-auto"
        aria-label="Previous Team"
      >
        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 z-55 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border border-white/5 bg-transparent text-white/50 hover:text-white hover:-translate-y-[calc(50%+4px)] hover:scale-110 active:scale-95 transition-all duration-300 shadow-[0_4px_12px_rgba(0,0,0,0)] hover:shadow-[0_25px_50px_rgba(0,0,0,1)] cursor-pointer pointer-events-auto"
        aria-label="Next Team"
      >
        <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
      </button>

      {/* Slide Wipe Container holding all team setups dynamically */}
      <div className="absolute inset-x-0 bottom-0 top-0 z-10 overflow-hidden pointer-events-none">
        
        {Object.values(teams).map((team) => {
          const isActive = activeTeam === team.id;
          const isTeamContentActive = isActive && (loaderStage === 'splitting' || loaderStage === 'dismissed');
          const activeIdx = teamKeys.indexOf(activeTeam);
          const teamIdx = teamKeys.indexOf(team.id as any);
          const transformClass = isActive 
            ? 'translate-x-0 opacity-100 pointer-events-auto filter blur-none' 
            : (teamIdx < activeIdx 
                ? '-translate-x-[110%] opacity-0 pointer-events-none filter blur-sm' 
                : 'translate-x-[110%] opacity-0 pointer-events-none filter blur-sm');

          return (
            <div 
              key={team.id}
              className={`absolute inset-0 transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) flex flex-col justify-between ${transformClass}`}
            >
              {/* Football backdrop behind title (z-5) */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-5 flex items-start justify-center overflow-visible pointer-events-none">
                <motion.img 
                  animate={{ 
                    y: isTeamContentActive ? "-52%" : "-150%", 
                    opacity: isTeamContentActive ? 1 : 0 
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 30, 
                    damping: 15, 
                    mass: 0.9,
                    duration: 1.2
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    y: "-45%",
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  src={team.footballImage} 
                  alt={`${team.title} Football`} 
                  className="w-[1400px] h-[1400px] md:w-[1900px] md:h-[1900px] object-contain select-none filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)] max-w-none pointer-events-auto cursor-pointer"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Display title sits behind players (z-10) */}
              <div className="flex-1 flex flex-col items-center justify-center relative px-4 z-10">
                <div className="text-center relative translate-y-[21vh]">
                  <h1
                    className="font-anton text-[30vw] sm:text-[26vw] md:text-[23vw] lg:text-[19vw] xl:text-[17vw] leading-none uppercase select-none text-white font-bold tracking-[0.18em] opacity-100 transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) cursor-pointer pointer-events-auto transform hover:scale-[1.03] hover:-translate-y-4 filter drop-shadow-[0_25px_45px_rgba(0,0,0,1)] hover:drop-shadow-[0_60px_100px_rgba(0,0,0,1)]"
                    style={{
                      marginBottom: '300px',
                      textShadow: '0 4px 30px rgba(0,0,0,0.85)'
                    }}
                  >
                    {team.title}
                  </h1>
                </div>
              </div>

              {/* Players backdrop (z-20) */}
              <div className="absolute inset-x-0 bottom-0 top-0 z-20 pointer-events-none flex items-end justify-center">
                <motion.img 
                  animate={{ 
                    y: isTeamContentActive 
                      ? (team.players.some(p => p.id === activePlayerId) ? -20 : 12) 
                      : 350, 
                    opacity: isTeamContentActive ? 1 : 0,
                    scale: isTeamContentActive && team.players.some(p => p.id === activePlayerId) ? 1.02 : 1
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 35, 
                    damping: 14, 
                    mass: 0.85
                  }}
                  src={team.teamImage} 
                  alt={`${team.title} Team`} 
                  className="max-h-[85vh] md:max-h-[91vh] w-auto object-contain select-none pointer-events-none filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.95)]"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
              </div>

              {/* Precise trigger boxes and permanent chest tabs */}
              <motion.div 
                animate={{ 
                  y: isTeamContentActive ? 0 : 350, 
                  opacity: isTeamContentActive ? 1 : 0 
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 35, 
                  damping: 14, 
                  mass: 0.85,
                  delay: isTeamContentActive ? 0.05 : 0
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] h-[85vh] z-30 pointer-events-none select-none overflow-visible"
              >
                {team.players.map((p) => {
                  const isTagVisible = activePlayerId === p.id;
                  return (
                    <div
                      key={p.id}
                      className="absolute cursor-pointer pointer-events-auto z-30 transition-all duration-300"
                      style={{ left: p.left, width: p.width, bottom: p.bottom, height: p.height }}
                      onMouseEnter={() => setHoveredPlayer(p.id)}
                      onMouseLeave={() => setHoveredPlayer(null)}
                      onClick={() => setClickedPlayer(clickedPlayer === p.id ? null : p.id)}
                    >
                      {/* Premium floating tag displayed on top of their head */}
                      <motion.div 
                        initial={{ opacity: 0, y: 15, scale: 0.9 }}
                        animate={{ 
                          opacity: isTagVisible ? 1 : 0, 
                          y: isTagVisible ? 0 : 20, 
                          scale: isTagVisible ? 1 : 0.9 
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 140, 
                          damping: 15 
                        }}
                        className={`absolute left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none w-[200px] md:w-[230px] z-50`}
                        style={{ top: "-10px" }}
                      >
                        <div 
                          className="w-full bg-white/95 rounded-2xl py-2 px-4 md:py-2.5 md:px-5 border border-white text-center shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                        >
                          {p.badge && (
                            <span className={`font-mono text-[9px] uppercase tracking-[0.2em] font-extrabold block animate-pulse ${p.badgeColor}`}>
                              {p.badge}
                            </span>
                          )}
                          {!p.badge && (
                            <span className={`font-mono text-[9px] uppercase tracking-[0.2em] font-extrabold block ${p.roleColor}`}>
                              {p.role}
                            </span>
                          )}
                          <h3 className="font-sans font-black text-xs md:text-sm uppercase tracking-wider text-black mt-0.5">
                            {p.name}
                          </h3>
                          <p className="font-mono text-[8px] text-zinc-700 uppercase tracking-widest mt-0.5 font-bold">
                            {p.club}
                          </p>
                        </div>
                        {/* Elegant down pointer */}
                        <div className="w-3.5 h-3.5 bg-white/95 border-r border-b border-zinc-200 rotate-45 -mt-2 shadow-[4px_4px_10px_rgba(0,0,0,0.15)]" />
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          );
        })}

      </div>

      {/* STATIC FOOTER RAIL WITH NEUMORPHIC DETAILS */}
      <footer 
        className="relative z-30 w-full px-6 py-8 flex items-center justify-center animate-fade-in"
        id="app-footer"
      >
        <div 
          className="relative py-2.5 px-6 rounded-full neo-liquid-glass text-[10px] md:text-xs font-mono text-zinc-300 flex flex-wrap items-center justify-center gap-2 md:gap-3 shadow-[0_15px_45px_rgba(0,0,0,0.85)] max-w-full"
          id="status-container"
        >
          <span className={`inline-block w-1.5 h-1.5 rounded-full animate-pulse mr-1 shrink-0 ${
            activeTeam === 'argentina' ? 'bg-sky-400' :
            activeTeam === 'brazil' ? 'bg-emerald-400' :
            activeTeam === 'england' ? 'bg-red-500' :
            activeTeam === 'france' ? 'bg-blue-500' :
            activeTeam === 'spain' ? 'bg-amber-500' :
            'bg-teal-400'
          }`} />
          {teams[activeTeam]?.players.map((p, idx) => (
            <React.Fragment key={p.id}>
              <button 
                className={`tracking-[0.2em] md:tracking-[0.25em] uppercase transition-all duration-300 cursor-pointer font-bold outline-none
                  ${activePlayerId === p.id 
                    ? 'text-white scale-105 drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] font-black' 
                    : 'text-zinc-400 hover:text-white'}`}
                onMouseEnter={() => setHoveredPlayer(p.id)}
                onMouseLeave={() => setHoveredPlayer(null)}
                onClick={() => setClickedPlayer(clickedPlayer === p.id ? null : p.id)}
                aria-label={`Highlight ${p.name}`}
              >
                {p.name}
              </button>
              {idx < (teams[activeTeam]?.players?.length ?? 0) - 1 && (
                <span className="text-zinc-600 font-extrabold select-none shrink-0">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </footer>

      {/* Dynamic Intro Split Loader Overlay */}
      {loaderStage !== 'dismissed' && (
        <div className="fixed inset-0 z-[100] h-screen w-screen overflow-hidden select-none pointer-events-auto flex">
          
          {/* LEFT SLIDING PANEL - Represents 'FI' & '20' */}
          <motion.div
            animate={{ 
              x: loaderStage === 'splitting' ? '-100%' : '0%',
              filter: loaderStage === 'blur-transition' ? 'blur(15px)' : 'blur(0px)',
              scale: loaderStage === 'blur-transition' ? 0.98 : 1
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.6 }}
            className="absolute top-0 bottom-0 left-0 w-[50.5vw] bg-[#020407] z-[100] flex flex-col items-end justify-center pr-2 md:pr-4 overflow-hidden border-r border-white/5"
          >
            <div className="flex flex-col items-end">
              <h2 className="font-anton text-[18vw] sm:text-[16vw] md:text-[14vw] uppercase tracking-tighter leading-[0.8] text-white select-none">
                FI
              </h2>
              <motion.div 
                initial={{ opacity: 0, height: 0, scale: 0.8, y: 30 }}
                animate={{ 
                  opacity: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 1 : 0,
                  height: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 'auto' : 0,
                  scale: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 1 : 0.8,
                  y: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 0 : 30
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-anton text-[18vw] sm:text-[16vw] md:text-[14vw] uppercase tracking-tighter leading-[0.8] text-white select-none mt-3 md:mt-5 overflow-hidden"
              >
                {firstNum.toString().padStart(2, '0')}
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SLIDING PANEL - Represents 'FA' & '26' */}
          <motion.div
            animate={{ 
              x: loaderStage === 'splitting' ? '100%' : '0%',
              filter: loaderStage === 'blur-transition' ? 'blur(15px)' : 'blur(0px)',
              scale: loaderStage === 'blur-transition' ? 0.98 : 1
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 1.6 }}
            className="absolute top-0 bottom-0 right-0 w-[50.5vw] bg-[#020407] z-[100] flex flex-col items-start justify-center pl-2 md:pl-4 overflow-hidden"
          >
            <div className="flex flex-col items-start">
              <h2 className="font-anton text-[18vw] sm:text-[16vw] md:text-[14vw] uppercase tracking-tighter leading-[0.8] text-white select-none">
                FA
              </h2>
              <motion.div 
                initial={{ opacity: 0, height: 0, scale: 0.8, y: 30 }}
                animate={{ 
                  opacity: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 1 : 0,
                  height: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 'auto' : 0,
                  scale: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 1 : 0.8,
                  y: (loaderStage !== 'login-screen' && loaderStage !== 'blur-transition') ? 0 : 30
                }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-anton text-[18vw] sm:text-[16vw] md:text-[14vw] uppercase tracking-tighter leading-[0.8] text-white select-none mt-3 md:mt-5 overflow-hidden"
              >
                {secondNum.toString().padStart(2, '0')}
              </motion.div>
            </div>
          </motion.div>

          {/* Centered LOGIN CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: loaderStage === 'login-screen' ? 1 : 0,
              y: loaderStage === 'login-screen' ? 0 : 40,
              scale: loaderStage === 'login-screen' ? 1 : 0.9,
              filter: loaderStage === 'blur-transition' ? 'blur(8px)' : 'blur(0px)'
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-x-0 bottom-[18vh] z-[110] flex flex-col items-center justify-center ${loaderStage !== 'login-screen' ? 'pointer-events-none' : ''}`}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 45px rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.8)' }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setLoaderStage('blur-transition');
              }}
              className="px-14 py-4 md:px-16 md:py-4.5 rounded-full bg-white text-black font-anton text-lg tracking-[0.25em] font-extrabold shadow-[0_20px_60px_rgba(0,0,0,0.85)] border border-white/50 cursor-pointer pointer-events-auto select-none transition-all duration-300 hover:bg-zinc-100 uppercase"
            >
              LOGIN TO ARENA
            </motion.button>
            <span className="mt-4 font-mono text-[9px] uppercase tracking-[0.35em] text-zinc-500 animate-pulse select-none">
              Tap to enter 2026 World Cup Experience
            </span>
          </motion.div>

        </div>
      )}
    </main>
  );
}
