import { ApplicationCommandOptionType } from "../api/Commands";
import definePlugin from "../utils/types";

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function fetchGelbooru(tags: string) {
    const res = await fetch(`https://young-reef-52365.herokuapp.com/https://gelbooru.com/index.php?page=dapi&s=post&limit=1&api_key=994a0990e5ba027504b800dda44346c093d20634838c10ad625d831bee5340f8&user_id=700181&q=index&tags=-rating%3aexplicit+-rating%3aquestionable+-rating:sensitive+${tags}+1boy+-1girl+-2girls+-3girls+-4girls+-5girls+-6%2bgirls+-abs+-muscular+-mature_male+-gladiator+-shota+-beard+sort:random&json=1`);
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
            
            async execute(args) {
            let tags = "trap+-child";
            console.error(args);
            if (args.length > 0) {
                const v = args[0].value as any as boolean;
                if (v) {
                    tags = "cat_boy";
                }
            }
            return {
                content: await fetchGelbooru(tags),
            };
        },
    }]
})
