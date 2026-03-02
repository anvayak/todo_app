'use client'

import { useTask, Task } from '@/context/TaskContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import { CheckCircle2, Circle, Trash2, Clock, Calendar } from 'lucide-react'

const TASK_TYPE_COLORS: Record<string, string> = {
  Work: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  Personal: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  Shopping: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  Health: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Other: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
}

const TASK_PRIORITY_COLORS: Record<string, string> = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Low: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
}

export default function TaskList() {
  const { tasks, deleteTask, toggleTaskComplete } = useTask()

  const completedTasks = tasks.filter((t) => t.completed)
  const pendingTasks = tasks.filter((t) => !t.completed)

  const TaskItem = ({ task }: { task: Task }) => {
    const isOverdue = new Date(task.deadline) < new Date() && !task.completed
    const isToday = format(new Date(task.deadline), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    const isSoon =
      !isOverdue &&
      new Date(task.deadline) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) &&
      !task.completed

    return (
      <div
        className={`p-4 rounded-lg border transition-all ${
          task.completed
            ? 'bg-secondary/50 border-border opacity-75'
            : 'bg-card border-border hover:border-accent/50'
        }`}
      >
        <div className="flex items-start gap-3">
          <button
            onClick={() => toggleTaskComplete(task.id)}
            className="mt-1 flex-shrink-0 text-accent hover:opacity-75 transition-opacity"
            aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {task.completed ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-sm md:text-base break-words ${
                task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
              }`}
            >
              {task.title}
            </h3>

            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs md:text-sm">
              <span className={`px-2 py-1 rounded-full ${TASK_TYPE_COLORS[task.type]}`}>
                {task.type}
              </span>

              <span className={`px-2 py-1 rounded-full font-medium ${TASK_PRIORITY_COLORS[task.priority]}`}>
                {task.priority}
              </span>

              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="w-4 h-4" />
                {task.duration}h
              </span>

              <span
                className={`flex items-center gap-1 ${
                  isOverdue
                    ? 'text-red-600 dark:text-red-400 font-medium'
                    : isToday || isSoon
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-muted-foreground'
                }`}
              >
                <Calendar className="w-4 h-4" />
                {format(new Date(task.deadline), 'MMM dd')}
                {isOverdue && <span className="ml-1">(Overdue)</span>}
              </span>
            </div>
          </div>

          <button
            onClick={() => deleteTask(task.id)}
            className="flex-shrink-0 p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {pendingTasks.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-primary">Active Tasks</CardTitle>
            <CardDescription>{pendingTasks.length} tasks pending</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </CardContent>
        </Card>
      )}

      {completedTasks.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-primary">Completed Tasks</CardTitle>
            <CardDescription>{completedTasks.length} tasks completed</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </CardContent>
        </Card>
      )}

      {tasks.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-2">No tasks yet</p>
            <p className="text-sm text-muted-foreground">
              Create your first task to get started!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
