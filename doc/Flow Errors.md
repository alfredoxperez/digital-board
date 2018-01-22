# "Ineligible value used in/as type annotation (did you forget 'typeof'?)"
https://stackoverflow.com/questions/43153027/ineligible-value-used-in-as-type-annotation-error-with-flow

The fix is in how the type is imported. It should be:
```
import type {SomeType} from './types'
```
