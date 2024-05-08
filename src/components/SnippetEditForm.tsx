'use client'; // its a client component, need this at the top of the page. 
//cannot 'define' server actions in a client component but we can still use them.

import type { Snippet } from "@prisma/client"; //prisma creates types after adding model to the db.
import { Editor } from "@monaco-editor/react"; // https://www.npmjs.com/package/@monaco-editor/react
import { useState } from "react";
import { editSnippet } from "@/actions/serverActions";

interface SnippetEditFormProps {
  snippet: Snippet
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps ){
  
  const [code, setCode] = useState(snippet.code);

  const handleEditorChange = (value: string = '')=>{
    setCode(value);
  };
// value: string = '' - the default of value is '' so no undefine

const editSnippetAction = editSnippet.bind(null, snippet.id, code); 
//bind will make id and code arguments for editSnippet() and run it
//null is always the first arg in bind()
// this is for browsers that dont run js  

  return (
    <div>
      <Editor 
        height="40vh" // 40% of the screen
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: {enabled: false} }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button type="submit" className="p-2 border rounded">Save</button>
      </form>
    </div>
  );
};