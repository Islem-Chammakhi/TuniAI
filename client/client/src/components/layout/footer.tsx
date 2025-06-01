import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark-brown text-white/70 py-12">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-terracotta"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2C7.03 2 3 6.03 3 11C3 14.03 4.53 16.82 7 18.47V22H9V19H11V22H13V19H15V22H17V18.46C19.47 16.81 21 14.03 21 11C21 6.03 16.97 2 12 2M12 4C13.8 4 15.5 4.91 16.54 6.36C17 5.2 18.46 4.5 20 4.97C20 4.97 18.87 6.22 19 7C19.19 8.19 20.06 9.12 21.03 9.68C20.32 12.75 16.96 15 13.25 14.25C10.2 13.63 8 11.06 8 8C8 5.79 9.79 4 12 4Z" />
              </svg>
              <span className="text-xl font-bold font-el-messiri text-white">
                TuniTales
              </span>
            </div>
            <p className="text-sm mb-6 max-w-72">
              Discover Tunisia's rich cultural heritage through the power of AI
              technology. Identify monuments, learn history, and explore this
              beautiful country.
            </p>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Explore</h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              <FooterLink href="/">Homepage</FooterLink>
              <FooterLink href="/discover">Identify Monument</FooterLink>
              <FooterLink href="/questionnaire">Plan Trip</FooterLink>
              <FooterLink href="/map">Locate Landmark</FooterLink>
              <FooterLink href="/about">About</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-medium mb-4">Contact</h3>
            <p className="text-sm mb-5 max-w-80">
              For any further questions, please don't hesitate to contact us and
              we'll get back to you as soon as possible.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg bg-dark-brown/40 border border-white/20 text-black focus:outline-none focus:border-terracotta"
              />
              <button className="bg-terracotta px-4 rounded-r-lg hover:bg-opacity-90 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} TuniTales. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}


function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href}>
        <a className="hover:text-terracotta transition-colors">{children}</a>
      </Link>
    </li>
  );
}


