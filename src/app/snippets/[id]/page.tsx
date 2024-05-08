//the folder [id] is called that because it doesnt make sense to create a folder for every id in the db
// [id] is called a dynamic path

import Link from "next/link";
import { notFound } from "next/navigation"; //it will redirect user to a not found page
import { db } from "@/db";
import { deleteSnippet } from "@/actions/serverActions";

interface SnippetShowPageProps {
  params: {
    id: string
  }
};

export default async function SnippetShowPage(props: SnippetShowPageProps){
  
  const id = parseInt(props.params.id);

  await new Promise((t)=> setTimeout(t, 2000)) // create a small delay of 2 seconds to see the loading page
  const snippet = await db.snippet.findFirst({
    where: { id }
  }); 
  //findFirst finds a specific record in the db
  //need to make id into a Number bc its a string

  if(!snippet){
    return notFound();
  };

  const deleteSnippetAction = deleteSnippet.bind(null, id);

  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <Link href={`/snippets/${snippet.id}/edit`} className="p-2 border rounded">Edit</Link>
          <form action={deleteSnippetAction}> 
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export async function generateStaticParams(){
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet)=> {
    return {
      id: snippet.id.toString() //expects a string must convert to string
    };
  });

} 
//this function will allow caching for this dynamic page
//needs to be this exact name for this function