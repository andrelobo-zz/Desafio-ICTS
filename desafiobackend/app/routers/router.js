let express = require('express');
let router = express.Router();
 
const produtos = require('../controllers/produtoController.js');
const compras = require('../controllers/compraController.js');

router.post('/api/produto', produtos.createProduto);
router.get('/api/produto/:id', produtos.getProduto);
router.get('/api/produtos', produtos.produtos);
router.put('/api/produto', produtos.updateProduto);
router.delete('/api/produto/:id', produtos.deleteProduto);

router.post('/api/compra', compras.createCompra);
router.get('/api/compra/:id', compras.getCompra);
router.get('/api/compras', compras.compras);
router.put('/api/compra', compras.updateCompra);
router.delete('/api/compra/:id', compras.deleteCompra);












module.exports = router;

