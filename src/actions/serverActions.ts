'use server'; // once its at top of the file all functions in this file will be server actions

import { revalidatePath } from "next/cache"; //stop caching on demand good to have some caching enabled makes it faster
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSnippet(formState: {message: string}, formData: FormData) {

  try {
    //check user entered valid input
    const title = formData.get('title'); //get them from 'name' property in <input /> and <textarea /> in the form 
    const code = formData.get('code');

    if (typeof title !== 'string' || title.length < 3){
      return {
        message: 'Title must be longer'
      };
    };

    if (typeof code !== 'string' || code.length < 3){
      return {
        message: 'Code must be longer'
      }
    };

    //create a new record in the db
    await db.snippet.create({
      data: {
        title,
        code
      }
    });

  } catch (err: unknown) {
    if(err instanceof Error){
      return {
        message: err.message
      };
    } else {
      return {
        message: 'Something went wrong...'
      };
    }; 
  };

  revalidatePath('/'); 

  //redirect back to home page
  //dont want to put redirect statements in a try catch
  redirect('/');

};

export async function editSnippet(id: number, code: string){
  await db.snippet.update({
    where: { id },
    data: { code }
  });

  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });

  revalidatePath('/'); //definately want to use this when deleting
  redirect('/')
};