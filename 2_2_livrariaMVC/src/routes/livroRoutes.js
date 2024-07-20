import {Router} from 'express' // responsável pelas rotas do express

// import controllers
import { cadastrarLivro, getLivros, buscarLivro, editarLivro, deletarLivro } from '../controllers/livrosController.js';

const router = Router()

router.get('/', getLivros)
router.post('/criar', cadastrarLivro)
router.get('/:id', buscarLivro)
router.put('/editar/:id', editarLivro)
router.delete('/remover/:id', deletarLivro)

export default router; // exporta o router já que ele possui todas as rotas que colocamos aqui nesse arquivo