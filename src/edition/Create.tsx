/*!
 * # Knowledj frontend.
 * src/edition/Create.tsx
 */
import { useState } from "react";
import type { Card } from "../lib/types";

import { HoverPane } from "../common/HoverPane";
import { KatexEditor } from "../common/KatexRender";
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


const AddCardTitle = ({ title, setCardTitle }: {
  title: string,
  setCardTitle: (title: string) => void,
}) => (
  <div className={styles.formGroup}>
    <label htmlFor="cardTitle">Title :</label>
    <br />
    <input 
      id="cardTitle" 
      value={title} 
      onChange={input => setCardTitle(input.target.value)} 
      className={styles.input} 
      placeholder="Enter question here..."
    />
  </div>
);

const AddCardButtons = ({ isSaving, handleSave, handleClose }: {
  isSaving: boolean,
  handleSave: () => void,
  handleClose: () => void,
}) => (
  <div className={styles.buttonGroup}>
    <button 
      className={styles.saveButton} 
      onClick={handleSave} 
      disabled={isSaving}
    >
      {isSaving ? "Saving..." : "Save Card"}
    </button>
    <button onClick={handleClose} className={styles.closeButton}>
      Cancel
    </button>
  </div>
)

const AddCardMenu = ({ setMenuVisibility }: {
  setMenuVisibility: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const [ card, setCard ] = useState<Card>({
    id: "",
    title: "",
    body: "",
    dateCreated: "",
    dateUpdated: "",
  });
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const setCardTitle = (title: string) => setCard({
    ...card,
    title: title,
  });
  const setCardBody = (body: string) => setCard({
    ...card,
    body: body,
  });
  const updateCardTimeStamps = () => {
    const now = new Date().toUTCString();
    console.log(`(?) Timestamp: "${now}".`);
    card.dateCreated = now;
    card.dateUpdated = now;
  };

  /**
   * Handles card creation and persistence.
   * This function simulates calling the Rust backend via an invoke binding 
   * to add the card to the knowledge file.
   */
  const isMinimumCompleted = () => !card.title.trim() || !card.body.trim()
  const handleClose = () => setMenuVisibility(false);
  const handleSave = async () => {
    if (isMinimumCompleted()) {
      alert("Title and Body are required.");
      return;
    }
    updateCardTimeStamps();
    setIsSaving(true);
    
    // In a real application, this would use Tauri's invoke binding from src/lib/knowledge.ts
    // Example: save_card(card);
    
    console.log("(?) Attempting to save card : ");
    console.log(card);

    // Simulate a successful save for now
    await new Promise(resolve => setTimeout(resolve, 500));
    setIsSaving(false);
    
    // Close the menu and reset form
    setMenuVisibility(false);
    setCard({
      id: "",
      title: "",
      body: "",
      dateCreated: "",
      dateUpdated: "",
    });
  };

  return (
    <HoverPane handleClose={handleClose}>
      <form className={styles.addCardMenu}>
        <h1 className={styles.header}>Create new card.</h1>
        
        <AddCardTitle 
          title={card.title} 
          setCardTitle={setCardTitle} 
        />
        
        <KatexEditor 
          label="Body : "
          input={card.body}
          setInput={setCardBody}
        />

        <AddCardButtons 
          isSaving={isSaving} 
          handleSave={handleSave}
          handleClose={handleClose}
        />  
      </form> 
    </HoverPane>       
  );
};
