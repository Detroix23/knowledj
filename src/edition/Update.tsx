/*!
 * # Knowledj frontend.
 * src/edition/Update.tsx
 * 
 * Single card detailed and edition view.
 */
import type { Card } from "../lib/types";
import { HoverPane } from "../common/HoverPane";
import styles from "./Update.module.css";

export const Update = ({ card, handleClose }: { 
  card: Card,
  handleClose: () => void,
}) => {
  return (
    <HoverPane handleClose={handleClose}>
      <div className={styles.updateMain}>
        <button onClick={handleClose}> X </button>
        <h1>Update card.</h1>
        <h2>{card.title}</h2>
      </div>
    </HoverPane>
  );
}
