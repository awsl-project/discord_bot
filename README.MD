# Discord Bot

## Register commands

The following command only needs to be run once:

```
$ npm run register
```

## Run app

Now you should be ready to start your server:

```bash
$ npm run dev
```

## Setup app

![interactions-endpoint](https://user-images.githubusercontent.com/534619/157510959-6cf0327a-052a-432c-855b-c662824f15ce.png)

### Storing secrets

The credentials in `.dev.vars` are only applied locally. The production service needs access to credentials from your app:

```bash
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID
```
