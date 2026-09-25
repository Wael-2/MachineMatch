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

console.log(state);



