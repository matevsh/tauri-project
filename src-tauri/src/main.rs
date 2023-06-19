#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
mod task_struct;
mod files;

use std::fs;
use tauri::State;
use task_struct::{TodoMutex, TodoStore};
use files::FsNodeVecMutex;

#[tauri::command]
fn get_todos(todo_store: State<TodoMutex>) -> String {
    serde_json::to_string(&todo_store.lock().unwrap().get_all()).unwrap()
}

#[tauri::command]
fn add_todo(name: &str, todo_store: State<TodoMutex>) {
    todo_store
        .lock()
        .unwrap()
        .add(name);
}

#[tauri::command]
fn edit_todo(id: i32, new_name: &str, todo_store: State<TodoMutex>) {
    todo_store.lock().unwrap().edit(id, new_name)
}

#[tauri::command]
fn toggle_task(id: i32, todo_store: State<TodoMutex>) {
    todo_store.lock().unwrap().toggle_complete(id);
}

#[tauri::command]
fn get_fs(fs: State<FsNodeVecMutex>) -> String {
    serde_json::to_string(&fs.lock().unwrap().get_entries()).unwrap()
}

#[tauri::command]
fn read_file(path: &str) -> String {
    fs::read_to_string(path).unwrap_or_else(|_| String::from("Nieudana próba odczytu pliku"))
}

fn main() {
    tauri::Builder::default()
        .manage(files::FsDir::new("../"))
        .manage(TodoStore::new())
        .invoke_handler(tauri::generate_handler![get_fs, get_todos, add_todo, edit_todo, toggle_task, read_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
