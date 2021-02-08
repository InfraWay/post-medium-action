# medium-post-markdown
Github Action for posting a markdown post to medium.com

## Inputs

### `app_id`

**Required** Application id. Create one on the [page](https://medium.com/me/applications).

### `app_secret`

**Required** Application secret.

### `access_token`

**Required** User's access token. Create one on the [page](https://medium.com/me/settings).

### `markdown_file`

**Required** The markdown file path of the article.

### `base_url`

Base blog's url e.g. https://myblog.com

### `post_status`

Post's status. Valid values are `draft`, `public`, or `unlisted`. Default `draft`. 

### `post_license`

Post's license. Valid values are `all-rights-reserved`, `cc-40-by`, `cc-40-by-sa`, `cc-40-by-nd`, `cc-40-by-nc`, `cc-40-by-nc-nd`, `cc-40-by-nc-sa`, `cc-40-zero`, `public-domain`. Default `all-rights-reserved`.

## Outputs

### `id`

ID of the created post.

### `url`

Medium URL of the created post.

## Example usage
Let's assume the post markdown file is located at `./content/post.md`.

```yaml
name: publish-to-medium
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Read the post
        id: post
        run: echo "::set-output name=data::$(cat ./content/post.md)"
      - uses: infraway/medium-post-markdown@v1
        with:
          app_id: ${{ secrets.MEDIUM_APP_ID }}
          app_secret: ${{ secrets.MEDIUM_APP_SECRET }}
          access_token: ${{ secrets.MEDIUM_ACCESS_TOKEN }}
          markdown: ${{ steps.post.outputs.data }}
```
