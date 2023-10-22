class Task {
    constructor(title, description) {
      this.title = title;
      this.description = description;
      this.completed = false;
    }
  
    static createTask(title, description) {
      return new Task(title, description);
    }
  
    static listTasks(tasks) {
      return tasks;
    }
  
    updateTask(title, description) {
      this.title = title;
      this.description = description;
    }
  
    markCompleted() {
      this.completed = true;
    }
  }
  
  module.exports = Task;