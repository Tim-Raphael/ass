use super::*;

#[test]
fn test_new() {
    let items = vec!["Apple".to_string(), "Banana".to_string()];
    let content = vec!["Fruit".to_string(), "Yellow fruit".to_string()];

    let data = Data::new(items.clone(), content.clone());

    assert_eq!(data.items, items);
    assert_eq!(
        data.items_content_map.get("apple"),
        Some(&"Fruit".to_string())
    );
    assert_eq!(
        data.items_content_map.get("banana"),
        Some(&"Yellow fruit".to_string())
    );
}

#[test]
fn test_get_content() {
    let items = vec!["Apple".to_string(), "Banana".to_string()];
    let content = vec!["Fruit".to_string(), "Yellow fruit".to_string()];

    let data = Data::new(items.clone(), content.clone());

    assert_eq!(data.get_content("Apple".to_string()), "Fruit".to_string());
    assert_eq!(
        data.get_content("Banana".to_string()),
        "Yellow fruit".to_string()
    );
    assert_eq!(data.get_content("Orange".to_string()), "".to_string());
}

#[test]
fn test_gen_random() {
    let count = 5;
    let data = Data::gen_random(count);

    assert_eq!(data.items.len() as u32, count);
    for item in &data.items {
        assert!(data
            .items_content_map
            .contains_key(&item.to_ascii_lowercase()));
    }
}

#[test]
fn test_gen_random_content() {
    let content = Data::gen_random_content();

    assert!(content.contains("__"));
}
