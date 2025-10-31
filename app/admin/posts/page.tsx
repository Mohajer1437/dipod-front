'use client';
import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: string;
  createdAt: string;
  status: 'draft' | 'published';
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    image: '',
    status: 'draft' as 'draft' | 'published',
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  // 🧩 QuillJS setup
  const { quill, quillRef } = useQuill({
    theme: 'snow',
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'blockquote', 'code-block'],
        ['clean'],
      ],
    },
  });

  // sync editor <-> state
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        setForm((prev) => ({ ...prev, content: quill.root.innerHTML }));
      });

      // preload content when editing
      if (form.content && quill.root.innerHTML !== form.content) {
        quill.root.innerHTML = form.content;
      }
    }
  }, [quill, form.content]);

  // 🧩 Fetch posts
  async function fetchPosts() {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  // 🧩 Convert image to base64
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  // 🧩 Ensure unique slug
  const ensureUniqueSlug = (slug: string) => {
    let uniqueSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const exists = posts.filter((p) => p.slug.startsWith(uniqueSlug));
    if (exists.length > 0) uniqueSlug = `${uniqueSlug}-${exists.length + 1}`;
    return uniqueSlug;
  };

  // 🧩 Save or update post
  async function savePost() {
    if (!form.title || !form.slug || !form.content) {
      setMessage('⚠️ لطفاً تمام فیلدهای ضروری را پر کنید.');
      return;
    }

    let finalSlug = form.slug;
    if (!editId) finalSlug = ensureUniqueSlug(form.slug);

    const body = {
      ...form,
      id: editId || undefined,
      slug: finalSlug,
      createdAt: new Date().toISOString(),
    };

    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/posts', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setForm({
        title: '',
        slug: '',
        content: '',
        image: '',
        status: 'draft',
      });
      setEditId(null);
      if (quill) quill.root.innerHTML = '';
      setMessage('✅ پست با موفقیت ذخیره شد.');
      fetchPosts();
    } else {
      setMessage('❌ خطا در ذخیره پست');
    }
  }

  // 🧩 Delete post
  async function deletePost(id: number) {
    if (!confirm('آیا مطمئن هستید؟')) return;
    await fetch('/api/posts', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    fetchPosts();
  }

  // 🧩 Edit post
  const startEdit = (p: Post) => {
    setEditId(p.id);
    setForm({
      title: p.title,
      slug: p.slug,
      content: p.content,
      image: p.image,
      status: p.status,
    });
    if (quill) quill.root.innerHTML = p.content;
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <h1>📰 مدیریت پست‌ها</h1>

      {message && (
        <div
          style={{
            background: 'rgba(33,225,184,.12)',
            border: '1px solid rgba(33,225,184,.35)',
            color: '#9ef3d6',
            padding: '10px 14px',
            borderRadius: '12px',
          }}
        >
          {message}
        </div>
      )}

      <div
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))',
          border: '1px solid rgba(255,255,255,.08)',
          borderRadius: '18px',
          padding: '18px',
        }}
      >
        {/* Post Form */}
        <div style={{ display: 'grid', gap: '10px', marginBottom: '14px' }}>
          <input
            placeholder="عنوان پست"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={input}
          />
          <input
            placeholder="اسلاگ (slug)"
            value={form.slug}
            onChange={(e) =>
              setForm({
                ...form,
                slug: e.target.value.trim().toLowerCase().replace(/\s+/g, '-'),
              })
            }
            style={input}
          />

          {/* Quill Editor */}
          <div
            ref={quillRef}
            dir="rtl"
            style={{
              background: '#fff',
              color: '#000',
              borderRadius: '12px',
              minHeight: '200px',
              direction: 'rtl',
              textAlign: 'right',
            }}
          />


          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label>تصویر شاخص:</label>
            <input type="file" accept="image/*" onChange={handleFileUpload} />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                style={{ width: '80px', borderRadius: '8px' }}
              />
            )}
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <label>وضعیت:</label>
            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value as 'draft' | 'published',
                })
              }
              style={{
                background: '#0f0f1a',
                border: '1px solid rgba(255,255,255,.12)',
                color: '#fff',
                borderRadius: '10px',
                padding: '8px',
              }}
            >
              <option value="draft">پیش‌نویس</option>
              <option value="published">منتشر شده</option>
            </select>
          </div>

          <button onClick={savePost} style={btn}>
            {editId ? '💾 ویرایش پست' : '➕ اضافه پست'}
          </button>
        </div>

        {/* Posts List */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,.08)',
            marginTop: '12px',
            paddingTop: '10px',
          }}
        >
          {posts.map((p) => (
            <div
              key={p.id}
              style={{
                margin: '10px 0',
                borderBottom: '1px solid rgba(255,255,255,.05)',
                paddingBottom: '10px',
              }}
            >
              <b>{p.title}</b> <span style={{ color: '#9aa0b6' }}>— {p.slug}</span>
              <div>
                <small style={{ color: '#999' }}>
                  وضعیت: {p.status === 'published' ? '✅ منتشر شده' : '📝 پیش‌نویس'}
                </small>
              </div>
              {p.image && (
                <div style={{ marginTop: '6px' }}>
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{ width: '120px', borderRadius: '10px' }}
                  />
                </div>
              )}
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                <button onClick={() => startEdit(p)} style={subBtn}>
                  ویرایش
                </button>
                <button onClick={() => deletePost(p.id)} style={dangerBtn}>
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 💅 Styles
const input = {
  background: '#0f0f1a',
  border: '1px solid rgba(255,255,255,.12)',
  borderRadius: '10px',
  color: '#fff',
  padding: '8px 10px',
};

const btn = {
  background: 'linear-gradient(135deg,#824dee,#351b67)',
  color: '#fff',
  border: 'none',
  borderRadius: '999px',
  padding: '8px 18px',
  cursor: 'pointer',
  fontWeight: 600,
  justifySelf: 'start',
};

const subBtn = {
  background: 'rgba(255,255,255,.06)',
  border: '1px solid rgba(255,255,255,.1)',
  borderRadius: '8px',
  padding: '4px 10px',
  color: '#dbe4ff',
  cursor: 'pointer',
};

const dangerBtn = {
  background: 'rgba(255,0,0,.12)',
  border: '1px solid rgba(255,0,0,.25)',
  borderRadius: '8px',
  padding: '4px 10px',
  color: '#ff9a9a',
  cursor: 'pointer',
};
