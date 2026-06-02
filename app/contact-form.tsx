"use client";

import { useState } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  return (
    <form
      className="w-full rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 md:max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
        alert("درخواست ارسال شد (دمو). به‌زودی با شما تماس می‌گیریم!");
      }}
    >
      <label className="block text-sm font-medium">
        نام شما
        <input
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black/40"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="مثلاً علی"
        />
      </label>

      <label className="mt-4 block text-sm font-medium">
        تلفن یا ایمیل
        <input
          className="mt-2 w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-400 dark:border-white/10 dark:bg-black/40"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="name@email.com"
        />
      </label>

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
      >
        تماس با فروش
      </button>

      <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">فرم دمو—بعداً به بک‌اند وصلش می‌کنیم.</p>
    </form>
  );
}

