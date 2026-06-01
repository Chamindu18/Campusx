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
      <div
        className="
          flex
          flex-col
          gap-6

          lg:flex-row
          lg:gap-8
        "
      >
        {/* SIDEBAR */}

        <aside
          className="
            lg:sticky
            lg:top-6
            lg:h-fit
          "
        >
          <AdminSidebar />
        </aside>

        {/* CONTENT */}

        <main
          className="
            min-w-0
            flex-1
          "
        >
          {children}
        </main>
      </div>
    </AdminGuard>
  );
}