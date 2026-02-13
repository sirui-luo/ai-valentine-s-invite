import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { InviteData } from '../types';
import { MapPin, Calendar, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// ---- ENVELOPE CSS ----
// Flap and liner must not overlap and should not be clipped when opened:
// - Fix: expand SVG viewBox and dimensions so the full flap remains visible at open angle.

const envelopeStyles = `
@keyframes envelope-flap-open {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(-120deg); }
}
.envelope-flap-container {
  position: relative;
  overflow: visible !important;
  z-index: 30;
}
.envelope-flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 60px;
  background: inherit;
  transform-origin: 120px 34px;
  transition: transform 2.3s cubic-bezier(.64,.09,.08,1.01);
  will-change: transform;
  z-index: 50;
  pointer-events: none;
}
.envelope-flap.open {
  animation: envelope-flap-open 2.3s cubic-bezier(.64,.09,.08,1.01) forwards;
}
`;

interface EnvelopeRevealProps {
  data: InviteData;
}

type MultiPhotoInviteData = InviteData & { photoUrls?: string[] };

const DEFAULT_FINAL_MESSAGE = "let's have a romantic night, my valentine";

const SimpleCard: React.FC<{ data: InviteData }> = ({ data }) => {
  const allPhotos =
    Array.isArray((data as MultiPhotoInviteData).photoUrls) &&
    (data as MultiPhotoInviteData).photoUrls!.filter(Boolean).length > 0
      ? (data as MultiPhotoInviteData).photoUrls!.filter(Boolean)
      : data.photoUrl
      ? [data.photoUrl]
      : [];

  const [current, setCurrent] = useState(0);

  const senderName = data && data.senderName ? data.senderName : 'Someone';
  const date = data && data.date ? data.date : 'Feb 14';
  const location = data && data.location ? data.location : 'Surprise!';

  const goLeft = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((cur) => (cur - 1 + allPhotos.length) % allPhotos.length);
  };

  const goRight = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((cur) => (cur + 1) % allPhotos.length);
  };

  useEffect(() => {
    if (allPhotos.length <= 1) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCurrent(cur => (cur - 1 + allPhotos.length) % allPhotos.length);
      if (e.key === 'ArrowRight') setCurrent(cur => (cur + 1) % allPhotos.length);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [allPhotos.length]);

  return (
    <div className="bg-white p-10 rounded-2xl shadow-2xl text-center border-2 border-pink-100 w-full max-w-2xl mx-auto mt-10 flex flex-col transition-all">
      <h1 className="text-4xl font-handwriting font-bold text-red-600 mb-8">
        I knew you'd say yes!
      </h1>
      <div className="flex justify-center items-center mb-8 relative w-full" style={{ minHeight: 260 }}>
        <div className="flex-1 flex justify-center items-center relative">
          {allPhotos.length > 0 ? (
            <>
              {allPhotos.length > 1 && (
                <button
                  className="absolute z-10 p-1 bg-white/80 hover:bg-white rounded-full shadow border border-pink-100 transition"
                  aria-label="Previous photo"
                  style={{
                    left: 'calc(50% - 156px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                  tabIndex={0}
                  onClick={goLeft}
                >
                  <ChevronLeft className="w-5 h-5 text-pink-400" />
                </button>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={allPhotos[current]}
                alt={`Photo ${current + 1} of ${allPhotos.length}`}
                className="w-64 h-64 object-cover rounded-2xl border-4 border-pink-100 shadow mx-auto transition-all select-none"
                draggable={false}
              />
              {allPhotos.length > 1 && (
                <button
                  className="absolute z-10 p-1 bg-white/80 hover:bg-white rounded-full shadow border border-pink-100 transition"
                  aria-label="Next photo"
                  style={{
                    right: 'calc(50% - 156px)',
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                  tabIndex={0}
                  onClick={goRight}
                >
                  <ChevronRight className="w-5 h-5 text-pink-400" />
                </button>
              )}
              {allPhotos.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1">
                  {allPhotos.map((_, idx) => (
                    <span
                      key={idx}
                      className={`inline-block rounded-full transition-all border border-pink-200 ${
                        idx === current
                          ? 'bg-pink-400 w-3 h-3 shadow'
                          : 'bg-pink-100 w-2 h-2'
                      }`}
                      aria-label={idx === current ? 'Current photo' : undefined}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="w-36 h-36 rounded-full bg-pink-50 flex items-center justify-center border-4 border-pink-100 mx-auto">
              <Heart className="w-20 h-20 text-pink-300" />
            </div>
          )}
        </div>
      </div>
      <p className="font-handwriting text-3xl text-gray-800 leading-relaxed px-4 mb-4">
        &quot;{DEFAULT_FINAL_MESSAGE}&quot;
      </p>
      <div className="text-pink-400 font-bold text-lg uppercase tracking-wide mb-6">
        — {senderName}
      </div>
      <div className="w-full bg-red-50 p-6 rounded-xl border border-red-100 mt-auto text-lg">
        <div className="flex flex-row items-center justify-center gap-6 mb-2">
          <Calendar className="w-6 h-6 text-red-500" />
          <span className="font-bold text-gray-800">{date}</span>
          <MapPin className="w-6 h-6 text-red-500" />
          <span className="font-bold text-gray-800">{location}</span>
        </div>
      </div>
    </div>
  );
};

// Envelope UI with open animation/flap
const Envelope: React.FC<{ onOpen: () => void; opened: boolean }> = ({ onOpen, opened }) => {
  return (
    <>
      <style>{envelopeStyles}</style>
      <button
        className="envelope-button focus:outline-none transition-transform hover:scale-105"
        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={onOpen}
        aria-label="Open envelope"
        disabled={opened}
      >
        <div className="flex flex-col items-center justify-center">
          <svg
            width="280"
            height="210"
            viewBox="0 0 280 210"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-xl"
            style={{ display: 'block', overflow: 'visible' }}
          >
            {/* 1. Liner sits at the very bottom, below the body and flap */}
            {/* 
              The points are now drawn closer to the bottom, and the top of the liner is less sharp, 
              but the viewBox and SVG are enlarged (was 240x165, now 280x210) to ensure nothing gets clipped 
              even when the flap is open and rotated.
            */}
            <polygon
              points="25,180 140,95 255,180"
              fill="#fda4af"
              stroke="#f472b6"
              strokeWidth="2.5"
            />
            {/* 2. Envelope body sits above liner */}
            <rect
              x="21"
              y="54"
              width="238"
              height="116"
              rx="24"
              fill="#fff1f2"
              stroke="#f472b6"
              strokeWidth="2.5"
            />
            {/* 3. FLAP sits above both */}
            <g
              className={`envelope-flap${opened ? ' open' : ''}`}
              style={{
                transformOrigin: '140px 54px'
              }}
            >
              <polygon
                points="21,54 140,172 259,54"
                fill="#f9a8d4"
                stroke="#f472b6"
                strokeWidth="2.5"
              />
              {/* Heart on the flap seal */}
              <g>
                <circle cx="140" cy="105" r="22.5" fill="#f87171" />
                <foreignObject x="129.5" y="94.5" width="23" height="23">
                  <div className="flex items-center justify-center" style={{ width: '23px', height: '23px' }}>
                    <Heart className="text-white" width={19} height={19} />
                  </div>
                </foreignObject>
              </g>
            </g>
          </svg>
          {!opened && (
            <span className="mt-6 font-handwriting text-2xl text-pink-700 animate-bounce">Click to open</span>
          )}
        </div>
      </button>
    </>
  );
};

// Main component:
const EnvelopeReveal: React.FC<EnvelopeRevealProps> = ({ data }) => {
  const [revealed, setRevealed] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioStarted, setAudioStarted] = useState(false);

  // Play audio once on user interaction
  const handleUserAction = useCallback(() => {
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setAudioStarted(true);
    }
  }, [audioStarted]);

  useEffect(() => {
    if (!audioStarted) {
      document.addEventListener('click', handleUserAction, { once: true });
      document.addEventListener('touchstart', handleUserAction, { once: true });
      return () => {
        document.removeEventListener('click', handleUserAction);
        document.removeEventListener('touchstart', handleUserAction);
      };
    }
  }, [audioStarted, handleUserAction]);
  
  if (!data || typeof data !== 'object') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-pink-100 to-red-50 w-full">
        <div className="text-red-500 font-bold text-xl">
          Oops! Invitation data is missing or invalid.
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (revealed) {
      const timer = setTimeout(() => setShowCard(true), 2300);
      return () => clearTimeout(timer);
    }
    setShowCard(false);
  }, [revealed]);

  const handleOpenEnvelope = () => {
    setRevealed(true);
    if (!audioStarted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setAudioStarted(true);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-b from-pink-100 to-red-50 w-full transition-all"
      style={{ cursor: !audioStarted ? 'pointer' : undefined }}
      onClick={handleUserAction}
      onTouchStart={handleUserAction}
    >
      <audio
        ref={audioRef}
        src="/romantic.mp3"
        preload="auto"
        style={{ display: 'none' }}
      />
      {!showCard ? (
        <Envelope onOpen={handleOpenEnvelope} opened={revealed} />
      ) : (
        <SimpleCard data={data} />
      )}
    </div>
  );
};

export default EnvelopeReveal;