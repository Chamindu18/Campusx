"use client";

/**
 * Admin settings.
 */

import { useState } from "react";

import toast from "react-hot-toast";

export default function AdminSettingsPage() {
  const [
    maintenance,
    setMaintenance,
  ] = useState(false);

  const [
    registration,
    setRegistration,
  ] = useState(true);

  function save() {
    toast.success(
      "Settings saved"
    );
  }

  return (
    <div
      className="
        space-y-8
        md:space-y-10
      "
    >
      {/* HEADER */}

      <div>
        <h1
          className="
            text-3xl
            font-black
            sm:text-4xl
            md:text-5xl
          "
        >
          Settings
        </h1>

        <p
          className="
            mt-3
            text-slate-600
          "
        >
          Platform administration
        </p>
      </div>

      {/* GENERAL */}

      <div
        className="
          rounded-3xl
          bg-white/70
          p-5
          md:p-8
        "
      >
        <h2
          className="
            text-2xl
            font-black
          "
        >
          General
        </h2>

        <div
          className="
            mt-8
            space-y-8
          "
        >
          {/* MAINTENANCE */}

          <div
            className="
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h3 className="font-semibold">
                Maintenance Mode
              </h3>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                Temporarily disable
                platform
              </p>
            </div>

            <label
              className="
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={
                  maintenance
                }
                onChange={() =>
                  setMaintenance(
                    !maintenance
                  )
                }
              />
            </label>
          </div>

          {/* REGISTRATION */}

          <div
            className="
              flex
              flex-col
              gap-4

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >
            <div>
              <h3 className="font-semibold">
                Allow Registration
              </h3>

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >
                New users can sign up
              </p>
            </div>

            <label
              className="
                cursor-pointer
              "
            >
              <input
                type="checkbox"
                checked={
                  registration
                }
                onChange={() =>
                  setRegistration(
                    !registration
                  )
                }
              />
            </label>
          </div>
        </div>
      </div>

      {/* PLATFORM */}

      <div
        className="
          rounded-3xl
          bg-white/70
          p-5
          md:p-8
        "
      >
        <h2
          className="
            text-2xl
            font-black
          "
        >
          Platform
        </h2>

        <div
          className="
            mt-8

            grid
            grid-cols-1
            gap-4

            md:grid-cols-2
          "
        >
          <div
            className="
              rounded-2xl
              bg-slate-50
              p-6
            "
          >
            <h3 className="font-bold">
              Marketplace
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Enabled
            </p>
          </div>

          <div
            className="
              rounded-2xl
              bg-slate-50
              p-6
            "
          >
            <h3 className="font-bold">
              Dorms
            </h3>

            <p
              className="
                mt-2
                text-slate-500
              "
            >
              Enabled
            </p>
          </div>
        </div>
      </div>

      {/* SAVE */}

      <button
        type="button"
        onClick={save}
        className="
          rounded-2xl

          bg-slate-900

          px-6
          py-3

          text-white

          transition

          hover:bg-slate-800

          focus:outline-none
          focus:ring-4
          focus:ring-slate-300
        "
      >
        Save Settings
      </button>
    </div>
  );
}