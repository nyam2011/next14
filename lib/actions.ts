'use server';
import { revalidatePath } from 'next/cache';

export const addTodo = async (data: FormData) => {
  const name = data.get('name') as string;
  await prisma.toDo.create({ data: { name } });
  revalidatePath('/todos');
};
