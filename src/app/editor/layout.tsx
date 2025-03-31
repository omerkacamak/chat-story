import { redirect } from "next/navigation";
import { auth } from "~/server/auth";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <>
      {children}
    </>
  );
}
