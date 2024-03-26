import { Suspense } from "react";
import { CardList } from "@/app/ui/CardList";
import { Search } from "@/app/ui/Search";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Search isSearch={true} />
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-between px-24">
        <CardList />
      </div>
    </Suspense>
  );
}
