module.exports = (sequelize, Sequelize) => {
	const Produto = sequelize.define('produto', {	
	  id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
    },
	  nome: {
			type: Sequelize.STRING,
			allowNull: false,
	  },
	  preco: {
		type: Sequelize.DOUBLE
  	},
	  descricao: {
			type: Sequelize.STRING
	  },
	  data_criacao: {
			type: Sequelize.DATE
    },
    data_atualizacao: {
      type: Sequelize.DATE,
      
    }
	});
	
	return Produto;
}
