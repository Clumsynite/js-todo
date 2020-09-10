import { newTodo, newProject } from './objects.js'
import { cancelProjectInput } from './display-controller'

const projectTemplate = () => {
  let today = new Date()
  let temp = [
    {
      title: "Project - 1",
      todos: [
        {
          item: "Need more",
          description: 'Need More content over here',
          dueDate: today,
          complete: false,
          priority: 'high'
        },
        {
          item: "Second Todo",
          description: 'More content right here',
          dueDate: today,
          complete: true,
          priority: 'medium'
        },

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

const clearTodoTable = () => {
  const container = document.querySelector('tbody')
  if(container != null) {
    container.remove()
  }
}

const getTodos = () => {
  clearTodoTable()
  const storage = window.localStorage
  const projects = JSON.parse(storage.getItem('projects'))
  const project = event.target.getAttribute('data-index')
  const selection = projects[project].todos

  const tbody = document.createElement('tbody')
  document.querySelector('#todo-table').append(tbody)

  selection.forEach(project => {
    const itemRow = document.createElement('tr')
    tbody.append(itemRow)

    const titleCol = document.createElement('td')
    const title = document.createTextNode(project.item)
    titleCol.appendChild(title)
    itemRow.append(titleCol)

    const descCol = document.createElement('td')
    const desc = document.createTextNode(project.description)
    descCol.appendChild(desc)
    itemRow.append(descCol)
    
    const dueDateCol = document.createElement('td')
    const date = new Date(project.dueDate)
    const dueDate = document.createTextNode(date.toDateString())
    dueDateCol.appendChild(dueDate)
    itemRow.append(dueDateCol)
    
    const priorityCol = document.createElement('td')
    const priority = document.createTextNode(project.priority)
    priorityCol.appendChild(priority)
    itemRow.append(priorityCol)
    
    const statusCol = document.createElement('td')
    const result = project.complete ? 'Yes' : 'No'
    const status = document.createTextNode(result)
    statusCol.appendChild(status)
    itemRow.append(statusCol)
  })
}

export { projectTemplate, addProjectTitle, getProjects }