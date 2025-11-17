# Extension review

The status quo of having GarboMuffin review everything is an abject failure. The goal in this document is to define the expectations for approving and merging changes.

The requirements for merging a pull request are:

 - Pass the automated checks
 - Get two reviewers to approve it

**That's it. If everything is green, go ahead and merge it.** The rest of this document will try to define what an approval means.

I'm not expecting you to review things to the same standard I tried to. That would be hopeless. Just do your best and make a good effort. If you miss things, that's fine. I missed a lot too.

Having to copy and paste the templates might seem a bit silly, but this way it's clear to everyone what the expectations are (no one reads CONTRIBUTING.md but people do read review comments). You can add anything else before or after. If reviewers keep not using the templates, we'll have a bot automatically discard approvals that don't use the template. If you just use the templates then we won't need to bother writing that.

## New extensions

The principle goal is to ensure that extension works well and will be maintainable forever, even if the person who wrote the extension vanishes tomorrow.

When you review a new extension, copy and paste this into the review comment box. Only approve the pull request if every box is checked based on the current state of the pull request and you have no additional concerns.

```
 - [ ] Extension follows ALL acceptance criteria and guidelines in CONTRIBUTING.md.
 - [ ] Extension's blocks follow established design patterns.
 - [ ] Tested ALL functionality and found no bugs or unintuitive behavior.
 - [ ] Extension code is well-written and easy to maintain or extend in the future, even without help from the original author.
```

## Changing an existing extension

The principle goal is to not break projects without a very good reason.

When you review an extension change, copy and paste this into the review comment box. Only approve the pull request if every box is checked based on the current state of the pull request and you have no additional concerns.

```
 - [ ] Tested ALL modified functionality and found no bugs or unintuitive behavior.
 - [ ] A well-formed project using an older version of this extension will not be broken by this new version.
```
