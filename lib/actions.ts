'use server';
import { revalidatePath } from 'next/cache';

export const addTodo = async (data: FormData) => {
  const name = data.get('name') as string;
  await prisma.toDo.create({ data: { name } });
  revalidatePath('/todos');
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
