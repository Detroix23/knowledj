/*!
 * # Knowledj frontend.
 * src/edition/Create.tsx
 */
import { useState } from "react";

import { HoverPane } from "../common/HoverPane";
import styles from "./Create.module.css";

export const AddCardButton = () => {
  const [ isMenuVisible, setMenuVisibility ] = useState<boolean>(false);

  const handleClick = () => {
    setMenuVisibility(!isMenuVisible);
    console.log(`(?) Switching \`isMenuVisible\` from \`${isMenuVisible}\`.`);
  };

  return (
    <>
      <button className={styles.editorAddCardButton} onClick={handleClick}> 
          + 
      </button>
      {isMenuVisible ? <AddCardMenu setMenuVisibility={setMenuVisibility} /> : null}
    </>
  );
}

const AddCardMenu = ({ setMenuVisibility }: {
  setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}) => {  
  const handleClose = () => {
    setMenuVisibility(false);
  }

  return (
    <HoverPane handleClose={handleClose}>
      <button onClick={handleClose}> X </button>
    </HoverPane>         
  );
}