module.exports = {
    "scalars": [
        1,
        2,
        5,
        71,
        84,
        92,
        188,
        275,
        340,
        359,
        376,
        391
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
                300
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
                297
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
                272
            ],
            "name": [
                361
            ],
            "personId": [
                272
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
                360
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
                360
            ],
            "preferredAliasOf": [
                323
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
                360
            ],
            "person": [
                319
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
                272
            ],
            "name": [
                361
            ],
            "person": [
                337
            ],
            "personId": [
                272
            ],
            "preferredAliasOf": [
                337
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
                392
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
                292
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
                194
            ],
            "person": [
                298
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
                396
            ],
            "createdAt": [
                71
            ],
            "image": [
                194
            ],
            "person": [
                298
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
                396
            ],
            "createdAt": [
                71
            ],
            "faces": [
                86
            ],
            "person": [
                298
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
                396
            ],
            "createdAt": [
                71
            ],
            "faces": [
                86
            ],
            "image": [
                194
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
                272
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "imageId": [
                272
            ],
            "personId": [
                272
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
                247
            ],
            "person": [
                320
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
                408
            ],
            "createdAt": [
                72
            ],
            "image": [
                247
            ],
            "person": [
                320
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
                408
            ],
            "createdAt": [
                72
            ],
            "faces": [
                99
            ],
            "person": [
                320
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
                408
            ],
            "createdAt": [
                72
            ],
            "faces": [
                99
            ],
            "image": [
                247
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
                422
            ],
            "addedById": [
                272
            ],
            "createdAt": [
                73
            ],
            "faces": [
                90
            ],
            "id": [
                272
            ],
            "image": [
                269
            ],
            "imageId": [
                272
            ],
            "person": [
                337
            ],
            "personId": [
                272
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
                277
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
                278
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
                279
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
                280
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
                275
            ],
            "__typename": [
                2
            ]
        },
        "EnumMimeTypeFilter": {
            "equals": [
                275
            ],
            "in": [
                275
            ],
            "not": [
                281
            ],
            "notIn": [
                275
            ],
            "__typename": [
                2
            ]
        },
        "EnumTagSourceFieldUpdateOperationsInput": {
            "set": [
                376
            ],
            "__typename": [
                2
            ]
        },
        "EnumTagSourceFilter": {
            "equals": [
                376
            ],
            "in": [
                376
            ],
            "not": [
                282
            ],
            "notIn": [
                376
            ],
            "__typename": [
                2
            ]
        },
        "EnumUploadTypeFieldUpdateOperationsInput": {
            "set": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "EnumUploadTypeFilter": {
            "equals": [
                391
            ],
            "in": [
                391
            ],
            "not": [
                283
            ],
            "notIn": [
                391
            ],
            "__typename": [
                2
            ]
        },
        "Face": {
            "addedBy": [
                392
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
                273
            ],
            "appearanceId": [
                273
            ],
            "createdAt": [
                73
            ],
            "height": [
                113
            ],
            "id": [
                272
            ],
            "imageId": [
                272
            ],
            "personId": [
                273
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
                248
            ],
            "person": [
                322
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
                411
            ],
            "createdAt": [
                72
            ],
            "height": [
                112
            ],
            "image": [
                248
            ],
            "person": [
                322
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
                411
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
                322
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
                411
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
                248
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
                422
            ],
            "addedById": [
                273
            ],
            "appearance": [
                67
            ],
            "appearanceId": [
                273
            ],
            "createdAt": [
                73
            ],
            "height": [
                113
            ],
            "id": [
                272
            ],
            "image": [
                269
            ],
            "imageId": [
                272
            ],
            "person": [
                337
            ],
            "personId": [
                273
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
                284
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
                272
            ],
            "id": [
                272
            ],
            "name": [
                361
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
                360
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
                360
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
                272
            ],
            "id": [
                272
            ],
            "name": [
                361
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
                195
            ],
            "banner": [
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
        "GroupCreateWithoutBannerInput": {
            "aliases": [
                118
            ],
            "avatar": [
                195
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
                195
            ],
            "banner": [
                196
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
                292
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
                299
            ],
            "preferredMemberships_": [
                296
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
                296
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
                299
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
                272
            ],
            "id": [
                272
            ],
            "personId": [
                272
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
                289
            ],
            "startDate": [
                289
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
                289
            ],
            "person": [
                321
            ],
            "preferredMemberships_": [
                318
            ],
            "startDate": [
                289
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
                289
            ],
            "group": [
                176
            ],
            "preferredMemberships_": [
                318
            ],
            "startDate": [
                289
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
                289
            ],
            "group": [
                176
            ],
            "person": [
                321
            ],
            "startDate": [
                289
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
                272
            ],
            "id": [
                272
            ],
            "person": [
                337
            ],
            "personId": [
                272
            ],
            "preferredMemberships_": [
                313
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
                359
            ],
            "bannerId": [
                359
            ],
            "createdAt": [
                359
            ],
            "id": [
                359
            ],
            "ireneBotId": [
                359
            ],
            "name": [
                359
            ],
            "updatedAt": [
                359
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
                251
            ],
            "banner": [
                252
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                290
            ],
            "members": [
                161
            ],
            "name": [
                360
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
                252
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                290
            ],
            "members": [
                161
            ],
            "name": [
                360
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
                251
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                290
            ],
            "members": [
                161
            ],
            "name": [
                360
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
                251
            ],
            "banner": [
                252
            ],
            "createdAt": [
                72
            ],
            "ireneBotId": [
                290
            ],
            "name": [
                360
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
                269
            ],
            "avatarId": [
                273
            ],
            "banner": [
                269
            ],
            "bannerId": [
                273
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "ireneBotId": [
                273
            ],
            "members": [
                155
            ],
            "name": [
                361
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
            "hash": [
                2
            ],
            "height": [
                1
            ],
            "id": [
                1
            ],
            "isNsfw": [
                5
            ],
            "liked": [
                5
            ],
            "mimetype": [
                275
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
                363,
                {
                    "cursor": [
                        389
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
                390
            ],
            "unknownFaces": [
                83
            ],
            "uploadType": [
                391
            ],
            "uploadedBy": [
                392
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
                214
            ],
            "images": [
                187
            ],
            "people": [
                292
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
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                192
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
                391
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
                190
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
                270
            ],
            "connectOrCreate": [
                205
            ],
            "create": [
                212
            ],
            "createMany": [
                191
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutAppearancesInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                199
            ],
            "create": [
                206
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutAvatarOfInput": {
            "connect": [
                270
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
        "ImageCreateNestedOneWithoutBannerOfInput": {
            "connect": [
                270
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
        "ImageCreateNestedOneWithoutLikesInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                203
            ],
            "create": [
                210
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateNestedOneWithoutTagsInput": {
            "connect": [
                270
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
        "ImageCreateOrConnectWithoutAppearancesInput": {
            "create": [
                206
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutAvatarOfInput": {
            "create": [
                207
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutBannerOfInput": {
            "create": [
                208
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutFacesInput": {
            "create": [
                209
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutLikesInput": {
            "create": [
                210
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutTagsInput": {
            "create": [
                211
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageCreateOrConnectWithoutUserInput": {
            "create": [
                212
            ],
            "where": [
                270
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
                219
            ],
            "mimetype": [
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                369
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                391
            ],
            "user": [
                395
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
                219
            ],
            "mimetype": [
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                369
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                391
            ],
            "user": [
                395
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
                219
            ],
            "mimetype": [
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                369
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                391
            ],
            "user": [
                395
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
                219
            ],
            "mimetype": [
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                369
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                391
            ],
            "user": [
                395
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
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                369
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                391
            ],
            "user": [
                395
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
                219
            ],
            "mimetype": [
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                391
            ],
            "user": [
                395
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
                219
            ],
            "mimetype": [
                275
            ],
            "pHash": [
                2
            ],
            "palette": [
                213
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
                369
            ],
            "updatedAt": [
                71
            ],
            "uploadType": [
                391
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
                215
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
                217
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
                240
            ],
            "connectOrCreate": [
                221
            ],
            "create": [
                223
            ],
            "createMany": [
                216
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateNestedManyWithoutUserInput": {
            "connect": [
                240
            ],
            "connectOrCreate": [
                222
            ],
            "create": [
                224
            ],
            "createMany": [
                218
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateOrConnectWithoutImageInput": {
            "create": [
                223
            ],
            "where": [
                240
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeCreateOrConnectWithoutUserInput": {
            "create": [
                224
            ],
            "where": [
                240
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
                394
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
                197
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
                239
            ],
            "none": [
                239
            ],
            "some": [
                239
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeScalarWhereInput": {
            "AND": [
                227
            ],
            "NOT": [
                227
            ],
            "OR": [
                227
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "imageId": [
                272
            ],
            "updatedAt": [
                73
            ],
            "userId": [
                272
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
                228
            ],
            "where": [
                227
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithWhereWithoutUserInput": {
            "data": [
                228
            ],
            "where": [
                227
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithoutImageInput": {
            "connect": [
                240
            ],
            "connectOrCreate": [
                221
            ],
            "create": [
                223
            ],
            "createMany": [
                216
            ],
            "delete": [
                240
            ],
            "deleteMany": [
                227
            ],
            "disconnect": [
                240
            ],
            "set": [
                240
            ],
            "update": [
                233
            ],
            "updateMany": [
                229
            ],
            "upsert": [
                237
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateManyWithoutUserInput": {
            "connect": [
                240
            ],
            "connectOrCreate": [
                222
            ],
            "create": [
                224
            ],
            "createMany": [
                218
            ],
            "delete": [
                240
            ],
            "deleteMany": [
                227
            ],
            "disconnect": [
                240
            ],
            "set": [
                240
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
        "ImageLikeUpdateWithWhereUniqueWithoutImageInput": {
            "data": [
                235
            ],
            "where": [
                240
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpdateWithWhereUniqueWithoutUserInput": {
            "data": [
                236
            ],
            "where": [
                240
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
                407
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
                249
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
                223
            ],
            "update": [
                235
            ],
            "where": [
                240
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeUpsertWithWhereUniqueWithoutUserInput": {
            "create": [
                224
            ],
            "update": [
                236
            ],
            "where": [
                240
            ],
            "__typename": [
                2
            ]
        },
        "ImageLikeWhereInput": {
            "AND": [
                239
            ],
            "NOT": [
                239
            ],
            "OR": [
                239
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "image": [
                269
            ],
            "imageId": [
                272
            ],
            "updatedAt": [
                73
            ],
            "user": [
                422
            ],
            "userId": [
                272
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
                225
            ],
            "__typename": [
                2
            ]
        },
        "ImageListRelationFilter": {
            "every": [
                269
            ],
            "none": [
                269
            ],
            "some": [
                269
            ],
            "__typename": [
                2
            ]
        },
        "ImageOrderByInput": {
            "bytes": [
                359
            ],
            "caption": [
                359
            ],
            "createdAt": [
                359
            ],
            "faceScanDate": [
                359
            ],
            "faceScanRequestDate": [
                359
            ],
            "fileName": [
                359
            ],
            "hash": [
                359
            ],
            "height": [
                359
            ],
            "id": [
                359
            ],
            "ireneBotId": [
                359
            ],
            "isNsfw": [
                359
            ],
            "mimetype": [
                359
            ],
            "pHash": [
                359
            ],
            "palette": [
                359
            ],
            "public": [
                359
            ],
            "slug": [
                359
            ],
            "source": [
                359
            ],
            "updatedAt": [
                359
            ],
            "uploadType": [
                359
            ],
            "userId": [
                359
            ],
            "views": [
                359
            ],
            "width": [
                359
            ],
            "__typename": [
                2
            ]
        },
        "ImageScalarWhereInput": {
            "AND": [
                243
            ],
            "NOT": [
                243
            ],
            "OR": [
                243
            ],
            "bytes": [
                272
            ],
            "caption": [
                362
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
                362
            ],
            "hash": [
                361
            ],
            "height": [
                272
            ],
            "id": [
                272
            ],
            "ireneBotId": [
                273
            ],
            "isNsfw": [
                70
            ],
            "mimetype": [
                78
            ],
            "pHash": [
                362
            ],
            "palette": [
                274
            ],
            "public": [
                70
            ],
            "slug": [
                361
            ],
            "source": [
                362
            ],
            "updatedAt": [
                73
            ],
            "uploadType": [
                82
            ],
            "userId": [
                273
            ],
            "views": [
                272
            ],
            "width": [
                272
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateManyMutationInput": {
            "bytes": [
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "views": [
                271
            ],
            "width": [
                271
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateManyWithWhereWithoutUserInput": {
            "data": [
                244
            ],
            "where": [
                243
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateManyWithoutUserInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                205
            ],
            "create": [
                212
            ],
            "createMany": [
                191
            ],
            "delete": [
                270
            ],
            "deleteMany": [
                243
            ],
            "disconnect": [
                270
            ],
            "set": [
                270
            ],
            "update": [
                253
            ],
            "updateMany": [
                245
            ],
            "upsert": [
                262
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneRequiredWithoutAppearancesInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                199
            ],
            "create": [
                206
            ],
            "update": [
                254
            ],
            "upsert": [
                263
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneRequiredWithoutFacesInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                202
            ],
            "create": [
                209
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
        "ImageUpdateOneRequiredWithoutLikesInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                203
            ],
            "create": [
                210
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
        "ImageUpdateOneRequiredWithoutTagsInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                204
            ],
            "create": [
                211
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
        "ImageUpdateOneWithoutAvatarOfInput": {
            "connect": [
                270
            ],
            "connectOrCreate": [
                200
            ],
            "create": [
                207
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                255
            ],
            "upsert": [
                264
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateOneWithoutBannerOfInput": {
            "connect": [
                270
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
                256
            ],
            "upsert": [
                265
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpdateWithWhereUniqueWithoutUserInput": {
            "data": [
                260
            ],
            "where": [
                270
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "faces": [
                100
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                231
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "tags": [
                381
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                410
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "faces": [
                100
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                231
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "tags": [
                381
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                410
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "faces": [
                100
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                231
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "tags": [
                381
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                410
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                231
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "tags": [
                381
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                410
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "faces": [
                100
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "tags": [
                381
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                410
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "faces": [
                100
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                231
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "user": [
                410
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                271
            ],
            "caption": [
                291
            ],
            "createdAt": [
                72
            ],
            "faceScanDate": [
                289
            ],
            "faceScanRequestDate": [
                289
            ],
            "faces": [
                100
            ],
            "fileName": [
                291
            ],
            "hash": [
                360
            ],
            "height": [
                271
            ],
            "ireneBotId": [
                290
            ],
            "isNsfw": [
                69
            ],
            "likes": [
                231
            ],
            "mimetype": [
                77
            ],
            "pHash": [
                291
            ],
            "palette": [
                261
            ],
            "public": [
                69
            ],
            "slug": [
                360
            ],
            "source": [
                291
            ],
            "tags": [
                381
            ],
            "updatedAt": [
                72
            ],
            "uploadType": [
                81
            ],
            "views": [
                271
            ],
            "width": [
                271
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
                212
            ],
            "update": [
                260
            ],
            "where": [
                270
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutAppearancesInput": {
            "create": [
                206
            ],
            "update": [
                254
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutAvatarOfInput": {
            "create": [
                207
            ],
            "update": [
                255
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutBannerOfInput": {
            "create": [
                208
            ],
            "update": [
                256
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutFacesInput": {
            "create": [
                209
            ],
            "update": [
                257
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutLikesInput": {
            "create": [
                210
            ],
            "update": [
                258
            ],
            "__typename": [
                2
            ]
        },
        "ImageUpsertWithoutTagsInput": {
            "create": [
                211
            ],
            "update": [
                259
            ],
            "__typename": [
                2
            ]
        },
        "ImageWhereInput": {
            "AND": [
                269
            ],
            "NOT": [
                269
            ],
            "OR": [
                269
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
                272
            ],
            "caption": [
                362
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
                362
            ],
            "hash": [
                361
            ],
            "height": [
                272
            ],
            "id": [
                272
            ],
            "ireneBotId": [
                273
            ],
            "isNsfw": [
                70
            ],
            "likes": [
                226
            ],
            "mimetype": [
                78
            ],
            "pHash": [
                362
            ],
            "palette": [
                274
            ],
            "public": [
                70
            ],
            "slug": [
                361
            ],
            "source": [
                362
            ],
            "tags": [
                374
            ],
            "updatedAt": [
                73
            ],
            "uploadType": [
                82
            ],
            "user": [
                422
            ],
            "userId": [
                273
            ],
            "views": [
                272
            ],
            "width": [
                272
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
                285
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
                286
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
                292,
                {
                    "data": [
                        293,
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
                341,
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
                292,
                {
                    "create": [
                        293,
                        "PersonCreateInput!"
                    ],
                    "update": [
                        315,
                        "PersonUpdateInput!"
                    ],
                    "where": [
                        338,
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
                277
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
                278
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
                279
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
                280
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
                275
            ],
            "in": [
                275
            ],
            "not": [
                281
            ],
            "notIn": [
                275
            ],
            "__typename": [
                2
            ]
        },
        "NestedEnumTagSourceFilter": {
            "equals": [
                376
            ],
            "in": [
                376
            ],
            "not": [
                282
            ],
            "notIn": [
                376
            ],
            "__typename": [
                2
            ]
        },
        "NestedEnumUploadTypeFilter": {
            "equals": [
                391
            ],
            "in": [
                391
            ],
            "not": [
                283
            ],
            "notIn": [
                391
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
                284
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
                285
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
                286
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
                287
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
                288
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
                294
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
                338
            ],
            "connectOrCreate": [
                306
            ],
            "create": [
                312
            ],
            "createMany": [
                295
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutAliasesInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                301
            ],
            "create": [
                307
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutAppearancesInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                302
            ],
            "create": [
                308
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateNestedOneWithoutMemberOfInput": {
            "connect": [
                338
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
        "PersonCreateNestedOneWithoutPreferredAliasInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                305
            ],
            "create": [
                311
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutAliasesInput": {
            "create": [
                307
            ],
            "where": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutAppearancesInput": {
            "create": [
                308
            ],
            "where": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutAppearsInInput": {
            "create": [
                309
            ],
            "where": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutMemberOfInput": {
            "create": [
                310
            ],
            "where": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutPreferredAliasInput": {
            "create": [
                311
            ],
            "where": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonCreateOrConnectWithoutPreferredMembershipInput": {
            "create": [
                312
            ],
            "where": [
                338
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
                337
            ],
            "none": [
                337
            ],
            "some": [
                337
            ],
            "__typename": [
                2
            ]
        },
        "PersonScalarWhereInput": {
            "AND": [
                314
            ],
            "NOT": [
                314
            ],
            "OR": [
                314
            ],
            "createdAt": [
                73
            ],
            "description": [
                362
            ],
            "id": [
                272
            ],
            "ireneBotId": [
                273
            ],
            "name": [
                361
            ],
            "preferredAliasId": [
                273
            ],
            "preferredMembershipId": [
                273
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "memberOf": [
                162
            ],
            "name": [
                360
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "name": [
                360
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
                316
            ],
            "where": [
                314
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateManyWithoutPreferredMembershipInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                306
            ],
            "create": [
                312
            ],
            "createMany": [
                295
            ],
            "delete": [
                338
            ],
            "deleteMany": [
                314
            ],
            "disconnect": [
                338
            ],
            "set": [
                338
            ],
            "update": [
                324
            ],
            "updateMany": [
                317
            ],
            "upsert": [
                331
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneRequiredWithoutAliasesInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                301
            ],
            "create": [
                307
            ],
            "update": [
                325
            ],
            "upsert": [
                332
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneRequiredWithoutAppearancesInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                302
            ],
            "create": [
                308
            ],
            "update": [
                326
            ],
            "upsert": [
                333
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpdateOneRequiredWithoutMemberOfInput": {
            "connect": [
                338
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
        "PersonUpdateOneWithoutAppearsInInput": {
            "connect": [
                338
            ],
            "connectOrCreate": [
                303
            ],
            "create": [
                309
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
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
        "PersonUpdateOneWithoutPreferredAliasInput": {
            "connect": [
                338
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
        "PersonUpdateWithWhereUniqueWithoutPreferredMembershipInput": {
            "data": [
                330
            ],
            "where": [
                338
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "memberOf": [
                162
            ],
            "name": [
                360
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "memberOf": [
                162
            ],
            "name": [
                360
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "memberOf": [
                162
            ],
            "name": [
                360
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "name": [
                360
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "memberOf": [
                162
            ],
            "name": [
                360
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
                291
            ],
            "ireneBotId": [
                290
            ],
            "memberOf": [
                162
            ],
            "name": [
                360
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
                312
            ],
            "update": [
                330
            ],
            "where": [
                338
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutAliasesInput": {
            "create": [
                307
            ],
            "update": [
                325
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutAppearancesInput": {
            "create": [
                308
            ],
            "update": [
                326
            ],
            "__typename": [
                2
            ]
        },
        "PersonUpsertWithoutAppearsInInput": {
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
        "PersonUpsertWithoutMemberOfInput": {
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
        "PersonUpsertWithoutPreferredAliasInput": {
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
        "PersonWhereInput": {
            "AND": [
                337
            ],
            "NOT": [
                337
            ],
            "OR": [
                337
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
                362
            ],
            "id": [
                272
            ],
            "ireneBotId": [
                273
            ],
            "memberOf": [
                155
            ],
            "name": [
                361
            ],
            "preferredAlias": [
                24
            ],
            "preferredAliasId": [
                273
            ],
            "preferredMembership": [
                172
            ],
            "preferredMembershipId": [
                273
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
                        270
                    ],
                    "orderBy": [
                        242,
                        "[ImageOrderByInput!]"
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        269
                    ]
                }
            ],
            "me": [
                392
            ],
            "people": [
                292,
                {
                    "cursor": [
                        338
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        337
                    ]
                }
            ],
            "person": [
                292,
                {
                    "where": [
                        338,
                        "PersonWhereUniqueInput!"
                    ]
                }
            ],
            "personImages": [
                187,
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
                392,
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
                343
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
                358
            ],
            "connectOrCreate": [
                346
            ],
            "create": [
                347
            ],
            "createMany": [
                344
            ],
            "__typename": [
                2
            ]
        },
        "RoleCreateOrConnectWithoutUserInput": {
            "create": [
                347
            ],
            "where": [
                358
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
                357
            ],
            "none": [
                357
            ],
            "some": [
                357
            ],
            "__typename": [
                2
            ]
        },
        "RoleScalarWhereInput": {
            "AND": [
                349
            ],
            "NOT": [
                349
            ],
            "OR": [
                349
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "name": [
                361
            ],
            "updatedAt": [
                73
            ],
            "userId": [
                272
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
                360
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
                350
            ],
            "where": [
                349
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateManyWithoutUserInput": {
            "connect": [
                358
            ],
            "connectOrCreate": [
                346
            ],
            "create": [
                347
            ],
            "createMany": [
                344
            ],
            "delete": [
                358
            ],
            "deleteMany": [
                349
            ],
            "disconnect": [
                358
            ],
            "set": [
                358
            ],
            "update": [
                353
            ],
            "updateMany": [
                351
            ],
            "upsert": [
                355
            ],
            "__typename": [
                2
            ]
        },
        "RoleUpdateWithWhereUniqueWithoutUserInput": {
            "data": [
                354
            ],
            "where": [
                358
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
                360
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
                347
            ],
            "update": [
                354
            ],
            "where": [
                358
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
                357
            ],
            "NOT": [
                357
            ],
            "OR": [
                357
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "name": [
                361
            ],
            "updatedAt": [
                73
            ],
            "user": [
                422
            ],
            "userId": [
                272
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
                356
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
                340
            ],
            "not": [
                287
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
                340
            ],
            "not": [
                288
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
                392
            ],
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "source": [
                376
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
                376
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
                364
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
                376
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
                366
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
                389
            ],
            "connectOrCreate": [
                370
            ],
            "create": [
                372
            ],
            "createMany": [
                365
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateNestedManyWithoutImageInput": {
            "connect": [
                389
            ],
            "connectOrCreate": [
                371
            ],
            "create": [
                373
            ],
            "createMany": [
                367
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateOrConnectWithoutAddedByInput": {
            "create": [
                372
            ],
            "where": [
                389
            ],
            "__typename": [
                2
            ]
        },
        "TagCreateOrConnectWithoutImageInput": {
            "create": [
                373
            ],
            "where": [
                389
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
                198
            ],
            "name": [
                2
            ],
            "source": [
                376
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
                393
            ],
            "createdAt": [
                71
            ],
            "name": [
                2
            ],
            "source": [
                376
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
                388
            ],
            "none": [
                388
            ],
            "some": [
                388
            ],
            "__typename": [
                2
            ]
        },
        "TagScalarWhereInput": {
            "AND": [
                375
            ],
            "NOT": [
                375
            ],
            "OR": [
                375
            ],
            "addedById": [
                273
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "imageId": [
                272
            ],
            "name": [
                361
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
                360
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
                377
            ],
            "where": [
                375
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithWhereWithoutImageInput": {
            "data": [
                377
            ],
            "where": [
                375
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithoutAddedByInput": {
            "connect": [
                389
            ],
            "connectOrCreate": [
                370
            ],
            "create": [
                372
            ],
            "createMany": [
                365
            ],
            "delete": [
                389
            ],
            "deleteMany": [
                375
            ],
            "disconnect": [
                389
            ],
            "set": [
                389
            ],
            "update": [
                382
            ],
            "updateMany": [
                378
            ],
            "upsert": [
                386
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateManyWithoutImageInput": {
            "connect": [
                389
            ],
            "connectOrCreate": [
                371
            ],
            "create": [
                373
            ],
            "createMany": [
                367
            ],
            "delete": [
                389
            ],
            "deleteMany": [
                375
            ],
            "disconnect": [
                389
            ],
            "set": [
                389
            ],
            "update": [
                383
            ],
            "updateMany": [
                379
            ],
            "upsert": [
                387
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateWithWhereUniqueWithoutAddedByInput": {
            "data": [
                384
            ],
            "where": [
                389
            ],
            "__typename": [
                2
            ]
        },
        "TagUpdateWithWhereUniqueWithoutImageInput": {
            "data": [
                385
            ],
            "where": [
                389
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
                250
            ],
            "name": [
                360
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
                409
            ],
            "createdAt": [
                72
            ],
            "name": [
                360
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
                372
            ],
            "update": [
                384
            ],
            "where": [
                389
            ],
            "__typename": [
                2
            ]
        },
        "TagUpsertWithWhereUniqueWithoutImageInput": {
            "create": [
                373
            ],
            "update": [
                385
            ],
            "where": [
                389
            ],
            "__typename": [
                2
            ]
        },
        "TagWhereInput": {
            "AND": [
                388
            ],
            "NOT": [
                388
            ],
            "OR": [
                388
            ],
            "addedBy": [
                422
            ],
            "addedById": [
                273
            ],
            "createdAt": [
                73
            ],
            "id": [
                272
            ],
            "image": [
                269
            ],
            "imageId": [
                272
            ],
            "name": [
                361
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
                        270
                    ],
                    "orderBy": [
                        242,
                        "[ImageOrderByInput!]"
                    ],
                    "skip": [
                        1
                    ],
                    "take": [
                        1
                    ],
                    "where": [
                        269
                    ]
                }
            ],
            "name": [
                2
            ],
            "roles": [
                342,
                {
                    "cursor": [
                        358
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
                423
            ],
            "connectOrCreate": [
                397
            ],
            "create": [
                402
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateNestedOneWithoutImageLikesInput": {
            "connect": [
                423
            ],
            "connectOrCreate": [
                398
            ],
            "create": [
                403
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateNestedOneWithoutImagesInput": {
            "connect": [
                423
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
        "UserCreateNestedOneWithoutTaggedAppearancesInput": {
            "connect": [
                423
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
        "UserCreateOrConnectWithoutCratedTagsInput": {
            "create": [
                402
            ],
            "where": [
                423
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutImageLikesInput": {
            "create": [
                403
            ],
            "where": [
                423
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutImagesInput": {
            "create": [
                404
            ],
            "where": [
                423
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutMarkedFacesInput": {
            "create": [
                405
            ],
            "where": [
                423
            ],
            "__typename": [
                2
            ]
        },
        "UserCreateOrConnectWithoutTaggedAppearancesInput": {
            "create": [
                406
            ],
            "where": [
                423
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
                220
            ],
            "images": [
                193
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                345
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
                368
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
                193
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                345
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
                368
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
                220
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                345
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
                368
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
                220
            ],
            "images": [
                193
            ],
            "name": [
                2
            ],
            "roles": [
                345
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
                368
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
                220
            ],
            "images": [
                193
            ],
            "markedFaces": [
                85
            ],
            "name": [
                2
            ],
            "roles": [
                345
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
                423
            ],
            "connectOrCreate": [
                398
            ],
            "create": [
                403
            ],
            "update": [
                413
            ],
            "upsert": [
                418
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneRequiredWithoutTaggedAppearancesInput": {
            "connect": [
                423
            ],
            "connectOrCreate": [
                401
            ],
            "create": [
                406
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
        "UserUpdateOneWithoutCratedTagsInput": {
            "connect": [
                423
            ],
            "connectOrCreate": [
                397
            ],
            "create": [
                402
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
            ],
            "update": [
                412
            ],
            "upsert": [
                417
            ],
            "__typename": [
                2
            ]
        },
        "UserUpdateOneWithoutImagesInput": {
            "connect": [
                423
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
        "UserUpdateOneWithoutMarkedFacesInput": {
            "connect": [
                423
            ],
            "connectOrCreate": [
                400
            ],
            "create": [
                405
            ],
            "delete": [
                5
            ],
            "disconnect": [
                5
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
        "UserUpdateWithoutCratedTagsInput": {
            "bot": [
                69
            ],
            "createdAt": [
                72
            ],
            "email": [
                291
            ],
            "emailVerified": [
                289
            ],
            "image": [
                291
            ],
            "imageLikes": [
                232
            ],
            "images": [
                246
            ],
            "markedFaces": [
                98
            ],
            "name": [
                291
            ],
            "roles": [
                352
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                291
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
                380
            ],
            "createdAt": [
                72
            ],
            "email": [
                291
            ],
            "emailVerified": [
                289
            ],
            "image": [
                291
            ],
            "images": [
                246
            ],
            "markedFaces": [
                98
            ],
            "name": [
                291
            ],
            "roles": [
                352
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                291
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
                380
            ],
            "createdAt": [
                72
            ],
            "email": [
                291
            ],
            "emailVerified": [
                289
            ],
            "image": [
                291
            ],
            "imageLikes": [
                232
            ],
            "markedFaces": [
                98
            ],
            "name": [
                291
            ],
            "roles": [
                352
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                291
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
                380
            ],
            "createdAt": [
                72
            ],
            "email": [
                291
            ],
            "emailVerified": [
                289
            ],
            "image": [
                291
            ],
            "imageLikes": [
                232
            ],
            "images": [
                246
            ],
            "name": [
                291
            ],
            "roles": [
                352
            ],
            "taggedAppearances": [
                52
            ],
            "token": [
                291
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
                380
            ],
            "createdAt": [
                72
            ],
            "email": [
                291
            ],
            "emailVerified": [
                289
            ],
            "image": [
                291
            ],
            "imageLikes": [
                232
            ],
            "images": [
                246
            ],
            "markedFaces": [
                98
            ],
            "name": [
                291
            ],
            "roles": [
                352
            ],
            "token": [
                291
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
                402
            ],
            "update": [
                412
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutImageLikesInput": {
            "create": [
                403
            ],
            "update": [
                413
            ],
            "__typename": [
                2
            ]
        },
        "UserUpsertWithoutImagesInput": {
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
        "UserUpsertWithoutMarkedFacesInput": {
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
        "UserUpsertWithoutTaggedAppearancesInput": {
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
        "UserWhereInput": {
            "AND": [
                422
            ],
            "NOT": [
                422
            ],
            "OR": [
                422
            ],
            "bot": [
                70
            ],
            "cratedTags": [
                374
            ],
            "createdAt": [
                73
            ],
            "email": [
                362
            ],
            "emailVerified": [
                74
            ],
            "id": [
                272
            ],
            "image": [
                362
            ],
            "imageLikes": [
                226
            ],
            "images": [
                241
            ],
            "markedFaces": [
                90
            ],
            "name": [
                362
            ],
            "roles": [
                348
            ],
            "taggedAppearances": [
                46
            ],
            "token": [
                362
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