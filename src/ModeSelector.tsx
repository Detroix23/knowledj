/**
 * # Knowledj frontend.
 * src/ModeSelector.tsx
 */
import React from "react";
import type { SetStateAction } from "react";

import { mainModeFormat, MainMode } from "./lib/types";
import styles from "./ModeSelector.module.css";

/** Lateral sidebar to swap between Edition and Quiz mode.  */
export const ModeSelector = ({ mode, setMode }: { 
  mode: MainMode, 
  setMode: React.Dispatch<SetStateAction<MainMode>>,
}) => {
  return (
    <div className={styles.mainModeSelector}>
      <h2>Mode selector</h2>
      <ModeButton currentMode={mode} mode={MainMode.EDITION} setMode={setMode} />
      <ModeButton currentMode={mode} mode={MainMode.QUIZ} setMode={setMode} />
    </div>
  );
};

/** Buttons for `ModeSelector` only. Set*/
const ModeButton = ({ currentMode, mode, setMode }: { 
  currentMode: MainMode,
  mode: MainMode, 
  setMode: React.Dispatch<SetStateAction<MainMode>>,
}) => {
  const handleClick = () => {
    console.log(`(?) ModeButton():handleClick() Clicked to ${mode}`);
    setMode(mode);
  }

  return (
    <button 
      onClick={handleClick} 
      style={{fontWeight: (currentMode === mode) ? "bold" : "normal"}}
    >
      {mainModeFormat(mode)}
    </button>
  );
};
