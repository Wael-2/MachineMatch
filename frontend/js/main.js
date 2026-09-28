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




