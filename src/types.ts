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
  createdAt: string;
  updatedAt: string;
};

/**
 * # `KnowledgeFile` object shared with Rust.
 */
export interface KnowledgeFile { 
    version: number; 
    cards: Card[]; 
};
