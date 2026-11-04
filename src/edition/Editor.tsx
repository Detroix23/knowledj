/*!
 * # Knowledj frontend.
 * src/edition/Editor.tsx
 */
import type { KnowledgeFile } from "../lib/types";
import { isKnowledgeEmpty } from "../lib/types";

import { CardsView } from "./View";
import { AddCardButton } from "./Create";
import styles from "./Editor.module.css";

const ActionBar = ({ knowledge }: { 
  knowledge: KnowledgeFile | null,
}) => {
  return (
    <div className={styles.editorActionBar}>
      <span>
        Data version: {isKnowledgeEmpty(knowledge) ? "∅" : knowledge?.version}
      </span>
      <AddCardButton />
    </div>
  );
};

/**
 * `Editor` main parent component. 
 */
export const Editor = ({ knowledge }: { 
  knowledge: KnowledgeFile | null,
}) => {
  return (
    <div className={styles.editorMain}>
      <h2>Editor</h2>
      <ActionBar knowledge={knowledge} />
      <CardsView knowledge={knowledge} />
    </div>
  );
};

