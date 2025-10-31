export default function AdminDashboard() {
  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <h1>🎛 داشبورد مدیریت دیپاد</h1>
      <p style={{ color: "#9aa0b6" }}>
        خوش آمدید! از منوی سمت راست می‌توانید بخش‌های مختلف مدیریت را ببینید.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "12px",
        }}
      >
        <div style={card}>👥 کاربران<br/><small>مدیریت، افزودن و حذف کاربران</small></div>
        <div style={card}>📰 پست‌ها<br/><small>ساخت و ویرایش مقالات</small></div>
        <div style={card}>📦 درخواست‌ها<br/><small>مشاهده و بررسی درخواست‌های محصولات</small></div>
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02))",
  border: "1px solid rgba(255,255,255,.08)",
  borderRadius: "18px",
  padding: "14px",
  textAlign: "center",
};
