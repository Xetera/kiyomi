module.exports = {
    "scalars": [
        1,
        2,
        5,
        71,
        84,
        92,
        188,
        277,
        342,
        361,
        378,
        393
    ],
    "types": {
        "Alias": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "Int": {},
        "String": {},
        "AliasCreateManyPersonInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AliasCreateManyPersonInputEnvelope": {
            "data": [
                3
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "Boolean": {},
        "AliasCreateNestedManyWithoutPersonInput": {
            "connect": [
                25
            ],
            "connectOrCreate": [
                8
            ],
            "create": [
                10
            ],
            "createMany": [
                4
            ],
            "__typename": [
                2
            ]
        },
        "AliasCreateNestedOneWithoutPreferredAliasOfInput": {
            "connect": [
                25
            ],
            "connectOrCreate": [
                9
            ],
            "create": [
                11
            ],
            "__typename": [
                2
            ]
        },
        "AliasCreateOrConnectWithoutPersonInput": {
            "create": [
                10
            ],
            "where": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "AliasCreateOrConnectWithoutPreferredAliasOfInput": {
            "create": [
                11
            ],
            "where": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "AliasCreateWithoutPersonInput": {
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "preferredAliasOf": [
                302
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AliasCreateWithoutPreferredAliasOfInput": {
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "person": [
                299
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AliasListRelationFilter": {
            "every": [
                24
            ],
            "none": [
                24
            ],
            "some": [
                24
            ],
            "__typename": [
                2
            ]
        },
        "AliasPersonAliasCompoundUniqueInput": {
            "name": [
                2
            ],
            "personId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "AliasScalarWhereInput": {
            "AND": [
                14
            ],
            "NOT": [
                14
            ],
            "OR": [
                14
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "name": [
                363
            ],
            "personId": [
                274
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateManyWithWhereWithoutPersonInput": {
            "data": [
                15
            ],
            "where": [
                14
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateManyWithoutPersonInput": {
            "connect": [
                25
            ],
            "connectOrCreate": [
                8
            ],
            "create": [
                10
            ],
            "createMany": [
                4
            ],
            "delete": [
                25
            ],
            "deleteMany": [
                14
            ],
            "disconnect": [
                25
            ],
            "set": [
                25
            ],
            "update": [
                19
            ],
            "updateMany": [
                16
            ],
            "upsert": [
                22
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateOneWithoutPreferredAliasOfInput": {
            "connect": [
                25
            ],
            "connectOrCreate": [
                9
            ],
            "create": [
                11
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                21
            ],
            "upsert": [
                23
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateWithWhereUniqueWithoutPersonInput": {
            "data": [
                20
            ],
            "where": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateWithoutPersonInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "preferredAliasOf": [
                325
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpdateWithoutPreferredAliasOfInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "person": [
                321
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpsertWithWhereUniqueWithoutPersonInput": {
            "create": [
                10
            ],
            "update": [
                20
            ],
            "where": [
                25
            ],
            "__typename": [
                2
            ]
        },
        "AliasUpsertWithoutPreferredAliasOfInput": {
            "create": [
                11
            ],
            "update": [
                21
            ],
            "__typename": [
                2
            ]
        },
        "AliasWhereInput": {
            "AND": [
                24
            ],
            "NOT": [
                24
            ],
            "OR": [
                24
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "name": [
                363
            ],
            "person": [
                339
            ],
            "personId": [
                274
            ],
            "preferredAliasOf": [
                339
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "AliasWhereUniqueInput": {
            "id": [
                1
            ],
            "personAlias": [
                13
            ],
            "__typename": [
                2
            ]
        },
        "Appearance": {
            "addedBy": [
                394
            ],
            "createdAt": [
                71
            ],
            "faces": [
                83,
                {
                    "cursor": [
                        111
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "id": [
                1
            ],
            "image": [
                187
            ],
            "person": [
                294
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceAppearanceCompoundUniqueInput": {
            "imageId": [
                1
            ],
            "personId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCount": {
            "count": [
                1
            ],
            "group": [
                114
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateManyAddedByInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "imageId": [
                1
            ],
            "personId": [
                1
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateManyAddedByInputEnvelope": {
            "data": [
                29
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateManyImageInput": {
            "addedById": [
                1
            ],
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "personId": [
                1
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateManyImageInputEnvelope": {
            "data": [
                31
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateManyPersonInput": {
            "addedById": [
                1
            ],
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "imageId": [
                1
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateManyPersonInputEnvelope": {
            "data": [
                33
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateNestedManyWithoutAddedByInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                38
            ],
            "create": [
                42
            ],
            "createMany": [
                30
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateNestedManyWithoutImageInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                40
            ],
            "create": [
                44
            ],
            "createMany": [
                32
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateNestedManyWithoutPersonInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                41
            ],
            "create": [
                45
            ],
            "createMany": [
                34
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateOrConnectWithoutAddedByInput": {
            "create": [
                42
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateOrConnectWithoutFacesInput": {
            "create": [
                43
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateOrConnectWithoutImageInput": {
            "create": [
                44
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateOrConnectWithoutPersonInput": {
            "create": [
                45
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateWithoutAddedByInput": {
            "createdAt": [
                71
            ],
            "faces": [
                86
            ],
            "image": [
                195
            ],
            "person": [
                300
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateWithoutFacesInput": {
            "addedBy": [
                398
            ],
            "createdAt": [
                71
            ],
            "image": [
                195
            ],
            "person": [
                300
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateWithoutImageInput": {
            "addedBy": [
                398
            ],
            "createdAt": [
                71
            ],
            "faces": [
                86
            ],
            "person": [
                300
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceCreateWithoutPersonInput": {
            "addedBy": [
                398
            ],
            "createdAt": [
                71
            ],
            "faces": [
                86
            ],
            "image": [
                195
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceListRelationFilter": {
            "every": [
                67
            ],
            "none": [
                67
            ],
            "some": [
                67
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceScalarWhereInput": {
            "AND": [
                47
            ],
            "NOT": [
                47
            ],
            "OR": [
                47
            ],
            "addedById": [
                274
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "imageId": [
                274
            ],
            "personId": [
                274
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyWithWhereWithoutAddedByInput": {
            "data": [
                48
            ],
            "where": [
                47
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyWithWhereWithoutImageInput": {
            "data": [
                48
            ],
            "where": [
                47
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyWithWhereWithoutPersonInput": {
            "data": [
                48
            ],
            "where": [
                47
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyWithoutAddedByInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                38
            ],
            "create": [
                42
            ],
            "createMany": [
                30
            ],
            "delete": [
                68
            ],
            "deleteMany": [
                47
            ],
            "disconnect": [
                68
            ],
            "set": [
                68
            ],
            "update": [
                56
            ],
            "updateMany": [
                49
            ],
            "upsert": [
                63
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyWithoutImageInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                40
            ],
            "create": [
                44
            ],
            "createMany": [
                32
            ],
            "delete": [
                68
            ],
            "deleteMany": [
                47
            ],
            "disconnect": [
                68
            ],
            "set": [
                68
            ],
            "update": [
                57
            ],
            "updateMany": [
                50
            ],
            "upsert": [
                64
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateManyWithoutPersonInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                41
            ],
            "create": [
                45
            ],
            "createMany": [
                34
            ],
            "delete": [
                68
            ],
            "deleteMany": [
                47
            ],
            "disconnect": [
                68
            ],
            "set": [
                68
            ],
            "update": [
                58
            ],
            "updateMany": [
                51
            ],
            "upsert": [
                65
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateOneWithoutFacesInput": {
            "connect": [
                68
            ],
            "connectOrCreate": [
                39
            ],
            "create": [
                43
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                60
            ],
            "upsert": [
                66
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithWhereUniqueWithoutAddedByInput": {
            "data": [
                59
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithWhereUniqueWithoutImageInput": {
            "data": [
                61
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithWhereUniqueWithoutPersonInput": {
            "data": [
                62
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithoutAddedByInput": {
            "createdAt": [
                72
            ],
            "faces": [
                99
            ],
            "image": [
                249
            ],
            "person": [
                322
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithoutFacesInput": {
            "addedBy": [
                410
            ],
            "createdAt": [
                72
            ],
            "image": [
                249
            ],
            "person": [
                322
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithoutImageInput": {
            "addedBy": [
                410
            ],
            "createdAt": [
                72
            ],
            "faces": [
                99
            ],
            "person": [
                322
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpdateWithoutPersonInput": {
            "addedBy": [
                410
            ],
            "createdAt": [
                72
            ],
            "faces": [
                99
            ],
            "image": [
                249
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpsertWithWhereUniqueWithoutAddedByInput": {
            "create": [
                42
            ],
            "update": [
                59
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpsertWithWhereUniqueWithoutImageInput": {
            "create": [
                44
            ],
            "update": [
                61
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpsertWithWhereUniqueWithoutPersonInput": {
            "create": [
                45
            ],
            "update": [
                62
            ],
            "where": [
                68
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceUpsertWithoutFacesInput": {
            "create": [
                43
            ],
            "update": [
                60
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceWhereInput": {
            "AND": [
                67
            ],
            "NOT": [
                67
            ],
            "OR": [
                67
            ],
            "addedBy": [
                424
            ],
            "addedById": [
                274
            ],
            "createdAt": [
                73
            ],
            "faces": [
                90
            ],
            "id": [
                274
            ],
            "image": [
                271
            ],
            "imageId": [
                274
            ],
            "person": [
                339
            ],
            "personId": [
                274
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "AppearanceWhereUniqueInput": {
            "appearance": [
                27
            ],
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "BoolFieldUpdateOperationsInput": {
            "set": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "BoolFilter": {
            "equals": [
                5
            ],
            "not": [
                279
            ],
            "__typename": [
                2
            ]
        },
        "DateTime": {},
        "DateTimeFieldUpdateOperationsInput": {
            "set": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "DateTimeFilter": {
            "equals": [
                71
            ],
            "gt": [
                71
            ],
            "gte": [
                71
            ],
            "in": [
                71
            ],
            "lt": [
                71
            ],
            "lte": [
                71
            ],
            "not": [
                280
            ],
            "notIn": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "DateTimeNullableFilter": {
            "equals": [
                71
            ],
            "gt": [
                71
            ],
            "gte": [
                71
            ],
            "in": [
                71
            ],
            "lt": [
                71
            ],
            "lte": [
                71
            ],
            "not": [
                281
            ],
            "notIn": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "EnumFaceSourceFieldUpdateOperationsInput": {
            "set": [
                92
            ],
            "__typename": [
                2
            ]
        },
        "EnumFaceSourceFilter": {
            "equals": [
                92
            ],
            "in": [
                92
            ],
            "not": [
                282
            ],
            "notIn": [
                92
            ],
            "__typename": [
                2
            ]
        },
        "EnumMimeTypeFieldUpdateOperationsInput": {
            "set": [
                277
            ],
            "__typename": [
                2
            ]
        },
        "EnumMimeTypeFilter": {
            "equals": [
                277
            ],
            "in": [
                277
            ],
            "not": [
                283
            ],
            "notIn": [
                277
            ],
            "__typename": [
                2
            ]
        },
        "EnumTagSourceFieldUpdateOperationsInput": {
            "set": [
                378
            ],
            "__typename": [
                2
            ]
        },
        "EnumTagSourceFilter": {
            "equals": [
                378
            ],
            "in": [
                378
            ],
            "not": [
                284
            ],
            "notIn": [
                378
            ],
            "__typename": [
                2
            ]
        },
        "EnumUploadTypeFieldUpdateOperationsInput": {
            "set": [
                393
            ],
            "__typename": [
                2
            ]
        },
        "EnumUploadTypeFilter": {
            "equals": [
                393
            ],
            "in": [
                393
            ],
            "not": [
                285
            ],
            "notIn": [
                393
            ],
            "__typename": [
                2
            ]
        },
        "Face": {
            "addedBy": [
                394
            ],
            "appearance": [
                26
            ],
            "createdAt": [
                71
            ],
            "height": [
                84
            ],
            "id": [
                1
            ],
            "image": [
                187
            ],
            "score": [
                84
            ],
            "source": [
                92
            ],
            "updatedAt": [
                71
            ],
            "width": [
                84
            ],
            "x": [
                84
            ],
            "y": [
                84
            ],
            "__typename": [
                2
            ]
        },
        "Float": {},
        "FaceCreateNestedManyWithoutAddedByInput": {
            "connect": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceCreateNestedManyWithoutAppearanceInput": {
            "connect": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceCreateNestedManyWithoutImageInput": {
            "connect": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceCreateNestedManyWithoutPersonInput": {
            "connect": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceInput": {
            "certainty": [
                84
            ],
            "descriptor": [
                84
            ],
            "height": [
                84
            ],
            "width": [
                84
            ],
            "x": [
                84
            ],
            "y": [
                84
            ],
            "__typename": [
                2
            ]
        },
        "FaceListRelationFilter": {
            "every": [
                110
            ],
            "none": [
                110
            ],
            "some": [
                110
            ],
            "__typename": [
                2
            ]
        },
        "FaceScalarWhereInput": {
            "AND": [
                91
            ],
            "NOT": [
                91
            ],
            "OR": [
                91
            ],
            "addedById": [
                275
            ],
            "appearanceId": [
                275
            ],
            "createdAt": [
                73
            ],
            "height": [
                113
            ],
            "id": [
                274
            ],
            "imageId": [
                274
            ],
            "personId": [
                275
            ],
            "score": [
                113
            ],
            "source": [
                76
            ],
            "updatedAt": [
                73
            ],
            "width": [
                113
            ],
            "x": [
                113
            ],
            "y": [
                113
            ],
            "__typename": [
                2
            ]
        },
        "FaceSource": {},
        "FaceUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "height": [
                112
            ],
            "score": [
                112
            ],
            "source": [
                75
            ],
            "updatedAt": [
                72
            ],
            "width": [
                112
            ],
            "x": [
                112
            ],
            "y": [
                112
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithWhereWithoutAddedByInput": {
            "data": [
                93
            ],
            "where": [
                91
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithWhereWithoutAppearanceInput": {
            "data": [
                93
            ],
            "where": [
                91
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithWhereWithoutImageInput": {
            "data": [
                93
            ],
            "where": [
                91
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithWhereWithoutPersonInput": {
            "data": [
                93
            ],
            "where": [
                91
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithoutAddedByInput": {
            "connect": [
                111
            ],
            "delete": [
                111
            ],
            "deleteMany": [
                91
            ],
            "disconnect": [
                111
            ],
            "set": [
                111
            ],
            "update": [
                102
            ],
            "updateMany": [
                94
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithoutAppearanceInput": {
            "connect": [
                111
            ],
            "delete": [
                111
            ],
            "deleteMany": [
                91
            ],
            "disconnect": [
                111
            ],
            "set": [
                111
            ],
            "update": [
                103
            ],
            "updateMany": [
                95
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithoutImageInput": {
            "connect": [
                111
            ],
            "delete": [
                111
            ],
            "deleteMany": [
                91
            ],
            "disconnect": [
                111
            ],
            "set": [
                111
            ],
            "update": [
                104
            ],
            "updateMany": [
                96
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateManyWithoutPersonInput": {
            "connect": [
                111
            ],
            "delete": [
                111
            ],
            "deleteMany": [
                91
            ],
            "disconnect": [
                111
            ],
            "set": [
                111
            ],
            "update": [
                105
            ],
            "updateMany": [
                97
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithWhereUniqueWithoutAddedByInput": {
            "data": [
                106
            ],
            "where": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithWhereUniqueWithoutAppearanceInput": {
            "data": [
                107
            ],
            "where": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithWhereUniqueWithoutImageInput": {
            "data": [
                108
            ],
            "where": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithWhereUniqueWithoutPersonInput": {
            "data": [
                109
            ],
            "where": [
                111
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithoutAddedByInput": {
            "appearance": [
                55
            ],
            "createdAt": [
                72
            ],
            "height": [
                112
            ],
            "image": [
                250
            ],
            "person": [
                324
            ],
            "score": [
                112
            ],
            "source": [
                75
            ],
            "updatedAt": [
                72
            ],
            "width": [
                112
            ],
            "x": [
                112
            ],
            "y": [
                112
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithoutAppearanceInput": {
            "addedBy": [
                413
            ],
            "createdAt": [
                72
            ],
            "height": [
                112
            ],
            "image": [
                250
            ],
            "person": [
                324
            ],
            "score": [
                112
            ],
            "source": [
                75
            ],
            "updatedAt": [
                72
            ],
            "width": [
                112
            ],
            "x": [
                112
            ],
            "y": [
                112
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithoutImageInput": {
            "addedBy": [
                413
            ],
            "appearance": [
                55
            ],
            "createdAt": [
                72
            ],
            "height": [
                112
            ],
            "person": [
                324
            ],
            "score": [
                112
            ],
            "source": [
                75
            ],
            "updatedAt": [
                72
            ],
            "width": [
                112
            ],
            "x": [
                112
            ],
            "y": [
                112
            ],
            "__typename": [
                2
            ]
        },
        "FaceUpdateWithoutPersonInput": {
            "addedBy": [
                413
            ],
            "appearance": [
                55
            ],
            "createdAt": [
                72
            ],
            "height": [
                112
            ],
            "image": [
                250
            ],
            "score": [
                112
            ],
            "source": [
                75
            ],
            "updatedAt": [
                72
            ],
            "width": [
                112
            ],
            "x": [
                112
            ],
            "y": [
                112
            ],
            "__typename": [
                2
            ]
        },
        "FaceWhereInput": {
            "AND": [
                110
            ],
            "NOT": [
                110
            ],
            "OR": [
                110
            ],
            "addedBy": [
                424
            ],
            "addedById": [
                275
            ],
            "appearance": [
                67
            ],
            "appearanceId": [
                275
            ],
            "createdAt": [
                73
            ],
            "height": [
                113
            ],
            "id": [
                274
            ],
            "image": [
                271
            ],
            "imageId": [
                274
            ],
            "person": [
                339
            ],
            "personId": [
                275
            ],
            "score": [
                113
            ],
            "source": [
                76
            ],
            "updatedAt": [
                73
            ],
            "width": [
                113
            ],
            "x": [
                113
            ],
            "y": [
                113
            ],
            "__typename": [
                2
            ]
        },
        "FaceWhereUniqueInput": {
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "FloatFieldUpdateOperationsInput": {
            "decrement": [
                84
            ],
            "divide": [
                84
            ],
            "increment": [
                84
            ],
            "multiply": [
                84
            ],
            "set": [
                84
            ],
            "__typename": [
                2
            ]
        },
        "FloatFilter": {
            "equals": [
                84
            ],
            "gt": [
                84
            ],
            "gte": [
                84
            ],
            "in": [
                84
            ],
            "lt": [
                84
            ],
            "lte": [
                84
            ],
            "not": [
                286
            ],
            "notIn": [
                84
            ],
            "__typename": [
                2
            ]
        },
        "Group": {
            "aliases": [
                115,
                {
                    "cursor": [
                        130
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "avatar": [
                187
            ],
            "banner": [
                187
            ],
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "members": [
                141,
                {
                    "cursor": [
                        173
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupAlias": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasCreateManyGroupInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasCreateManyGroupInputEnvelope": {
            "data": [
                116
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasCreateNestedManyWithoutGroupInput": {
            "connect": [
                130
            ],
            "connectOrCreate": [
                119
            ],
            "create": [
                120
            ],
            "createMany": [
                117
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasCreateOrConnectWithoutGroupInput": {
            "create": [
                120
            ],
            "where": [
                130
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasCreateWithoutGroupInput": {
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasListRelationFilter": {
            "every": [
                129
            ],
            "none": [
                129
            ],
            "some": [
                129
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasScalarWhereInput": {
            "AND": [
                122
            ],
            "NOT": [
                122
            ],
            "OR": [
                122
            ],
            "createdAt": [
                73
            ],
            "groupId": [
                274
            ],
            "id": [
                274
            ],
            "name": [
                363
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasUpdateManyWithWhereWithoutGroupInput": {
            "data": [
                123
            ],
            "where": [
                122
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasUpdateManyWithoutGroupInput": {
            "connect": [
                130
            ],
            "connectOrCreate": [
                119
            ],
            "create": [
                120
            ],
            "createMany": [
                117
            ],
            "delete": [
                130
            ],
            "deleteMany": [
                122
            ],
            "disconnect": [
                130
            ],
            "set": [
                130
            ],
            "update": [
                126
            ],
            "updateMany": [
                124
            ],
            "upsert": [
                128
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasUpdateWithWhereUniqueWithoutGroupInput": {
            "data": [
                127
            ],
            "where": [
                130
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasUpdateWithoutGroupInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasUpsertWithWhereUniqueWithoutGroupInput": {
            "create": [
                120
            ],
            "update": [
                127
            ],
            "where": [
                130
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasWhereInput": {
            "AND": [
                129
            ],
            "NOT": [
                129
            ],
            "OR": [
                129
            ],
            "createdAt": [
                73
            ],
            "group": [
                185
            ],
            "groupId": [
                274
            ],
            "id": [
                274
            ],
            "name": [
                363
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "GroupAliasWhereUniqueInput": {
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateInput": {
            "aliases": [
                118
            ],
            "avatar": [
                196
            ],
            "banner": [
                197
            ],
            "createdAt": [
                71
            ],
            "ireneBotId": [
                1
            ],
            "members": [
                146
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateNestedOneWithoutAvatarInput": {
            "connect": [
                186
            ],
            "connectOrCreate": [
                135
            ],
            "create": [
                138
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateNestedOneWithoutBannerInput": {
            "connect": [
                186
            ],
            "connectOrCreate": [
                136
            ],
            "create": [
                139
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateNestedOneWithoutMembersInput": {
            "connect": [
                186
            ],
            "connectOrCreate": [
                137
            ],
            "create": [
                140
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateOrConnectWithoutAvatarInput": {
            "create": [
                138
            ],
            "where": [
                186
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateOrConnectWithoutBannerInput": {
            "create": [
                139
            ],
            "where": [
                186
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateOrConnectWithoutMembersInput": {
            "create": [
                140
            ],
            "where": [
                186
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateWithoutAvatarInput": {
            "aliases": [
                118
            ],
            "banner": [
                197
            ],
            "createdAt": [
                71
            ],
            "ireneBotId": [
                1
            ],
            "members": [
                146
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateWithoutBannerInput": {
            "aliases": [
                118
            ],
            "avatar": [
                196
            ],
            "createdAt": [
                71
            ],
            "ireneBotId": [
                1
            ],
            "members": [
                146
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupCreateWithoutMembersInput": {
            "aliases": [
                118
            ],
            "avatar": [
                196
            ],
            "banner": [
                197
            ],
            "createdAt": [
                71
            ],
            "ireneBotId": [
                1
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMember": {
            "createdAt": [
                71
            ],
            "endDate": [
                71
            ],
            "group": [
                114
            ],
            "id": [
                1
            ],
            "person": [
                294
            ],
            "startDate": [
                71
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateManyGroupInput": {
            "createdAt": [
                71
            ],
            "endDate": [
                71
            ],
            "id": [
                1
            ],
            "personId": [
                1
            ],
            "startDate": [
                71
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateManyGroupInputEnvelope": {
            "data": [
                142
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateManyPersonInput": {
            "createdAt": [
                71
            ],
            "endDate": [
                71
            ],
            "groupId": [
                1
            ],
            "id": [
                1
            ],
            "startDate": [
                71
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateManyPersonInputEnvelope": {
            "data": [
                144
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateNestedManyWithoutGroupInput": {
            "connect": [
                173
            ],
            "connectOrCreate": [
                149
            ],
            "create": [
                152
            ],
            "createMany": [
                143
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateNestedManyWithoutPersonInput": {
            "connect": [
                173
            ],
            "connectOrCreate": [
                150
            ],
            "create": [
                153
            ],
            "createMany": [
                145
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateNestedOneWithoutPreferredMemberships_Input": {
            "connect": [
                173
            ],
            "connectOrCreate": [
                151
            ],
            "create": [
                154
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateOrConnectWithoutGroupInput": {
            "create": [
                152
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateOrConnectWithoutPersonInput": {
            "create": [
                153
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateOrConnectWithoutPreferredMemberships_Input": {
            "create": [
                154
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateWithoutGroupInput": {
            "createdAt": [
                71
            ],
            "endDate": [
                71
            ],
            "person": [
                301
            ],
            "preferredMemberships_": [
                298
            ],
            "startDate": [
                71
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateWithoutPersonInput": {
            "createdAt": [
                71
            ],
            "endDate": [
                71
            ],
            "group": [
                134
            ],
            "preferredMemberships_": [
                298
            ],
            "startDate": [
                71
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberCreateWithoutPreferredMemberships_Input": {
            "createdAt": [
                71
            ],
            "endDate": [
                71
            ],
            "group": [
                134
            ],
            "person": [
                301
            ],
            "startDate": [
                71
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberListRelationFilter": {
            "every": [
                172
            ],
            "none": [
                172
            ],
            "some": [
                172
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberMemberCompoundUniqueInput": {
            "groupId": [
                1
            ],
            "personId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberScalarWhereInput": {
            "AND": [
                157
            ],
            "NOT": [
                157
            ],
            "OR": [
                157
            ],
            "createdAt": [
                73
            ],
            "endDate": [
                74
            ],
            "groupId": [
                274
            ],
            "id": [
                274
            ],
            "personId": [
                274
            ],
            "startDate": [
                74
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "endDate": [
                291
            ],
            "startDate": [
                291
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateManyWithWhereWithoutGroupInput": {
            "data": [
                158
            ],
            "where": [
                157
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateManyWithWhereWithoutPersonInput": {
            "data": [
                158
            ],
            "where": [
                157
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateManyWithoutGroupInput": {
            "connect": [
                173
            ],
            "connectOrCreate": [
                149
            ],
            "create": [
                152
            ],
            "createMany": [
                143
            ],
            "delete": [
                173
            ],
            "deleteMany": [
                157
            ],
            "disconnect": [
                173
            ],
            "set": [
                173
            ],
            "update": [
                164
            ],
            "updateMany": [
                159
            ],
            "upsert": [
                169
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateManyWithoutPersonInput": {
            "connect": [
                173
            ],
            "connectOrCreate": [
                150
            ],
            "create": [
                153
            ],
            "createMany": [
                145
            ],
            "delete": [
                173
            ],
            "deleteMany": [
                157
            ],
            "disconnect": [
                173
            ],
            "set": [
                173
            ],
            "update": [
                165
            ],
            "updateMany": [
                160
            ],
            "upsert": [
                170
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateOneWithoutPreferredMemberships_Input": {
            "connect": [
                173
            ],
            "connectOrCreate": [
                151
            ],
            "create": [
                154
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                168
            ],
            "upsert": [
                171
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateWithWhereUniqueWithoutGroupInput": {
            "data": [
                166
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateWithWhereUniqueWithoutPersonInput": {
            "data": [
                167
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateWithoutGroupInput": {
            "createdAt": [
                72
            ],
            "endDate": [
                291
            ],
            "person": [
                323
            ],
            "preferredMemberships_": [
                320
            ],
            "startDate": [
                291
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateWithoutPersonInput": {
            "createdAt": [
                72
            ],
            "endDate": [
                291
            ],
            "group": [
                176
            ],
            "preferredMemberships_": [
                320
            ],
            "startDate": [
                291
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpdateWithoutPreferredMemberships_Input": {
            "createdAt": [
                72
            ],
            "endDate": [
                291
            ],
            "group": [
                176
            ],
            "person": [
                323
            ],
            "startDate": [
                291
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpsertWithWhereUniqueWithoutGroupInput": {
            "create": [
                152
            ],
            "update": [
                166
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpsertWithWhereUniqueWithoutPersonInput": {
            "create": [
                153
            ],
            "update": [
                167
            ],
            "where": [
                173
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberUpsertWithoutPreferredMemberships_Input": {
            "create": [
                154
            ],
            "update": [
                168
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberWhereInput": {
            "AND": [
                172
            ],
            "NOT": [
                172
            ],
            "OR": [
                172
            ],
            "createdAt": [
                73
            ],
            "endDate": [
                74
            ],
            "group": [
                185
            ],
            "groupId": [
                274
            ],
            "id": [
                274
            ],
            "person": [
                339
            ],
            "personId": [
                274
            ],
            "preferredMemberships_": [
                315
            ],
            "startDate": [
                74
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "GroupMemberWhereUniqueInput": {
            "id": [
                1
            ],
            "member": [
                156
            ],
            "__typename": [
                2
            ]
        },
        "GroupOrderByInput": {
            "avatarId": [
                361
            ],
            "bannerId": [
                361
            ],
            "createdAt": [
                361
            ],
            "id": [
                361
            ],
            "ireneBotId": [
                361
            ],
            "name": [
                361
            ],
            "updatedAt": [
                361
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateInput": {
            "aliases": [
                125
            ],
            "avatar": [
                253
            ],
            "banner": [
                254
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                292
            ],
            "members": [
                161
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateOneRequiredWithoutMembersInput": {
            "connect": [
                186
            ],
            "connectOrCreate": [
                137
            ],
            "create": [
                140
            ],
            "update": [
                181
            ],
            "upsert": [
                184
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateOneWithoutAvatarInput": {
            "connect": [
                186
            ],
            "connectOrCreate": [
                135
            ],
            "create": [
                138
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                179
            ],
            "upsert": [
                182
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateOneWithoutBannerInput": {
            "connect": [
                186
            ],
            "connectOrCreate": [
                136
            ],
            "create": [
                139
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                180
            ],
            "upsert": [
                183
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateWithoutAvatarInput": {
            "aliases": [
                125
            ],
            "banner": [
                254
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                292
            ],
            "members": [
                161
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateWithoutBannerInput": {
            "aliases": [
                125
            ],
            "avatar": [
                253
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                292
            ],
            "members": [
                161
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpdateWithoutMembersInput": {
            "aliases": [
                125
            ],
            "avatar": [
                253
            ],
            "banner": [
                254
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                292
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpsertWithoutAvatarInput": {
            "create": [
                138
            ],
            "update": [
                179
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpsertWithoutBannerInput": {
            "create": [
                139
            ],
            "update": [
                180
            ],
            "__typename": [
                2
            ]
        },
        "GroupUpsertWithoutMembersInput": {
            "create": [
                140
            ],
            "update": [
                181
            ],
            "__typename": [
                2
            ]
        },
        "GroupWhereInput": {
            "AND": [
                185
            ],
            "NOT": [
                185
            ],
            "OR": [
                185
            ],
            "aliases": [
                121
            ],
            "avatar": [
                271
            ],
            "avatarId": [
                275
            ],
            "banner": [
                271
            ],
            "bannerId": [
                275
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "ireneBotId": [
                275
            ],
            "members": [
                155
            ],
            "name": [
                363
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "GroupWhereUniqueInput": {
            "id": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Image": {
            "appearances": [
                26,
                {
                    "cursor": [
                        68
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "aspectRatio": [
                84
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "connections": [
                189,
                {
                    "depth": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "fileName": [
                2
            ],
            "fileSize": [
                2
            ],
            "focus": [
                190
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "id": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "liked": [
                5
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                1
            ],
            "public": [
                5
            ],
            "rawUrl": [
                2
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                365,
                {
                    "cursor": [
                        391
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "thumbnail": [
                392
            ],
            "unknownFaces": [
                83
            ],
            "uploadType": [
                393
            ],
            "uploadedBy": [
                394
            ],
            "url": [
                2
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageConnectionEdge": {},
        "ImageConnections": {
            "edges": [
                215
            ],
            "images": [
                187
            ],
            "people": [
                294
            ],
            "__typename": [
                2
            ]
        },
        "ImageCoordinate": {
            "x": [
                1
            ],
            "y": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateManyUserInput": {
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "id": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                193
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateManyUserInputEnvelope": {
            "data": [
                191
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateManypaletteInput": {
            "set": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedManyWithoutUserInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                206
            ],
            "create": [
                213
            ],
            "createMany": [
                192
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutAppearancesInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                200
            ],
            "create": [
                207
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutAvatarOfInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                201
            ],
            "create": [
                208
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutBannerOfInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                202
            ],
            "create": [
                209
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutLikesInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                204
            ],
            "create": [
                211
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutTagsInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                205
            ],
            "create": [
                212
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutAppearancesInput": {
            "create": [
                207
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutAvatarOfInput": {
            "create": [
                208
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutBannerOfInput": {
            "create": [
                209
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutFacesInput": {
            "create": [
                210
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutLikesInput": {
            "create": [
                211
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutTagsInput": {
            "create": [
                212
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutUserInput": {
            "create": [
                213
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutAppearancesInput": {
            "avatarOf": [
                132
            ],
            "bannerOf": [
                133
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "faces": [
                87
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "likes": [
                220
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                371
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "user": [
                397
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutAvatarOfInput": {
            "appearances": [
                36
            ],
            "bannerOf": [
                133
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "faces": [
                87
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "likes": [
                220
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                371
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "user": [
                397
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutBannerOfInput": {
            "appearances": [
                36
            ],
            "avatarOf": [
                132
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "faces": [
                87
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "likes": [
                220
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                371
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "user": [
                397
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutFacesInput": {
            "appearances": [
                36
            ],
            "avatarOf": [
                132
            ],
            "bannerOf": [
                133
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "likes": [
                220
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                371
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "user": [
                397
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutLikesInput": {
            "appearances": [
                36
            ],
            "avatarOf": [
                132
            ],
            "bannerOf": [
                133
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "faces": [
                87
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                371
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "user": [
                397
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutTagsInput": {
            "appearances": [
                36
            ],
            "avatarOf": [
                132
            ],
            "bannerOf": [
                133
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "faces": [
                87
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "likes": [
                220
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "user": [
                397
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateWithoutUserInput": {
            "appearances": [
                36
            ],
            "avatarOf": [
                132
            ],
            "bannerOf": [
                133
            ],
            "bytes": [
                1
            ],
            "caption": [
                2
            ],
            "createdAt": [
                71
            ],
            "faceScanDate": [
                71
            ],
            "faceScanRequestDate": [
                71
            ],
            "faces": [
                87
            ],
            "fileName": [
                2
            ],
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "isNsfw": [
                5
            ],
            "likes": [
                220
            ],
            "mimetype": [
                277
            ],
            "pHash": [
                2
            ],
            "palette": [
                214
            ],
            "public": [
                5
            ],
            "slug": [
                2
            ],
            "source": [
                2
            ],
            "tags": [
                371
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                393
            ],
            "views": [
                1
            ],
            "width": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreatepaletteInput": {
            "set": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageEdge": {
            "from": [
                1
            ],
            "to": [
                1
            ],
            "type": [
                188
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateManyImageInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "updatedAt": [
                71
            ],
            "userId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateManyImageInputEnvelope": {
            "data": [
                216
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateManyUserInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "imageId": [
                1
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateManyUserInputEnvelope": {
            "data": [
                218
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateNestedManyWithoutImageInput": {
            "connect": [
                241
            ],
            "connectOrCreate": [
                222
            ],
            "create": [
                224
            ],
            "createMany": [
                217
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateNestedManyWithoutUserInput": {
            "connect": [
                241
            ],
            "connectOrCreate": [
                223
            ],
            "create": [
                225
            ],
            "createMany": [
                219
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateOrConnectWithoutImageInput": {
            "create": [
                224
            ],
            "where": [
                241
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateOrConnectWithoutUserInput": {
            "create": [
                225
            ],
            "where": [
                241
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateWithoutImageInput": {
            "createdAt": [
                71
            ],
            "updatedAt": [
                71
            ],
            "user": [
                396
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateWithoutUserInput": {
            "createdAt": [
                71
            ],
            "image": [
                198
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeLikedImageCompoundUniqueInput": {
            "imageId": [
                1
            ],
            "userId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeListRelationFilter": {
            "every": [
                240
            ],
            "none": [
                240
            ],
            "some": [
                240
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeScalarWhereInput": {
            "AND": [
                228
            ],
            "NOT": [
                228
            ],
            "OR": [
                228
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "imageId": [
                274
            ],
            "updatedAt": [
                73
            ],
            "userId": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithWhereWithoutImageInput": {
            "data": [
                229
            ],
            "where": [
                228
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithWhereWithoutUserInput": {
            "data": [
                229
            ],
            "where": [
                228
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithoutImageInput": {
            "connect": [
                241
            ],
            "connectOrCreate": [
                222
            ],
            "create": [
                224
            ],
            "createMany": [
                217
            ],
            "delete": [
                241
            ],
            "deleteMany": [
                228
            ],
            "disconnect": [
                241
            ],
            "set": [
                241
            ],
            "update": [
                234
            ],
            "updateMany": [
                230
            ],
            "upsert": [
                238
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithoutUserInput": {
            "connect": [
                241
            ],
            "connectOrCreate": [
                223
            ],
            "create": [
                225
            ],
            "createMany": [
                219
            ],
            "delete": [
                241
            ],
            "deleteMany": [
                228
            ],
            "disconnect": [
                241
            ],
            "set": [
                241
            ],
            "update": [
                235
            ],
            "updateMany": [
                231
            ],
            "upsert": [
                239
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateWithWhereUniqueWithoutImageInput": {
            "data": [
                236
            ],
            "where": [
                241
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateWithWhereUniqueWithoutUserInput": {
            "data": [
                237
            ],
            "where": [
                241
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateWithoutImageInput": {
            "createdAt": [
                72
            ],
            "updatedAt": [
                72
            ],
            "user": [
                409
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateWithoutUserInput": {
            "createdAt": [
                72
            ],
            "image": [
                251
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpsertWithWhereUniqueWithoutImageInput": {
            "create": [
                224
            ],
            "update": [
                236
            ],
            "where": [
                241
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpsertWithWhereUniqueWithoutUserInput": {
            "create": [
                225
            ],
            "update": [
                237
            ],
            "where": [
                241
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeWhereInput": {
            "AND": [
                240
            ],
            "NOT": [
                240
            ],
            "OR": [
                240
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "image": [
                271
            ],
            "imageId": [
                274
            ],
            "updatedAt": [
                73
            ],
            "user": [
                424
            ],
            "userId": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeWhereUniqueInput": {
            "id": [
                1
            ],
            "likedImage": [
                226
            ],
            "__typename": [
                2
            ]
        },
        "ImageListRelationFilter": {
            "every": [
                271
            ],
            "none": [
                271
            ],
            "some": [
                271
            ],
            "__typename": [
                2
            ]
        },
        "ImageMatch": {
            "face": [
                83
            ],
            "image": [
                187
            ],
            "person": [
                294
            ],
            "__typename": [
                2
            ]
        },
        "ImageOrderByInput": {
            "bytes": [
                361
            ],
            "caption": [
                361
            ],
            "createdAt": [
                361
            ],
            "faceScanDate": [
                361
            ],
            "faceScanRequestDate": [
                361
            ],
            "fileName": [
                361
            ],
            "hash": [
                361
            ],
            "height": [
                361
            ],
            "id": [
                361
            ],
            "ireneBotId": [
                361
            ],
            "isNsfw": [
                361
            ],
            "mimetype": [
                361
            ],
            "pHash": [
                361
            ],
            "palette": [
                361
            ],
            "public": [
                361
            ],
            "slug": [
                361
            ],
            "source": [
                361
            ],
            "updatedAt": [
                361
            ],
            "uploadType": [
                361
            ],
            "userId": [
                361
            ],
            "views": [
                361
            ],
            "width": [
                361
            ],
            "__typename": [
                2
            ]
        },
        "ImageScalarWhereInput": {
            "AND": [
                245
            ],
            "NOT": [
                245
            ],
            "OR": [
                245
            ],
            "bytes": [
                274
            ],
            "caption": [
                364
            ],
            "createdAt": [
                73
            ],
            "faceScanDate": [
                74
            ],
            "faceScanRequestDate": [
                74
            ],
            "fileName": [
                364
            ],
            "hash": [
                363
            ],
            "height": [
                274
            ],
            "id": [
                274
            ],
            "ireneBotId": [
                275
            ],
            "isNsfw": [
                70
            ],
            "mimetype": [
                78
            ],
            "pHash": [
                364
            ],
            "palette": [
                276
            ],
            "public": [
                70
            ],
            "slug": [
                363
            ],
            "source": [
                364
            ],
            "updatedAt": [
                73
            ],
            "uploadType": [
                82
            ],
            "userId": [
                275
            ],
            "views": [
                274
            ],
            "width": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateManyMutationInput": {
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateManyWithWhereWithoutUserInput": {
            "data": [
                246
            ],
            "where": [
                245
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateManyWithoutUserInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                206
            ],
            "create": [
                213
            ],
            "createMany": [
                192
            ],
            "delete": [
                272
            ],
            "deleteMany": [
                245
            ],
            "disconnect": [
                272
            ],
            "set": [
                272
            ],
            "update": [
                255
            ],
            "updateMany": [
                247
            ],
            "upsert": [
                264
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneRequiredWithoutAppearancesInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                200
            ],
            "create": [
                207
            ],
            "update": [
                256
            ],
            "upsert": [
                265
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneRequiredWithoutFacesInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                203
            ],
            "create": [
                210
            ],
            "update": [
                259
            ],
            "upsert": [
                268
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneRequiredWithoutLikesInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                204
            ],
            "create": [
                211
            ],
            "update": [
                260
            ],
            "upsert": [
                269
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneRequiredWithoutTagsInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                205
            ],
            "create": [
                212
            ],
            "update": [
                261
            ],
            "upsert": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneWithoutAvatarOfInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                201
            ],
            "create": [
                208
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                257
            ],
            "upsert": [
                266
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneWithoutBannerOfInput": {
            "connect": [
                272
            ],
            "connectOrCreate": [
                202
            ],
            "create": [
                209
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                258
            ],
            "upsert": [
                267
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithWhereUniqueWithoutUserInput": {
            "data": [
                262
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutAppearancesInput": {
            "avatarOf": [
                177
            ],
            "bannerOf": [
                178
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "faces": [
                100
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                232
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "tags": [
                383
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                412
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutAvatarOfInput": {
            "appearances": [
                53
            ],
            "bannerOf": [
                178
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "faces": [
                100
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                232
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "tags": [
                383
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                412
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutBannerOfInput": {
            "appearances": [
                53
            ],
            "avatarOf": [
                177
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "faces": [
                100
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                232
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "tags": [
                383
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                412
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutFacesInput": {
            "appearances": [
                53
            ],
            "avatarOf": [
                177
            ],
            "bannerOf": [
                178
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                232
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "tags": [
                383
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                412
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutLikesInput": {
            "appearances": [
                53
            ],
            "avatarOf": [
                177
            ],
            "bannerOf": [
                178
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "faces": [
                100
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "tags": [
                383
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                412
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutTagsInput": {
            "appearances": [
                53
            ],
            "avatarOf": [
                177
            ],
            "bannerOf": [
                178
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "faces": [
                100
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                232
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                412
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithoutUserInput": {
            "appearances": [
                53
            ],
            "avatarOf": [
                177
            ],
            "bannerOf": [
                178
            ],
            "bytes": [
                273
            ],
            "caption": [
                293
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                291
            ],
            "faceScanRequestDate": [
                291
            ],
            "faces": [
                100
            ],
            "fileName": [
                293
            ],
            "hash": [
                362
            ],
            "height": [
                273
            ],
            "ireneBotId": [
                292
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                232
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                293
            ],
            "palette": [
                263
            ],
            "public": [
                69
            ],
            "slug": [
                362
            ],
            "source": [
                293
            ],
            "tags": [
                383
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "views": [
                273
            ],
            "width": [
                273
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdatepaletteInput": {
            "push": [
                1
            ],
            "set": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithWhereUniqueWithoutUserInput": {
            "create": [
                213
            ],
            "update": [
                262
            ],
            "where": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutAppearancesInput": {
            "create": [
                207
            ],
            "update": [
                256
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutAvatarOfInput": {
            "create": [
                208
            ],
            "update": [
                257
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutBannerOfInput": {
            "create": [
                209
            ],
            "update": [
                258
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutFacesInput": {
            "create": [
                210
            ],
            "update": [
                259
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutLikesInput": {
            "create": [
                211
            ],
            "update": [
                260
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutTagsInput": {
            "create": [
                212
            ],
            "update": [
                261
            ],
            "__typename": [
                2
            ]
        },
        "ImageWhereInput": {
            "AND": [
                271
            ],
            "NOT": [
                271
            ],
            "OR": [
                271
            ],
            "appearances": [
                46
            ],
            "avatarOf": [
                185
            ],
            "bannerOf": [
                185
            ],
            "bytes": [
                274
            ],
            "caption": [
                364
            ],
            "createdAt": [
                73
            ],
            "faceScanDate": [
                74
            ],
            "faceScanRequestDate": [
                74
            ],
            "faces": [
                90
            ],
            "fileName": [
                364
            ],
            "hash": [
                363
            ],
            "height": [
                274
            ],
            "id": [
                274
            ],
            "ireneBotId": [
                275
            ],
            "isNsfw": [
                70
            ],
            "likes": [
                227
            ],
            "mimetype": [
                78
            ],
            "pHash": [
                364
            ],
            "palette": [
                276
            ],
            "public": [
                70
            ],
            "slug": [
                363
            ],
            "source": [
                364
            ],
            "tags": [
                376
            ],
            "updatedAt": [
                73
            ],
            "uploadType": [
                82
            ],
            "user": [
                424
            ],
            "userId": [
                275
            ],
            "views": [
                274
            ],
            "width": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "ImageWhereUniqueInput": {
            "id": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "slug": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "IntFieldUpdateOperationsInput": {
            "decrement": [
                1
            ],
            "divide": [
                1
            ],
            "increment": [
                1
            ],
            "multiply": [
                1
            ],
            "set": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "IntFilter": {
            "equals": [
                1
            ],
            "gt": [
                1
            ],
            "gte": [
                1
            ],
            "in": [
                1
            ],
            "lt": [
                1
            ],
            "lte": [
                1
            ],
            "not": [
                287
            ],
            "notIn": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "IntNullableFilter": {
            "equals": [
                1
            ],
            "gt": [
                1
            ],
            "gte": [
                1
            ],
            "in": [
                1
            ],
            "lt": [
                1
            ],
            "lte": [
                1
            ],
            "not": [
                288
            ],
            "notIn": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "IntNullableListFilter": {
            "equals": [
                1
            ],
            "has": [
                1
            ],
            "hasEvery": [
                1
            ],
            "hasSome": [
                1
            ],
            "isEmpty": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "MimeType": {},
        "Mutation": {
            "addAppearance": [
                26,
                {
                    "imageId": [
                        1,
                        "Int!"
                    ],
                    "personId": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "createOnePerson": [
                294,
                {
                    "data": [
                        295,
                        "PersonCreateInput!"
                    ]
                }
            ],
            "labelImage": [
                187,
                {
                    "faces": [
                        89,
                        "[FaceInput!]!"
                    ],
                    "ireneBotId": [
                        1
                    ],
                    "pHash": [
                        2
                    ],
                    "palette": [
                        1,
                        "[Int!]!"
                    ],
                    "personName": [
                        2
                    ],
                    "replacePreviousScan": [
                        5
                    ],
                    "slug": [
                        2,
                        "String!"
                    ]
                }
            ],
            "linkFace": [
                26,
                {
                    "appearanceId": [
                        1,
                        "Int!"
                    ],
                    "faceId": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "removeAppearance": [
                26,
                {
                    "appearanceId": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "scanFaces": [
                343,
                {
                    "slug": [
                        2,
                        "String!"
                    ]
                }
            ],
            "toggleLike": [
                187,
                {
                    "imageId": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "unlinkFace": [
                1,
                {
                    "appearanceId": [
                        1,
                        "Int!"
                    ],
                    "faceId": [
                        1,
                        "Int!"
                    ]
                }
            ],
            "upsertOneGroup": [
                114,
                {
                    "create": [
                        131,
                        "GroupCreateInput!"
                    ],
                    "update": [
                        175,
                        "GroupUpdateInput!"
                    ],
                    "where": [
                        186,
                        "GroupWhereUniqueInput!"
                    ]
                }
            ],
            "upsertOnePerson": [
                294,
                {
                    "create": [
                        295,
                        "PersonCreateInput!"
                    ],
                    "update": [
                        317,
                        "PersonUpdateInput!"
                    ],
                    "where": [
                        340,
                        "PersonWhereUniqueInput!"
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "NestedBoolFilter": {
            "equals": [
                5
            ],
            "not": [
                279
            ],
            "__typename": [
                2
            ]
        },
        "NestedDateTimeFilter": {
            "equals": [
                71
            ],
            "gt": [
                71
            ],
            "gte": [
                71
            ],
            "in": [
                71
            ],
            "lt": [
                71
            ],
            "lte": [
                71
            ],
            "not": [
                280
            ],
            "notIn": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "NestedDateTimeNullableFilter": {
            "equals": [
                71
            ],
            "gt": [
                71
            ],
            "gte": [
                71
            ],
            "in": [
                71
            ],
            "lt": [
                71
            ],
            "lte": [
                71
            ],
            "not": [
                281
            ],
            "notIn": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "NestedEnumFaceSourceFilter": {
            "equals": [
                92
            ],
            "in": [
                92
            ],
            "not": [
                282
            ],
            "notIn": [
                92
            ],
            "__typename": [
                2
            ]
        },
        "NestedEnumMimeTypeFilter": {
            "equals": [
                277
            ],
            "in": [
                277
            ],
            "not": [
                283
            ],
            "notIn": [
                277
            ],
            "__typename": [
                2
            ]
        },
        "NestedEnumTagSourceFilter": {
            "equals": [
                378
            ],
            "in": [
                378
            ],
            "not": [
                284
            ],
            "notIn": [
                378
            ],
            "__typename": [
                2
            ]
        },
        "NestedEnumUploadTypeFilter": {
            "equals": [
                393
            ],
            "in": [
                393
            ],
            "not": [
                285
            ],
            "notIn": [
                393
            ],
            "__typename": [
                2
            ]
        },
        "NestedFloatFilter": {
            "equals": [
                84
            ],
            "gt": [
                84
            ],
            "gte": [
                84
            ],
            "in": [
                84
            ],
            "lt": [
                84
            ],
            "lte": [
                84
            ],
            "not": [
                286
            ],
            "notIn": [
                84
            ],
            "__typename": [
                2
            ]
        },
        "NestedIntFilter": {
            "equals": [
                1
            ],
            "gt": [
                1
            ],
            "gte": [
                1
            ],
            "in": [
                1
            ],
            "lt": [
                1
            ],
            "lte": [
                1
            ],
            "not": [
                287
            ],
            "notIn": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "NestedIntNullableFilter": {
            "equals": [
                1
            ],
            "gt": [
                1
            ],
            "gte": [
                1
            ],
            "in": [
                1
            ],
            "lt": [
                1
            ],
            "lte": [
                1
            ],
            "not": [
                288
            ],
            "notIn": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "NestedStringFilter": {
            "contains": [
                2
            ],
            "endsWith": [
                2
            ],
            "equals": [
                2
            ],
            "gt": [
                2
            ],
            "gte": [
                2
            ],
            "in": [
                2
            ],
            "lt": [
                2
            ],
            "lte": [
                2
            ],
            "not": [
                289
            ],
            "notIn": [
                2
            ],
            "startsWith": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NestedStringNullableFilter": {
            "contains": [
                2
            ],
            "endsWith": [
                2
            ],
            "equals": [
                2
            ],
            "gt": [
                2
            ],
            "gte": [
                2
            ],
            "in": [
                2
            ],
            "lt": [
                2
            ],
            "lte": [
                2
            ],
            "not": [
                290
            ],
            "notIn": [
                2
            ],
            "startsWith": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "NullableDateTimeFieldUpdateOperationsInput": {
            "set": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "NullableIntFieldUpdateOperationsInput": {
            "decrement": [
                1
            ],
            "divide": [
                1
            ],
            "increment": [
                1
            ],
            "multiply": [
                1
            ],
            "set": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "NullableStringFieldUpdateOperationsInput": {
            "set": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Person": {
            "aliases": [
                0,
                {
                    "cursor": [
                        25
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "appearances": [
                26,
                {
                    "cursor": [
                        68
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "createdAt": [
                71
            ],
            "faces": [
                83,
                {
                    "cursor": [
                        111
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "id": [
                1
            ],
            "memberOf": [
                141,
                {
                    "cursor": [
                        173
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                0
            ],
            "preferredMembership": [
                141
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateInput": {
            "aliases": [
                6
            ],
            "appearances": [
                37
            ],
            "appearsIn": [
                88
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "memberOf": [
                147
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                7
            ],
            "preferredMembership": [
                148
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateManyPreferredMembershipInput": {
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "id": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "name": [
                2
            ],
            "preferredAliasId": [
                1
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateManyPreferredMembershipInputEnvelope": {
            "data": [
                296
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedManyWithoutPreferredMembershipInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                308
            ],
            "create": [
                314
            ],
            "createMany": [
                297
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutAliasesInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                303
            ],
            "create": [
                309
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutAppearancesInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                304
            ],
            "create": [
                310
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutMemberOfInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                306
            ],
            "create": [
                312
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutPreferredAliasInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                307
            ],
            "create": [
                313
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutAliasesInput": {
            "create": [
                309
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutAppearancesInput": {
            "create": [
                310
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutAppearsInInput": {
            "create": [
                311
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutMemberOfInput": {
            "create": [
                312
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutPreferredAliasInput": {
            "create": [
                313
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutPreferredMembershipInput": {
            "create": [
                314
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateWithoutAliasesInput": {
            "appearances": [
                37
            ],
            "appearsIn": [
                88
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "memberOf": [
                147
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                7
            ],
            "preferredMembership": [
                148
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateWithoutAppearancesInput": {
            "aliases": [
                6
            ],
            "appearsIn": [
                88
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "memberOf": [
                147
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                7
            ],
            "preferredMembership": [
                148
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateWithoutAppearsInInput": {
            "aliases": [
                6
            ],
            "appearances": [
                37
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "memberOf": [
                147
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                7
            ],
            "preferredMembership": [
                148
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateWithoutMemberOfInput": {
            "aliases": [
                6
            ],
            "appearances": [
                37
            ],
            "appearsIn": [
                88
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                7
            ],
            "preferredMembership": [
                148
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateWithoutPreferredAliasInput": {
            "aliases": [
                6
            ],
            "appearances": [
                37
            ],
            "appearsIn": [
                88
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "memberOf": [
                147
            ],
            "name": [
                2
            ],
            "preferredMembership": [
                148
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateWithoutPreferredMembershipInput": {
            "aliases": [
                6
            ],
            "appearances": [
                37
            ],
            "appearsIn": [
                88
            ],
            "createdAt": [
                71
            ],
            "description": [
                2
            ],
            "ireneBotId": [
                1
            ],
            "memberOf": [
                147
            ],
            "name": [
                2
            ],
            "preferredAlias": [
                7
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "PersonListRelationFilter": {
            "every": [
                339
            ],
            "none": [
                339
            ],
            "some": [
                339
            ],
            "__typename": [
                2
            ]
        },
        "PersonScalarWhereInput": {
            "AND": [
                316
            ],
            "NOT": [
                316
            ],
            "OR": [
                316
            ],
            "createdAt": [
                73
            ],
            "description": [
                364
            ],
            "id": [
                274
            ],
            "ireneBotId": [
                275
            ],
            "name": [
                363
            ],
            "preferredAliasId": [
                275
            ],
            "preferredMembershipId": [
                275
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateInput": {
            "aliases": [
                17
            ],
            "appearances": [
                54
            ],
            "appearsIn": [
                101
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "memberOf": [
                162
            ],
            "name": [
                362
            ],
            "preferredAlias": [
                18
            ],
            "preferredMembership": [
                163
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateManyWithWhereWithoutPreferredMembershipInput": {
            "data": [
                318
            ],
            "where": [
                316
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateManyWithoutPreferredMembershipInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                308
            ],
            "create": [
                314
            ],
            "createMany": [
                297
            ],
            "delete": [
                340
            ],
            "deleteMany": [
                316
            ],
            "disconnect": [
                340
            ],
            "set": [
                340
            ],
            "update": [
                326
            ],
            "updateMany": [
                319
            ],
            "upsert": [
                333
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneRequiredWithoutAliasesInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                303
            ],
            "create": [
                309
            ],
            "update": [
                327
            ],
            "upsert": [
                334
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneRequiredWithoutAppearancesInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                304
            ],
            "create": [
                310
            ],
            "update": [
                328
            ],
            "upsert": [
                335
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneRequiredWithoutMemberOfInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                306
            ],
            "create": [
                312
            ],
            "update": [
                330
            ],
            "upsert": [
                337
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneWithoutAppearsInInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                305
            ],
            "create": [
                311
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                329
            ],
            "upsert": [
                336
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneWithoutPreferredAliasInput": {
            "connect": [
                340
            ],
            "connectOrCreate": [
                307
            ],
            "create": [
                313
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                331
            ],
            "upsert": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithWhereUniqueWithoutPreferredMembershipInput": {
            "data": [
                332
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithoutAliasesInput": {
            "appearances": [
                54
            ],
            "appearsIn": [
                101
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "memberOf": [
                162
            ],
            "name": [
                362
            ],
            "preferredAlias": [
                18
            ],
            "preferredMembership": [
                163
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithoutAppearancesInput": {
            "aliases": [
                17
            ],
            "appearsIn": [
                101
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "memberOf": [
                162
            ],
            "name": [
                362
            ],
            "preferredAlias": [
                18
            ],
            "preferredMembership": [
                163
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithoutAppearsInInput": {
            "aliases": [
                17
            ],
            "appearances": [
                54
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "memberOf": [
                162
            ],
            "name": [
                362
            ],
            "preferredAlias": [
                18
            ],
            "preferredMembership": [
                163
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithoutMemberOfInput": {
            "aliases": [
                17
            ],
            "appearances": [
                54
            ],
            "appearsIn": [
                101
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "name": [
                362
            ],
            "preferredAlias": [
                18
            ],
            "preferredMembership": [
                163
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithoutPreferredAliasInput": {
            "aliases": [
                17
            ],
            "appearances": [
                54
            ],
            "appearsIn": [
                101
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "memberOf": [
                162
            ],
            "name": [
                362
            ],
            "preferredMembership": [
                163
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateWithoutPreferredMembershipInput": {
            "aliases": [
                17
            ],
            "appearances": [
                54
            ],
            "appearsIn": [
                101
            ],
            "createdAt": [
                72
            ],
            "description": [
                293
            ],
            "ireneBotId": [
                292
            ],
            "memberOf": [
                162
            ],
            "name": [
                362
            ],
            "preferredAlias": [
                18
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithWhereUniqueWithoutPreferredMembershipInput": {
            "create": [
                314
            ],
            "update": [
                332
            ],
            "where": [
                340
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutAliasesInput": {
            "create": [
                309
            ],
            "update": [
                327
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutAppearancesInput": {
            "create": [
                310
            ],
            "update": [
                328
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutAppearsInInput": {
            "create": [
                311
            ],
            "update": [
                329
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutMemberOfInput": {
            "create": [
                312
            ],
            "update": [
                330
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutPreferredAliasInput": {
            "create": [
                313
            ],
            "update": [
                331
            ],
            "__typename": [
                2
            ]
        },
        "PersonWhereInput": {
            "AND": [
                339
            ],
            "NOT": [
                339
            ],
            "OR": [
                339
            ],
            "aliases": [
                12
            ],
            "appearances": [
                46
            ],
            "appearsIn": [
                90
            ],
            "createdAt": [
                73
            ],
            "description": [
                364
            ],
            "id": [
                274
            ],
            "ireneBotId": [
                275
            ],
            "memberOf": [
                155
            ],
            "name": [
                363
            ],
            "preferredAlias": [
                24
            ],
            "preferredAliasId": [
                275
            ],
            "preferredMembership": [
                172
            ],
            "preferredMembershipId": [
                275
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "PersonWhereUniqueInput": {
            "id": [
                1
            ],
            "ireneBotId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Query": {
            "countAppearances": [
                28,
                {
                    "groups": [
                        1,
                        "[Int!]!"
                    ]
                }
            ],
            "group": [
                114,
                {
                    "where": [
                        186,
                        "GroupWhereUniqueInput!"
                    ]
                }
            ],
            "groups": [
                114,
                {
                    "cursor": [
                        186
                    ],
                    "orderBy": [
                        174,
                        "[GroupOrderByInput!]"
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        185
                    ]
                }
            ],
            "image": [
                187,
                {
                    "slug": [
                        2,
                        "String!"
                    ]
                }
            ],
            "imageConnections": [
                189,
                {
                    "depth": [
                        1,
                        "Int!"
                    ],
                    "slug": [
                        2,
                        "String!"
                    ]
                }
            ],
            "images": [
                187,
                {
                    "cursor": [
                        272
                    ],
                    "orderBy": [
                        244,
                        "[ImageOrderByInput!]"
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        271
                    ]
                }
            ],
            "me": [
                394
            ],
            "people": [
                294,
                {
                    "cursor": [
                        340
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        339
                    ]
                }
            ],
            "person": [
                294,
                {
                    "where": [
                        340,
                        "PersonWhereUniqueInput!"
                    ]
                }
            ],
            "personImages": [
                243,
                {
                    "amount": [
                        1
                    ],
                    "personIds": [
                        1,
                        "[Int!]!"
                    ]
                }
            ],
            "user": [
                394,
                {
                    "id": [
                        1
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "QueryMode": {},
        "QueueInfo": {
            "queueSize": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Role": {
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "RoleCreateManyUserInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "RoleCreateManyUserInputEnvelope": {
            "data": [
                345
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "RoleCreateNestedManyWithoutUserInput": {
            "connect": [
                360
            ],
            "connectOrCreate": [
                348
            ],
            "create": [
                349
            ],
            "createMany": [
                346
            ],
            "__typename": [
                2
            ]
        },
        "RoleCreateOrConnectWithoutUserInput": {
            "create": [
                349
            ],
            "where": [
                360
            ],
            "__typename": [
                2
            ]
        },
        "RoleCreateWithoutUserInput": {
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "RoleListRelationFilter": {
            "every": [
                359
            ],
            "none": [
                359
            ],
            "some": [
                359
            ],
            "__typename": [
                2
            ]
        },
        "RoleScalarWhereInput": {
            "AND": [
                351
            ],
            "NOT": [
                351
            ],
            "OR": [
                351
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "name": [
                363
            ],
            "updatedAt": [
                73
            ],
            "userId": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateManyWithWhereWithoutUserInput": {
            "data": [
                352
            ],
            "where": [
                351
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateManyWithoutUserInput": {
            "connect": [
                360
            ],
            "connectOrCreate": [
                348
            ],
            "create": [
                349
            ],
            "createMany": [
                346
            ],
            "delete": [
                360
            ],
            "deleteMany": [
                351
            ],
            "disconnect": [
                360
            ],
            "set": [
                360
            ],
            "update": [
                355
            ],
            "updateMany": [
                353
            ],
            "upsert": [
                357
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateWithWhereUniqueWithoutUserInput": {
            "data": [
                356
            ],
            "where": [
                360
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateWithoutUserInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpsertWithWhereUniqueWithoutUserInput": {
            "create": [
                349
            ],
            "update": [
                356
            ],
            "where": [
                360
            ],
            "__typename": [
                2
            ]
        },
        "RoleUserRoleCompoundUniqueInput": {
            "name": [
                2
            ],
            "userId": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "RoleWhereInput": {
            "AND": [
                359
            ],
            "NOT": [
                359
            ],
            "OR": [
                359
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "name": [
                363
            ],
            "updatedAt": [
                73
            ],
            "user": [
                424
            ],
            "userId": [
                274
            ],
            "__typename": [
                2
            ]
        },
        "RoleWhereUniqueInput": {
            "id": [
                1
            ],
            "userRole": [
                358
            ],
            "__typename": [
                2
            ]
        },
        "SortOrder": {},
        "StringFieldUpdateOperationsInput": {
            "set": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "StringFilter": {
            "contains": [
                2
            ],
            "endsWith": [
                2
            ],
            "equals": [
                2
            ],
            "gt": [
                2
            ],
            "gte": [
                2
            ],
            "in": [
                2
            ],
            "lt": [
                2
            ],
            "lte": [
                2
            ],
            "mode": [
                342
            ],
            "not": [
                289
            ],
            "notIn": [
                2
            ],
            "startsWith": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "StringNullableFilter": {
            "contains": [
                2
            ],
            "endsWith": [
                2
            ],
            "equals": [
                2
            ],
            "gt": [
                2
            ],
            "gte": [
                2
            ],
            "in": [
                2
            ],
            "lt": [
                2
            ],
            "lte": [
                2
            ],
            "mode": [
                342
            ],
            "not": [
                290
            ],
            "notIn": [
                2
            ],
            "startsWith": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "Tag": {
            "addedBy": [
                394
            ],
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "source": [
                378
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateManyAddedByInput": {
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "imageId": [
                1
            ],
            "name": [
                2
            ],
            "source": [
                378
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateManyAddedByInputEnvelope": {
            "data": [
                366
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateManyImageInput": {
            "addedById": [
                1
            ],
            "createdAt": [
                71
            ],
            "id": [
                1
            ],
            "name": [
                2
            ],
            "source": [
                378
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateManyImageInputEnvelope": {
            "data": [
                368
            ],
            "skipDuplicates": [
                5
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateNestedManyWithoutAddedByInput": {
            "connect": [
                391
            ],
            "connectOrCreate": [
                372
            ],
            "create": [
                374
            ],
            "createMany": [
                367
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateNestedManyWithoutImageInput": {
            "connect": [
                391
            ],
            "connectOrCreate": [
                373
            ],
            "create": [
                375
            ],
            "createMany": [
                369
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateOrConnectWithoutAddedByInput": {
            "create": [
                374
            ],
            "where": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateOrConnectWithoutImageInput": {
            "create": [
                375
            ],
            "where": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateWithoutAddedByInput": {
            "createdAt": [
                71
            ],
            "image": [
                199
            ],
            "name": [
                2
            ],
            "source": [
                378
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateWithoutImageInput": {
            "addedBy": [
                395
            ],
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "source": [
                378
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "TagListRelationFilter": {
            "every": [
                390
            ],
            "none": [
                390
            ],
            "some": [
                390
            ],
            "__typename": [
                2
            ]
        },
        "TagScalarWhereInput": {
            "AND": [
                377
            ],
            "NOT": [
                377
            ],
            "OR": [
                377
            ],
            "addedById": [
                275
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "imageId": [
                274
            ],
            "name": [
                363
            ],
            "source": [
                80
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "TagSource": {},
        "TagUpdateManyMutationInput": {
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "source": [
                79
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithWhereWithoutAddedByInput": {
            "data": [
                379
            ],
            "where": [
                377
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithWhereWithoutImageInput": {
            "data": [
                379
            ],
            "where": [
                377
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithoutAddedByInput": {
            "connect": [
                391
            ],
            "connectOrCreate": [
                372
            ],
            "create": [
                374
            ],
            "createMany": [
                367
            ],
            "delete": [
                391
            ],
            "deleteMany": [
                377
            ],
            "disconnect": [
                391
            ],
            "set": [
                391
            ],
            "update": [
                384
            ],
            "updateMany": [
                380
            ],
            "upsert": [
                388
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithoutImageInput": {
            "connect": [
                391
            ],
            "connectOrCreate": [
                373
            ],
            "create": [
                375
            ],
            "createMany": [
                369
            ],
            "delete": [
                391
            ],
            "deleteMany": [
                377
            ],
            "disconnect": [
                391
            ],
            "set": [
                391
            ],
            "update": [
                385
            ],
            "updateMany": [
                381
            ],
            "upsert": [
                389
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateWithWhereUniqueWithoutAddedByInput": {
            "data": [
                386
            ],
            "where": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateWithWhereUniqueWithoutImageInput": {
            "data": [
                387
            ],
            "where": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateWithoutAddedByInput": {
            "createdAt": [
                72
            ],
            "image": [
                252
            ],
            "name": [
                362
            ],
            "source": [
                79
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateWithoutImageInput": {
            "addedBy": [
                411
            ],
            "createdAt": [
                72
            ],
            "name": [
                362
            ],
            "source": [
                79
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "TagUpsertWithWhereUniqueWithoutAddedByInput": {
            "create": [
                374
            ],
            "update": [
                386
            ],
            "where": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "TagUpsertWithWhereUniqueWithoutImageInput": {
            "create": [
                375
            ],
            "update": [
                387
            ],
            "where": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "TagWhereInput": {
            "AND": [
                390
            ],
            "NOT": [
                390
            ],
            "OR": [
                390
            ],
            "addedBy": [
                424
            ],
            "addedById": [
                275
            ],
            "createdAt": [
                73
            ],
            "id": [
                274
            ],
            "image": [
                271
            ],
            "imageId": [
                274
            ],
            "name": [
                363
            ],
            "source": [
                80
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "TagWhereUniqueInput": {
            "id": [
                1
            ],
            "__typename": [
                2
            ]
        },
        "Thumbnail": {
            "large": [
                2
            ],
            "medium": [
                2
            ],
            "small": [
                2
            ],
            "__typename": [
                2
            ]
        },
        "UploadType": {},
        "User": {
            "avatar": [
                2
            ],
            "bot": [
                5
            ],
            "id": [
                1
            ],
            "images": [
                187,
                {
                    "cursor": [
                        272
                    ],
                    "orderBy": [
                        244,
                        "[ImageOrderByInput!]"
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        271
                    ]
                }
            ],
            "name": [
                2
            ],
            "roles": [
                344,
                {
                    "cursor": [
                        360
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ]
                }
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateNestedOneWithoutCratedTagsInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                399
            ],
            "create": [
                404
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateNestedOneWithoutImageLikesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                400
            ],
            "create": [
                405
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateNestedOneWithoutImagesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                401
            ],
            "create": [
                406
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateNestedOneWithoutTaggedAppearancesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                403
            ],
            "create": [
                408
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutCratedTagsInput": {
            "create": [
                404
            ],
            "where": [
                425
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutImageLikesInput": {
            "create": [
                405
            ],
            "where": [
                425
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutImagesInput": {
            "create": [
                406
            ],
            "where": [
                425
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutMarkedFacesInput": {
            "create": [
                407
            ],
            "where": [
                425
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutTaggedAppearancesInput": {
            "create": [
                408
            ],
            "where": [
                425
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateWithoutCratedTagsInput": {
            "bot": [
                5
            ],
            "createdAt": [
                71
            ],
            "email": [
                2
            ],
            "emailVerified": [
                71
            ],
            "image": [
                2
            ],
            "imageLikes": [
                221
            ],
            "images": [
                194
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                347
            ],
            "taggedAppearances": [
                35
            ],
            "token": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateWithoutImageLikesInput": {
            "bot": [
                5
            ],
            "cratedTags": [
                370
            ],
            "createdAt": [
                71
            ],
            "email": [
                2
            ],
            "emailVerified": [
                71
            ],
            "image": [
                2
            ],
            "images": [
                194
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                347
            ],
            "taggedAppearances": [
                35
            ],
            "token": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateWithoutImagesInput": {
            "bot": [
                5
            ],
            "cratedTags": [
                370
            ],
            "createdAt": [
                71
            ],
            "email": [
                2
            ],
            "emailVerified": [
                71
            ],
            "image": [
                2
            ],
            "imageLikes": [
                221
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                347
            ],
            "taggedAppearances": [
                35
            ],
            "token": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateWithoutMarkedFacesInput": {
            "bot": [
                5
            ],
            "cratedTags": [
                370
            ],
            "createdAt": [
                71
            ],
            "email": [
                2
            ],
            "emailVerified": [
                71
            ],
            "image": [
                2
            ],
            "imageLikes": [
                221
            ],
            "images": [
                194
            ],
            "name": [
                2
            ],
            "roles": [
                347
            ],
            "taggedAppearances": [
                35
            ],
            "token": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateWithoutTaggedAppearancesInput": {
            "bot": [
                5
            ],
            "cratedTags": [
                370
            ],
            "createdAt": [
                71
            ],
            "email": [
                2
            ],
            "emailVerified": [
                71
            ],
            "image": [
                2
            ],
            "imageLikes": [
                221
            ],
            "images": [
                194
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                347
            ],
            "token": [
                2
            ],
            "updatedAt": [
                71
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneRequiredWithoutImageLikesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                400
            ],
            "create": [
                405
            ],
            "update": [
                415
            ],
            "upsert": [
                420
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneRequiredWithoutTaggedAppearancesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                403
            ],
            "create": [
                408
            ],
            "update": [
                418
            ],
            "upsert": [
                423
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneWithoutCratedTagsInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                399
            ],
            "create": [
                404
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                414
            ],
            "upsert": [
                419
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneWithoutImagesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                401
            ],
            "create": [
                406
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                416
            ],
            "upsert": [
                421
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneWithoutMarkedFacesInput": {
            "connect": [
                425
            ],
            "connectOrCreate": [
                402
            ],
            "create": [
                407
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                417
            ],
            "upsert": [
                422
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateWithoutCratedTagsInput": {
            "bot": [
                69
            ],
            "createdAt": [
                72
            ],
            "email": [
                293
            ],
            "emailVerified": [
                291
            ],
            "image": [
                293
            ],
            "imageLikes": [
                233
            ],
            "images": [
                248
            ],
            "markedFaces": [
                98
            ],
            "name": [
                293
            ],
            "roles": [
                354
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                293
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateWithoutImageLikesInput": {
            "bot": [
                69
            ],
            "cratedTags": [
                382
            ],
            "createdAt": [
                72
            ],
            "email": [
                293
            ],
            "emailVerified": [
                291
            ],
            "image": [
                293
            ],
            "images": [
                248
            ],
            "markedFaces": [
                98
            ],
            "name": [
                293
            ],
            "roles": [
                354
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                293
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateWithoutImagesInput": {
            "bot": [
                69
            ],
            "cratedTags": [
                382
            ],
            "createdAt": [
                72
            ],
            "email": [
                293
            ],
            "emailVerified": [
                291
            ],
            "image": [
                293
            ],
            "imageLikes": [
                233
            ],
            "markedFaces": [
                98
            ],
            "name": [
                293
            ],
            "roles": [
                354
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                293
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateWithoutMarkedFacesInput": {
            "bot": [
                69
            ],
            "cratedTags": [
                382
            ],
            "createdAt": [
                72
            ],
            "email": [
                293
            ],
            "emailVerified": [
                291
            ],
            "image": [
                293
            ],
            "imageLikes": [
                233
            ],
            "images": [
                248
            ],
            "name": [
                293
            ],
            "roles": [
                354
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                293
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateWithoutTaggedAppearancesInput": {
            "bot": [
                69
            ],
            "cratedTags": [
                382
            ],
            "createdAt": [
                72
            ],
            "email": [
                293
            ],
            "emailVerified": [
                291
            ],
            "image": [
                293
            ],
            "imageLikes": [
                233
            ],
            "images": [
                248
            ],
            "markedFaces": [
                98
            ],
            "name": [
                293
            ],
            "roles": [
                354
            ],
            "token": [
                293
            ],
            "updatedAt": [
                72
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutCratedTagsInput": {
            "create": [
                404
            ],
            "update": [
                414
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutImageLikesInput": {
            "create": [
                405
            ],
            "update": [
                415
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutImagesInput": {
            "create": [
                406
            ],
            "update": [
                416
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutMarkedFacesInput": {
            "create": [
                407
            ],
            "update": [
                417
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutTaggedAppearancesInput": {
            "create": [
                408
            ],
            "update": [
                418
            ],
            "__typename": [
                2
            ]
        },
        "UserWhereInput": {
            "AND": [
                424
            ],
            "NOT": [
                424
            ],
            "OR": [
                424
            ],
            "bot": [
                70
            ],
            "cratedTags": [
                376
            ],
            "createdAt": [
                73
            ],
            "email": [
                364
            ],
            "emailVerified": [
                74
            ],
            "id": [
                274
            ],
            "image": [
                364
            ],
            "imageLikes": [
                227
            ],
            "images": [
                242
            ],
            "markedFaces": [
                90
            ],
            "name": [
                364
            ],
            "roles": [
                350
            ],
            "taggedAppearances": [
                46
            ],
            "token": [
                364
            ],
            "updatedAt": [
                73
            ],
            "__typename": [
                2
            ]
        },
        "UserWhereUniqueInput": {
            "email": [
                2
            ],
            "id": [
                1
            ],
            "token": [
                2
            ],
            "__typename": [
                2
            ]
        }
    }
}