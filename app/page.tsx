import { Suspense } from "react";
import { CardList } from "@/app/ui/CardList";
import { Search } from "@/app/ui/Search";

export default function Page() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Search isSearch={true} />
      <div className="min-h-screen bg-gray-900 text-white sm:px-2 md:px-8 lg:px-24">
        <CardList />
      </div>
    </Suspense>
  );
}
