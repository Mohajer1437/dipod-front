import fs from 'fs';
import path from 'path';

interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const filePath = path.join(process.cwd(), 'data', 'db.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const post: Post = data.posts.find((p: Post) => p.slug === params.slug);

  if (!post) return <div>پست پیدا نشد</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      {post.image && <img src={`data:image/png;base64,${post.image}`} alt={post.title} />}
      <p>{post.content}</p>
    </div>
  );
}
