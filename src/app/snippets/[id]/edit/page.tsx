import { notFound } from "next/navigation";
import { db } from "@/db";
import SnippetEditForm from "@/components/SnippetEditForm";

//allowed to pass server actions from server component to client component 
//(the only exception to rule - server actions cant pass event handlers to client components)


interface SnippetEditPageProps{
  params: {
    id: string
  }
};

export default async function SnippetEditPage(props: SnippetEditPageProps){
  const id = parseInt(props.params.id);

  const snippet = await db.snippet.findFirst({
    where: {id},
  });

  if(!snippet){
    return notFound();
  }



  return <div>
    <SnippetEditForm snippet={snippet} />
  </div>
};
//this will still get the id prop even though its the edit page is nested under it.