import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  date: string;
  entity_name: string;
  task_type: string;
  time_of_task: string;
  contact_person: string;
  note: string;
  status: string;
  phone_number: string;
}

export const getAllTask: any = async () => {
  const response = await fetch(
    'https://finstackbackend.onrender.com/getAllTask',{
      mode: 'cors',
    }
  );
  const data = await response.json();
  return data.tasks;
};

export const changeStatus = async (task: Task) => {
  const response = await fetch(
    `https://finstackbackend.onrender.com/task/${task.id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const data = await response.json();
  console.log(data);
};
export const deleteTask = async (task: Task) => {
  const response = await fetch(
    `https://finstackbackend.onrender.com/task/${task.id}`,
    {
      method: 'DELETE',
    }
  );

  console.log(await response.json());
};
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  getTasks(): Task[] {
    return [];
  }
}
