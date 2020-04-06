import "isomorphic-fetch";
import Layout from "../components/Layout";
import ChannelGrid from "../components/ChannelGrid";

export default class extends React.Component {
  static async getInitialProps() {
    let request = await fetch("https://api.audioboom.com/channels/recommended");
    let { body: channels } = await request.json();

    return { channels };
  }

  render() {
    const { channels } = this.props;

    return (
      <Layout title="Podcasts">
        <ChannelGrid channels={channels} />
      </Layout>
    );
  }
}
