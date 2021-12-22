import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);


  function handleAddTask(newTaskTitle: string) {
    //TODO - add new task
    const task = { // OBJETO
      id: new Date().getTime(), // no TYPESCRIPT sempre é usado id String para a key dos elementos
      title: newTaskTitle,
      done: false
    }
    console.log(task.title)

    newTaskTitle = task.title;

    const updatedTitles = tasks.map(task => ({ ...task }))

    const foundTitle = updatedTitles.find(item => item.title === newTaskTitle)

    if (foundTitle) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      )
      return
    } else {
      setTasks(oldState => [...oldState, task]);
    }

  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === id);

    if (!foundItem)
      return

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);

  }

  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover item",
      "Tem certeza que deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () =>
            //TODO - remove task from state
            setTasks(oldState => oldState.filter(
              tasks => tasks.id !== id // Recuperar apenas as tasks que forem diferentes do parâmetro informado
            )),
        },
        {
          text: "Não",
          style: "cancel"
        }
      ],
    )
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {

    const updatedTasks = tasks.map(task => ({ ...task }))

    const foundItem = updatedTasks.find(item => item.id === taskId);

    if (!foundItem)
      return

    foundItem.title = taskNewTitle
    setTasks(updatedTasks);

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})