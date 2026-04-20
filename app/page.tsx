"use client";

import { useState, useEffect, useRef } from "react";
import { Lock, BookOpen, ArrowLeft } from "lucide-react";

// --- TYPES ---
type View = "name" | "home" | "game" | "letter";
type GameType = "clicker" | "math" | "reflex" | "sort" | "timing";

interface Letter {
  id: number;
  title: string;
  content: string;
  gameType: GameType;
  locked: boolean;
}

// --- DATA ---
const initialLetters: Letter[] = [
  {
    id: 1,
    title: "The Beginning",
    content:
      "Hey there,\n\nI'm really glad you decided to open this. I wanted a special way to share some thoughts with you. This is just the start of something I hope you'll enjoy reading.\n\nKeep going to the next one.",
    gameType: "clicker",
    locked: true,
  },
  {
    id: 2,
    title: "Sweet Memories",
    content:
      "I often find myself thinking back to the times we spent together. Whether we were doing something exciting or just sitting in silence, those moments meant a lot to me.\n\nThey are memories I cherish deeply.",
    gameType: "math",
    locked: true,
  },
  {
    id: 3,
    title: "Hidden Thoughts",
    content:
      "Hi,\n \nOkay so… this might sound random, but I think you’re kinda stealing my focus lately. Like hello?? Why am I smiling at my phone like this?? 😂 Ngl, I really enjoy talking to you. You’re funny, smart, and lowkey adorable. It’s dangerous combo tbh. I don’t know where this is gonna go, but I’m willing to find out… if you are too 😉\n \n– Your favorite notification (hopefully :D)",
    gameType: "reflex",
    locked: true,
  },
  {
    id: 4,
    title: "Future Hopes",
    content:
      "Hiii,\n \nSometimes I wonder if you even realize how special you are. The way you laugh? It stays in my head. The way you talk about your dreams? It makes me wanna support you in everything. Tbh, you inspire me more than you know. You make me wanna be better, do better, try harder. If one day you ever need someone who’s gonna stay, cheer for you, and choose you\n \n— I’m right here. Always rooting for you",
    gameType: "sort",
    locked: true,
  },
  {
    id: 5,
    title: "Final Note",
    content:
      "You made it to the end!\n \nI don’t wanna make this long. I just wanna say… I like you. A lot. You make things feel lighter. You make me feel calm and excited at the same time (which is weird but nice lol). If you ever feel the same, maybe we could see where this goes? No pressure. Just honesty.\n \n– Yours (maybe? sounds weird bruh) ",
    gameType: "timing",
    locked: true,
  },
];

