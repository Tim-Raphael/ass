#[derive(Default)]
struct TrieNode {
    value: char,
    children: Vec<TrieNode>,
}

#[derive(Default)]
pub struct Trie {
    root: TrieNode,
}

impl Trie {
    pub fn new(word_list: Vec<String>) -> Self {
        let mut new_trie = Trie::default();
        for word in word_list {
            new_trie.insert(&word);
        }
        new_trie
    }

    fn insert(&mut self, word: &str) {
        let mut current_node = &mut self.root;
        for char in word.chars() {
            let new_value = char;
            let index = current_node
                .children
                .iter()
                .position(|child| child.value == new_value);
            match index {
                Some(i) => {
                    current_node = &mut current_node.children[i];
                }
                None => {
                    let new_node = TrieNode {
                        value: new_value,
                        children: Vec::new(),
                    };
                    current_node.children.push(new_node);
                    current_node = current_node.children.last_mut().unwrap();
                }
            }
        }
    }

    pub fn autocomplete(&self, search_word: String) -> Vec<String> {
        match self.search(&search_word.to_ascii_lowercase()) {
            Some(node) => self.collect_all_words(Vec::new(), node, search_word),
            None => Vec::new(),
        }
    }

    fn search(&self, word: &str) -> Option<&TrieNode> {
        let mut current_node = &self.root;
        for char in word.chars() {
            let mut found = false;
            for child in &current_node.children {
                if child.value.to_ascii_lowercase() == char {
                    current_node = child;
                    found = true;
                    break;
                }
            }
            if !found {
                return None;
            }
        }
        Some(current_node)
    }

    fn collect_all_words(
        &self,
        mut word_list: Vec<String>,
        node: &TrieNode,
        search_word: String,
    ) -> Vec<String> {
        for child in &node.children {
            if child.children.is_empty() {
                word_list.push(search_word.clone() + &child.value.to_string());
            } else {
                word_list = self.collect_all_words(
                    word_list,
                    child,
                    search_word.clone() + &child.value.to_string(),
                );
            }
        }
        word_list
    }
}

mod tests;
