//! # Knowledge.
//! src-tauri/src/lib.rs
use std::fs;
use std::path;

use serde;
use tauri::AppHandle;
use tauri::Manager;

/// # `Card` object.
#[derive(serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct Card {
    id: String,
    title: String,
    body: String,
    date_created: String,
    date_updated: String,
}

/// # `Knowledge` object.
#[derive(serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "camelCase")]
struct KnowledgeFile {
    version: u32,
    cards: Vec<Card>,
}

/// Helper function to get the `knowledge.json` file path.
fn knowledge_path(app: &AppHandle) -> Result<path::PathBuf, String> {
    let directory: path::PathBuf = app
        .path()
        .app_data_dir()
        .map_err(|error| error.to_string())?;
    Ok(directory.join("knowledge.json"))
}

/// Executed on first run: create a valid, human-readable file immediately.
fn knowledge_create_empty(file_path: &path::PathBuf) -> Result<KnowledgeFile, String> {
    eprintln!("(?) {}:{} knowledge_create_empty() ran.", file!(), line!());

    let empty = KnowledgeFile {
        version: 1,
        cards: vec![],
    };
    fs::write(
        file_path,
        serde_json::to_string_pretty(&empty).map_err(|e| e.to_string())?,
    )
    .map_err(|e| e.to_string())?;
    Ok(empty)
}

/// Load the `KnowledgeFile`.
#[tauri::command]
fn knowledge_load(app: AppHandle) -> Result<KnowledgeFile, String> {
    eprintln!("(?) {}:{} knowledge_load() ran.", file!(), line!());


    let path: path::PathBuf = knowledge_path(&app)?;
    println!("- {}", path.display());
    if !path.exists() {
        knowledge_create_empty(&path)?;
    }
    let content = fs::read_to_string(&path).map_err(|e| e.to_string())?;
    serde_json::from_str(&content).map_err(|e| e.to_string())
}

/// Save to file the `knowledge`.
#[tauri::command]
fn knowledge_save(app: AppHandle, knowledge: KnowledgeFile) -> Result<(), String> {
    let path = knowledge_path(&app)?;
    // Create parent dir if needed (first save before any load):
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let json: String = serde_json::to_string_pretty(&knowledge).map_err(|e| e.to_string())?;
    fs::write(&path, json).map_err(|e| e.to_string())
}

/// Main Tauri run function.
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![knowledge_load, knowledge_save])
        .run(tauri::generate_context!())
        .expect("(!) src-tauri/src/lib::run() error while running `Tauri` application.");
}
