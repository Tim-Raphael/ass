# ASS - Advanced-Search-System

This is a Rust-based autocomplete and search tool that runs client-side using WebAssembly. It provides functionality for autocomplete and retrieval of content based on search queries.

To see the demo in action, you can visit [the demo page](https://tim-raphael.github.io/ass/demo/). 

## How It Works

Here's a quick rundown of the functionality:

- **Autocomplete**: As you type, ASS provides real-time suggestions based on the content stored in the Trie data structure.
- **Get Content**: The get content functionality efficiently retrieves entries from the hash table, enabling users to quickly find specific items within the dataset.
- **Data Generation**: Generate random datasets for experimentation and testing purposes.

## Dataset Size Recommendation

For optimal performance, aim to maintain datasets between 10,000 and 100,000 items. Larger datasets may result in excessive memory usage due to the client-side nature of the tool.

## Test Coverage

The small test suite covers some scenarios, including insertion, autocomplete functionality, data retrieval, data generation, and search capabilities.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

Feel free to contribute, report issues, or suggest improvements.
