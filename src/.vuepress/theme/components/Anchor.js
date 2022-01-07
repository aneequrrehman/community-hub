import Vue from "vue";
import { isActive } from "@theme/utils/path";
const renderLink = (h, { text, link, level }) => h("RouterLink", {
    props: {
        to: link,
        activeClass: "",
        exactActiveClass: "",
    },
    class: {
        "anchor-link": true,
        [level ? `heading${level}` : ""]: level,
    },
}, [h("div", {}, [text])]);
const renderChildren = (h, { children, route }) => h("ul", { class: "anchor-list" }, children.map((child) => {
    const active = isActive(route, `${route.path}#${child.slug}`);
    return h("li", { class: { anchor: true, active } }, [
        renderLink(h, {
            text: child.title,
            link: `${route.path}#${child.slug}`,
            level: child.level,
        }),
    ]);
}));
export default Vue.extend({
    name: "Anchor",
    functional: true,
    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },
    render(h, { props, parent: { $page, $route } }) {
        return h("div", { attrs: { class: "anchor-place-holder" } }, [
            h("aside", { attrs: { id: "anchor" } }, [
                ($page.headers && $page.headers.length)
                    ? h("div", { class: "anchor-header" }, [
                        "On this page"
                    ])
                    : null,
                h("div", { class: "anchor-wrapper" }, [
                    props.items.length
                        ? renderChildren(h, {
                            children: props.items,
                            route: $route,
                        })
                        : $page.headers
                            ? renderChildren(h, {
                                children: $page.headers,
                                route: $route,
                            })
                            : null,
                ]),
                ($page.headers && $page.headers.length)
                    ? h("div", [
                        h("div", { class: "anchor-header anchor-support" }, [
                            "Support"
                        ]),
                        h("div", { class: "anchor-support-links" }, [
                            h("a", { attrs: { href: "https://discord.optimism.io" } }, [
                                h("div", [
                                    h("i", { attrs: { class: "fab fa-discord" } }),
                                    " Get support on Discord"
                                ])
                            ]),
                            h("a", { attrs: { href: "https://help.optimism.io/hc/en-us" } }, [
                                h("div", [
                                    h("i", { attrs: { class: "far fa-question-circle" } }),
                                    " Check the Help Center"
                                ])
                            ]),
                            h("a", { attrs: { href: "https://github.com/ethereum-optimism/optimism/issues" } }, [
                                h("div", [
                                    h("i", { attrs: { class: "fab fa-github" } }),
                                    " Make an issue on GitHub"
                                ])
                            ]),
                        ])
                    ])
                    : null
            ]),
        ]);
    },
});
//# sourceMappingURL=Anchor.js.map