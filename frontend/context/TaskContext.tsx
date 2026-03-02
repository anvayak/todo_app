'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

export type TaskType = 'Work' | 'Personal' | 'Shopping' | 'Health' | 'Other'
export type TaskPriority = 'High' | 'Medium' | 'Low'

export interface Task {
  id: string
  title: string
  type: TaskType
  priority: TaskPriority
  duration: number // in hours
  deadline: string // ISO date string
  completed: boolean
  createdAt: string
}

interface TaskContextType {
  tasks: Task[]
  addTask: (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => void
  deleteTask: (taskId: string) => void
  updateTask: (taskId: string, task: Partial<Task>) => void
  toggleTaskComplete: (taskId: string) => void
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const storedTasks = localStorage.getItem(`tasks_${user.id}`)
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      }
    }
  }, [user])

  const saveTasks = (newTasks: Task[]) => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(newTasks))
      setTasks(newTasks)
    }
  }

  const addTask = (task: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date().toISOString(),
    }
    saveTasks([...tasks, newTask])
  }

  const deleteTask = (taskId: string) => {
    saveTasks(tasks.filter((t) => t.id !== taskId))
  }

  const updateTask = (taskId: string, taskData: Partial<Task>) => {
    saveTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, ...taskData } : t))
    )
  }

  const toggleTaskComplete = (taskId: string) => {
    saveTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      )
    )
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        updateTask,
        toggleTaskComplete,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTask() {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error('useTask must be used within TaskProvider')
  }
  return context
}
