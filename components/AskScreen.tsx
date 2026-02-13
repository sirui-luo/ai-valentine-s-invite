import React, { useRef, useState } from 'react';

interface AskScreenProps {
  receiverName: string;
  onYes: () => void;
  message?: string; // sweet message from CreatorForm
}

// Helper for random position (no button movement)
// Make vertical offset bar shorter, so No button doesn't go too far down
const getRandomPosition = (
  parentWidth: number,
  parentHeight: number,
  btnWidth: number,
  btnHeight: number
) => {
  const pad = 12;
  const barShorten = 34; // Cut the available movement bar vertically for No button
  const maxX = Math.max(0, parentWidth - btnWidth - pad);
  // Shrink maxY by `barShorten` so No is not too far below Yes
  const maxY = Math.max(0, parentHeight - btnHeight - pad - barShorten);
  const x = Math.floor(Math.random() * (maxX - pad + 1)) + pad;
  const y = Math.floor(Math.random() * (maxY - pad + 1)) + pad;
  return { x, y };
};

const AskScreen: React.FC<AskScreenProps> = ({ receiverName, onYes, message }) => {
  // Always show the sender's message exactly as provided, including blank/whitespace.
  // If undefined or null, show blank.
  const displayMessage =
    typeof message === 'string'
      ? message
      : '';

  const containerRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);
  const [noBtnPos, setNoBtnPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [inited, setInited] = useState(false);

  // Calculate and set initial position after mount
  React.useEffect(() => {
    if (containerRef.current && noBtnRef.current && !inited) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const btnRect = noBtnRef.current.getBoundingClientRect();
      const pos = getRandomPosition(parentRect.width, parentRect.height, btnRect.width, btnRect.height);
      setNoBtnPos(pos);
      setInited(true);
    }
    // eslint-disable-next-line
  }, [containerRef.current, noBtnRef.current, inited]);

  // Moves No button on hover or focus
  const moveNoButton = () => {
    if (containerRef.current && noBtnRef.current) {
      const parentRect = containerRef.current.getBoundingClientRect();
      const btnRect = noBtnRef.current.getBoundingClientRect();
      const pos = getRandomPosition(parentRect.width, parentRect.height, btnRect.width, btnRect.height);
      setNoBtnPos(pos);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 relative z-10 w-full bg-gradient-to-b from-pink-100 to-red-50">
      <div
        ref={containerRef}
        className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-3xl border-4 border-pink-200 max-w-2xl w-full mx-auto px-4 py-12 md:p-16 flex flex-col items-center relative"
        style={{ minHeight: 400 }}
      >
        <h1 className="text-5xl md:text-7xl font-handwriting text-red-600 mb-10 drop-shadow-sm">
          {receiverName},
        </h1>
        {/* Display the sender's message (design: styled box, always visible, even if only whitespace) */}
        <div className="w-full flex justify-center mb-10">
          <div
            className={[
              "w-full max-w-lg mx-auto rounded-xl border-2 resize-none",
              "font-handwriting text-xl md:text-2xl xl:text-3xl leading-relaxed whitespace-pre-line transition-colors",
              displayMessage && displayMessage.length > 0
                ? "border-pink-200 bg-pink-50 text-pink-600"
                : "border-pink-100 bg-pink-50/50 text-gray-400 italic"
            ].join(" ")}
            style={{
              minHeight: 64,
              background: displayMessage && displayMessage.length > 0 ? "#fff6fb" : "#fffafb",
              padding: "20px 24px",
              boxShadow: displayMessage && displayMessage.length > 0 ? "0 0 0 2px #fa75bc22" : "none",
              outline: "none",
            }}
            data-testid="askscreen-message"
          >
            {displayMessage}
          </div>
        </div>
        {/* YES/NO Buttons */}
        <div className="flex flex-col gap-7 w-full items-center mt-0 relative" style={{minHeight: 150}}>
          <button
            onClick={onYes}
            className="px-10 py-4 bg-red-500 hover:bg-red-600 text-white drop-shadow-lg text-2xl font-handwriting font-bold rounded-full shadow-xl transition hover:scale-105 active:scale-95"
            style={{
              boxShadow: "0 4px 24px 0 rgba(249,52,114,0.12)",
              minWidth: "240px",
            }}
            data-testid="askscreen-yes"
          >
            Yes, I will! <span role="img" aria-label="heart">❤️</span>
          </button>
          <button
            ref={noBtnRef}
            type="button"
            className="px-8 py-4 bg-gray-200 text-gray-500 text-2xl font-handwriting font-bold rounded-full shadow-md select-none relative"
            tabIndex={-1}
            style={{
              minWidth: "120px",
              boxShadow: "0 4px 16px 0 rgba(192,192,192,0.16)",
              background: "#E5E8EB",
              position: "absolute",
              left: noBtnPos.x,
              top: noBtnPos.y + 52, // Bar is shorter: push <=52px below Yes, not 75px
              transition: "left 0.39s cubic-bezier(.54,1.8,.59,1.0), top 0.39s cubic-bezier(.54,1.8,.59,1.0)",
              // Smoother, slower transition: custom cubic easing with more time
              cursor: "pointer",
              pointerEvents: "auto",
              userSelect: "none",
            }}
            disabled={false}
            data-testid="askscreen-no"
            // Move button on mouse events
            onMouseEnter={moveNoButton}
            onMouseOver={moveNoButton}
            onFocus={moveNoButton}
            onTouchStart={moveNoButton}
            onClick={moveNoButton}
            aria-label="No (but you can't click me!)"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskScreen;