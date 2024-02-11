extern crate wasm_bindgen;

mod trie;
mod data;

use trie::Trie;
use data::Data;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Ass {
    search_tree: Trie,
    data_set: Data
}

#[wasm_bindgen]
impl Ass {
    pub fn new(word_list: Vec<String>, content: Vec<String>) -> Self {
        Ass {
            search_tree: Trie::new(word_list.clone()),
            data_set: Data::new(word_list, content)
        }
    }

    pub fn new_random(count: u32) -> Self {
        let data_set = Data::gen_random(count);
        let search_tree = Trie::new(data_set.items.clone());
        Ass {
            search_tree: search_tree,
            data_set: data_set,
        }
    }
     
    pub fn random_items(count: u32) -> Vec<String> {
        let mut item_list = Vec::new();
        for _i in 0..count {
            item_list.push(Data::gen_random_item());
        }
        item_list
    }

    pub fn random_content(count: u32) -> Vec<String> {
        let mut content_list = Vec::new();
        for _i in 0..count {
            content_list.push(Data::gen_random_content());
        }
        content_list
    }
    
    pub fn autocomplete(&self, prefix: String) -> Vec<String> {
        Trie::autocomplete(&self.search_tree, prefix)
    }

    pub fn get_content(&self, item: String) -> String {
        self.data_set.get_content(item)
    }
}