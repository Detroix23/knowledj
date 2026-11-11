/*!
 * # Knowledj frontend.
 * src/edition/View.tsx
 */
import { useState } from "react";

import format from "../lib/format";
import type { Card, KnowledgeFile } from "../lib/types";
import { isKnowledgeEmpty } from "../lib/types";

import styles from "./View.module.css";
import { Update } from "./Update";

/** Preview 1 card. */
const CardPreview = ({ card, removeKnowledge }: { 
  card: Card,
  removeKnowledge: (card: Card) => void,
}) => {
  const [ isUpdateVisible, setUpdateVisibility ] = useState<boolean>(false);

  const handleOpenUpdate =  () => setUpdateVisibility(true);
  const handleCloseUpdate = () => setUpdateVisibility(false);

  // Data.
  const dateCreated = new Date(Date.parse(card.dateCreated));
  const dateUpdated = new Date(Date.parse(card.dateUpdated));

  return (
    <>
      <div className={styles.editorCardPreview} onClick={handleOpenUpdate}>
        <span className={styles.editorCardTitle}>{card.title} ({card.id})</span>
        <span className={styles.editorCardBody}>{card.body}</span>
        <div className={styles.editorCardDates}>
          <span>{format.dateFormal(dateCreated)}</span>
          <span>{format.dateFormal(dateUpdated)}</span>
        </div>
      </div>
      {isUpdateVisible ? <Update 
        card={card} 
        handleClose={handleCloseUpdate} 
        removeKnowledge={removeKnowledge}
      /> : null}
    </>
  );
}

/** Display all the cards using `CardPreview`. */
export const CardsView = ({ knowledge, removeKnowledge }: { 
  knowledge: KnowledgeFile | null,
  removeKnowledge: (card: Card) => void,
}) => {
  const mapCards = () => knowledge?.cards.map((card: Card, index: number) => (
    <CardPreview 
      key={index.toString()} 
      card={card}
      removeKnowledge={removeKnowledge} 
    />
  ));

  return (
    <div className={styles.editorCardsView}>
      {isKnowledgeEmpty(knowledge) ? "No cards." : mapCards()}
    </div>
  );
}
