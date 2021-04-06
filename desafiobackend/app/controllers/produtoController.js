const db = require('../config/db.config.js');
const Produto = db.Produto;

/**
 * Save a produto object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createProduto = (req, res) => {
    let produto = {};

    try{
        // Building produto object from upoading request's body
        produto.nome = req.body.nome;
        produto.descricao = req.body.descricao;
        produto.preco = req.body.preco;
        
        
    
        // Save to MySQL database
        Produto.create(produto, 
                          {attributes: ['id', 'nome', 'preco',  'descricao']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

/**
 * Retrieve produto information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.produtos = (req, res) => {
    // find all produto information from 
    try{
        Produto.findAll({attributes: ['id', 'nome', 'preco',  'descricao']})
        .then(produtos => {
            res.status(200).json(produtos);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.getProduto = (req, res) => {
    Produto.findByPk(req.params.id, 
                        {attributes: ['id', 'nome', 'preco',  'descricao']})
        .then(produto => {
          res.status(200).json(produto);
        }).catch(error => {
          // log on console
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

/**
 * Updating a produto
 * @param {*} req 
 * @param {*} res 
 */
exports.updateProduto = async (req, res) => {
    try{
        let produto = await Produto.findByPk(req.body.id);
    
        if(!produto){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a produto with id = " + produtoId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                nome: req.body.nome,
                preco: req.body.preco,
                descricao: req.body.descricao,
                
            }
            let result = await Produto.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'nome', 'preco',  'descricao']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Não é possível atualizar  id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json(result);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Não é possível atualizar  id = " + req.params.id,
            error: error.message
        });
    }
}

/**
 *  Delete a produto by ID
 * @param {*} req 
 * @param {*} res 
 */

exports.deleteProduto = async (req, res) => {
    try{
        let produtoId = req.params.id;
        let produto = await Produto.findByPk(produtoId);

        if(!produto){
            res.status(404).json({
                message: "Does Not exist a produto with id = " + produtoId,
                error: "404",
            });
        } else {
            await Produto.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a produto with id = " + req.params.id,
            error: error.message
        });
    }
}