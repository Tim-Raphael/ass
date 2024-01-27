mod gen;

use std::collections::HashMap;

#[derive(Default)]
pub struct Data {
    pub items: Vec<String>,
    items_content_map: HashMap<String, String>,
}

impl Data {
    pub fn new(items: Vec<String>, content: Vec<String>) -> Self {
        let mut items_content_map = HashMap::new();
        for i in 0..items.len() {
            items_content_map.insert(items[i].to_ascii_lowercase(), content[i].clone());
        }
        Data {
            items,
            items_content_map,
        }
    }

    pub fn get_content(&self, key: String) -> String {
        match self.items_content_map.get(&key.to_ascii_lowercase()) {
            Some(content) => content.clone(),
            None => "".to_string(),
        }
    }
}

mod tests;
