import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  createdAt: string;
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
    'https://finstackbackend.onrender.com/getAllTask'
  );
  const data = await response.json();
  return data.tasks;
};
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  getTasks(): Task[] {
    return [];
  }
}
