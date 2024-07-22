import {Router} from 'express' // responsável pelas rotas do express

// import controllers
import { buscarCliente, cadastrarCliente, deletarCliente, editarCliente, getCliente } from '../controllers/clientesController.js';

const router = Router()

router.get('/', getCliente)
router.post('/criar', cadastrarCliente)
router.get('/:cliente_id', buscarCliente)
router.put('/editar/:cliente_id', editarCliente)
router.delete('/remover/:cliente_id', deletarCliente)

export default router; // exporta o router já que ele possui todas as rotas que colocamos aqui nesse arquivo