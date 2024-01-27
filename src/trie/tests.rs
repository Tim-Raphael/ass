use super::*;

#[test]
fn test_insert() {
    let word_list: Vec<String> = vec!["hello".to_string(), "world".to_string()];

    let trie = Trie::new(word_list.clone());

    let mut node = &trie.root;
    assert_eq!(node.value.to_string(), "\0");
    assert_eq!(node.children.len(), 2);

    for char in word_list[0].chars() {
        for child in node.children.iter() {
            if child.value == char {
                node = child;
            }
        }
        assert_eq!(node.value, char);
    }
}

#[test]
fn test_autocomplete() {
    let word_list = vec!["Hello".to_string(), "Hey".to_string(), "world".to_string()];

    let trie = Trie::new(word_list);
    assert_eq!(
        trie.autocomplete("w".to_string()),
        vec!["world".to_string()]
    );
    assert_eq!(
        trie.autocomplete("h".to_string()),
        vec!["hello".to_string(), "hey".to_string()]
    );
}
