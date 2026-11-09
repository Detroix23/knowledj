/*!
 * # Knowledj frontend.
 * src/edition/Update.tsx
 * 
 * Single card detailed and edition view.
 */
import type { Card } from "../lib/types";
import { removeKnowledge } from "../lib/knowledge";

import { HoverPane } from "../common/HoverPane";
import styles from "./Update.module.css";

export const Update = ({ card, handleClose }: { 
  card: Card,
  handleClose: () => void,
}) => {
  const handleRemove = () => {
    console.log("(?) Removing card : ", card);
    removeKnowledge(card);
  };

  return (
    <HoverPane handleClose={handleClose}>
      <div className={styles.updateMain}>
        <button onClick={handleClose}> X </button>
        <h1>Update card.</h1>
        <h2>{card.title}</h2>
        <button onClick={handleRemove}>Delete</button>
      </div>
    </HoverPane>
  );
}
