module.exports = (sequelize, type) => {
  return sequelize.define(
    'aircraft',
    {
      type: {
        type: type.ENUM,
        allowNull: false,
        values: ['Emergency', 'VIP', 'Passenger', 'Cargo']
      },
      size: {
        type: type.ENUM,
        allowNull: false,
        values: ['Small', 'Large']
      },
      status: {
        type: type.ENUM,
        allowNull: false,
        values: ['Enqueue', 'Dequeue'],
        defaultValue: 'Enqueue'
      }
    },
    {
      paranoid: true
    }
  );
};
