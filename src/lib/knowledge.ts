/*!
 * # Knowledge - library.
 * src/lib/knowledge.ts
 * 
 * Direct `invokes` from Rust to have stronger code.
 */
import { invoke } from "@tauri-apps/api/core";
import type { KnowledgeFile } from "./types";

/** Invokes the Rust function `knowledge_load`. */
export const loadKnowledge = () => invoke<KnowledgeFile>("knowledge_load");

/** Invokes the Rust function `knowledge_file`. */
export const saveKnowledge = (file: KnowledgeFile) => invoke<void>("knowledge_save", { file });
