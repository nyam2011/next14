'use server';
import { revalidatePath } from 'next/cache';

export const addTodo = async (data: FormData) => {
  const name = data.get('name') as string;
  await prisma.toDo.create({ data: { name } });
  revalidatePath('/todos');
};

export const deleteToDo = async (id: number) => {
  await prisma.toDo.delete({
    where: {
      id,
    },
  });
  revalidatePath('/todos');
};
