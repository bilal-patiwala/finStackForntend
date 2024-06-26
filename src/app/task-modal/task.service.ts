interface Task {
  date: string;
  entity_name: string;
  task_type: string;
  time_of_task: string;
  contact_person: string;
  note: string;
  status: string;
  phone_number: string;
}
function convertTo12HourFormat(time: string): string {
  const [hour, minute] = time.split(':');
  const hours = +hour;
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minute} ${period}`;
}
export const createNewTask = async (task: Task) => {
  const response = await fetch('https://finstackbackend.onrender.com/newTask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...task,
      time_of_task: convertTo12HourFormat(task.time_of_task),
    }),
  });

  const data = await response.json();

  console.log(data);
  // window.location.reload();
};
