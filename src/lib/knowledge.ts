/*!
 * # Knowledge - library.
 * src/lib/knowledge.ts
 * 
 * Direct `invokes` from Rust to have stronger code.
 */
import { invoke } from "@tauri-apps/api/core";
import type { Card, KnowledgeFile } from "./types";

/** 
 * Invokes the Rust function `knowledge_load`. 
 * 
 * Load the `KnowledgeFile`. 
 */
export const loadKnowledge = () => 
  invoke<KnowledgeFile>("knowledge_load");

/** 
 * Invokes the Rust function `knowledge_file`. 
 * 
 * Save to file the `knowledge`.
 */
export const saveKnowledge = (file: KnowledgeFile) => 
  invoke<void>("knowledge_save", { file });

/**
 * Invokes the Rust function `knowledge_add`. 
 * 
 * Add a `card` to `knowledge` and saves the new file
 */
export const addKnowledge = (card: Card) => 
  invoke<KnowledgeFile>("knowledge_add", { card });

export const removeKnowledge = (card: Card) => 
  invoke<KnowledgeFile>("knowledge_remove", { card });
