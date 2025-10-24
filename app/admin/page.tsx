'use client';
import { useEffect, useState } from 'react';

interface User { id: number; username: string; role: 'admin'|'customer'; password?: string; }
interface Post { id: number; title: string; slug: string; content: string; image: string; }

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [newUser, setNewUser] = useState({ username:'', password:'', role:'customer' });
  const [editUserId, setEditUserId] = useState<number | null>(null);

  const [newPost, setNewPost] = useState({ title:'', slug:'', content:'', image:'' });
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  async function fetchData() {
    setUsers(await (await fetch('/api/users')).json());
    setPosts(await (await fetch('/api/posts')).json());
  }

  useEffect(() => { fetchData(); }, []);

  const handleAddUser = async () => {
    if(!newUser.username || ( !editUserId && !newUser.password)){
      setMessage('نام کاربری و رمز عبور را وارد کنید.');
      return;
    }
    if(editUserId){
      await fetch('/api/users', {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({...newUser, id: editUserId})
      });
      setEditUserId(null);
    } else {
      await fetch('/api/users', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(newUser) });
    }
    setNewUser({ username:'', password:'', role:'customer' });
    setMessage('عملیات موفقیت آمیز بود.');
    fetchData();
  };

  const handleEditUser = (user: User) => {
    setNewUser({ username: user.username, password:'', role: user.role });
    setEditUserId(user.id);
  };

  const handleDeleteUser = async (id:number) => {
    if(!confirm('آیا مطمئن هستید؟')) return;
    await fetch('/api/users', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) });
    setMessage('کاربر حذف شد.');
    fetchData();
  };

  const handleAddPost = async () => {
    if(!newPost.title || !newPost.slug || !newPost.content){
      setMessage('عنوان، slug و محتوا را وارد کنید.');
      return;
    }
    if(editPostId){
      await fetch('/api/posts', {
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({...newPost, id: editPostId})
      });
      setEditPostId(null);
    } else {
      await fetch('/api/posts', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(newPost) });
    }
    setNewPost({ title:'', slug:'', content:'', image:'' });
    setMessage('عملیات موفقیت آمیز بود.');
    fetchData();
  };

  const handleEditPost = (post: Post) => {
    setNewPost({ title: post.title, slug: post.slug, content: post.content, image: post.image });
    setEditPostId(post.id);
  };

  const handleDeletePost = async (id:number) => {
    if(!confirm('آیا مطمئن هستید؟')) return;
    await fetch('/api/posts', { method:'DELETE', headers:{'Content-Type':'application/json'}, body:JSON.stringify({id}) });
    setMessage('پست حذف شد.');
    fetchData();
  };

  return (
    <div style={{padding:'20px', fontFamily:'sans-serif'}}>
      <h1 style={{textAlign:'center'}}>پنل مدیریت</h1>
      {message && <div style={{margin:'10px 0', color:'green'}}>{message}</div>}

      {/* ===== کاربران ===== */}
      <section style={{marginTop:'30px', border:'1px solid #ccc', padding:'10px'}}>
        <h2>کاربران</h2>
        <input placeholder="نام کاربری" value={newUser.username} onChange={e=>setNewUser({...newUser, username:e.target.value})}/>
        <input placeholder="رمز عبور" value={newUser.password} onChange={e=>setNewUser({...newUser, password:e.target.value})}/>
        <select value={newUser.role} onChange={e=>setNewUser({...newUser, role:e.target.value as 'admin'|'customer'})}>
          <option value="customer">کاربر عادی</option>
          <option value="admin">ادمین</option>
        </select>
        <button onClick={handleAddUser} style={{marginLeft:'5px'}}>{editUserId?'ویرایش':'اضافه کردن'}</button>
        <ul>
          {users.map(u=>(
            <li key={u.id} style={{margin:'5px 0'}}>
              {u.username} ({u.role}) 
              <button onClick={()=>handleEditUser(u)} style={{marginLeft:'5px'}}>ویرایش</button>
              <button onClick={()=>handleDeleteUser(u.id)} style={{marginLeft:'5px'}}>حذف</button>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== پست‌ها ===== */}
      <section style={{marginTop:'30px', border:'1px solid #ccc', padding:'10px'}}>
        <h2>پست‌ها</h2>
        <input placeholder="عنوان" value={newPost.title} onChange={e=>setNewPost({...newPost, title:e.target.value})}/>
        <input placeholder="slug" value={newPost.slug} onChange={e=>setNewPost({...newPost, slug:e.target.value})}/>
        <textarea placeholder="محتوا" value={newPost.content} onChange={e=>setNewPost({...newPost, content:e.target.value})}/>
        <textarea placeholder="Base64 تصویر" value={newPost.image} onChange={e=>setNewPost({...newPost, image:e.target.value})}/>
        <button onClick={handleAddPost} style={{marginLeft:'5px'}}>{editPostId?'ویرایش':'اضافه کردن'}</button>

        <ul>
          {posts.map(p=>(
            <li key={p.id} style={{margin:'10px 0', borderBottom:'1px solid #ddd', paddingBottom:'5px'}}>
              <b>{p.title}</b> - {p.slug}
              {p.image && <div><img src={`data:image/png;base64,${p.image}`} alt={p.title} style={{width:'100px', marginTop:'5px'}}/></div>}
              <button onClick={()=>handleEditPost(p)} style={{marginTop:'5px', marginRight:'5px'}}>ویرایش</button>
              <button onClick={()=>handleDeletePost(p.id)} style={{marginTop:'5px'}}>حذف</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}