'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addTodo = async (data: FormData) => {
  const name = data.get('name') as string;
  await prisma.toDo.create({ data: { name } });
  revalidatePath('/todos');
  redirect('/todos');
};

export const deleteToDo = async (data: FormData) => {
  const id = data.get('id') as string;
  await prisma.toDo.delete({
    where: {
      id: Number(id),
    },
  });
  revalidatePath('/todos');
};
