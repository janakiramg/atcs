const { Aircraft } = require('../config/db');
const { logger } = require('../config/winston');

/**
 * To find all aircrafts
 */
async function findAll() {
  const aircrafts = await Aircraft.findAll({ raw: true });
  logger.info(`Found ${aircrafts.length} aircrafts.`);
  return aircrafts;
}

/**
 * To create a new aircraft
 * @param {*} data
 */
async function create(data) {
  const createdAircraft = Aircraft.create(data, { raw: true });
  logger.info('New aircraft created successfully');
  return createdAircraft;
}

/**
 * To find a aircraft and soft delete it
 */
async function dequeue() {
  // Two satisfy below two requirements added order to query
  // 1. Large AC’s of a given type have removal precedence over Small AC’s of the same type.
  // 2. Earlier enqueued AC’s of a given type and size have precedence over later enqueued AC’s of the same type and size.
  const aircrafts = await Aircraft.findAll({
    order: [
      ['size', 'DESC'],
      ['createdAt', 'ASC']
    ],
    raw: true
  });
  // Emergency aircraft has highest priority.
  let foundAircraftId = filterAircrafts(aircrafts, 'Emergency');
  if (!foundAircraftId) {
    // VIP aircraft has precedence over all other ACs except Emergency.
    foundAircraftId = filterAircrafts(aircrafts, 'VIP');
  }
  if (!foundAircraftId) {
    // Passenger AC’s have removal precedence over Cargo AC’s.
    foundAircraftId = filterAircrafts(aircrafts, 'Passenger');
  }
  if (!foundAircraftId) {
    foundAircraftId = filterAircrafts(aircrafts, 'Cargo');
  }
  const response = await updateAndDestroy(foundAircraftId);
  return response;
}

/**
 * To filter aircrafts from list on given type
 * @param {*} aircrafts
 * @param {*} type
 */
function filterAircrafts(aircrafts, type) {
  let foundAircraftId;
  aircrafts = aircrafts.filter(aircraft => aircraft.type === type);
  if (aircrafts.length > 0) {
    foundAircraftId = aircrafts[0].id;
  }
  return foundAircraftId;
}

/**
 * Update aircraft status and destroy it
 * @param {*} id
 */
async function updateAndDestroy(id) {
  if (id) {
    await Aircraft.update({ status: 'Dequeue' }, { where: { id } });
    await Aircraft.destroy({ where: { id } });
    logger.info(`Aircraft with ${id} deleted successfully.`);
    return 'Aircraft deleted successfully';
  } else {
    logger.info('No aircraft found.');
    return 'No aircraft found';
  }
}

module.exports = {
  findAll,
  create,
  dequeue
};
