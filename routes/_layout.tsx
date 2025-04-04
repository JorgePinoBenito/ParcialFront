import { PageProps } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";
import Menu from "../components/Menu.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div>
      <Menu />
      <Component />
      <Footer />
    </div>
  );
}
