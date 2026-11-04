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
        <h1>{card.title}</h1>
      </div>
    </HoverPane>
  );
}
