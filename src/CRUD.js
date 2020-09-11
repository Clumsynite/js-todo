import { newTodo, newProject } from './objects.js'
import { cancelProjectInput, addTodoBtn, cancelTodoInput } from './display-controller'

const projectTemplate = () => {
  let today = new Date()
  let temp = [
    {
      title: "Project - 1",
      todos: [
        {
          item: "Need more",
          dueDate: today,
          complete: false,
          priority: 'high'
        },
        {
          item: "Second Todo",
          dueDate: today,
          complete: true,
          priority: 'medium'
        },

      ]
    }
  ]
  return temp  
}

const PROJECT = {}

const setIndex = (index) => {
  PROJECT.index = index
}

const getIndex = () => PROJECT.index

const addProjectTitle = () => {
  const title = document.querySelector('#get-project-title')
  if(title.value === ''){
    title.style.setProperty('font-size', '10px')
    title.value = 'Title is Empty'
    setTimeout(() => {
      title.style.setProperty('font-size', '16px')
      title.value = ''
    }, 1000)
  }else {
    const project = newProject(title.value) 
    const storage = window.localStorage
    let projects = JSON.parse(storage.getItem('projects'))
    projects.push(project)
    storage.setItem('projects', JSON.stringify(projects))
    getProjects()
    cancelProjectInput()
  }
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
    title.addEventListener('click', projectClick)
  })
}

const clearTodoTable = () => {
  const container = document.querySelector('tbody')
  if(container != null) {
    container.remove()
  }
}

const projectClick = (e) => {
  setIndex(e.target.getAttribute('data-index'))
  getTodos()
}

const getTodos = () => {
  clearTodoTable()
  const storage = window.localStorage
  const projects = JSON.parse(storage.getItem('projects'))
  const project = getIndex()
  const selection = projects[project].todos

  renderTodos(selection)
  
  addTodoBtn()
  document.querySelector('#add-todo-btn').style.display = 'block'
  if(document.querySelector('#todo-cancel-btn') !== null){
    document.querySelector('#todo-cancel-btn').click()
  }
}

const renderTodos = (array) => {
  const tbody = document.createElement('tbody')
  document.querySelector('#todo-table').append(tbody)

  array.forEach(project => {
    const itemRow = document.createElement('tr')
    tbody.append(itemRow)

    const titleCol = document.createElement('td')
    const title = document.createTextNode(project.item)
    titleCol.appendChild(title)
    itemRow.append(titleCol)

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

const addNewTodo = () => {
  const index = getIndex()
  const titleInput = document.querySelector('#todo-title-input')
  let title = titleInput.value
  const dateInput = document.querySelector('#todo-date-input')
  const dateValue = new Date(dateInput.value)
  let date = dateValue.toDateString()
  const priorityInput = document.querySelector('#todo-priority-input')
  let priority = priorityInput.value
  const statusInput = document.querySelector('#todo-status-input')
  let status = statusInput.checked
  
  if(titleInput.value === ''){
    titleInput.style.setProperty('font-size', '10px')
    titleInput.value = 'Title is Empty'
    setTimeout(() => {
      titleInput.style.setProperty('font-size', '14px')
      titleInput.value = ''
    }, 1000)
  }else if(date === 'Invalid Date'){
    const today = new Date()
    date = today.toDateString()
  }

  const todo = newTodo(title, date, priority, status) 
  const storage = window.localStorage
  let projects = JSON.parse(storage.getItem('projects'))
  let oldTodo = projects[index].todos
  oldTodo.push(todo)
  storage.setItem('projects', JSON.stringify(projects))
  cancelTodoInput()
  getTodos()
}

export { projectTemplate, addProjectTitle, getProjects, addNewTodo }