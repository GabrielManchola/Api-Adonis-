'use strict'

const { group } = require('@adonisjs/framework/src/Route/Manager')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})


Route.group(() =>{
 //Rutas de Usuario
  Route.post('usuarios/registro', 'UserController.store')
  Route.post('usuarios/login', 'UserController.login')
    //Rutas de proyecto
  Route.get('proyectos', 'ProyectoController.index').middleware('auth')
  Route.post('proyectos/create', 'ProyectoController.create').middleware('auth')
  Route.delete('Proyectos/:idProyecto', 'ProyectoController.destroy').middleware('auth')
  Route.patch('Proyectos/:idProyecto', 'ProyectoController.update').middleware('auth')
  Route.patch('Proyectos/:idProyecto', 'ProyectoController.update').middleware('auth')
  //Rutas de tareas
  Route.post('Proyectos/:idProyecto/CreateTarea', 'TareaController.create').middleware('auth')
  Route.get('Proyectos/:idProyecto/tareas', 'TareaController.index').middleware('auth')
  Route.patch('tareas/:idTarea', 'TareaController.update').middleware('auth')
  Route.delete('tareas/:idTarea', 'TareaController.destroy').middleware('auth')
}).prefix('api/v1/');/*.middleware('auth')*/

