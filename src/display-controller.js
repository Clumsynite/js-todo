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
}

const projectContents = () => {
  const projects = ['Project - 1', 'Project - 2', 'Project - 3', 'Project - 4', 'Project - 5', 'Project - 6', 'Project - 7', 'Project - 8']
  const div = document.createElement('div')
  div.id = 'project-content'
  document.querySelector('#project-div').append(div)
  projects.forEach(project => {
    const temp = document.createElement('div')
    temp.classList.add('project-title')
    temp.textContent = project
    document.querySelector('#project-content').append(temp)
  })
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
  const input = document.createElement('input')
  input.id = 'get-project-title'
  input.classList = 'project-input'
  input.type = 'text'
  const button = document.createElement('button')
  button.id = 'add-project-title'
  button.textContent = '+'
  document.querySelector('#project-div').append(div)
  document.querySelector('#input-div').append(input)
  document.querySelector('#input-div').append(button)
}

const printLayout = () => {
  titleBar("Clumsyknight's TODO List")
  container()

}

export { printLayout }