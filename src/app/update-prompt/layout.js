import { Suspense } from "react";

export default function layout({children}){
    return (
        <Suspense>
            {children}
        </Suspense>
    );
  }