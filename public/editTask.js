const taskIdDOM = document.querySelector(".task-edit-id");
const taskNameDOM = document.querySelector(".task-edit-name");
const taskCompletedDOM = document.querySelector('.task-edit-completed');
const editFormDOM = document.querySelector(".single-task-form");
const formAlertDOM = document.querySelector('.form-alert');

const params = window.location.search;
const id = new URLSearchParams(params).get('id');

///////////////////////////////////////////////////////
// 1つの特定のタスクを取得する
///////////////////////////////////////////////////////
const showTask = async () => {
  try {
    const {data: task} = await axios.get(`/api/v1/tasks/${id}`);
    const { _id, completed, name } = task;
    taskIdDOM.textContent = _id;
    taskNameDOM.value = name;
    if (completed) {
      taskCompletedDOM.checked = true;
    }
  } catch (err) {
    console.log(err);
  }
}

showTask();


///////////////////////////////////////////////////////
// タスクの編集
///////////////////////////////////////////////////////
editFormDOM.addEventListener('submit',async (e) => {
  e.preventDefault();
  try {
    const taskName = taskNameDOM.value;
    const taskCompleted = taskCompletedDOM.checked;
    const  {data: task } = await axios.patch(`/api/v1/tasks/${id}`,{
      name: taskName,
      completed: taskCompleted,
    });
    formAlertDOM.style.display = 'block';
    formAlertDOM.textContent = 'タスクを編集しました。';
    formAlertDOM.classList.add('text-success');
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = 'block';
    formAlertDOM.innerHTML = '無効です。もう一度やり直してください。';
    formAlertDOM.classList.remove('text-success');
  }
  setTimeout(() => {
    formAlertDOM.style.display = 'none';
    formAlertDOM.classList.remove('text-success');
  }, 1000);
});
