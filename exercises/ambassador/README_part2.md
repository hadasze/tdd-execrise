# 📠 Crash Course RPC Workshop - part 2 & bonuses 

- [Introduction](#introduction)
- [Tasks](#tasks)
- [Bonus](#bonus)
- [Guidelines](#guidelines)

## Introduction

In this workshop you'll learn how to use other services via RPC. We'll create a small **Comments App** that enables you to add comments and view them. We use **`CommentsService`** to manage our comments.

## Tasks

 > Please note that the following tasks are not arranged in a TDD order. This is because we want you to focus on using new technologies. Feel free to use TDD anyway!

4. Add a component test. Use bm-flow testkit in order to [mock your server response](https://bo.wix.com/pages/yoshi/docs/business-manager-flow/testing/component-tests#serverless).
5. Add a Sled test for your new UI, testing that comments are displayed correctly.
  
  Please note:
  
    - Sled tests should run against your production data, so please verify that you have some data in production (you can use the [Api Explorer](https://pbo.wixpress.com/wix-api-explorer) or RPC console in order to trigger an "add" function call and add some dummy data).
    - You should run `npm run build` before running your sled tests, and after each change in your production code (no need to run build after a change in the test itself).

## Bonus

6. Add an `add` server function that adds a single comment to the `commentsService` using the appropriate RPC method. Write server e2e tests / sled tests for it.

## Guidelines

* Use [API explorer](https://pbo.wixpress.com/wix-api-explorer) to find the RPC service (search for `CommentsService`).
* Use [ambassador](https://github.com/wix-private/ambassador) to integrate with comments service.
* Bonus: Use TDD
* A [solution example](https://github.com/wix-a/cc-2-2021-ambassador) (please try to do it on your own, look at the example only if you're stuck / as a reference)
