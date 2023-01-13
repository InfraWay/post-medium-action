# medium-post-markdown
Github Action for posting a markdown post to medium.com

## Inputs

### `access_token`

**Required** User's access token. Create one on the [page](https://medium.com/me/settings).

### `markdown_file`

**Required** The markdown file path of the article.

### `base_url`

Base blog's url e.g. https://myblog.com

### `post_url`

Base blog's post url e.g. https://myblog.com/posts. If not specified, `base_url` is used. 

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

### Post content from static file

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
      - uses: infraway/medium-post-markdown@v1.5.0
        with:
          access_token: ${{ secrets.MEDIUM_ACCESS_TOKEN }}
          markdown: ${{ steps.post.outputs.data }}
```

### Post content from newly committed file

This example gets files from commit, find blog posts and publish it to Medium.

- `steps.files.outputs.added_modified` extracts add+modified files. If you need added only, use `steps.files.outputs.added` instead.
- `content/posts` - a repo folder, which contains markdown posts. Replace with your own. 
- `steps.posts.outputs.post0` - markdown posts path, it will contain as many as you have added `post0`, `post1`, `post2`. 

```yaml
name: publish-to-medium
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - id: files
      uses: jitterbit/get-changed-files@v1
      - id: posts
        name: Detecting posts from the changes
        run: |
          i=0
          for changed_file in ${{ steps.files.outputs.added_modified }}; do
            echo "Do something with ${changed_file}."
            if [[ "${changed_file}" == "content/posts"* ]];
            then
              echo "File ${changed_file} matched post."
              echo "::set-output name=post${i}::${changed_file}"
              ((i=i+1))
            fi
          done
      - if: steps.posts.outputs.post0
        name: Publish to medium
        uses: infraway/post-medium-action@v1.6.0
        with:
          access_token: ${{ secrets.MEDIUM_ACCESS_TOKEN }}
          markdown_file: ${{ steps.posts.outputs.post0 }}
          base_url: https://myblog.com
          post_url: https://myblog.com/posts
```
