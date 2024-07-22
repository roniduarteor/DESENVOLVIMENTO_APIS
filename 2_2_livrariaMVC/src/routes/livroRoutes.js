import {Router} from 'express' // responsável pelas rotas do express

// import controllers
import { cadastrarLivro, getLivros, buscarLivro, editarLivro, deletarLivro } from '../controllers/livrosController.js';

const router = Router()

router.get('/', getLivros)
router.post('/criar', cadastrarLivro)
router.get('/:livro_id', buscarLivro)
router.put('/editar/:livro_id', editarLivro)
router.delete('/remover/:livro_id', deletarLivro)

export default router; // exporta o router já que ele possui todas as rotas que colocamos aqui nesse arquivo