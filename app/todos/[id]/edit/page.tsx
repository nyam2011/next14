import { updateToDo } from "@/lib/actions";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string }}) {
  const id = Number(params.id);
  const updateTodoWithId = updateToDo.bind(null, id);
  const todo = await prisma.toDo.findUnique({
    where: {
      id,
    },
  });
  return (
    <div className="m-8">
      <Link href="/todos">戻る</Link>
      <h1 className="text-xl font-bold">ToDo更新</h1>
      <form action={updateTodoWithId} className="mt-4">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            className="border mx-2 p-1"
            defaultValue={todo?.name}
          />
        </div>
        <div>
          <input
            name="isCompleted"
            type="radio"
            value="true"
            defaultChecked={todo?.isCompleted === true}
          />
          <label htmlFor="isCompleted">完了</label>
        </div>
        <div>
          <input
            name="isCompleted"
            type="radio"
            value="false"
            defaultChecked={todo?.isCompleted === false}
          />
          <label htmlFor="isCompleted">未完了</label>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 px-2 py-1 rounded-lg text-sm text-white"
        >
          Update ToDo
        </button>
      </form>
    </div>
  );
}
