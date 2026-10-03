//import api.js
import{  
    getMachines, getMachine, getSeller, sendInquiry
}from "./api.js";
const machines = await getMachines();




//import state.js
import{state} from "./state.js";
state.machines = machines;




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

//import search.js and matching.js
import {searchMachines, sortMachines} from "./search.js";
import {calculateMatch} from "./matching.js";

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

    state.matchedMachines = filteredMachines.map(machine => {
        const matchScore = calculateMatch(machine, state.filters);
    
        return{
            ...machine,
            matchScore: matchScore
        };
    });

    const sortedMachines = sortMachines(state.matchedMachines, state.sortBy);

    renderMachines(sortedMachines);

    const resultsCount = document.querySelector(".results-count");
    resultsCount.textContent = sortedMachines.length;
};

updateResults();

const resultsHeader = document.querySelector(".results-header");

const removeAll = document.createElement("button");
removeAll.textContent = "Clear search + filters";
removeAll.classList.add("remove-all");
resultsHeader.appendChild(removeAll);

removeAll.addEventListener("click", () => {

    state.filters = {
        category: "",
        location: "",
        maxPrice: "",
        manufacturer: "",
        maxWorkingHours: "",
        minYear: ""
    };

    state.searchQuery = "";
    state.sortBy = "match_score";

    searchBar.value = "";
    selectCategory.value = "";
    selectCity.value = "";
    maxPrice.value = "";
    selectManufacturer.value = "";
    workingHours.value = "";
    selectYear.value = "";
    selectSort.value = "match_score";

    updateResults();
});

const machineList = document.querySelector(".machine-list");
machineList.addEventListener('click', async (event) => {
    if(!event.target.classList.contains("detail-button")){
        return;
    }
    
    const machineId = event.target.dataset.machineId;
    const result = await getMachine({id: machineId});
    const machine = result[0];

    const sellerResult = await getSeller({ id: machine.seller_id });
    const seller = sellerResult[0];
    
    updateResults();

    const matchedMachine = state.matchedMachines.find(item => String(item.id) === String(machineId));

    machine.matchScore = matchedMachine.matchScore;
    state.selectedMachine = machine;
 
    renderMachineDetails(machine);
    renderSellerDetails(seller);
    showView(detailView);
});

const returnResults = document.querySelector(".return-results");
returnResults.addEventListener("click", () => {
    showView(searchView);
});

function renderMachineDetails(machine) {

    detailView.querySelector(".machine-image-v2").src = machine.image_url;
    detailView.querySelector(".machine-image-v2").alt = machine.title;

    detailView.querySelector(".machine-name").textContent = machine.title;
    detailView.querySelector(".price").textContent = `${machine.price} €`;
    detailView.querySelector(".location").textContent = machine.location;
    detailView.querySelector(".description").textContent = `Description: ${machine.description}`;

    detailView.querySelector(".model").textContent = machine.model;
    detailView.querySelector(".weight").textContent = `${machine.weight_kg} kg`;
    detailView.querySelector(".working-hours").textContent =
        `${machine.working_hours} h`;
    detailView.querySelector(".width").textContent = `${machine.width_mm} mm`;
    detailView.querySelector(".height").textContent = `${machine.height_mm} mm`;
    detailView.querySelector(".power").textContent =
        `${machine.power_kw} kW`;
    detailView.querySelector(".condition").textContent = machine.machine_condition;

    detailView.querySelector(".manufacturer").textContent = machine.manufacturer;

    detailView.querySelector(".category").textContent = machine.category;

    detailView.querySelector(".match-score").textContent = machine.matchScore;
};

function renderSellerDetails(seller) {
    const container = detailView.querySelector(".seller-details");
    container.replaceChildren();

    const company = document.createElement("h3");
    company.textContent = seller.company_name;

    const location = document.createElement("p");
    location.textContent = `${seller.city}, ${seller.country}`;

    const email = document.createElement("a");
    email.href = `mailto:${seller.email}`;
    email.textContent = seller.email;

    const phone = document.createElement("p");
    phone.textContent = seller.phone;

    container.append(company, location, email, phone); 
};











