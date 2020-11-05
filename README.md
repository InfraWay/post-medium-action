# medium-post-markdown
Github Action for posting a markdown post to medium.com

## Inputs

### `app_id`

**Required** Application id. Create one on the [page](https://medium.com/me/applications).

### `app_secret`

**Required** Application secret.

### `access_token`

**Required** User's access token. Create one on the [page](https://medium.com/me/settings).

### `markdown`

**Required** The markdown content of the article.

### `post_url`

Canonical post url if the article was published elsewhere.

### `post_status`

Post's status. Valid values are `draft`, `public`, or `unlisted`. Default `draft`. 

### `post_license`

Post's license. Valid values are `all-rights-reserved`, `cc-40-by`, `cc-40-by-sa`, `cc-40-by-nd`, `cc-40-by-nc`, `cc-40-by-nc-nd`, `cc-40-by-nc-sa`, `cc-40-zero`, `public-domain`. Default `all-rights-reserved`.

## Outputs

### `id`

ID of the created post.

## Example usage

uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'
