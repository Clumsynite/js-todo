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
    const div = document.createElement('div')
    div.className = 'title-div'
    document.querySelector('#project-content').append(div)
    const title = document.createElement('div')
    title.classList.add('project-title')
    title.setAttribute('data-index', i)
    title.textContent = project.title
    div.append(title)
    title.addEventListener('click', projectClick)
    const button = document.createElement('button')
    button.className = 'delete-btn'
    button.textContent = 'X'
    button.setAttribute('data-index', i)
    div.append(button)
    button.addEventListener('click', deleteProject)
  })
}

const deleteProject = (e) => {
  const answer = confirm('Are you sure you want to delete this Project\nThis process can\'t be reversed')
  const index = e.target.getAttribute('data-index')

  const storage = window.localStorage
  let projects = JSON.parse(storage.getItem('projects'))
  answer ? projects.splice(index, 1) : projects
  storage.setItem('projects', JSON.stringify(projects))
  getProjects()
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

  array.forEach((project, i) => {
    const itemRow = document.createElement('tr')
    itemRow.className = 'item-row'
    tbody.append(itemRow)

    const titleCol = document.createElement('td')
    const title = document.createTextNode(project.item)
    titleCol.className = 'title-cell'
    titleCol.setAttribute('data-index', i)
    titleCol.title = 'Click Here to delete TODO'
    titleCol.appendChild(title)
    itemRow.append(titleCol)
    titleCol.addEventListener('click', deleteTodo)

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
    if(project.complete) {
      itemRow.style.setProperty('text-decoration', 'line-through red')
    }
    statusCol.className = 'status-cell'
    statusCol.setAttribute('data-index', i)
    statusCol.title = 'Click Here to Alter Option'
    statusCol.appendChild(status)
    itemRow.append(statusCol)
    statusCol.addEventListener('click', markUnmark)
  })
}

const markUnmark = (e) => {
  const cellIndex = e.target.getAttribute('data-index')
  const index = getIndex()
  const storage = window.localStorage
  const projects = JSON.parse(storage.getItem('projects'))
  const todo = projects[index].todos
  let row = todo[cellIndex]
  let state = row.complete
  state = state ? row.complete = false : row.complete = true
  storage.setItem('projects', JSON.stringify(projects))
  getTodos()
}

const deleteTodo = (e) => {
  const cellIndex = e.target.getAttribute('data-index')
  const answer = confirm('Are you sure you want to delete this TODO\nThis process can\'t be reversed')
  const index = getIndex()

  const storage = window.localStorage
  const projects = JSON.parse(storage.getItem('projects'))
  let oldTodo = projects[index].todos
  answer ? oldTodo.splice(cellIndex, 1) : oldTodo
  storage.setItem('projects', JSON.stringify(projects))
  getTodos()
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