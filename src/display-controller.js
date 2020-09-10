import { addProjectTitle, getProjects } from './CRUD.js'

const titleBar = (title) => {
  const heading = document.createElement('div')
  heading.textContent = title
  heading.id = 'heading'
  document.querySelector('#content').append(heading)
}

const divHeading = (title, appendTo) => {
  const div = document.createElement('div')
  div.className = 'div-heading'
  div.textContent = title
  document.querySelector(appendTo).append(div)
}

const divTemplate = (id, appendTo, title) => {
  const div = document.createElement('div')
  div.id = id
  div.className = 'div-style'
  document.querySelector(`#${appendTo}`).append(div)
  divHeading(title, `#${id}`)
}

const container = () => {
  const div = document.createElement('div')
  div.id = 'container'
  document.querySelector('#content').append(div)
  divTemplate('project-div', 'container', 'Projects')
  projectContents()
  newProjectButton()
  divTemplate('todo-div', 'container', 'TODOs')
  todoContentTable()
}

const projectContents = () => {
  const div = document.createElement('div')
  div.id = 'project-content'
  document.querySelector('#project-div').append(div)
  getProjects()
}

const newProjectButton = () => {
  const button = document.createElement('button')
  button.id = 'add-project'
  button.className = 'add-button'
  button.textContent = 'Add new Project'
  document.querySelector('#project-div').append(button)
  button.addEventListener('click', addProject)
}

const addProject = () => {
  document.querySelector('#add-project').remove()
  const div = document.createElement('div')
  div.id = 'input-div'
  document.querySelector('#project-div').append(div)

  const input = document.createElement('input')
  input.id = 'get-project-title'
  input.classList = 'project-input'
  input.type = 'text'
  document.querySelector('#input-div').append(input)

  const button = document.createElement('button')
  button.id = 'add-project-title'
  button.className = 'project-button'
  button.textContent = '+'
  document.querySelector('#input-div').append(button)

  const cancel = document.createElement('button')
  cancel.id = 'cancel-title-input'
  cancel.className = 'project-button'
  cancel.textContent = 'X'
  document.querySelector('#input-div').append(cancel)

  button.addEventListener('click', addProjectTitle)
  cancel.addEventListener('click', cancelProjectInput)
}

const cancelProjectInput = () => {
  document.querySelector('#input-div').remove()
  newProjectButton()
}

const todoContentTable = () => {
  const div = document.createElement('div')
  div.id = 'todo-content'
  document.querySelector('#todo-div').append(div)
  todoTable()
}

const todoTable = () => {
  const table = document.createElement('table')
  table.id = 'todo-table'
  document.querySelector('#todo-div').append(table)

  const thead = document.createElement('thead')
  table.append(thead)

  const headingRow = document.createElement('tr')
  headingRow.id = 'heading-row'
  thead.append(headingRow)

  const titleCol = document.createElement('th')
  const title = document.createTextNode('Title')
  titleCol.appendChild(title)
  headingRow.append(titleCol)

  const descCol = document.createElement('th')
  const desc = document.createTextNode('Description')
  descCol.appendChild(desc)
  headingRow.append(descCol)
  
  const dueDateCol = document.createElement('th')
  const dueDate = document.createTextNode('Due Date')
  dueDateCol.appendChild(dueDate)
  headingRow.append(dueDateCol)
  
  const priorityCol = document.createElement('th')
  const priority = document.createTextNode('Priority')
  priorityCol.appendChild(priority)
  headingRow.append(priorityCol)
  
  const statusCol = document.createElement('th')
  const status = document.createTextNode('Complete?')
  statusCol.appendChild(status)
  headingRow.append(statusCol)
}

const addTodo = () => {
  
}

const printLayout = () => {
  titleBar("Clumsyknight's TODO List")
  container()
}

export { printLayout, cancelProjectInput }