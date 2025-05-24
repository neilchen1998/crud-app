#[derive(serde::Serialize, serde::Deserialize)]
pub struct DropdownItem {
    pub id: i32,
    pub name: String,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct TableEntry {
    pub id: i32,
    pub name: String,
    pub email: String,
}

#[derive(serde::Serialize, serde::Deserialize)]
pub struct Table {
    pub caption: String,
    pub entries: Vec<TableEntry>,
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

#[tauri::command]
async fn get_table() -> Result<Table, String> {
    let entries = vec![
        TableEntry { id: 1, name: "Niall".into(), email: "niall@gmail.com".into() },
        TableEntry { id: 2, name: "Neil".into(), email: "neil@gmail.com".into() },
        TableEntry { id: 3, name: "Buzz".into(), email: "buzz@gmail.com".into() }
    ];

    let caption = "List of Registered Users.".to_string();

    Ok(Table{ caption, entries })
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, get_dropdown_items, get_table])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
