
const newTodo = ( item, dueDate, priority, complete ) => {
  return { 
    item, 
    dueDate, 
    priority, 
    complete 
  }
}

const newProject = (title) => {
  return { title, todos: []}
}
export { newTodo, newProject }