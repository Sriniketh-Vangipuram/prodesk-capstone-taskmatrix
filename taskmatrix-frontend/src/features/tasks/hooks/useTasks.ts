import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
  type CreateTaskData,
  type UpdateTaskData,
} from "../api/task.api";
import type { Task } from "../api/task.api";


const TASKS_QUERY_KEY = ["tasks"];

export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: getTasks,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTaskData) =>
      createTask(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      taskId,
      data,
    }: {
      taskId: string;
      data: UpdateTaskData;
    }) => updateTask(taskId, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,

    onMutate:async(taskId)=>{
        //1. Cancel any currently running tasks query
        await queryClient.cancelQueries({
            queryKey:TASKS_QUERY_KEY,
        });

        // 2. Snapshot current tasks
        const previousTasks=queryClient.getQueryData<Task[]>(
            TASKS_QUERY_KEY,
        );

        queryClient.setQueryData<Task[]>(
            TASKS_QUERY_KEY,
            (currentTasks=[])=>
                currentTasks.filter(
                    (task)=>task._id !==taskId
                )
        );

        //4. Return snapshot for rollback
        return {
            previousTasks,
        }
    },

        onError:(_error,_taskId,context)=>{
            //5. Restore the task if API request fails
            if(context?.previousTasks){
                queryClient.setQueryData(
                    TASKS_QUERY_KEY,
                    context.previousTasks
                )
            }
        },

    onSuccess: () => {
        //6. Synchronize with server after success/failure
      queryClient.invalidateQueries({
        queryKey: TASKS_QUERY_KEY,
      });
    },
  });
}