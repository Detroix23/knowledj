/*!
 * # Knowledj frontend.
 * src/edition/Editor.tsx
 */
import type { Card, KnowledgeFile } from "../lib/types";
import { isKnowledgeEmpty } from "../lib/types";
import format from "../lib/format";

import styles from "./Editor.module.css";

const AddCardButton = () => {
  const handleClick = () => {
    alert("[WIP] Creating new card.");
  };

  return (
    <button className={styles.editorAddCardButton} onClick={handleClick}> 
      + 
    </button>
  );
}

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

/** Preview 1 card. */
const CardPreview = ({ card }: { 
  card: Card,
}) => {
  const dateCreated = new Date(Date.parse(card.dateCreated));
  const dateUpdated = new Date(Date.parse(card.dateUpdated));

  return (
    <div className={styles.editorCardPreview}>
      <span className={styles.editorCardTitle}>{card.title} ({card.id})</span>
      <span className={styles.editorCardBody}>{card.body}</span>
      <div className={styles.editorCardDates}>
        <span>{format.dateFormal(dateCreated)}</span>
        <span>{format.dateFormal(dateUpdated)}</span>
      </div>
    </div>
  );
}

/** Display all the cards using `CardPreview`. */
const CardsView = ({ knowledge }: { 
  knowledge: KnowledgeFile | null,
}) => {
  const mapCards = () => knowledge?.cards.map((card: Card, index: number) => (
    <CardPreview key={index.toString()} card={card} />
  ));

  return (
    <div className={styles.editorCardsView}>
      {isKnowledgeEmpty(knowledge) 
        ? "No cards."
        : mapCards()
      }
    </div>
  );
}

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

