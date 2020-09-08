const titleBar = (title) => {
  const heading = document.createElement('div')
  heading.textContent = title
  heading.id = 'heading'
  document.querySelector('#content').append(heading)
}

const printLayout = () => {
  titleBar("Clumsyknight's TODO List")
}

export { printLayout }