import { ApplicationCommandOptionType } from "../api/Commands";
import definePlugin from "../utils/types";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchGelbooru(sub: string) {
    const res = await fetch(`https://gelbooru.com/index.php?page=dapi&s=post&q=index&tags=-rating%3aexplicit+-rating%3aquestionable+1boy+-1girl+-2girls+-3girls+-4girls+-5girls+-6%2bboys&json=1`);
    const resp = await res.json();
    try {
        const { children } = resp.data;
        let r = rand(0, children.length-1);
        return children[r].data.file_url;
    } catch (err) {
        console.error(resp);
        console.error(err);
    }
    return "";
}

export default definePlugin({
    name: "Cute-Anime-Boys Gelbooru",
    authors: [{
        name: "Shady Goat",
        id: BigInt(376079696489742338),
    }],
    description: "Add a command to send cute anime boys in the chat",
    dependencies: ["CommandsAPI"],
    commands: [{
        name: "anime-boys",
        description: "Send cute anime boys",
        options: [
            {
                name: "cat",
                description: "If set, this will send exclusively cute anime cat boys",
                type: ApplicationCommandOptionType.BOOLEAN,
                required: false,
            },
        ],


            console.error(sub);

            return {
                content: await fetchGelbooru(sub),
            };
        },
    }]
});
