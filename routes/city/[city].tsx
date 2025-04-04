import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { apiCity } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, apiCity>) => {
    const city = ctx.params.country;

    if (city) {
      const XAPIKEY = Deno.env.get("XAPIKEY");
      if (!XAPIKEY) {
        return new Response("No se encuentra XAPIKEY");
      }
      const url = `https://api.api-ninjas.com/v1/city?name=${city}`;

      const response = await axios.get<apiCity[]>(url, {
        headers: {
          "X-Api-Key": XAPIKEY,
        },
      });

      if (response.status == 200) {
        return new Response("Api Ninja Error");
      }
      const data = response.data[0];
      return ctx.render(data);
    }
  },
};

function Page(props: PageProps<apiCity>) {
  return (
    <div>
      <p>Nombre de la ciudad: '{props.data.name}'</p>
      <p>
        Pais:
        <a href={`/country/${props.data.country}`}>'{props.data.country}'</a>
      </p>
    </div>
  );
}

export default Page;
