export default function RequestsPage() {
    const data = [
        { id: 'R-1042', type: 'بازیابی داده', priority: 'بالا', status: 'در حال بررسی', date: '۱۴۰۴/۰۵/۱۴' },
        { id: 'R-1043', type: 'مشاوره پلن', priority: 'عادی', status: 'تکمیل‌شده', date: '۱۴۰۴/۰۵/۱۰' },
    ];

    const th: React.CSSProperties = {
        padding: '10px',
        textAlign: 'right' as React.CSSProperties['textAlign'],
        borderBottom: '1px solid rgba(255,255,255,.08)',
    };
    const td: React.CSSProperties = {
        padding: '8px 10px',
        color: '#dbe4ff',
        textAlign: 'right' as React.CSSProperties['textAlign'],
    };


    return (
        <div>
            <h1>📦 درخواست‌های محصول</h1>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '14px' }}>
                <thead>
                    <tr style={{ background: '#121222' }}>
                        <th style={th}>شناسه</th>
                        <th style={th}>نوع</th>
                        <th style={th}>اولویت</th>
                        <th style={th}>وضعیت</th>
                        <th style={th}>تاریخ</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid rgba(255,255,255,.08)' }}>
                            <td style={td}>{r.id}</td>
                            <td style={td}>{r.type}</td>
                            <td style={td}>{r.priority}</td>
                            <td style={td}>{r.status}</td>
                            <td style={td}>{r.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const th = { padding: '10px', textAlign: 'right', borderBottom: '1px solid rgba(255,255,255,.08)' };
const td = { padding: '8px 10px', color: '#dbe4ff' };
