/*!
 * # Knowledj frontend.
 * src/edition/View.tsx
 */
import { useState } from "react";

import format from "../lib/format";
import type { Card, KnowledgeFile } from "../lib/types";
import { isKnowledgeEmpty } from "../lib/types";
import { KatexRender } from "../common/KatexRender";

import styles from "./View.module.css";
import { Update } from "./Update";
import { addKnowledge } from "../lib/knowledge";

/** Preview 1 card. */
const CardPreview = ({ card, setFocusedCard }: { 
  card: Card,
  setFocusedCard: React.Dispatch<React.SetStateAction<Card | null>>,
}) => {
  // Data.
  const dateCreated = new Date(Date.parse(card.dateCreated));
  const dateUpdated = new Date(Date.parse(card.dateUpdated));

  return (
    <div 
      className={styles.editorCardPreview} 
      onClick={() => setFocusedCard(card)}
    >
      <span className={styles.editorCardTitle}>{card.title} ({card.id})</span>
      <KatexRender className={styles.editorCardBody}>{card.body}</KatexRender>
      <ul className={styles.editorCardDates}>
        <li>Created : {format.dateFormal(dateCreated)}</li>
        <li>Updated : {format.dateFormal(dateUpdated)}</li>
      </ul>
    </div>
  );
}

/** Display all the cards using `CardPreview`. */
export const CardsView = ({ knowledge, removeKnowledge }: { 
  knowledge: KnowledgeFile | null,
  removeKnowledge: (card: Card) => void,
}) => {
  const [ focusedCard, setFocusedCard ] = useState<Card | null>(null);

  const mapCards = () => knowledge?.cards.map((card: Card) => <CardPreview 
    key={card.id} 
    card={card}
    setFocusedCard={setFocusedCard}
  />);

  return (
    <div className={styles.editorCardsView}>
      {isKnowledgeEmpty(knowledge) ? "No cards." : mapCards()}
      {focusedCard !== null ? <Update 
        card={focusedCard} 
        handleClose={() => setFocusedCard(null)} 
        addKnowledge={addKnowledge}
        removeKnowledge={removeKnowledge}
      /> : null}
    </div>
  );
}
