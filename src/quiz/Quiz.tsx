/*!
 * # Knowledj frontend.
 * src/quiz/Quiz.tsx
 */
import { useState } from "react";
import { KatexEditor } from "../common/KatexRender";

export const Quiz = () => {
  const [ tempKatexInput, setTempKatexInput ] = useState<string>("");

  return (
    <div id="quizMain">
      <h2>Quiz (WIP area).</h2>
      <KatexEditor 
        label="Test KaTeX : "
        input={tempKatexInput} 
        setInput={setTempKatexInput} 
      />
    </div>
  );
};
