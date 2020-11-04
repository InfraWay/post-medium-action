const sdk = require('medium-sdk');
const md = require('meta-marked');

const {
  INPUT_APP_ID,
  INPUT_APP_SECRET,
  INPUT_ACCESS_TOKEN,

  INPUT_USER_ID,
  INPUT_MARKDOWN,
  INPUT_POST_URL,
  INPUT_POST_STATUS = sdk.PostPublishStatus.DRAFT,
  INPUT_POST_LICENSE = sdk.PostLicense.ALL_RIGHTS_RESERVED,
} = process.env;

const client = new sdk.MediumClient({ clientId: INPUT_APP_ID, clientSecret: INPUT_APP_SECRET });
client.setAccessToken(INPUT_ACCESS_TOKEN);

const createPost = async (title, tags, markdown) => {
  return new Promise((resolve, reject) => {
    client.createPost({
      userId: INPUT_USER_ID,
      title: title,
      tags: tags,
      canonicalUrl: INPUT_POST_URL,
      publishStatus: INPUT_POST_STATUS,
      license: INPUT_POST_LICENSE,
      contentFormat: sdk.PostContentFormat.MARKDOWN,
      content: markdown,
    }, (err, post) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(post);
    });
  });
};

(async () => {
  try {
    const { meta, markdown } = md(INPUT_MARKDOWN);
    const { title, tags = [] } = meta;
    const post = await createPost(title, tags, markdown);
    console.log(`::set-output name=id::${post.id}`);
    process.exit(0);
  } catch (err) {
    console.log(`::error ::${err.stack}`);
    process.exit(1);
  }
})();
