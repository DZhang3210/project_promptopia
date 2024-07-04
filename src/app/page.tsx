import Image from "next/image";
import Feed from "@/components/Feed";

export default function Home() {
  return (
    <section className="w-full hidden flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden"/>
        <span className="orange_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc">
        Promptopia is an open-source AI prompting tools for modern world
      </p>
      <Feed/>
    </section>
  );
}
