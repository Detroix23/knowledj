/*!
 * # Knowledj frontend.
 * src/App.tsx
 */
import { useEffect, useState } from "react";

import { loadKnowledge, addKnowledge, removeKnowledge } from "./lib/knowledge";
import type { Card, KnowledgeFile } from "./lib/types";
import { MainMode, mainModeFormat } from "./lib/types";

import { ModeSelector } from "./ModeSelector";
import { Editor } from "./edition/Editor";
import { Quiz } from "./quiz/Quiz";
import { KatexRender } from "./common/KatexRender";
import "./general.css";
import styles from "./App.module.css";

const App = () => {
  const [ knowledge, setKnowledge ] = useState<KnowledgeFile | null>(null);
  const [ modeMain, setModeMain ] = useState<MainMode>(MainMode.QUIZ);

  useEffect(() => {
    loadKnowledge()
      .then(setKnowledge)
      .catch(console.error);
  }, []);

  const switchModeUi = (mode: MainMode, knowledge: KnowledgeFile | null) => {
    switch (mode) {
      case MainMode.EDITION: return <Editor 
        knowledge={knowledge} 
        addKnowledge={async (card: Card) => setKnowledge(await addKnowledge(card))} 
      />
      case MainMode.QUIZ: return <Quiz />
    }
  };

  console.log("(?) App() Knowledge: ");
  console.log(knowledge);

  return (
    <main className={styles.container}>
      <ModeSelector mode={modeMain} setMode={setModeMain} />

      <div className={styles.title}>
        <h1>Knowledj : {mainModeFormat(modeMain)}</h1>
      </div>

      {switchModeUi(modeMain, knowledge)}

      <div className={styles.footer}>
        <KatexRender>{`\\text{Powered by} \\KaTeX`}</KatexRender>
      </div>
    </main>
  );
}

export default App;
