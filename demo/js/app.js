import { Ui } from "./ui.js";
import init, { Ass } from "./ass/ass.js";

class App {
    constructor() {
        this.randomItems = [];
        this.randomContent = [];
        this.ui = new Ui();
        this.ass = Ass;

        this.initialize();
    }

    initialize() {
        this.ui.generateButton.addEventListener("click", () => {
            this.handleGenInput();
        });
        this.ui.countInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter" || event.keyCode === 13) {
                this.handleGenInput();
            }
        });
    }

    handleGenInput() {
        this.ui.genContentSpinnerToggle();
        this.validateGenrationInput(this.ui.countInput.value);
        // needs time to update ui
        setTimeout(() => {
            this.generateRandomData(this.ui.countInput.value);
            this.initializeData();
            this.initializeSearch();
            this.ui.hideGenContainer();
        }, 5);
    }

    validateGenrationInput(value) {
        if (!/^\d+$/.test(value)) {
            this.ui.genContentSpinnerToggle();
            this.ui.reportCountInputValidity();
            throw new Error("Please enter a number!");
        }
    }

    generateRandomData(count) {
        this.ui.updateStats("items", count);
        performance.mark("gen");
        this.randomItems = this.ass.random_items(count);
        this.randomContent = this.ass.random_content(count);
        performance.mark("end-gen");
        this.ui.updateStats(
            "gen",
            performance
                .measure("measure-gen", "gen", "end-gen")
                .duration.toFixed(2)
        );
    }

    initializeData() {
        performance.mark("init");
        this.ass = this.ass.new(this.randomItems, this.randomContent);
        performance.mark("end-init");
        this.ui.updateStats(
            "init",
            performance
                .measure("measure-init", "init", "end-init")
                .duration.toFixed(2)
        );
    }

    initializeSearch() {
        this.ui.searchInput.addEventListener("keyup", (event) => {
            this.handleSearchInput(event);
        });
        this.ui.searchInput.addEventListener("focus", () => {
            this.ui.toggleSearchResults(false);
        });
        this.ui.searchInput.addEventListener("focusout", () => {
            setTimeout(() => {this.ui.toggleSearchResults(true)}, 200);
        });
    }

    handleSearchInput(event) {
        const searchValue = event.target.value;
        if (event.key === "Enter" || event.keyCode === 13) {
            this.selectFirstSuggestion(searchValue);
        } else {
            this.suggestResults(searchValue);
        }
    }

    selectFirstSuggestion(searchValue) {
        if (this.ui.searchResults.childNodes[0]) {
            this.ui.searchResults.childNodes[0].click();
            this.suggestResults(this.ui.searchInput.value);
        } else {
            this.fetchContent(searchValue);
        }   
    }

    suggestResults(searchValue) {
        performance.mark("search");
        const result = this.ass.autocomplete(searchValue);
        performance.mark("end-search");
        this.ui.updateStats(
            "search",
            performance
                .measure("measure-search", "search", "end-search")
                .duration.toFixed(2)
        );
        this.ui.displayAutocompleteResult(result);
        this.handleAutocompleteSelect();
    }

    handleAutocompleteSelect() {
        this.ui.searchResults.childNodes.forEach((child) => {
            child.addEventListener("click", () => {
                this.ui.searchInput.value = child.dataset.value;
                this.ui.searchInput.dispatchEvent(new Event("input", {}));
                this.fetchContent(this.ui.searchInput.value);
            });
        });
    }

    fetchContent(value) {
        performance.mark("fetch");
        const content = this.ass.get_content(value);
        performance.mark("end-fetch");
        this.ui.updateStats(
            "fetch",
            performance
                .measure("measure-fetch", "fetch", "end-fetch")
                .duration.toFixed(2)
        );
        this.ui.displayContent(value, content);
    }
}

init().then(() => new App());
