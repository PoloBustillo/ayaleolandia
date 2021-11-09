/** @format */

import React, { useState } from "react";
import Image from "next/image";
import { useSprings, animated, to as interpolate } from "@react-spring/web";
import { useDrag } from "react-use-gesture";

const cards = [
  "https://upload.wikimedia.org/wikipedia/en/f/f5/RWS_Tarot_08_Strength.jpg",
  "https://upload.wikimedia.org/wikipedia/en/5/53/RWS_Tarot_16_Tower.jpg",
  "https://upload.wikimedia.org/wikipedia/en/9/9b/RWS_Tarot_07_Chariot.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/db/RWS_Tarot_06_Lovers.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg",
  "https://upload.wikimedia.org/wikipedia/en/d/de/RWS_Tarot_01_Magician.jpg",
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 300 + 2000,
});
const toNew = (i) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 300,
});
const from = (i) => ({
  x: -2500,
  rot: -10 + Math.random() * 20,
  scale: 10.5,
  y: 1000,
});
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r, s) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${
    r / 1.1
  }deg) scale(${s})`;

export default function Deck() {
  const [playAgain, setPlayAgain] = useState(false);
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [springs, set] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag((state) => {
    const {
      args: [index],
      down,
      movement: [mx],
      direction: [xDir, yDir],
      velocity,
    } = state;

    if (yDir > 0.9 || yDir < -0.9) {
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring

        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          scale,
          config: { friction: 50, tension: 500 },
        };
      });
    } else {
      const trigger = velocity > 0.2; // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1; // Direction should either point left or right
      if (!down && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      set((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = down ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === cards.length) {
        setPlayAgain(true);
      }
    }
  });

  return (
    <>
      {springs.map(({ x, y, rot, scale }, i) => (
        <animated.div key={i} style={{ x, y }}>
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          >
            <>
              <div>OTRA</div>{" "}
              <button
                onClick={() => {
                  console.log("CLIK M");
                }}
              >
                Nuevo Anillo
              </button>
            </>
          </animated.div>
        </animated.div>
      ))}
      {playAgain && (
        <div
          onClick={() => {
            setTimeout(() => gone.clear() || set((i) => toNew(i)), 600);
            setPlayAgain(false);
          }}
        >
          <Image
            placeholder="blur"
            src="/playAgain.png"
            width="60px"
            alt="Deck"
          />
        </div>
      )}
    </>
  );
}
