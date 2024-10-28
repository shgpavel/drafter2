# WIP (Not even close)

## drafter2
tiny drafter lib built on top of desmos

### What I can get out of this
let us have intention to draw a function
then we invoke this chain in C frontend
```mermaid
graph LR
    A["drafter_init()"] --> B["drafter_add_()"]
    B --> C["drafter_show()"]
    C --> D["drafter_clear()"]
```
