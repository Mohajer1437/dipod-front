'use client';
import { useState, useEffect } from 'react';

interface User { id:number; username:string; role:'admin'|'customer'; password?:string; }

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ username:'', password:'', role:'customer' });
  const [editId, setEditId] = useState<number|null>(null);

  async function fetchUsers() {
    const res = await fetch('/api/users');
    setUsers(await res.json());
  }

  useEffect(()=>{fetchUsers();},[]);

  async function saveUser() {
    if(!form.username || (!editId && !form.password)) return alert('نام کاربری و رمز لازم است');
    const method = editId ? 'PUT' : 'POST';
    await fetch('/api/users', { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, id:editId}) });
    setForm({ username:'', password:'', role:'customer' }); setEditId(null);
    fetchUsers();
  }

  async function del(id:number){
    if(!confirm('حذف شود؟')) return;
    await fetch('/api/users', { method:'DELETE', headers:{'Content-Type':'application/json'}, body: JSON.stringify({id}) });
    fetchUsers();
  }

  return (
    <div>
      <h1>👥 مدیریت کاربران</h1>
      {users.map(u=>(
        <div key={u.id} style={card}>
          {u.username} <small style={{color:'#9aa0b6'}}>({u.role})</small>
          <div style={{marginTop:'6px',display:'flex',gap:'6px'}}>
            <button onClick={()=>{setEditId(u.id); setForm({username:u.username,password:'',role:u.role});}} style={subBtn}>ویرایش</button>
            <button onClick={()=>del(u.id)} style={dangerBtn}>حذف</button>
          </div>
        </div>
      ))}
    </div>
  );
}

const input = {background:'#0f0f1a',border:'1px solid rgba(255,255,255,.12)',borderRadius:'10px',color:'#fff',padding:'8px 10px'};
const card = {background:'rgba(255,255,255,.04)',border:'1px solid rgba(255,255,255,.08)',borderRadius:'12px',padding:'10px',marginTop:'10px'};
const btn = {background:'linear-gradient(135deg,#824dee,#351b67)',color:'#fff',border:'none',borderRadius:'999px',padding:'8px 16px',cursor:'pointer'};
const subBtn = {background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.1)',borderRadius:'8px',padding:'4px 10px',color:'#dbe4ff',cursor:'pointer'};
const dangerBtn = {background:'rgba(255,0,0,.12)',border:'1px solid rgba(255,0,0,.25)',borderRadius:'8px',padding:'4px 10px',color:'#ff9a9a',cursor:'pointer'};
