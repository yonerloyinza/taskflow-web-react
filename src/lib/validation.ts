import { z } from 'zod'
import { TASK_PRIORITIES, TASK_STATUSES } from '@/types'
import type { TaskPriority, TaskStatus } from '@/types'

export const taskStatusSchema = z.enum(TASK_STATUSES as [TaskStatus, ...TaskStatus[]])

export const taskPrioritySchema = z.enum(TASK_PRIORITIES as [TaskPriority, ...TaskPriority[]])

const uuidSchema = z.string().uuid('ID inválido')

const dateTimeSchema = z
  .string()
  .min(1, 'La fecha es obligatoria')
  .refine(
    (val) => {
      const date = new Date(val)
      return !Number.isNaN(date.getTime())
    },
    { message: 'Fecha inválida' },
  )

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres'),
  description: z.string().max(500, 'La descripción no puede exceder 500 caracteres').optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  assignee: z.string().trim().min(1, 'El asignado es obligatorio').max(100, 'Máximo 100 caracteres'),
  dueDate: dateTimeSchema,
})

export const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(100, 'El título no puede exceder 100 caracteres')
    .optional(),
  description: z.string().max(500, 'La descripción no puede exceder 500 caracteres').optional(),
  status: taskStatusSchema.optional(),
  priority: taskPrioritySchema.optional(),
  assignee: z.string().trim().min(1, 'El asignado es obligatorio').max(100, 'Máximo 100 caracteres').optional(),
  dueDate: dateTimeSchema.optional(),
})

export const taskSchema = z.object({
  id: uuidSchema,
  title: z.string().min(3).max(100),
  description: z.string().max(500).nullable().optional(),
  status: taskStatusSchema,
  priority: taskPrioritySchema,
  assignee: z.string().max(100),
  dueDate: dateTimeSchema,
  createdAt: dateTimeSchema,
  updatedAt: dateTimeSchema,
})

export type CreateTaskForm = z.infer<typeof createTaskSchema>
export type UpdateTaskForm = z.infer<typeof updateTaskSchema>
export type TaskForm = z.infer<typeof taskSchema>