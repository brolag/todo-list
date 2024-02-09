import Head from "next/head";
import TodoList from "~/components/TodoList";

export default function Home() {

  return (
    <>
      <Head>
        <title>Todo List App</title>
        <meta name="description" content="Simple ToDo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start font-mono">
        <div className="container flex flex-col items-start justify-start gap-12 px-4 py-16 ">
          <h1 className="text-3xl">📋 Todo List App</h1>
          <TodoList />
        </div>
      </main>
    </>
  );
}
