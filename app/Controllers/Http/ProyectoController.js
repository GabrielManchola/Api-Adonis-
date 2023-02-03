'use strict'

const Proyecto = use('App/Models/Proyecto');
const AutorizacionService = use('App/Services/AutorizacionService');

class ProyectoController {

    async index ({auth}) {
        const user = await auth.getUser();
        return await user.proyectos().fetch(); 

    }

    async create({auth, request}){
        const user = await auth.getUser();
        const {nombre} = request.all();
        const project = new Proyecto();
        project.fill({
            nombre
        });
        await user.proyectos().save(project);
        return project;

    }

    async destroy({auth, params}){

        const user = await auth.getUser();
        const {idProyecto} = params;
        const proyect = await Proyecto.find(idProyecto);
        AutorizacionService.verificarPermiso(proyect, user);
        await proyect.delete();
        return proyect;

    }

    async update({ auth, params, request}){
        const user = await auth.getUser();
        const { idProyecto } = params; 
        const project = await Proyecto.find(idProyecto)
        AutorizacionService.verificarPermiso(project, user);
        project.merge(request.only('nombre'));
        await project.save();
        return project;
    }


}

module.exports = ProyectoController
