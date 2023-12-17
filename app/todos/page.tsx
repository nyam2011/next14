import Form from '@/components/Form';
import prisma from '@/lib/prisma';

const Page = async () => {
  const todos = await prisma.toDo.findMany();

  return (
    <div className="m-8">
      <h1 className='text-xl font-bold'>Todo一覧abc</h1>
      <ul className='mt-8'>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
      <Form />
    </div>
  );

};

export default Page;
