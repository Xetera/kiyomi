import { RiDiscordFill, RiTwitterFill } from "react-icons/ri"

function FooterSection({ section }) {
  return (
    <section key={section.title}>
      <h1 className="text-base font-semibold mb-3 text-gray-300">
        {section.title}
      </h1>
      <ul>
        {section.links.map((link) => (
          <li key={link.href} className="font-semibold text-gray-500">
            <a href={link.href} className="hover:underline">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function Footer() {
  return (
    <footer
      className="border-theme-subtle bg-theme"
      style={{
        borderTopWidth: "1px",
      }}
    >
      <div className="max-w-7xl mx-auto flex justify-between md:py-20 py-8 px-8 md:flex-row flex-col">
        <div className="text-gray-400">
          <h1 className="text-3xl font-black ">simp.pics</h1>
          <div className="flex flex-row py-5">
            <a href="https://discord.gg/" className="mr-4">
              <RiDiscordFill className="text-3xl hover:text-blurple" />
            </a>
            <a href="https://twitter.com/_Xetera">
              <RiTwitterFill className="text-3xl hover:text-blue-300" />
            </a>
          </div>
        </div>
        <div>
          <FooterSection
            section={{
              title: "About",
              links: [
                {
                  href: "/",
                  name: "About",
                },
              ],
            }}
          />
        </div>
      </div>
    </footer>
  )
}
