export async function getMachines() {
   try {
    const response = await fetch("http://localhost/MachineMatch/Backend/api/machines.php");
    const machines = await response.json();
    return machines;
   }catch(error) {
    console.error(error);
   }
};

getMachines();