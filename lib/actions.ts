'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const addTodo = async (data: FormData) => {
  const name = data.get('name') as string;
  await prisma.toDo.create({ data: { name } });
  revalidatePath('/todos');
  redirect('/todos');
};

export const deleteToDo = async (id: number) => {
  await prisma.toDo.delete({
    where: {
      id,
    },
  });
  revalidatePath('/todos');
};

export const updateToDo = async (id: number, data: FormData) => {
  const name = data.get('name') as string;
  const isCompleted = data.get('isCompleted') as string;
  await prisma.toDo.update({
    where: {
      id,
    },
    data: {
      name,
      isCompleted: isCompleted === 'true' ? true: false,
    },
  });
  revalidatePath('/todos');
  redirect('/todos');
};
