# Scope Variables
This extension adds the ability to create, read and modify variables within a limited scope.
Considering that this extension may involve some concepts that are not easy to understand, we need to introduce a few concepts in advance.

## Basic contents
### Thread
Each top-level script creates a thread when it is triggered, and the thread is destroyed after the script completes execution. It should be noted that calling custom block does not create a new thread, but runs in the original thread.

### Scope
Scope (called StackFrame in Scratch code) is a small area that is created before executing and destoryed them after block is executed. Each thread stores all the current scopes of the script. Scope is **not only created in C-shape block, but in all blocks.**   
Executing a custom block will also create a new scope.

## How this extension works
When getting variables, the block will first look up for the target variable from the scope one level above the current block's scope up. If the target variable still does not exist in the top-level scope, the extension will look for it in the thread. If it still doesnt't existed , the block returns a empty value.
The look up logic of  setting variables is same as getting. but If it doesn't existed, The block creates a new variable in the outer scope and set it.
The outer scope is only searched once when
```scratch
create scoped [variable] with [value] :: #9999FF
``` 
If it does not exist, The block creates a new variable in the outer scope and set it.
