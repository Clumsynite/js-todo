import { newTodo, newProject } from './objects.js'
import { cancelProjectInput } from './display-controller'

const projectTemplate = () => {
  let today = new Date()
  let temp = [
    {
      title: "Project - 1",
      todos: [
        {
          item: "need more projects over here",
          dueDate: today,
          complete: false,
          priority: 'high'
        }
      ]
    }
  ]
  return temp  
}

const addProjectTitle = () => {
  const title = document.querySelector('#get-project-title').value
  const project = newProject(title) 
  const storage = window.localStorage
  let projects = JSON.parse(storage.getItem('projects'))
  projects.push(project)
  storage.setItem('projects', JSON.stringify(projects))
  getProjects()
  cancelProjectInput()
}

const clearProjectContents = () => {
  const container = document.querySelector('#project-content')
  if(container.hasChildNodes()){
    while(container.hasChildNodes()){
      container.removeChild(container.lastChild)
    }
  }
}

const getProjects = () => {
  clearProjectContents()
  const item = window.localStorage.getItem('projects')
  const projects = JSON.parse(item)
  projects.forEach((project, i) => {
    const title = document.createElement('div')
    title.classList.add('project-title')
    title.setAttribute('data-index', i)
    title.textContent = project.title
    document.querySelector('#project-content').append(title)
    title.addEventListener('click', getTodos)
  })
}

const getTodos = () => {
  const storage = window.localStorage
  const projects = JSON.parse(storage.getItem('projects'))
  const project = event.target.getAttribute('data-index')
  console.log(projects[project].todos)
  
}

export { projectTemplate, addProjectTitle, getProjects }