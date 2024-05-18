// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Initialize the database.
            let dir = app.path_resolver().app_config_dir().unwrap();
            if !dir.exists() {
                fs::create_dir(dir).unwrap();
            }
            
            Ok(())
        })
        // .invoke_handler(tauri::generate_handler![upload_file])
        .plugin(tauri_plugin_sqlite::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
