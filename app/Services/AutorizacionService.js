
const AccesoDenegadoException = use('App/Exceptions/AccesoInvalidoException')
const RecursoNoEncontradoException = use('App/Exceptions/RecursoNoEncontradoException')


class AutorizacionService{

    verificarPermiso(recurso, user){
        if(!recurso){
            throw new RecursoNoEncontradoException();
        }
        if(recurso.user_id !== user.id){AutorizacionService
            throw new AccesoDenegadoException();          
        }
    }

}


module.exports = new AutorizacionService();