import "./App.css";

import { useEffect, useState } from "react";
import { loadKnowledge } from "./lib/knowledge";
import type { KnowledgeFile } from "./types";

const App = () => {
  const [knowledge, setKnowledge] = useState<KnowledgeFile | null>(null);

  useEffect(() => {
    loadKnowledge()
      .then(setKnowledge)
      .catch(console.error);
  }, []);

  return (
    <main className="container">
      <h1>Knowledj.</h1>
    </main>
  );
}

export default App;
