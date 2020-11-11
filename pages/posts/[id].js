import Link from 'next/link';
import Head from 'next/head';
import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }) {
  const { id, title, date } = postData;
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <h1>{title}</h1>
      <div>{id}</div>
      <div>{date}</div>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      <br />
      <div>
        <Link href='/'>
          <a>Back to Home</a>
        </Link>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
