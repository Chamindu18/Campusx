import type {
  ReactNode,
} from "react";

import {
  AdminSidebar,
} from "@/components/admin/AdminSidebar";

import {
  AdminGuard,
} from "@/components/admin/AdminGuard";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AdminGuard>
      <div className="flex gap-8">
        <AdminSidebar />

        <main className="flex-1">
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}