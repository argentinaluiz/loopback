export default [
  {
    model: 'Genre',
    fields: {
      id: '1-gen',
      name: 'Ação',
      is_active: true,
      created_at: '2020-01-01T00:00:00+0000',
      updated_at: '2020-01-01T00:00:00+0000',
      categories: [
        {id: '1-cat', name: 'Filme', is_active: true},
        {id: '3-cat', name: 'Infantil', is_active: true},
      ],
    },
  },
  {
    model: 'Genre',
    fields: {
      id: '2-gen',
      name: 'Comédia',
      is_active: true,
      created_at: '2020-01-01T00:00:01+0000',
      updated_at: '2020-01-01T00:00:01+0000',
      categories: [
        {id: '1-cat', name: 'Filme', is_active: true},
        {id: '3-cat', name: 'Infantil', is_active: true},
      ],
    },
  },
  {
    model: 'Genre',
    fields: {
      id: '3-gen',
      name: 'Ficção',
      is_active: true,
      created_at: '2020-01-01T00:00:02+0000',
      updated_at: '2020-01-01T00:00:02+0000',
      categories: [
        {id: '1-cat', name: 'Filme', is_active: true},
        {id: '3-cat', name: 'Infantil', is_active: true},
      ],
    },
  },
  {
    model: 'Genre',
    fields: {
      id: '4-gen',
      name: 'Terror',
      is_active: true,
      created_at: '2020-01-01T00:00:03+0000',
      updated_at: '2020-01-01T00:00:03+0000',
      categories: [{id: '1-cat', name: 'Filme', is_active: true}],
    },
  },
  {
    model: 'Genre',
    fields: {
      id: '5-gen',
      name: 'Suspense',
      is_active: true,
      created_at: '2020-01-01T00:00:04+0000',
      updated_at: '2020-01-01T00:00:04+0000',
      categories: [
        {id: '1-cat', name: 'Filme', is_active: true},
        {id: '3-cat', name: 'Infantil', is_active: true},
      ],
    },
  },
  {
    model: 'Genre',
    fields: {
      id: '6-gen',
      name: 'Expositivo',
      is_active: true,
      created_at: '2020-01-01T00:00:05+0000',
      updated_at: '2020-01-01T00:00:05+0000',
      categories: [{id: '2-cat', name: 'Documentário', is_active: true}],
    },
  },
  {
    model: 'Genre',
    fields: {
      id: '7-gen',
      name: 'Observativo',
      is_active: true,
      created_at: '2020-01-01T00:00:06+0000',
      updated_at: '2020-01-01T00:00:06+0000',
      categories: [{id: '2-cat', name: 'Documentário', is_active: true}],
    },
  },
];
