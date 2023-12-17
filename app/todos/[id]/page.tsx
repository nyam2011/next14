import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const todo = await prisma.toDo.findUnique({
    where: {
      id,
    },
  });
  return (
    <div className="m-8">
      <Link href="/todos">戻る</Link>
      <h1 className="text-xl font-bold">ToDo詳細</h1>
      <div>ID: {todo?.id}</div>
      <div>名前: {todo?.name}</div>
      <div>
        完了: {todo?.isCompleted ? <span>完了</span> : <span>未完了</span>}
      </div>
    </div>
  );
}