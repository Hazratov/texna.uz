import { useEffect, useState } from "react";

export function SeasonalBackground() {
  const [season, setSeason] = useState<'winter' | 'spring' | 'summer' | 'autumn'>('winter');

  useEffect(() => {
    const month = new Date().getMonth();
    
    if (month >= 11 || month <= 1) setSeason('winter');
    else if (month >= 2 && month <= 4) setSeason('spring');
    else if (month >= 5 && month <= 7) setSeason('summer');
    else setSeason('autumn');
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {season === 'winter' && (
        <div className="absolute inset-0 animate-fall">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="snow absolute rounded-full bg-white opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 10}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      )}
      {season === 'spring' && (
        <div className="absolute inset-0 animate-fall">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="petal absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 10}%`,
                width: '15px',
                height: '15px',
                background: `hsl(${Math.random() * 60 + 330}, 70%, 85%)`,
                borderRadius: '50% 0 50% 0',
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}
      {season === 'summer' && (
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="butterfly absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '8px',
                height: '8px',
                background: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
                boxShadow: '10px 0 0 0 currentColor',
                borderRadius: '50%',
                animation: `butterfly ${Math.random() * 10 + 10}s infinite ease-in-out`
              }}
            />
          ))}
        </div>
      )}
      {season === 'autumn' && (
        <div className="absolute inset-0 animate-fall">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="leaf absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 10}%`,
                width: '20px',
                height: '20px',
                background: `hsl(${Math.random() * 60 + 20}, 70%, 50%)`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 4}s`,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}