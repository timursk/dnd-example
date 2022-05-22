export const tasksFromBack = [
  {id: 'task-1' , title: 'Title', description: 'Description 1'},
  {id: 'task-2' , title: 'Title', description: 'Description 2'},
  {id: 'task-3' , title: 'Title', description: 'Description 3'},
  {id: 'task-4' , title: 'Title', description: 'Description 4'},
];

export const columnsFromBack = [
  {
    id: 'column-1',
    title: 'To do',
    tasks: tasksFromBack,
    // taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
  {
    id: 'column-2',
    title: 'Ready',
    tasks: [
      {id: 'task-5', title: 'Title', description: 'Description 5'},
      {id: 'task-6', title: 'Title', description: 'Description 6'}
    ],
    // taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
  },
  // 'column-1': {}
];