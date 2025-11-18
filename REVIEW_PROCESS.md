# Extension review

The status quo of having GarboMuffin review everything is an abject failure. The goal in this document is to define the expectations for approving and merging changes.

The requirements for merging a pull request are:

 - Pass the automated checks
 - Get two reviewers to approve it

**That's it. If GitHub will let you merge it, go ahead and do it.** The rest of this document will try to define what it means to approve a pull request.

I'm not expecting you to review things to the same standard I tried to. That would be hopeless. Just do your best and make a good effort. If you miss things, that's fine. I missed a lot too.

Having to copy and paste templates might seem a bit silly, but this way it's clear to everyone what the expectations are. No one reads CONTRIBUTING.md, but people do read review comments. You can add additional stuff if you want, but don't remove anything. I'll make a bot to enforce using the templates if people often don't use them.

## New extensions

The principle goal is to ensure that the extension works well and will be maintainable forever, even if the person who wrote the extension vanishes tomorrow.

When you review a new extension, copy and paste this into the review comment box. Only approve the pull request if every box is checked based on the current state of the pull request and you have no additional concerns.

```
 - [ ] I verified that the extension follows all acceptance criteria and guidelines in CONTRIBUTING.md.
 - [ ] I believe the block list is well-designed and intuitive.
 - [ ] I tested all functionality and found no bugs, security flaws, or unintuitive behavior.
 - [ ] I reviewed the code and believe it is well-written and easy to maintain or extend in the future, even without help from the original author.
 - [ ] I have no additional concerns.
```

## Changing an existing extension

The principle goal is to not break projects without a very good reason.

When you review an extension change, copy and paste this into the review comment box. Only approve the pull request if every box is checked based on the current state of the pull request and you have no additional concerns.

```
 - [ ] I tested all modified functionality and found no bugs or unintuitive behavior.
 - [ ] I believe a well-formed project using an older version of this extension will not be broken by this new version.
 - [ ] I have no additional concerns.
```

## Other things

Ping GarboMuffin early and often.
