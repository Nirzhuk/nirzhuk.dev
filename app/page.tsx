import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        John <span className="text-[#51e018]">"Nirzhuk"</span> Serrano
      </h1>
      <p className="mb-4">
        {`Full-stack developer, one man army, love to learn new things.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
