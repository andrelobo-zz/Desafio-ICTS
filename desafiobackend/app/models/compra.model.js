module.exports = (sequelize, Sequelize) => {
	const Compra = sequelize.define('compra', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  total: {
			type: Sequelize.DOUBLE,
			allowNull: false,
	  },
	  tipo_pagamento: {
		type: Sequelize.STRING
  	},
	  status: {
			type: Sequelize.STRING
	  }
	  
	});
	
	return Compra;
}
