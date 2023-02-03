'use strict'

const Proyecto = use('App/Models/Proyecto');
const Tarea = use('App/Models/Tarea');
const AutorizacionService = use('App/Services/AutorizacionService');


class TareaController {

    async index ({auth, request, params}) {
        const user = await auth.getUser();
        const {idProyecto} = params;
        const proyecto = await Proyecto.find(idProyecto);
        AutorizacionService.verificarPermiso(proyecto, user);
        return await proyecto.Tareas().fetch();
    }

    async create({ auth, request, params}){

        const user = await auth.getUser();
        const {descripcion} = request.all();
        const {idProyecto} = params;
        const proyecto = await Proyecto.find(idProyecto);
        AutorizacionService.verificarPermiso(proyecto, user);
        const tarea = new Tarea();
        tarea.fill({
            descripcion
        });
        await proyecto.Tareas().save(tarea);
        return tarea;
    }

    async update({auth, params, request}){
        
        const user = await auth.getUser();
        const {idTarea} = params;
        const tarea = await Tarea.find(idTarea);
        const proyecto = await tarea.Proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.merge(request.only([
            'descripcion',
            'completada'
        ]))
        await tarea.save();
        return tarea;
    }

    async destroy({auth, params}){

        const user = await auth.getUser();
        const {idTarea} = params;
        const tarea = await Tarea.find(idTarea);
        const proyecto = await tarea.Proyecto().fetch();
        AutorizacionService.verificarPermiso(proyecto, user);
        await tarea.delete();
        return tarea;
    }



}

module.exports = TareaController
