const MAX_ENTRIES_PER_PAGE = 15;

let totalEntries = 0;
let loadedEntries = 0;

const loadMoreButton = document.querySelector("#loadMoreButton");
const loadingContainer = document.querySelector(".loading-container");

// The initial pagination values
const initialLoadMorePaginationValues = {
    ini: 0,
    max: MAX_ENTRIES_PER_PAGE,
    current: 1
}

// Set the number of total entries
const setTotalEntries = (numberOfTotalEntries) => {
    totalEntries = numberOfTotalEntries;
}

// Adds the passed number of new entries to the total loaded entries 
const addToLoadedEntries = (numberOfEntries) => {
    loadedEntries += numberOfEntries;
}

// Disable the load more button
const disableLoadMoreButton = () => {
    loadMoreButton.removeEventListener('click', () => loadMore(pattern), false);
    document.querySelector("#loadMoreContainer").remove();
}

// Show the loading spinner
const showLoadMoreLoading = () => {
    loadMoreButton.classList.add("d-none");
    loadingContainer.classList.remove("d-none");
}

// Hide the loading spinner
const hideLoadMoreLoading = () => {
    loadingContainer.classList.add("d-none");
    console.log(loadedEntries + "/" + totalEntries);
    // If all the entries are loaded, disable the button
    if(loadedEntries >= totalEntries) disableLoadMoreButton();
    else loadMoreButton.classList.remove("d-none");
}

// Set pagination and make the new request
const loadMore = (pattern) => {
    // Only the last one will have less than MAX_ENTRIES_PER_PAGE if it wasn't disabled on previous hideLoadMoreLoading pass
    if(loadedEntries % MAX_ENTRIES_PER_PAGE === 0) {
        pattern.paginations.current++;
        showLoadMoreLoading();
        sendRequest(pattern);
    }
}

// Add the on click event on load more button
const initLoadMoreButton = (pattern) => {
    loadMoreButton.addEventListener('click', () => loadMore(pattern), false);
}