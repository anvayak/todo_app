'use client'

import { useState } from 'react'
import { useTask, TaskType, TaskPriority } from '@/context/TaskContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const TASK_TYPES: TaskType[] = ['Work', 'Personal', 'Shopping', 'Health', 'Other']
const TASK_PRIORITIES: TaskPriority[] = ['High', 'Medium', 'Low']

interface TaskFormProps {
  onClose?: () => void
}

export default function TaskForm({ onClose }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    type: 'Work' as TaskType,
    priority: 'Medium' as TaskPriority,
    duration: '',
    deadline: '',
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { addTask } = useTask()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (!formData.title || !formData.duration || !formData.deadline) {
        setError('All fields are required')
        setIsLoading(false)
        return
      }

      const durationNum = parseFloat(formData.duration)
      if (isNaN(durationNum) || durationNum <= 0) {
        setError('Duration must be a positive number')
        setIsLoading(false)
        return
      }

      addTask({
        title: formData.title,
        type: formData.type,
        priority: formData.priority,
        duration: durationNum,
        deadline: formData.deadline,
      })

      setFormData({
        title: '',
        type: 'Work',
        priority: 'Medium',
        duration: '',
        deadline: '',
      })

      onClose?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <Card className="w-full bg-card border-border">
      <CardHeader>
        <CardTitle className="text-primary">Add New Task</CardTitle>
        <CardDescription>Create a new task to manage your time effectively</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground font-medium">
              Task Title
            </Label>
            <Input
              id="title"
              name="title"
              placeholder="e.g., Complete project proposal"
              value={formData.title}
              onChange={handleChange}
              disabled={isLoading}
              className="bg-secondary border-border focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-foreground font-medium">
                Task Type
              </Label>
              <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as TaskType }))}>
                <SelectTrigger className="bg-secondary border-border focus:ring-accent">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-foreground font-medium">
                Priority
              </Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as TaskPriority }))}>
                <SelectTrigger className="bg-secondary border-border focus:ring-accent">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration" className="text-foreground font-medium">
                Duration (hours)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                placeholder="2.5"
                step="0.5"
                min="0.5"
                value={formData.duration}
                onChange={handleChange}
                disabled={isLoading}
                className="bg-secondary border-border focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deadline" className="text-foreground font-medium">
              Deadline
            </Label>
            <Input
              id="deadline"
              name="deadline"
              type="date"
              value={formData.deadline}
              onChange={handleChange}
              disabled={isLoading}
              className="bg-secondary border-border focus:ring-accent"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-10"
          >
            {isLoading ? 'Adding Task...' : 'Add Task'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
