import prisma from "@/lib/prisma";
import TodoList from "@/components/TodoList";

// Server Component
const getData = async () => {
  try {
    const data = await prisma.todo.findMany();
    
    return data;
  } catch(err) {
    console.log(err);
  }
}

//   Server Component ==> Paling atas
//        ||
//        ||
//        \/
//   Client Component

export default async function Home() {
  const data = await getData();
  return (
    <div>
      <TodoList todos={data} />
    </div>
  );
}
