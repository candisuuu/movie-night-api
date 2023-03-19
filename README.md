# Movie Night Cloudflare Worker

> A Cloudflare worker that serves data for a react app that enables users to search and upvote movies they want to watch for a movie night. Created using [Wrangler](https://www.npmjs.com/package/wrangler).

## Updates

### 3/19/2023
* Added method to delete upvoted movie when total upvotes reach 0

## Installing/Getting started

It's required to have [npm](https://www.npmjs.com/get-npm) and [Wrangler](https://www.npmjs.com/package/wrangler) installed locally, and to have a [Cloudflare account](https://www.cloudflare.com/) and an [OMDb API](https://www.omdbapi.com/) key to follow the instructions. Refer to Cloudflare's [Get started guide](https://developers.cloudflare.com/workers/get-started/guide/) on how to get Wrangler implemented and working on your local machine.

---

Once you have everything installed, a Cloudflare account, and Wrangler authenticated on your Cloudflare account do the following:

Open the `wrangler.toml` file and enter the name of your Cloudflare worker, the ID value for your `movieNightData` KV namespace, the `OMDB_API_KEY` value for your OMDb API account, and the `ACCESS_CONTROL_ORIGIN` value for the origin of where your movie night app will be hosted.

```sh
# Navigate to where the repo data is located in your machine
$ cd [repo data location]
# Deploy worker to dev environment for local testing
$ npx wrangler dev
# Once worker is ready for production deploy to production
$ wrangler publish
```

## Next Steps for Development
* Refactor callback function(s) that can be used in multiple handlers