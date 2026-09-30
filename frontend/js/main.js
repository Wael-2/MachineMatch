//import api.js
import{  
    getMachines, getMachine, getSellers, sendInquiry
}from "./api.js";
const machines = await getMachines();

const machine = await getMachine({id: 5});

const sellers = await getSellers();




//import state.js
import{state} from "./state.js";
state.machines = machines;

state.selectedMachine = machine;

state.sellers = sellers;




//import render.js
import {renderMachines} from "./render.js";




//add views and modals
const homeView = document.querySelector("#home-view");
const searchView = document.querySelector("#search-view");
const detailView = document.querySelector("#detail-view");
const compareView = document.querySelector("#compare-view");
function showView(view) {
    homeView.classList.remove("active");
    searchView.classList.remove("active");
    detailView.classList.remove("active");
    compareView.classList.remove("active");

    view.classList.add("active");
};

const aboutModal = document.querySelector("#about-modal");
const inquiryModal = document.querySelector("#inquiry-modal");
function openModal(modal) {
    modal.classList.add("active");
};
function closeModal(modal) {
    modal.classList.remove("active");
};


const findButtons = document.querySelectorAll(".find, .find-v2");
findButtons.forEach(button => {
    button.addEventListener('click', () => {
        showView(searchView);
    });
});


//import search.js
import {searchMachines, sortMachines} from "./search.js";

const returnHome = document.querySelector(".return-home");
returnHome.addEventListener('click', () => {
    showView(homeView);
});

const searchBar = document.querySelector("#searchbar");
const selectCategory = document.querySelector("#category");
const selectCity = document.querySelector("#city");
const maxPrice = document.querySelector("#max-price");
const selectManufacturer = document.querySelector("#manufacturer");
const workingHours = document.querySelector("#working-hours");
const selectYear = document.querySelector("#year");
const selectSort = document.querySelector("#sort-by");
const actionButtons = document.querySelectorAll(".search-button, .filter-button");
actionButtons.forEach(button => {
    button.addEventListener("click", updateResults);
});
selectSort.addEventListener("change", updateResults);

function updateResults() {

    state.filters = {
        category: selectCategory.value,
        location: selectCity.value,
        maxPrice: maxPrice.value,
        manufacturer: selectManufacturer.value,
        maxWorkingHours: workingHours.value,
        minYear: selectYear.value
    };

    state.searchQuery = searchBar.value;

    state.sortBy = selectSort.value;

    const filteredMachines = searchMachines(
    state.machines,
    state.searchQuery,
    state.filters
    );

    const sortedMachines = sortMachines(filteredMachines, state.sortBy);

    renderMachines(sortedMachines);

    const resultsCount = document.querySelector(".results-count");
    resultsCount.textContent = sortedMachines.length;
};

updateResults();






