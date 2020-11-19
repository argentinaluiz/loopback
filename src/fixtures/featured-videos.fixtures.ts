import videos from './videos.fixtures';

export default [
  {
    model: 'FeaturedVideo',
    fields: {
      id: '1-fea',
      video: videos[0].fields,
      order: 2,
      is_active: true,
      created_at: '2020-01-01T00:00:01+0000',
      updated_at: '2020-01-01T00:00:01+0000',
    },
  },
  {
    model: 'FeaturedVideo',
    fields: {
      id: '2-fea',
      video: videos[1].fields,
      order: 2,
      is_active: true,
      created_at: '2020-01-01T00:00:02+0000',
      updated_at: '2020-01-01T00:00:02+0000',
    },
  },
];
