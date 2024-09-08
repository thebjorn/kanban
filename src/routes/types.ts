interface Task {
    id: number,
    name: string,
    tasks?: Task[],
}

interface Column {
    id: string,
    name: string,
    tasks: Task[],
}

type Board = Column[];