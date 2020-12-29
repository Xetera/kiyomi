import React from "react";
function Tag({ tag }: { tag: string }) {
  return (
    <div className="bg-theme-light py-1 px-2 rounded text-sm font-semibold">
      {tag}
    </div>
  );
}

export function Tags({ tags }: { tags: string[] }) {
  return (
    <section className="flex flex-row flex-wrap text-blueGray-400">
      {tags.map((tag) => (
        <div key={tag} className="mb-1 mr-1">
          <Tag tag={tag} />
        </div>
      ))}
    </section>
  );
}
