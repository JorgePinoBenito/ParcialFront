import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { apiPhone } from "../types.ts";

export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext) => {
    const url = new URL(req.url);
    const telefono = url.searchParams.get("telefono");
    if (telefono) {
      const headers = new Headers();
      headers.set("location", `/telefono/${telefono}`);
      return new Response(null, {
        status: 302,
        headers,
      });
    }
  },
};

export default function Home(props: PageProps<apiPhone>) {
  return (
    <div>
      <form method="get" class="TelefonoForm">
        <input
          type="text"
          name="telefono"
          placeholder="telefono"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
