const db = require('../config/db.config.js');
const Compra = db.Compra;

/**
 * Save a compra object to database MySQL/PostgreSQL
 * @param {*} req 
 * @param {*} res 
 */
exports.createCompra = (req, res) => {
    let compra = {};

    try{
        // Building compra object from upoading request's body
        compra.total = req.body.total;
        compra.tipo_pagamento = req.body.tipo_pagamento;
        compra.status = req.body.status;
        
        
    
        // Save to MySQL database
        Compra.create(compra, 
                          {attributes: ['id', 'total', 'tipo_pagamento',  'status']})
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
 * Retrieve compra information from database
 * @param {*} req 
 * @param {*} res 
 */
exports.compras = (req, res) => {
    // find all compra information from 
    try{
        Compra.findAll({attributes: ['id', 'total', 'tipo_pagamento',  'status']})
        .then(compras => {
            res.status(200).json(compras);
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

exports.getCompra = (req, res) => {
    Compra.findByPk(req.params.id, 
                        {attributes: ['id', 'total', 'tipo_pagamento',  'status']})
        .then(compra => {
          res.status(200).json(compra);
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
 * Updating a compra
 * @param {*} req 
 * @param {*} res 
 */
exports.updateCompra = async (req, res) => {
    try{
        let compra = await Compra.findByPk(req.body.id);
    
        if(!compra){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a compra with id = " + compraId,
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
                total: req.body.total,
                tipo_pagamento: req.body.tipo_pagamento,
                status: req.body.status,
                
            }
            let result = await Compra.update(updatedObject,
                              { 
                                returning: true, 
                                where: {id: req.body.id},
                                attributes: ['id', 'total', 'tipo_pagamento',  'status']
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
 *  Delete a compra by ID
 * @param {*} req 
 * @param {*} res 
 */

exports.deleteCompra = async (req, res) => {
    try{
        let compraId = req.params.id;
        let compra = await Compra.findByPk(compraId);

        if(!compra){
            res.status(404).json({
                message: "Does Not exist a compra with id = " + compraId,
                error: "404",
            });
        } else {
            await Compra.destroy();
            res.status(200);
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a compra with id = " + req.params.id,
            error: error.message
        });
    }
}