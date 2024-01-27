export class Ui {
    constructor() {
        // should just use sveltekit :(
        this.main = document.querySelector("main");
        this.headline = this.main.querySelector("#headline");
        this.genContainer = this.main.querySelector("#gen");
        this.countInput = this.genContainer.querySelector("#count-input");
        this.generateButton =
            this.genContainer.querySelector("#generate-button");
        this.contentContainer = this.main.querySelector("#content");
        this.description = this.contentContainer.querySelector("#description");
        this.image = this.contentContainer.querySelector("#image");
        this.searchInput = document.getElementById("search-input");
        this.searchResults = document.getElementById("results");
        this.genSpeed = document.getElementById("gen-speed");
        this.initSpeed = document.getElementById("init-speed");
        this.searchSpeed = document.getElementById("search-speed");
        this.fetchSpeed = document.getElementById("fetch-speed");
        this.itemCount = document.getElementById("item-count");
    }

    reportCountInputValidity() {
        this.countInput.value = "";
        this.countInput.setCustomValidity("Please enter a number!");
        this.countInput.reportValidity();
    }

    hideGenContainer() {
        this.headline.textContent = "Success, now try searching for stuff!";
        this.genContainer.classList.add("hide");
        this.searchInput.removeAttribute("disabled");
        this.searchInput.focus();
    }

    genContentSpinnerToggle() {
        if (!this.generateButton.classList.contains("secondary")) {
            this.generateButton.setAttribute("aria-busy", true);
            this.generateButton.classList.add("secondary");
            this.generateButton.textContent = "generating...";
        } else {
            this.generateButton.setAttribute("aria-busy", false);
            this.generateButton.classList.remove("secondary");
            this.generateButton.textContent = "generate";
        }
    }

    displayContent(headline, content) {
        if (!content) {
            this.headline.textContent = "No Item found!";
            this.contentContainer.classList.add("hide");
            return;
        }
        this.contentContainer.classList.remove("hide");
        const [description, attributes, image] = content.split("__");
        this.headline.textContent = headline;
        this.description.textContent = description;
        this.image.src = image;
        const attributesList = document.getElementById("attributes");
        attributesList.innerHTML = "";
        attributes.split(",").forEach((attribute) => {
            const attributeElement = document.createElement("li");
            attributeElement.textContent = attribute.trim();
            attributesList.appendChild(attributeElement);
        });
        this.main.classList.add("show");
    }

    updateStats(stat = "items", value = 0) {
        switch (stat) {
            case "items":
                this.itemCount.textContent = value;
                break;
            case "gen":
                this.genSpeed.textContent = value;
                break;
            case "init":
                this.initSpeed.textContent = value;
                break;
            case "search":
                this.searchSpeed.textContent = value;
                break;
            case "fetch":
                this.fetchSpeed.textContent = value;
                break;
        }
    }

    toggleSearchResults(bool) {
        this.searchResults.classList.toggle("hide", bool);
    }

    displayAutocompleteResult(result) {
        this.searchResults.innerHTML = "";
        this.shuffleArray(result)
            .slice(0, 10)
            .forEach((value) => {
                const autocompleteElement =
                    this.createAutocompleteElement(value);
                this.searchResults.appendChild(autocompleteElement);
            });
    }

    createAutocompleteElement(value) {
        const autocompleteElement = document.createElement("div");
        autocompleteElement.textContent = value;
        autocompleteElement.dataset.value = value;
        return autocompleteElement;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
