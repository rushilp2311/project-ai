import Image from "next/image";
import Logo from "../../public/logo.svg";
import { LinkedinIcon, Github } from "lucide-react";
import Dashboard from "../../public/dashboard.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <div className="overflow-hidden lg:py-28 flex justify-between">
          <div className="mx-auto w-full px-4 sm:max-w-3xl sm:px-6">
            <div className="w-full">
              <div>
                <Image src={Logo} height={200} width={200} alt="logo" />
              </div>
              <div className="mt-10 w-full">
                <div className="w-full">
                  <a href="#" className="inline-flex space-x-4">
                    <span className="rounded bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-500 tracking-wide uppercase">
                      What&apos;s new
                    </span>
                  </a>
                </div>
                <div className="mt-6 w-full">
                  <h1 className="text-4xl w-full font-extrabold dark:text-white text-gray-900 tracking-tight sm:text-5xl">
                    Project management with AI
                  </h1>
                  <p className="mt-6 text-xl dark:text-neutral-400 text-neutral-500">
                    Move projects faster with the help of AI.
                  </p>
                </div>
                <div className="mt-4">
                  <Link href="/signup">
                    <Button size="lg">Register</Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" size="lg" className="ml-5">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6 ">
            <div className="drop-shadow-lg  border-2 rounded">
              <Image
                src={Dashboard}
                objectFit="fit"
                alt="dashboard"
                className="contrast-200 rounded"
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-24 bg-neutral-900 sm:mt-12">
        <div className="mx-auto max-w-md py-12 px-4 overflow-hidden sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="mt-8 flex justify-center space-x-6">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/rushilp2311/"
              rel="noopener noreferrer"
            >
              <LinkedinIcon className="text-white" />
            </a>
            <a
              target="_blank"
              href="https://github.com/rushilp2311"
              rel="noopener noreferrer"
            >
              <Github className="text-white" />
            </a>
          </div>
          <p className="mt-8 text-center text-base text-gray-400">
            &copy; 2024 Pinpoint | Hashnode x AI
          </p>
        </div>
      </footer>
    </div>
  );
}
