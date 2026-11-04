/*!
 * # Knowledj frontend.
 * src/edition/View.tsx
 */
import type { Card, KnowledgeFile } from "../lib/types";
import { isKnowledgeEmpty } from "../lib/types";
import format from "../lib/format";

import styles from "./View.module.css";

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
export const CardsView = ({ knowledge }: { 
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
