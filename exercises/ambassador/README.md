# 📠 Crash Course RPC Workshop

- [Introduction](#introduction)
- [Installation](#installation)
- [Tasks](#tasks)
- [Bonus](#bonus)
- [Guidelines](#guidelines)
- [Ambassador](#ambassador)
  * [Getting Started with Ambassador](#getting-started-with-ambassador)
  * [Install Ambassador's Package For Comments Service](#install-ambassadors-package-for-comments-service)
- [Local Development](#local-development)

## Introduction

In this workshop you'll learn how to use other services via RPC. We'll create a small **Comments App** that enables you to add comments and view them. We use **`CommentsService`** to manage our comments.

## Installation

* Generate a new Yoshi project in [BM-flow](https://bo.wix.com/pages/yoshi/docs/business-manager-flow/overview) & Typescript

## Tasks

 > Please note that the following tasks are not arranged in a TDD order. This is because we want you to focus on using new technologies. Feel free to use TDD anyway!

1. Add a `fetch` [server function](https://bo.wix.com/pages/yoshi/docs/yoshi-server/usage) that returns the comments list from the `commentsService` using the appropriate RPC method.
2. Write a [server e2e test](https://bo.wix.com/pages/yoshi/docs/yoshi-server/testing#server-e2e-tests) that tests your function. More details about server e2e using Ambasador testkit [here](https://github.com/wix-private/ambassador-testkit#integration-tests-server-e2e).
3. [Call](https://bo.wix.com/pages/yoshi/docs/business-manager-flow/yoshi-server#consume-your-api) the new server function from your client and implement a very simple UI that shows comments. 
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

## Ambassador
### Getting Started with Ambassador
Install and configure ambassador in your project by following the instructions in the [ambassador readme](https://github.com/wix-private/ambassador#usage).

### Install Ambassador's Package For Comments Service
We want to use the `CommentsService`, which is part of the Node Workshop Scala Application (`com.wixpress.npm.node-workshop-scala-app`). In order to use it, we need to install the npm package for that application.

Read about how you can find the correct npm package for the node workshop artifact using [`ambassador lookup`](https://github.com/wix-private/ambassador#adding-dependencies).

## Local Development
There are two options:
1. Use real production data - Work locally, against production, with your server running in production. Run `npm start -- --production`. No need to mock anything!
2. If you want to use your server locally, create a `dev/mocks` file, which will get the Ambassador testkit as an argument, and stub the RPC methods which you want to use. Don't forget to `start` the testkit, so your app can use it! See [Business Manager Local Development](https://bo.wix.com/pages/yoshi/docs/business-manager-flow/yoshi-server#local-development) for more details.
