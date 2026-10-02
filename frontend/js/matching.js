export function calculateMatch(machine, filters){
    let score = 0;
    let totalWeight = 0;

    if(filters.maxPrice){
        const maxPrice = Number(filters.maxPrice);
        const price = Number(machine.price);

        totalWeight += 20;

        const priceRatio = price / maxPrice;

        if(priceRatio <= 0.8){
            score += 20;
        }else if(priceRatio <= 0.9){
            score += 16;
        }else if(priceRatio <= 0.95){
            score += 12;
        }else{
            score += 8;
        }
    }

    if(filters.minYear){
        const minYear = Number(filters.minYear);
        const year = Number(machine.year);

        totalWeight += 20;

        const yearDifference = year - minYear;

        if(yearDifference >= 5){
            score += 20;
        }else if(yearDifference >= 3){
            score += 16;
        }else if(yearDifference >= 1){
            score += 12;
        }else{
            score += 8;
        }
    }

    if(filters.maxWorkingHours){
        const maxWorkingHours = Number(filters.maxWorkingHours);
        const working_hours = Number(machine.working_hours);

        totalWeight += 20;

        const workingHoursRatio = working_hours / maxWorkingHours;

        if(workingHoursRatio <= 0.8){
            score += 20;
        }else if(workingHoursRatio <= 0.9){
            score += 16;
        }else if(workingHoursRatio <= 0.95){
            score += 12;
        }else{
            score += 8;
        }
    }

    if(filters.manufacturer){
        const manufacturer = filters.manufacturer;

        totalWeight += 10;

        if(machine.manufacturer === manufacturer){
            score += 10;
        }
    }

    if(filters.location){
        const location = filters.location;

        totalWeight += 10;

        if(machine.location === location){
            score += 10;
        }
    }

    if(totalWeight === 0){
        return 0;
    }

    return Math.round((score / totalWeight) * 100);
};