/*! # Knowledj.
 * src/types.ts
 */

/**
 * # `Card` object shared with Rust.
 */
export interface Card {
  id: string;
  title: string;
  body: string;
  dateCreated: string;
  dateUpdated: string;
};

export const EMPTY_CARD: Card = {
  id: "",
  title: "",
  body: "",
  dateCreated: "",
  dateUpdated: "",
};

/**
 * # `KnowledgeFile` object shared with Rust.
 */
export interface KnowledgeFile { 
    version: number; 
    cards: Card[]; 
};

/** Returns `true` if `knowledge` is `null`, not `true`-ish, or `cards` is empty. */
export const isKnowledgeEmpty = (knowledge: KnowledgeFile | null) => {
  return !knowledge || knowledge.cards.length === 0;
}

/** Select the main mode of operation. */
export enum MainMode {
  EDITION,
  QUIZ,
};

/** Format the enumeration `MainMode`. */
export function mainModeFormat(mode: MainMode): string {
  switch (mode) {
    case MainMode.EDITION: return "Edition";
    case MainMode.QUIZ: return "Quiz";
  }
} 
