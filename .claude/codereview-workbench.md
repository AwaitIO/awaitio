# Pravidla Code Review Workbench pro awaitio

Navazuje na pravidlo v `CLAUDE.md`: co komponenta, to vlastní sekce (`component-<balíček>`), a dokumentace funkce patří do její skupiny.

## Kroky každé skupiny

Skupina (úkol) s víc než pár soubory má kroky vždy v tomto pořadí a každý soubor patří do právě jednoho z nich. Krok, do kterého nic nespadá, se vynechá:

1. **SDK: <funkce>** — změny v `libs/sdk/` rozdělené podle funkce, které se týkají (např. „SDK: přihlášení“, „SDK: prostředí“, „SDK: actions ze složky“), ne podle vrstev. Každá funkce SDK je vlastní krok; uvnitř kroku jdou soubory od typů přes jádro a http k clientu, UI a CLI, testy na konec.
2. **<komponenta>** — co komponenta, to krok, pojmenovaný po balíčku: `libs/<komponenta>/` (input-text, select-table, theme-default…) a `apps/demo/components/<komponenta>/`
3. **Dokumentace** — `apps/docs/` a `docs/`, README a další .md
4. **Site** — `apps/site/`, vždy vlastní krok
5. **Ostatní** — dema (`apps/demo*`), kořenová konfigurace, lockfile, `.claude/`

Dokumentace k funkci je krok Dokumentace v její skupině, ne samostatná skupina „Docs: …“; samostatná skupina pro docs je jen pro změnu dokumentace bez kódu.
