//all components in nexjs are server components by default. 
//Its recommended to use server components as much as possible 
// in server components you cant use hooks and event listensers 
//you can use async/await in a server component

//client components are regular components in regular react with hooks and event listeners
// in nextjs you will only use client components if you need to use hooks and/or event listeners
//If you want to create a client component you will need to write this at the top of the file: 'use client'

import Link from "next/link";
import { db } from "@/db";

// export const dynamic = 'force-dynamic'; //this would disable caching entirely on this page
//to make this route or page dynamic instead of stactic 
//next makes this page static by default when its in production mode
//you can see which files are dynamic or static after running build

export default async function Home() {

  const snippets = await db.snippet.findMany(); //thats how to get all data in the snippet model

  const renderedSnippets = snippets.map((snippet)=> {
    return (
      <Link 
        key={snippet.id} 
        href={`/snippets/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>
          {snippet.title}
        </div>
        <div>View</div>
      </Link>
    );
  });

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippets/new" className="border p-2 rounded">New</Link>
      </div>
      <div className="flex flex-col gap-2">
        {renderedSnippets}
      </div>
    </div>
  );
}
