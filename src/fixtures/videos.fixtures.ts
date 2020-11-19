export default [
  {
    model: 'Video',
    fields: {
      id: '1-vid',
      title: 'Epitafios',
      description:
        'A série acompanha a procura de Renzo Márquez (Julio Chávez) e Marina Segal (Cecilia Roth) por esclarecimentos sobre casos de homicídio que vem ocorrendo sem nenhuma lógica. Eles passam a contar com a ajuda do detetive Mariano Lagos (Juan Minujin) e de um paciente psiquiátrico XL (Alejandro Awada), e,  juntos eles conseguem prever quais serão as próximas vítimas do serial killer e, assim, tentar evitar o pior.',
      year_launched: 2004,
      opened: true,
      rating: '16',
      duration: 624,
      thumb_file_url:
        'http://localhost:8000/storage/videos/1-vid/1-vid-thumb-01.jpg',
      banner_file_url:
        'http://localhost:8000/storage/videos/1-vid/1-vid-banner-01.jpg',
      banner_half_file_url:
        'http://localhost:8000/storage/videos/1-vid/1-vid-banner-half-01.jpg',
      trailer_file_url: null,
      video_file_url: null,
      is_active: true,
      categories: [{id: '1-cat', name: 'Filme', is_active: true}],
      genres: [{id: '5-gen', name: 'Suspense', is_active: true}],
      cast_members: [
        {id: '1-cas', name: 'Julio Chavez', type: 2},
        {id: '2-cas', name: 'Cecília', type: 2},
        {id: '3-cas', name: 'Jorge Nisco', type: 1},
      ],
      created_at: '2020-01-01T00:00:00+0000',
      updated_at: '2020-01-01T00:00:00+0000',
    },
  },
  {
    model: 'Video',
    fields: {
      id: '2-vid',
      title: 'Epitafios',
      description:
        'A série acompanha a procura de Renzo Márquez (Julio Chávez) e Marina Segal (Cecilia Roth) por esclarecimentos sobre casos de homicídio que vem ocorrendo sem nenhuma lógica. Eles passam a contar com a ajuda do detetive Mariano Lagos (Juan Minujin) e de um paciente psiquiátrico XL (Alejandro Awada), e,  juntos eles conseguem prever quais serão as próximas vítimas do serial killer e, assim, tentar evitar o pior.',
      year_launched: 2004,
      opened: true,
      rating: '16',
      duration: 624,
      thumb_file_url:
        'http://localhost:8000/storage/videos/2-vid/2-vid-thumb-02.jpg',
      banner_file_url:
        'http://localhost:8000/storage/videos/2-vid/2-vid-banner-02.jpg',
      banner_half_file_url:
        'http://localhost:8000/storage/videos/2-vid/2-vid-banner-half-02.jpg',
      trailer_file_url: null,
      video_file_url: null,
      is_active: true,
      categories: [{id: '1-cat', name: 'Filme', is_active: true}],
      genres: [{id: '5-gen', name: 'Suspense', is_active: true}],
      cast_members: [
        {id: '1-cas', name: 'Julio Chavez', type: 2},
        {id: '2-cas', name: 'Cecília', type: 2},
        {id: '3-cas', name: 'Jorge Nisco', type: 1},
      ],
      created_at: '2020-01-01T00:00:00+0000',
      updated_at: '2020-01-01T00:00:00+0000',
    },
  },
];
