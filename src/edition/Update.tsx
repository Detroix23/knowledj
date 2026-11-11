/*!
 * # Knowledj frontend.
 * src/edition/Update.tsx
 * 
 * Single card detailed and edition view.
 */
import type { Card } from "../lib/types";

import { HoverPane } from "../common/HoverPane";
import styles from "./Update.module.css";
import { KatexEditor } from "../common/KatexRender";
import { useState } from "react";

export const Update = ({ card, handleClose, addKnowledge, removeKnowledge }: { 
  card: Card,
  handleClose: () => void,
  addKnowledge: (card: Card) => void,
  removeKnowledge: (card: Card) => void,
}) => {
  const [ newCard, setNewCard ] = useState<Card>(card);

  const handleRemove = () => {
    console.log("(?) Removing card : ");
    console.log(card);
    removeKnowledge(card);
    handleClose();
  };
  const handleUpdate = () => {
    console.log("(?) Updating card : ");
    console.log(card, newCard);
    addKnowledge(newCard);
    removeKnowledge(card);
    handleClose();
  }
  
  return (
    <HoverPane handleClose={handleClose} className={styles.updateMain}>
      <button onClick={handleClose}> X </button>
      <h1>Update card.</h1>
      <h2>{newCard.title}</h2>
      <KatexEditor
        label="Body"
        input={newCard.body}
        setInput={(input: string) => setNewCard({
          ...newCard,
          body: input,
        })}
      />
      
      <button onClick={handleRemove}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </HoverPane>
  );
}
