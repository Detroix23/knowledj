/*!
 * # Knowledj frontend.
 * src/common/HoverPane.tsx
 */

import type { ReactNode } from "react"

import styles from "./HoverPane.module.css"

/**
 * Create a pane that is fixed atop the main elements.
 * - Put on a background that on click closes the pane. 
 * - Accepts children.
 * 
 * Props :
 * - `handleClose` : called when the background is clicked ;
 * - `children` : any valid text, HTML, or React nodes to be displayed in the panel.
 * 
 * Example :
 * ```jsx
 * <HoverPane handleClose={() => alert("Closing pane.")}>
 *   <h2>Hello !</h2>
 * </HoverPane>    
 * ```
 */
export const HoverPane = ({ handleClose, children }: { 
  handleClose: () => void, 
  children: ReactNode
}) => {
  return (
    <div className={styles.hoverBackground} onClick={handleClose}>
      <div className={styles.hoverPane}>
        {children}
      </div>
    </div>
  );
}
