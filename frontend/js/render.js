const machineList = document.querySelector(".machine-list"); 

export function renderMachines(machines) {
    machineList.innerHTML = "";
    machines.forEach(machine => {
        const card = document.createElement("div");
        card.classList.add("machine-card");

        const image = document.createElement("div");
        image.classList.add("machine-image");

        const info = document.createElement("div");
        info.classList.add("machine-info");

        const extra = document.createElement("div");
        extra.classList.add("machine-extra");

        image.innerHTML = `
        <img src="${machine.image_url}" alt="Image of machine" class="machine-image">
        `;

        info.innerHTML = `
        <h3>${machine.title}</h3>

        <span>Manufacturer</span>
        <span>${machine.manufacturer}</span>

        <span>Price</span>
        <span>${machine.price} €</span>

        <span>Year</span>
        <span>${machine.year}</span>

        <span>Location</span>
        <span>${machine.location}</span>

        <span>Working hours</span>
        <span>${machine.working_hours} h</span>

        <span>Power</span>
        <span>${machine.power_kw} kW</span>
        `;

        extra.innerHTML = `
          <div class="match">
            <p><strong><span class="match-score">0</span>%</strong> <span class="decoration">Match</span></p>
          </div>        
        <button class = "detail-button">View Details</button>
        `;

        card.append(image, info, extra);

        machineList.appendChild(card);
    });
};