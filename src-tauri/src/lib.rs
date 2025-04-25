#[derive(serde::Serialize, serde::Deserialize)]
pub struct DropdownItem {
    pub id: i32,
    pub name: String,
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn get_dropdown_items() -> Result<Vec<DropdownItem>, String> {
    let items = vec![
        DropdownItem { id: 1, name: "Option A".into() },
        DropdownItem { id: 2, name: "Option B".into() },
        DropdownItem { id: 3, name: "Option C".into() },
    ];

    Ok(items)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_dropdown_items])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
