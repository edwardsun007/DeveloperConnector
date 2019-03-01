var experience = [];

const exp_id = "5c6896db55a0540ce0efad63";
// map will returns new array of _ids remember
const idarr = experience.map(exp => exp._id);
console.log(idarr);

const removeIndex = experience.map(exp => exp._id).indexOf(exp_id);
console.log("something");
console.log(removeIndex);
