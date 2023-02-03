'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Proyecto extends Model {
    User () {
        return this.belongsTo('App/Models/User')
    }


    Tareas () {
        return this.hasMany('App/Models/Tarea')
    }
}

module.exports = Proyecto
