import{
    getMachines, getMachine, getSellers, sendInquiry
}from "./api.js";

const machines = await getMachines({
    category: "Drehmaschine",
    city: "Dortmund"
});
console.log(machines);

const machine = await getMachine({id: 5});
console.log(machine);

const seller = getSellers({
    city: "Essen"
});
console.log(seller);



