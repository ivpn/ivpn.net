// estree-walker v3 is pure ESM with only named exports (walk, asyncWalk).
// @vue/compiler-core (bundled inside @vue/compat) was compiled from CJS and
// does `import walker from 'estree-walker'` (default import), which fails.
// This shim provides the default export that CJS-compiled code expects.
import { walk, asyncWalk } from 'estree-walker'
export { walk, asyncWalk }
export default { walk, asyncWalk }
