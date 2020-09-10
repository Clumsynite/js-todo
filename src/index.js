import { printLayout } from './display-controller'
import { projectTemplate, addNewProject, getProjects } from './CRUD.js'

let storage = window.localStorage.getItem('projects')
if(!storage) window.localStorage.setItem('projects', JSON.stringify(projectTemplate()))

printLayout()