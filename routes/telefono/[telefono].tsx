import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { apiPhone } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, apiPhone>) => {
    const telefono = ctx.params.country;

    if (telefono) {
      const XAPIKEY = Deno.env.get("XAPIKEY");
      if (!XAPIKEY) {
        return new Response("No se encuentra XAPIKEY");
      }
      const url =
        `https://api.api-ninjas.com/v1/validatephone?number=${telefono}`;

      const response = await axios.get<apiPhone>(url, {
        headers: {
          "X-Api-Key": XAPIKEY,
        },
      });

      if (response.status == 200) {
        return new Response("Api Ninja Error");
      }
      const data = response.data;
      return ctx.render(data);
    }
  },
};

function Page(props: PageProps<apiPhone>) {
  return (
    <div>
      <p>
        Pais:{" "}
        <a href={`/country/${props.data.country}`}>'{props.data.country}'</a>
      </p>
    </div>
  );
}

export default Page;
