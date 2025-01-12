import { nhost } from './nhost';

const getSummaries = `
  query GetSummaries {
    summaries {
      id
      video_url
      title
      summary
      created_at
    }
  }
`;

const createSummary = `
  mutation CreateSummary($video_url: String!, $title: String!, $summary: String!) {
    insert_summaries_one(object: {
      video_url: $video_url,
      title: $title,
      summary: $summary
    }) {
      id
    }
  }
`;

export const summaryService = {
  getSummaries: async () => {
    return await nhost.graphql.request(getSummaries);
  },
  
  createSummary: async (videoUrl: string, title: string, summary: string) => {
    return await nhost.graphql.request(createSummary, {
      video_url: videoUrl,
      title,
      summary
    });
  }
}; 