# 📠 Crash Course RPC Workshop

- [Introduction](#introduction)
- [Installation](#installation)
- [Tasks](#tasks)
- [Bonus](#bonus)
- [Guidelines](#guidelines)
- [Step by Step](#step-by-step)
  * [Getting Started with Ambassador](#getting-started-with-ambassador)
  * [Install Ambassador's Package For Comments Service](#install-ambassadors-package-for-comments-service)
  * [Get Your Testing Environment Ready](#get-your-testing-environment-ready)
  * [TDD](#tdd)
  * [Implement](#implement)
- [Local Development](#local-development)

## Introduction

In this workshop you'll learn how to use other services via RPC. We'll create a small **Comments App** that enables you to add comments and view them. We use **`CommentsService`** to manage our comments.

## Installation

* Fork this repo
* Run `npm install`

## Tasks

1. Add a `fetch` server function that returns the comments list from the `commentsService` using the appropriate RPC method.
2. Add a `add` server function that adds a single comment to the `commentsService` using the appropriate RPC method.

## Bonus

3. Add A simple UI to view your comments and add new comments. Write a Sled e2e test for it!

## Guidelines

* Use [API explorer](https://pbo.wixpress.com/wix-api-explorer) to find the RPC service (search for `CommentsService`).
* Use TDD
* Use [ambassador](https://github.com/wix-private/ambassador) to integrate with comments service.

## Step by Step
### Getting Started with Ambassador
Install and configure ambassador in your project by following the instructions in the [ambassador readme](https://github.com/wix-private/ambassador#usage).

### Install Ambassador's Package For Comments Service
We want to use the `CommentsService`, which is part of the Node Workshop Scala Application (`com.wixpress.npm.node-workshop-scala-app`). In order to use it, we need to install the npm package for that application.

Read about how you can find the correct npm package for the node workshop artifact using [`ambassador lookup`](https://github.com/wix-private/ambassador#adding-dependencies).

### Get Your Testing Environment Ready
We want to use the Ambassador Testkit to test our server in the `server.e2e.js` test file. Follow the guide in [the Ambassador Testkit README](https://github.com/wix-private/ambassador-testkit#integration-tests-server-e2e) and get yourself started with server e2e tests.

### TDD
Write a test case that covers one of your server's routes, using the Ambassador Testkit. You can refer to the [Testkit API](https://github.com/wix-private/ambassador-testkit#api) in order to get to know the testkit better. You are also advised to use the [builder utilities](https://github.com/wix-private/ambassador#builder-utilities) in the `node-workshop-scala-app` package, for easier generation of stub data.

### Implement
Once your test case is ready (and failing, of course!) go ahead and implement the actual code in your server. If you need a reminder on how to do that, refer to [ambassador readme](https://github.com/wix-private/ambassador#using-rpc-servers-in-your-code).

## Local Development
If you want to use your server locally, create a `dev/mocks` file, which will get the Ambassador testkit as an argument, and stub the RPC methods which you want to use. Don't forget to `start` the testkit, so your app can use it! See [Business Manager Local Development](https://bo.wix.com/pages/yoshi/docs/business-manager-flow/yoshi-server#local-development) for more details.
