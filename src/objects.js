
const newTodo = ( title, description, dueDate, priority, status=false ) => {
  return { title, description, dueDate, priority, status }
}

const newProject = (title) => {
  return { title, todos: []}
}
export { newTodo, newProject }