export default function Home() {
  const [userName, setUserName] = useState("");
  const [view, setView] = useState<View>("name");
  const [letters, setLetters] = useState<Letter[]>(initialLetters);
  const [currentLetterId, setCurrentLetterId] = useState<number>(1);
  const [progress, setProgress] = useState(0);

  // Handle Name Submission
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setView("home");
    }
  };

  // Navigation
  const goToGame = (id: number) => {
    setCurrentLetterId(id);
    setView("game");
  };

  const goToHome = () => {
    setView("home");
  };

  const unlockLetter = (id: number) => {
    setLetters((prev) =>
      prev.map((l) => (l.id === id ? { ...l, locked: false } : l)),
    );
    const unlockedCount = letters.filter(
      (l) => !l.locked || l.id === id,
    ).length;
    setProgress((unlockedCount / letters.length) * 100);
    setTimeout(() => setView("letter"), 500); // Small delay for effect
  };

  // --- SUB-COMPONENTS ---

  // 1. Name Input Screen
  if (view === "name") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-deepPurple animate-fade-in">
        <div className="bg-midPurple p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border-2 border-brightYellow">
          <h1 className="text-3xl font-bold mb-4 text-brightYellow uppercase tracking-widest">
            Welcome
          </h1>
          <p className="mb-6 text-gray-200">Please enter your name to begin.</p>
          <form onSubmit={handleNameSubmit} className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-deepPurple text-brightYellow border border-gray-600 focus:border-brightYellow outline-none text-center text-lg"
              required
            />
            <button
              type="submit"
              className="w-full bg-brightYellow text-deepPurple font-bold py-3 rounded-lg hover:bg-white transition duration-300"
            >
              Start Journey
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Home Screen (List of Letters)
  if (view === "home") {
    return (
      <div className="min-h-screen p-4 md:p-8 max-w-2xl mx-auto animate-fade-in">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brightYellow mb-2">
            Secret Letters
          </h1>
          <p className="text-gray-300">
            Hello, <span className="font-bold text-white">{userName}</span>.
            Complete challenges to read.
          </p>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-gray-800 h-4 rounded-full mb-8 overflow-hidden border border-gray-700">
          <div
            className="h-full bg-brightYellow transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="grid gap-4">
          {letters.map((letter) => (
            <div
              key={letter.id}
              onClick={() =>
                letter.locked ? goToGame(letter.id) : setView("letter")
              }
              className={`p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] border-2 ${
                letter.locked
                  ? "bg-midPurple/50 border-gray-600 opacity-80 hover:border-brightYellow/50"
                  : "bg-midPurple border-brightYellow shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Letter #{letter.id}: {letter.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    {letter.locked
                      ? "Complete the challenge to unlock"
                      : "Unlocked - Click to read"}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-deepPurple">
                  {letter.locked ? (
                    <Lock className="text-gray-400" size={24} />
                  ) : (
                    <BookOpen className="text-brightYellow" size={24} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 3. Letter Reading Screen
  if (view === "letter") {
    const currentLetter = letters.find((l) => l.id === currentLetterId);
    if (!currentLetter) return null;

    return (
      <div className="min-h-screen p-4 md:p-8 flex items-center justify-center animate-fade-in">
        <div className="bg-midPurple max-w-lg w-full p-8 rounded-2xl border-2 border-brightYellow shadow-2xl relative">
          <button
            onClick={goToHome}
            className="absolute top-4 left-4 text-gray-400 hover:text-white flex items-center gap-2"
          >
            <ArrowLeft size={20} /> Back
          </button>

          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-brightYellow mb-6">
              {currentLetter.title}
            </h2>
            <div className="bg-deepPurple p-6 rounded-lg text-left whitespace-pre-line text-gray-100 leading-relaxed shadow-inner">
              {currentLetter.content}
            </div>
            <button
              onClick={goToHome}
              className="mt-8 bg-brightYellow text-deepPurple font-bold py-2 px-8 rounded-full hover:bg-white transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Game Screen
  if (view === "game") {
    const currentLetter = letters.find((l) => l.id === currentLetterId);
    return (
      <GameArena
        letter={currentLetter!}
        onUnlock={unlockLetter}
        onBack={goToHome}
      />
    );
  }

  return null;
}

// --- MINI GAMES COMPONENT ---
function GameArena({
  letter,
  onUnlock,
  onBack,
}: {
  letter: Letter;
  onUnlock: (id: number) => void;
  onBack: () => void;
}) {
  switch (letter.gameType) {
    case "clicker":
      return (
        <ClickerGame letter={letter} onUnlock={onUnlock} onBack={onBack} />
      );
    case "math":
      return <MathGame letter={letter} onUnlock={onUnlock} onBack={onBack} />;
    case "reflex":
      return <ReflexGame letter={letter} onUnlock={onUnlock} onBack={onBack} />;
    case "sort":
      return <SortGame letter={letter} onUnlock={onUnlock} onBack={onBack} />;
    case "timing":
      return <TimingGame letter={letter} onUnlock={onUnlock} onBack={onBack} />;
    default:
      return null;
  }
}
// Game 1: Speed Clicker
function ClickerGame({ letter, onUnlock, onBack }: any) {
  const [clicks, setClicks] = useState(0);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const moveButton = () => {
    setPos({
      x: Math.random() * 200 - 100,
      y: Math.random() * 100 - 50,
    });
  };

  const handleClick = () => {
    const newCount = clicks + 1;
    setClicks(newCount);
    moveButton();
    if (newCount >= 5) {
      onUnlock(letter.id);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-midPurple p-8 rounded-2xl relative text-center">
        <button onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft />
        </button>

        <h2 className="text-2xl font-bold mb-6">Speed Click</h2>

        <button
          onClick={handleClick}
          style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
          className="bg-brightYellow text-deepPurple py-4 px-6 rounded-full"
        >
          CLICK ME ({clicks}/5)
        </button>
      </div>
    </div>
  );
}

// Game 2: Quick Math
function MathGame({ letter, onUnlock, onBack }: any) {
  const [num1] = useState(() => Math.floor(Math.random() * 20) + 5);
  const [num2] = useState(() => Math.floor(Math.random() * 20) + 5);
  const [answer, setAnswer] = useState("");
  const [msg, setMsg] = useState("");

  const correctAnswer = num1 + num2;

  const checkAnswer = (e: React.FormEvent) => {
    e.preventDefault();

    if (parseInt(answer) === correctAnswer) {
      onUnlock(letter.id);
    } else {
      setMsg("Incorrect. Try again.");
      setAnswer("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-midPurple p-8 rounded-2xl relative text-center w-full max-w-md">
        <button onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft />
        </button>

        <h2 className="text-2xl font-bold text-brightYellow mb-6">
          Quick Math
        </h2>

        <p className="text-xl mb-4 text-white">
          {num1} + {num2} = ?
        </p>

        <form onSubmit={checkAnswer}>
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="p-3 text-center rounded w-full"
          />

          <button
            type="submit"
            className="mt-4 bg-brightYellow text-deepPurple px-6 py-2 rounded"
          >
            Submit
          </button>
        </form>

        {msg && <p className="text-red-400 mt-4">{msg}</p>}
      </div>
    </div>
  );
}

// Game 3: Reflex
function ReflexGame({ letter, onUnlock, onBack }: any) {
  const [isYellow, setIsYellow] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        setIsYellow(true);
        setWaiting(false);
      },
      Math.random() * 3000 + 1000,
    ); // 1-4 detik random

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    if (waiting) {
      setMsg("Too early! Try again.");
      setIsYellow(false);
      setWaiting(true);
      setTimeout(
        () => {
          setIsYellow(true);
          setWaiting(false);
        },
        Math.random() * 3000 + 1000,
      );
    } else {
      onUnlock(letter.id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-midPurple p-8 rounded-2xl w-full max-w-md text-center relative">
        <button onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft />
        </button>

        <h2 className="text-2xl font-bold text-brightYellow mb-6">
          Reflex Test
        </h2>

        <div
          onClick={handleClick}
          className={`w-40 h-40 mx-auto rounded-xl cursor-pointer transition ${
            isYellow ? "bg-brightYellow" : "bg-purple-800"
          }`}
        />

        {msg && <p className="text-red-400 mt-6">{msg}</p>}
      </div>
    </div>
  );
}

// Game 4: Sort Numbers
function SortGame({ letter, onUnlock, onBack }: any) {
  const [current, setCurrent] = useState(1);
  const [shuffled, setShuffled] = useState<number[]>([]);

  useEffect(() => {
    setShuffled([1, 2, 3].sort(() => Math.random() - 0.5));
  }, []);

  const handleClick = (num: number) => {
    if (num === current) {
      if (current === 3) {
        onUnlock(letter.id);
      } else {
        setCurrent(current + 1);
      }
    } else {
      setCurrent(1);
      alert("Wrong order! Start over.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-midPurple p-8 rounded-2xl w-full max-w-md text-center relative">
        <button onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft />
        </button>

        <h2 className="text-2xl font-bold text-brightYellow mb-6">
          Sort Order
        </h2>

        <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
          {shuffled.map((num) => (
            <button
              key={num}
              onClick={() => handleClick(num)}
              className="h-16 w-16 rounded-full bg-brightYellow text-deepPurple font-bold"
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Game 5: Timing
function TimingGame({ letter, onUnlock, onBack }: any) {
  const [position, setPosition] = useState(0);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let frame: number;
    let dir = 1;

    const update = () => {
      setPosition((prev) => {
        let next = prev + 1.5 * dir;

        if (next >= 90) {
          next = 90;
          dir = -1;
        } else if (next <= 0) {
          next = 0;
          dir = 1;
        }

        return next;
      });

      frame = requestAnimationFrame(update);
    };

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  const stopTiming = () => {
    if (position >= 40 && position <= 60) {
      onUnlock(letter.id);
    } else {
      setMsg("Missed! Try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-midPurple p-8 rounded-2xl w-full max-w-md text-center relative">
        <button onClick={onBack} className="absolute top-4 left-4">
          <ArrowLeft />
        </button>

        <h2 className="text-2xl font-bold text-brightYellow mb-6">
          Perfect Timing
        </h2>

        <div className="relative w-full h-8 bg-gray-900 mb-6 overflow-hidden">
          <div className="absolute h-full w-[20%] left-[40%] bg-green-500"></div>
          <div
            className="absolute h-full w-2 bg-white"
            style={{ left: `${position}%` }}
          />
        </div>

        <button
          onClick={stopTiming}
          className="bg-brightYellow text-deepPurple px-8 py-3 rounded-full"
        >
          STOP
        </button>

        {msg && <p className="text-red-400 mt-4">{msg}</p>}
      </div>
    </div>
  );
}
