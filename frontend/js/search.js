export function searchMachines(machines, searchQuery, filters){
    let results = machines;

    if (searchQuery){
        results = results.filter(machine => machine.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (filters.category){
        results = results.filter(machine => machine.category === filters.category);
    }

    if (filters.location){
        results = results.filter(machine => machine.location === filters.location);
    }

    const maxPrice = Number(filters.maxPrice);
    if (filters.maxPrice !== "" && Number.isFinite(maxPrice)) {
    results = results.filter(machine => Number(machine.price) <= maxPrice);
    }

    if(filters.manufacturer){
        results = results.filter(machine => machine.manufacturer === filters.manufacturer);
    }

    const maxWorkingHours = Number(filters.maxWorkingHours);
    if (filters.maxWorkingHours !== "" && Number.isFinite(maxWorkingHours)) {
    results = results.filter(
        machine => Number(machine.working_hours) <= maxWorkingHours
    );
    }

    const minYear = Number(filters.minYear);
    if (filters.minYear !== "" && Number.isFinite(minYear)) {
    results = results.filter(machine => Number(machine.year) >= minYear);
    }

    return results;
};

export function sortMachines(machines, sortBy) {
    const sorted = [...machines];

    const sorters = {
        price_asc: (a, b) => Number(a.price) - Number(b.price),
        price_desc: (a, b) => Number(b.price) - Number(a.price),
        year_desc: (a, b) => Number(b.year) - Number(a.year),
        year_asc: (a, b) => Number(a.year) - Number(b.year),
        working_hours_asc: (a, b) =>
            Number(a.working_hours) - Number(b.working_hours),
        working_hours_desc: (a, b) =>
            Number(b.working_hours) - Number(a.working_hours),
        match_score: (a, b) => 
            Number(b.matchScore) - Number(a.matchScore)
    };

    if (sorters[sortBy]) {
    return sorted.sort(sorters[sortBy]);
    } else {
    return sorted;
    }
};
