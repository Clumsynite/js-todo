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
  document.querySelector(`#${appendTo}`).append(div)
  divHeading(title, `#${id}`)
}

const container = () => {
  const div = document.createElement('div')
  div.id = 'container'
  document.querySelector('#content').append(div)
  divTemplate('project-div', 'container', 'Projects')
  divTemplate('todo-div', 'container', 'TODOs')
}

const printLayout = () => {
  titleBar("Clumsyknight's TODO List")
  container()
}

export { printLayout }