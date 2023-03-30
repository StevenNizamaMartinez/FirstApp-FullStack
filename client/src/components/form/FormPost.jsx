import { useForm } from "react-hook-form"
import { usePost } from "../../context/Posts.context"

function FormPost() {
  const { createPostMutation } = usePost()
  const { register, handleSubmit, formState: { errors }, reset} = useForm()

  const onSubmit = (data) => {
    console.log(data)
    createPostMutation.mutate(data)
    reset()
  }

  return (
    <form className="form--container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form--item">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" {...register("title", { required: true })} />
        {errors.title && <span className="form--error">Title is required</span>}
      </div>
      <button>Save</button>
    </form>
  )
}

export default FormPost