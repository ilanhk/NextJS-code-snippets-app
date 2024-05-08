'use client'
//error.tsx file must be a client component

interface ErrorPageProps {
  error: Error, //error obj
  reset: ()=> void;
  
};

export default function ErrorPage({ error}: ErrorPageProps){
  return (
    <div>
      {error.message}
    </div>
  );
};