const { Aircraft } = require('../config/db');
const { map: _map } = require('lodash');

/**
 * To find all aircrafts
 */
async function findAll() {
  const aircrafts = await Aircraft.findAll({ raw: true });
  return aircrafts;
}

/**
 * To create a new aircraft
 * @param {*} data
 */
async function create(data) {
  const createdAircraft = Aircraft.create(data, { raw: true });
  return createdAircraft;
}

async function dequeue() {
  const aircrafts = await Aircraft.findAll({ order: [['createdAt', 'ASC']], raw: true });
  const emergencyAircraft = aircrafts.filter(aircraft => aircraft.type === 'Emergency');
  let foundAircraftId;
  if (emergencyAircraft.length > 0) {
    const largeEmergencyAircraft = emergencyAircraft.filter(aircraft => aircraft.size === 'Large');
    if (largeEmergencyAircraft.length === 0) {
      const smallEmergencyAircraft = emergencyAircraft.filter(aircraft => aircraft.size === 'Small');
      foundAircraftId = smallEmergencyAircraft[0].id;
    } else {
      foundAircraftId = largeEmergencyAircraft[0].id;
    }
  }
  return updateAndDestroy(foundAircraftId);
}

async function updateAndDestroy(id) {
  await Aircraft.update({ status: 'Dequeue' }, { where: { id } });
  await Aircraft.destroy({ where: { id } });
  return 'Aircraft deleted successfully';
}

module.exports = {
  findAll,
  create,
  dequeue
};
