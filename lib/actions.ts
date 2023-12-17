'use server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import prisma from './prisma';

const schema = z.object({
  name: z.string().min(2),
});

export const addTodo = async (prevState: any, data: FormData) => {
  const name = data.get('name') as string;
  const validatedFields = schema.safeParse({
    name,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    await prisma.toDo.create({ data: { name } });
  } catch (e) {
    console.log(e);
    return {
      message: 'Failed to add',
    };
  }
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
