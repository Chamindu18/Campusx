import type {
  ReactNode,
} from "react";

import {
  AdminSidebar,
} from "@/components/admin/AdminSidebar";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        flex
        gap-8
      "
    >
      <AdminSidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}