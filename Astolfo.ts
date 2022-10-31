import { ApplicationCommandOptionType } from "../api/Commands";
import definePlugin from "../utils/types";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchGelbooru(tags: string) {
    const res = await fetch(`https://young-reef-52365.herokuapp.com/https://gelbooru.com/index.php?page=dapi&s=post&limit=1&q=index&tags=${tags}+1boy+-1girl+-2girls+-3girls+-4girls+-5girls+-6%2bgirls+-abs+-muscular+-mature_male+-beard+sort:random&json=1`);
    const resp = await res.json();
    try {
        const { post } = resp;
        return post[0].file_url;
    } catch (err) {
        console.error(resp);
        console.error(err);
    }
    return "";
}

export default definePlugin({
    name: "Astolfo",
    authors: [
      {
        name: "Vanillyn",
        id: 946160978263932948n
    },
    {
        name: "Shady Goat",
        id: 376079696489742338n
    }
  ],
    description: "Add's an Astolfo sending command using Gelbooru. Based on ShadiestGoat/vencord-cuteanimeboys.",
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "astolfo",
        description: "Praise the Knight of Dissolving Sanity!",
        options: [
            {
                name: "nsfw",
                description: "If set, this will send NSFW pictures.",
                type: ApplicationCommandOptionType.BOOLEAN,
                required: false,
            },
        ],
            
            async execute(args) {
            let tags = "-rating:explicit+-rating:questionable+-rating:sensitive+astolfo_(fate)";
            console.error(args);
            if (args.length > 0) {
                const v = args[0].value as any as boolean;
                if (v) {
                    tags = "rating:explicit+-rating:sensitive+-rating:general+astolfo_(fate)";
                }
            }
            return {
                content: await fetchGelbooru(tags),
            };
        },
    }]
})
