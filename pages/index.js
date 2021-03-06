import "isomorphic-fetch";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";
import Error from "next/error";

export default class extends React.Component {
  static async getInitialProps({ res }) {
    try {
      let request = await fetch(
        "https://api.audioboom.com/channels/recommended"
      );
      let { body: channels } = await request.json();

      return { channels, statusCode: 200 };
    } catch (error) {
      res.statusCode = 503
      return { channels: null, statusCode: 503 };
    }
  }

  render() {
    const { channels, statusCode } = this.props;

    if (statusCode !== 200) {
      return <Error statusCode={statusCode}></Error>;
    }

    return (
      <Layout title="Podcasts">
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}
