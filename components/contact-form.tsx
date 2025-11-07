'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccess(null);
    setError(null);
    if (!name.trim() || !message.trim()) {
      setError('نام و پیام الزامی است.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-form-secret': process.env.NEXT_PUBLIC_FORM_SECRET || '',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'خطا در ارسال');

      setSuccess('پیام با موفقیت ثبت شد.');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err: any) {
      setError(err.message || 'خطا در ارسال');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-gradient-to-b from-white/[0.04] to-white/[0.02]
        border border-white/[0.08]
        rounded-[18px]
        p-6 md:p-8
        flex flex-col gap-4
        w-full max-w-xl mx-auto
      "
    >

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-2 rounded">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-sm p-2 rounded">
          {success}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">نام</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-transparent border border-white/[0.1] rounded-[10px] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
          placeholder="نام خود را وارد کنید"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">ایمیل</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-transparent border border-white/[0.1] rounded-[10px] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
          placeholder="example@mail.com"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-white/70">پیام</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="bg-transparent border border-white/[0.1] rounded-[10px] px-3 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
          placeholder="متن پیام شما..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex justify-center cursor-pointer items-center gap-2 bg-gradient-to-br from-[#824dee] to-[#351b67] text-white px-5 py-3 rounded-full border border-white/[0.08] shadow-[0_8px_24px_rgba(130,77,238,.35)] transition-all hover:-translate-y-0.5 whitespace-nowrap
          disabled:opacity-50"
      >
        {loading ? 'در حال ارسال...' : 'ارسال پیام'}
      </button>
    </form>
  );
}
