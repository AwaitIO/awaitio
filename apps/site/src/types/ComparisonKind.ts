// How the other tool is built with, which picks the drawing of its side in the hero of /vs/<slug>:
// - `canvas`: a visual editor where you drag components and wire queries
// - `scripts`: scripts and jobs on the tool's own platform, with a UI on top
// - `framework`: a framework where you write every page yourself
// - `sdk`: a backend SDK like AwaitIO's, where the code awaits a person
export type ComparisonKind = 'canvas' | 'scripts' | 'framework' | 'sdk';
