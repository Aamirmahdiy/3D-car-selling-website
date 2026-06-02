import Spline from "@splinetool/react-spline/next";
import ContactForm from "./contact-form";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-50" dir="rtl">
      <header className="sticky top-0 z-10 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-50 dark:text-black">
              🚗
            </span>
            <span>خودرو خوب</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="ناوبری">
            <a className="hover:text-zinc-700 dark:hover:text-zinc-300" href="#cars">
              خودروها
            </a>
            <a className="hover:text-zinc-700 dark:hover:text-zinc-300" href="#features">
              چرا ما
            </a>
            <a className="hover:text-zinc-700 dark:hover:text-zinc-300" href="#contact">
              تماس
            </a>
          </nav>

          <a
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
            href="#contact"
          >
            دریافت قیمت
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50 via-zinc-50 to-white dark:from-black dark:via-black dark:to-zinc-950" />

          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:py-16">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5">
                <span className="text-lg">⚡</span>
                معاملات مطمئن • فرایند سریع
              </div>

              <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                خودروی بعدی‌ات را سریع‌تر پیدا کن.
              </h1>

              <p className="mt-3 max-w-xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
                خودروهای باکیفیت، قیمت‌گذاری شفاف و پشتیبانی سریع.  
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  className="flex items-center justify-center rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
                  href="#cars"
                >
                  مشاهده خودروها
                </a>

                <a
                  className="flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/5 dark:text-zinc-50 dark:hover:bg-white/10"
                  href="#contact"
                >
                  صحبت با فروش
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                <div className="aspect-[4/3] w-full">
                  <Spline scene="https://prod.spline.design/KJaxneQ1H4B0-Tmq/scene.splinecode" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cars */}
        <section id="cars" className="mx-auto w-full max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-semibold tracking-tight">منتخب‌های محبوب</h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-300"> </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "2022 سدان LX", price: "$19,990", tag: "به‌صرفه" },
              { name: "2021 شاسی بلند Touring", price: "$26,500", tag: "خانوادگی" },
              { name: "2020 کوپه اسپرت", price: "$22,300", tag: "عملکرد" },
              { name: "2019 هیبرید Eco", price: "$16,750", tag: "کم‌مصرف" },
              { name: "2023 کامپکت Prime", price: "$21,200", tag: "ورود جدید" },
              { name: "2018 پیکاپ Work", price: "$18,100", tag: "کاربری" },
            ].map((c) => (
              <article
                key={c.name}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold">{c.name}</h3>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">بازرسی اولیه شده</p>
                  </div>

                  <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-black">
                    {c.tag}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-lg font-semibold">{c.price}</p>

                  <a
                    className="text-sm font-medium text-zinc-900 underline decoration-zinc-200 underline-offset-4 hover:decoration-zinc-400 dark:text-zinc-50 dark:decoration-zinc-700 dark:hover:decoration-zinc-500"
                    href="#contact"
                  >
                    استعلام
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="border-y border-black/5 bg-white/60 py-10 dark:border-white/10 dark:bg-white/5"
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <h2 className="text-2xl font-semibold tracking-tight">مشتریان چرا ما را انتخاب می‌کنند</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: " بهترین قیمت‌",
                  desc: "بدون غافلگیری—از همان پیام اول عددهای روشن.",
                  icon: "💳",
                },
                {
                  title: "کنترل کیفیت",
                  desc: "بازرسی اولیه ساده تا با خیال راحت تصمیم بگیری.",
                  icon: "🛠️",
                },
                {
                  title: "پشتیبانی سریع",
                  desc: "پاسخ‌های سریع و تجربه خرید روان.",
                  icon: "📞",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{f.icon}</div>
                    <h3 className="font-semibold">{f.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mx-auto w-full max-w-6xl px-4 py-10">
          <h2 className="text-2xl font-semibold tracking-tight">نظر خریداران</h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { name: "آمینا", text: "پاسخ سریع و معامله دقیقاً مطابق توضیحات بود." },
              { name: "دانیال", text: "فضای نمایشگاه مدرن بود و خودرو عالی." },
              { name: "سوفیا", text: "ارزش خرید خوب و برخورد دوستانه. پیشنهاد می‌کنم." },
            ].map((t) => (
              <blockquote
                key={t.name}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">«{t.text}»</p>
                <footer className="mt-3 font-medium">— {t.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-black/5 bg-white/60 py-10 dark:border-white/10 dark:bg-white/5"
        >
          <div className="mx-auto w-full max-w-6xl px-4">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">درخواست قیمت</h2>
                <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-300">
                  درخواستت را ارسال کن تا موجودی و قیمت را اعلام کنیم.
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 py-6 text-sm text-zinc-600 dark:border-white/10 dark:text-zinc-300">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4">
          <span>© {new Date().getFullYear()} خودرو خوب</span>
          <a className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-zinc-50" href="#contact">
            دریافت قیمت
          </a>
        </div>
      </footer>
    </div>
  );
}

