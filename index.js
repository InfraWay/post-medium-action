const fs = require('fs');
const sdk = require('medium-sdk');
const md = require('meta-marked');

const {
  INPUT_APP_ID,
  INPUT_APP_SECRET,
  INPUT_ACCESS_TOKEN,

  INPUT_MARKDOWN_FILE,
  INPUT_BASE_URL,
  INPUT_POST_STATUS = sdk.PostPublishStatus.DRAFT,
  INPUT_POST_LICENSE = sdk.PostLicense.ALL_RIGHTS_RESERVED,
} = process.env;

const client = new sdk.MediumClient({ clientId: INPUT_APP_ID, clientSecret: INPUT_APP_SECRET });
client.setAccessToken(INPUT_ACCESS_TOKEN);

const getUser = async () => {
  return new Promise((resolve, reject) => {
    client.getUser((err, user) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(user);
    });
  });
};

const createPost = async (userId, postUrl, title, tags, markdown) => {
  return new Promise((resolve, reject) => {
    client.createPost({
      userId,
      title: title,
      tags: tags,
      canonicalUrl: postUrl,
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

const getFileContents = async (filepath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
};

const replaceLocalLinks = (content) => {
  return content.replace(/\]\((\/[^\)]+)\)/gi, `](${INPUT_BASE_URL}$1)`)
};

(async () => {
  try {
    const data = await getFileContents(INPUT_MARKDOWN_FILE);
    const { id } = await getUser();
    const { meta, markdown } = md(replaceLocalLinks(data));
    const { title, tags = [], slug } = meta || {};
    const postUrl = `${INPUT_BASE_URL}/posts/${slug}`;
    const post = await createPost(id, postUrl, title, tags, markdown);
    console.log(`::set-output name=id::${post.id}`);
    console.log(`::set-output name=url::${post.url}`);
    process.exit(0);
  } catch (err) {
    console.log(`::error ::${err.message}`);
    process.exit(1);
  }
})();
