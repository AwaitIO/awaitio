// The drawing above a highlight card on /vs/<slug>:
// - `repo`: the action as a file in your repository, next to the rest of the code
// - `app`: AwaitIO running inside your own Node app, on your own server
// - `await`: one line of code with `await` that becomes a form in the browser
// - `owned`: a switch nobody outside can turn off
// - `types`: the value a person enters, typed in the editor
// - `review`: the tool changed through a pull request with a diff
// - `services`: the action importing your own database client and services
// - `price`: one flat price for the whole organization next to a price per seat
export type ComparisonIllustration = 'repo' | 'app' | 'await' | 'owned' | 'types' | 'review' | 'services' | 'price';
