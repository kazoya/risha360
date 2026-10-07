"use client";

import { unlockDesk } from "@/lib/desk-action";
import { useActionState } from "react";

export function DeskLock() {
  const [state, action, pending] = useActionState(
    async (_previous: { error: string } | null, formData: FormData) => {
      const result = await unlockDesk(formData);
      return { error: result.error };
    },
    null,
  );

  return (
    <form action={action} className="mt-6 grid gap-3">
      <label className="grid gap-2 text-sm">
        <span>المفتاح</span>
        <input name="token" type="password" autoComplete="current-password" className="h-12 rounded-xl border border-line bg-card px-3" />
        <span className="text-muted">من ملف البيئة، وليس من رابط الصفحة.</span>
      </label>
      {state?.error ? <p className="text-sm text-danger">{state.error}</p> : null}
      <button className="h-12 rounded-full bg-forest text-paper disabled:opacity-60" type="submit" disabled={pending}>
        {pending ? "جار التحقق" : "ادخل"}
      </button>
    </form>
  );
}
