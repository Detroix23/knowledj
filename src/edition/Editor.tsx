/*!
 * # Knowledj frontend.
 * src/edition/Editor.tsx
 */
import type { Card, KnowledgeFile } from "../lib/types";
import { isKnowledgeEmpty } from "../lib/types";

import { CardsView } from "./View";
import { AddCardButton } from "./Create";
import styles from "./Editor.module.css";

/**
 * Bar topping the `Editor` that allows :
 * - adding cards.
 */
const ActionBar = ({ knowledge, addKnowledge }: { 
  knowledge: KnowledgeFile | null,
  addKnowledge: (card: Card) => void,
}) => {
  return (
    <div className={styles.editorActionBar}>
      <span>
        Data version: {isKnowledgeEmpty(knowledge) ? "∅" : knowledge?.version}
      </span>
      <AddCardButton addKnowledge={addKnowledge} />
    </div>
  );
};

/**
 * `Editor` main parent component. 
 */
export const Editor = ({ knowledge, addKnowledge, removeKnowledge }: { 
  knowledge: KnowledgeFile | null,
  addKnowledge: (card: Card) => void,
  removeKnowledge: (card: Card) => void,
}) => {
  return (
    <div className={styles.editorMain}>
      <h2>Editor</h2>
      <ActionBar knowledge={knowledge} addKnowledge={addKnowledge} />
      <CardsView knowledge={knowledge} removeKnowledge={removeKnowledge} />
    </div>
  );
};

