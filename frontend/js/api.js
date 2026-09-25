export async function getMachines(filters = {}) {
   try {
    const params = new URLSearchParams(filters);
    const url =  "http://localhost/MachineMatch/Backend/api/machines.php?" + params.toString();
    const response = await fetch(url);
    const machines = await response.json();

    return machines;
   }catch(error) {
    console.error(error);
   }
};

export async function getMachine({id}){
   try{
   const params = new URLSearchParams({id});
   const url = "http://localhost/MachineMatch/Backend/api/machines.php?" + params.toString();
   const response = await fetch(url);
   const machine = await response.json();

   return machine;
   }catch(error){
      console.error(error);
   }
};

export async function getSellers(filters = {}){
   try {
      const params = new URLSearchParams(filters);
      const url = "http://localhost/MachineMatch/Backend/api/sellers.php?" + params.toString();
      const response = await fetch(url);
      const sellers = await response.json();

      return sellers;
   }catch(error) {
      console.error(error);
   }
};

export async function sendInquiry(data){
   try {
      const url = "http://localhost/MachineMatch/Backend/api/inquiries.php"
      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json"
         },
         body: JSON.stringify(data)
      });
      const result = await response.json();
      
      return result;
   }catch(error){
      console.error(error);
   }
};


