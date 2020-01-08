export default {
    "name": "esv7",
    "connector": "esv6",
    "version": 7,
    "index": "videos",
    "debug": true,
    "configuration": {
        "node": process.env.ELASTIC_SEARCH_HOST,
        "requestTimeout": 30000,
        "pingTimeout": 3000,
    },
    //"defaultSize": 50,
    //lembrar de como era o mapping antes
    // "mappings": [
    //     {
    //         "name": "Category",
    //         "properties": {
    //             "id": {"type": "string", "index": false},
    //             "name": {"type": "text"},
    //         }
    //     },
    //     {
    //         "name": "Video",
    //         "properties": {
    //             "id": {"type": "string", "index": false},
    //             "title": {"type": "text"},
    //         }
    //     }
    // ]
    "mappingProperties": {
        "docType": {
            "type": "keyword",
        },
        "id": {
            "type": "keyword",
        },
        "name": {
            "type": "text",
        },
        "title": {
            "type": "keyword",
        },
        "description": {
            "type": "text",
            "index": false
        },
        "year_launched": {
            "type": "short",
        },
        "opened": {
            "type": "boolean",
        },
        "rating": {
            "type": "keyword",
        },
        "duration": {
            "type": "short",
        },
        "thumb_file_url": {
            "type": "keyword",
            "index": false
        },
        "banner_file_url": {
            "type": "keyword",
            "index": false
        },
        "trailer_file_url": {
            "type": "keyword",
            "index": false
        },
        "video_file_url": {
            "type": "keyword",
            "index": false
        },
        "is_active": {
            "type": "boolean",
        },
        "type": {
            "type": "byte",
        },
        "updated_at": {
            "type": "date",
        },
        // "deleted_at": {
        //     "type": "date",
        //     "index": false
        // },
        "categories": {
            "type": "nested",
            "properties": {
                "id": {"type": "keyword"},
                "name": {"type": "text"},
                "is_active": {"type": "boolean"},
                // "deleted_at": {"type": "date"},
            }
        },
        "genres": {
            "type": "nested",
            "properties": {
                "id": {"type": "keyword"},
                "name": {"type": "text"},
                // "deleted_at": {"type": "date"},
            }
        },
        "cast_members": {
            "type": "nested",
            "properties": {
                "id": {"type": "keyword"},
                "name": {"type": "text"},
                "type": {"type": "byte"},
                // "deleted_at": {"type": "date"},
            }
        }
    }
}
