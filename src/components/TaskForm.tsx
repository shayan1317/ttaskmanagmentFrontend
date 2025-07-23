import { yupResolver } from "@hookform/resolvers/yup";
import { useTasks } from "@hooks/useTasks";
import { useUsers } from "@hooks/useUsers";
import { useQuery } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { toast } from "react-toastify";
import * as yup from "yup";

const MAX_FILE_SIZE_MB = 5;

const statusOptions = [
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "done", label: "Done" },
];

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "At least 3 characters"),
  description: yup.string(),
  priority: yup.string().required("Priority is required"),
  assignee: yup.object().required("Assigneee is required"),
  dueDate: yup
    .date()
    .min(new Date(), "Due date must be in the future")
    .required("Due date is required"),
  status: yup.object().required("Status is required"),
  attachment: yup
    .mixed()
    .test("fileSize", "File is too large", (file: any) =>
      file ? file.size <= MAX_FILE_SIZE_MB * 1024 * 1024 : true
    ),
});

export default function TaskForm() {
  let options = [];
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { createTask } = useTasks();
  const { getAllUsers } = useUsers();
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  // if data is not recived yet
  // show some loader to enhance user experience
  if (isLoading) {
    return <div>loading</div>;
  }
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("priority", data.priority);
    formData.append("assignee_id", data.assignee.value);
    formData.append("status", data.status.value); // ✅ added
    formData.append("due_date", data.dueDate.toISOString());
    if (data.attachment) {
      formData.append("attachment", data.attachment);
    }

    try {
      const res = await createTask(formData);
      reset();
      if (res) toast.success("Task added successfully");
    } catch (error) {
      toast.error("Task could not be added");
    }
  };

  if (users) {
    // need to map data to show in select field
    options = users?.data?.map(
      (item: { full_name: string; email: string; id: string }) => {
        return {
          value: item.id,
          label: item.full_name,
        };
      }
    );

    console.log("options", options);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          {...register("title")}
          className="w-full border px-3 py-2 rounded"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <textarea {...field} className="w-full border px-3 py-2 rounded" />
          )}
        />
      </div>

      <div>
        <label className="block font-medium mb-1">Priority</label>
        <Controller
          control={control}
          name="priority"
          render={({ field }) => (
            <select {...field} className="w-full border px-3 py-2 rounded">
              <option value="">Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          )}
        />
        {errors.priority && (
          <p className="text-red-500 text-sm">{errors.priority.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Assignee</label>
        <Controller
          name="assignee"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder="Select an assignee"
              isClearable
            />
          )}
        />
        {errors.assignee && (
          <p className="text-red-500 text-sm">{errors.assignee.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Status</label>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={statusOptions}
              placeholder="Select status"
              isClearable
            />
          )}
        />
        {errors.status && (
          <p className="text-red-500 text-sm">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <Controller
          control={control}
          name="dueDate"
          render={({ field }) => (
            <DatePicker
              {...field}
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              minDate={new Date()}
              className="w-full border px-3 py-2 rounded"
              placeholderText="Select due date"
            />
          )}
        />
        {errors.dueDate && (
          <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-1">Attachment</label>
        <Controller
          control={control}
          name="attachment"
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              className="block w-full"
              onChange={(e) => field.onChange(e.target.files?.[0])}
            />
          )}
        />
        {errors.attachment && (
          <p className="text-red-500 text-sm">{errors.attachment.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Task
      </button>
    </form>
  );
}
