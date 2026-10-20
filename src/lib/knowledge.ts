/*!
 * # Knowledge - library.
 * src/lib/knowledge.ts
 * 
 * Direct `invokes` from Rust to have stronger code.
 */
import { invoke } from "@tauri-apps/api/core";
import type { KnowledgeFile } from "../types";

export const loadKnowledge = () => invoke<KnowledgeFile>("knowledge_load");
export const saveKnowledge = (file: KnowledgeFile) => invoke<void>("knowledge_save", { file });
