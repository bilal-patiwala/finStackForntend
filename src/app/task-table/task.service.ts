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
  const response = await fetch('http://127.0.0.1:5000/getAllTask');
  const data = await response.json();
  return data.tasks;
};

export const changeStatus = async (task:Task) => {
  const response = await fetch(`http://127.0.0.1:5000/task/${task.id}`,{
    method:"PATCH",
    headers:{
      "Content-Type":"application/json"
    }
  })
  const data = await response.json()
  console.log(data);
  
}
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  getTasks(): Task[] {
    return [];
  }
}
