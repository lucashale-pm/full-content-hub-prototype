import type { PropsWithChildren } from "react";

export function MobileShell({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-[430px] text-gr-text">
      {children}
    </main>
  );
}
