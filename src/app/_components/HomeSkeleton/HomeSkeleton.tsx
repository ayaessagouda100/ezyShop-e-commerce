import { Skeleton } from "@/components/ui/skeleton"

export function HomeSkeleton() {
  return (
    <div className="flex flex-row space-x-3">
      {Array.from({ length: 5 }).map((el, i) => (
        <div key={i} className="flex flex-col">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-[250px] bg-gray-400" />
            <Skeleton className="h-4 w-[200px] bg-gray-400" />
          </div>
        </div>
      ))}
    </div>
  )
}


