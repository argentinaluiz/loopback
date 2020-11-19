import {CastMemberType} from '../models';

export default [
  {
    model: 'CastMember',
    fields: {
      id: '1-cas',
      name: 'Julio Chavez',
      type: CastMemberType.ACTOR,
      created_at: '2020-01-01T00:00:00+0000',
      updated_at: '2020-01-01T00:00:00+0000',
    },
  },
  {
    model: 'CastMember',
    fields: {
      id: '2-cas',
      name: 'Cecília',
      type: CastMemberType.ACTOR,
      created_at: '2020-01-01T00:00:01+0000',
      updated_at: '2020-01-01T00:00:01+0000',
    },
  },
  {
    model: 'CastMember',
    fields: {
      id: '3-cas',
      name: 'Jorge Nisco',
      type: CastMemberType.DIRECTOR,
      created_at: '2020-01-01T00:00:02+0000',
      updated_at: '2020-01-01T00:00:02+0000',
    },
  },
];
