import React from "react"
function Tag({ tag }: { tag: string }) {
  return (
    <a
      href={`/tag/${tag}`}
      className="bg-theme-subtle py-1 px-2 rounded text-sm font-semibold hover:text-white"
    >
      {tag}
    </a>
  )
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <section className="flex flex-row flex-wrap text-gray-300">
      {tags.map((tag) => (
        <div key={tag} className="mb-1 mr-1">
          <Tag tag={tag} />
        </div>
      ))}
    </section>
  )
}
