import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { apiCountry } from "../../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, apiCountry>) => {
    const country = ctx.params.country;

    if (country) {
      const XAPIKEY = Deno.env.get("XAPIKEY");
      if (!XAPIKEY) {
        return new Response("No se encuentra XAPIKEY");
      }
      const url = `https://api.api-ninjas.com/v1/country?name=${country}`;

      const response = await axios.get<apiCountry[]>(url, {
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

function Page(props: PageProps<apiCountry>) {
  return (
    <div>
      <p>Nombre del pais: '{props.data.name}'</p>
      <p>
        Capital:
        <a href={`/city/${props.data.capital}`}>'{props.data.capital}'</a>
      </p>
    </div>
  );
}

export default Page;
