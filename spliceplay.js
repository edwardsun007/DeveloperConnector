var experience = [
  {
    current: false,
    _id: "5c68973555a0540ce0efad64",
    title: "SDET2",
    company: "Blackfire",
    location: "San Francisco, California",
    from: "2015-12-01T00:00:00.000Z",
    to: "2016-10-10T00:00:00.000Z",
    description: "Automation Real Boring"
  },
  {
    current: true,
    _id: "5c6896db55a0540ce0efad63",
    title: "SDET",
    company: "Leica",
    location: "San Ramon, California",
    from: "2016-10-01T00:00:00.000Z",
    description: "Automation Engineering Boring"
  }
];

const exp_id = "5c6896db55a0540ce0efad63";
// map will returns new array of _ids remember
const idarr = experience.map(exp => exp._id);
console.log(idarr);

const removeIndex = experience.map(exp => exp._id).indexOf(exp_id);
console.log("something");
console.log(removeIndex);
