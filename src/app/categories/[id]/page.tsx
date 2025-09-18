import Image from "next/image";


export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${params.id}`);
  const category = await res.json();

  return (
    <div className="w-[90%] mx-auto flex justify-center items-center flex-col py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">{category.data.name}</h1>
      <Image
        width={1000}
        height={1000}
        src={category.data.image}
        alt={category.data.name}
        className="w-full max-w-md rounded-lg mb-6"
      />
    </div>
  );
}
