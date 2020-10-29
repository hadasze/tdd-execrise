# 🛍️ Store Manager

> Crash course final summarizing project

## Table of Contents

* [Introduction](#introduction)
* [Product Specification](#product-specification)
  + [Products List](#products-list)
  + [New Product](#new-product)
  + [View Product](#view-product)
* [Technical Description](#technical-description)
  + [UI](#ui)
  + [Data Persistence](#data-persistence)
  + [Testing](#testing)
* [Best Practices and Tips](#best-practices-and-tips)
* [Enhancing Our Product](#enhancing-our-product)
  + [Translations](#translations)
  + [Monitoring](#monitoring)
  + [Analytics](#analytics)
* [Bonus Tasks](#bonus-tasks)
  + [Get a Small Bundle-size](#get-a-small-bundle-size)
  + [Add a 404 page](#add-a-404-page)
  + [Giphy Integration](#giphy-integration)
* [Finally](#finally)

## Introduction

Congratulations on getting this far. So far you created a [Tic Tac Toe](https://github.com/wix-a/tic-tac-toe-3) game, along with an awesome leaderboard. Then you learned about RPC and used [Ambassador](https://github.com/wix-private/ambassador) to create a comments system. You also learned about [Wix Style React](https://github.com/wix/wix-style-react) and used it to create some pretty cool UIs.

## Before you start

Generate a project with [Create Yoshi App](https://wix.github.io/yoshi/docs/getting-started/create-app) and follow the [Zero to Production](https://github.com/wix-private/fed-handbook/blob/master/ZERO_TO_PRODUCTION.md) guide. Please make sure your projects have the following prefix: **fed-onboarding-YOURNAME**.

**GA** this project and verify it's configured correctly (i.e you can see in production) before you start the final project.

Please make sure you configure Fryingpan mappings to use the **BO domain** (`bo._base_domain_` -> bo.wix.com). This allows your app to be accessible only from office and VPN.

This is the repo you will use from now on :smile:

Now, it's up to you to use your knowledge and skills to create your very own Store Manager App.

## Product specification

A store manager is a back-office web app that lets a store owner manage its store, add new products and view them.

### Products List

Shows a list of products. Each product has its name, description, price and an image.

This is how it looks when we only have a single product:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/098135DD-16C8-4BCB-81E5-6A617DB899F2.png" width="500" />

Or when we have three products:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/F2263E94-45A1-4E1A-B3D2-E8B279694F4E.png" width="500" />

Sometimes we don't have any products to show, so we present an empty state:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/19EE35C7-F7B2-4F85-A90A-93CE75909606.png" width="500" />

New products can be created by clicking the "Add new product" button (See mockups above). When it's clicked, the user should see a form to add a new product:

### New Product

We're still not sure about this part, so we will only enable it if a [Petri](https://bo.wix.com/petri) experiment is enabled:

We should show the "add item" button only if the experiment is enabled. 

tip: What happens if the user goes directly to 'my-site/new-item', and the experiment is disabled?

New product page:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/750D6EB8-30CC-42C2-B02F-332B04505512.png" width="500" />

Every field is mandatory, and the "Save" button should be enabled only if all fields have been filled. When the image URL is inserted, we should show the image preview below the input:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/D517D451-395E-41D8-858B-D8FAB95D5E08.png" width="500" />

### View Product

When a user hovers one of the products, we should show a "View" button with an overlay on the image:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/A988F8D0-08D3-49BF-97B9-CA5A09335A29.png" width="500" />

When clicked, it should open a modal that shows all of the data about this specific product:

<img src="https://cdn.zeplin.io/5d1dadba4aefe174bcede0c3/screens/F546E7E9-3AA7-4489-88DC-D12A07AA298C.png" width="500" />

## Technical Description

### UI

The UI that we need to construct looks good but it can take some time to create. Luckily, we can use [Wix Style React](https://wix-wix-style-react.surge.sh) to speed it up. Every component we need should be available, along with a testkit.

It's recommended that you [install Zeplin](https://support.zeplin.io/en/articles/244698-downloading-mac-and-windows-apps)  and open the [project's mockups](https://zpl.io/V45nNA0) in it. You should be able to see which [Wix Style React](https://wix-wix-style-react.surge.sh/?selectedKind=Introduction&selectedStory=Components%20Cheatsheet&full=0&addons=0&stories=1&panelRight=0) components should be used, and with which props.

### Data Persistence

For fetching existing products or adding new products, we should use the `ProductsService` RPC service. You should find it in the [API Explorer](https://pbo.wixpress.com/wix-api-explorer) (make sure you're connected to VPN) and play with how it works with the [RPC Console](https://pbo.wixpress.com/rpc-console-poc) (also requires you to be connected to VPN).

The `ProductsService` requires an `id` whenever you fetch or add products. This is a way to identify a specific User. Each team should have its own unique `id`. Visit [UUID Generator](https://www.uuidgenerator.net) to get your own `id`.

Install Ambassador and the corresponding service:

```sh
npm install @wix/ambassador @wix/ambassador-crash-course-products-scala-app
```

### Testing

We will use [Puppeteer](https://github.com/GoogleChrome/puppeteer), [Jest](https://github.com/facebook/jest), and [Yoshi](https://github.com/wix/yoshi), along with [Ambassador](https://github.com/wix-private/ambassador) and various testkits to test our app from end to end. Also, we should use [Jest](https://github.com/facebook/jest) and [JSDOM](https://github.com/jsdom/jsdom) (which is set-up for us already) for component or unit tests.

Every feature and logic in the application should be tested. This is an opportunity to practice using Test-Driven-Development. If you find a bug, create a failing test for it and fix it, don't fix it right away.

## Best Practices and Tips

- **Merge/commit to `master` and deploy often:** If something doesn't work, it will be easier for you to understand what caused it.

- **Use Petri-Sidekick:** See your experiment live on production with [Petri Sidekick](https://chrome.google.com/webstore/detail/wix-petri-sidekick/hpdjckcenihbjfmaccadiaighajcjope).

- **Explore the Fed-Handbook:** The [Fed-Handbook](https://github.com/wix-private/fed-handbook) includes information about a lot of tools and services in Wix and how to integrate with them. Look at the table of content if you don't know or remember how to use a Wix tool or technology.

## Enhancing Our Product

As you work on the final project, we will take short breaks to explain how to enhance your apps with various features. Once we do, you should find the time to add those to your app.

### Translations

We can't create the number 1 store manager if we only have content in one language. To support multiple languages, we will use [Wix's internal translation tools](https://github.com/wix-private/fed-handbook/blob/master/TRANSLATION.md) and [i18next](https://www.i18next.com) to also support Lithuanian and Russian.

Setting up a project in [Babel](https://bo.wix.com/wix-babel-webapp/babel) takes too long to set up specifically for the Crash Course. Instead of working with it, you should use the translation files in the [translation folder](https://github.com/wix-a/cc-final-project/tree/master/translations) and copy them to your project. In a real-world project, [Babel](https://bo.wix.com/wix-babel-webapp/babel) will be committing to your project to update those files.

Finally, you should use [i18next](https://www.i18next.com) and [react-i18next](https://react.i18next.com) to output the correct value for each key.

### Monitoring

To create a resilient app, we need to get an alert when important flows stop working. The most important flow of our app is the flow of adding a new product. To be notified when saving a product fails, we will monitor it with the [FedOps Logger](https://github.com/wix-private/fed-infra/blob/master/fedops/fedops-logger/README.md), which is one of [Wix's internal monitoring tools](https://github.com/wix-private/fed-handbook/blob/master/MONITORING.md).

We will track the interaction of adding a new product: When the user clicks the "Save" button, we should start an interaction before making a call to the server and end it when the server responds successfully.

Also, we should move the call to `appLoaded()` to the appropriate place in our app, when the app has successfully loaded.

### Analytics

We will track what our users are doing in our app so that we can evaluate the effects of new features and changes to our product.

We'll use [Wix's internal BI tools](https://github.com/wix-private/fed-handbook/blob/master/BI.md) to track the BI events according to the schema in the [BI Catalog](https://bo.wix.com/bi-catalog-webapp/#/sources/11/events/8000?artifactId=com.wixpress.fed-crash-course). The project name in BI catalog is `fed-crash-course`.

Install `web-bi-logger` and the corresponding `schema-logger`:

```sh
npm i web-bi-logger bi-logger-fed-crash-course
```

## Bonus Tasks

### Get a Small Bundle-size

Use [Code-Splitting](https://webpack.js.org/guides/code-splitting) along-side [React Suspense](https://reactjs.org/docs/code-splitting.html) to get a smaller bundle-size without negatively affecting the initial render.

Also, inspect the contents of your bundle by running `npx yoshi build --analyze`.

### Add a 404 Page

What happens if our client-side fetches a product from the server and it doesn't exist on the RPC endpoint? Instead of failing, show a nice 404 page on the client-side.

Tip: Integrate a router ([React-Router](https://reacttraining.com/react-router/web) or [Reach-Router](https://reacttraining.com/react-router/web) are two suggestions) into your app.

### Giphy Integration

Searching for images in another tab whenever we want to add a new product isn't the best UX. Instead, create an experiment that removes the standard image input and use [Giphy's API](https://developers.giphy.com/docs/api/endpoint) to find the best matching image for the product name being entered.

## Finally

The purpose of this project is to practice the study material and improve your skills. There are no rewards (Other than a free MacBook Pro for the winner :computer:) and you should focus on quality other than speed.

As you work, the mentors will review your code with you and give you feedback. Feel free to ask for their help whenever you need it.

At the final day, each team will present their project and talk about a challenge or two that they had, and how they solved it.

Please remember to [remove your project](https://github.com/wix-private/fed-handbook/blob/master/ZERO_TO_PRODUCTION.md#cleanup) from production when the crash course is over.

Peace 🎤
