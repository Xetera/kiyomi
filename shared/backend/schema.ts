import {FieldsSelection,Observable} from '@genql/runtime'

export type Scalars = {
    Int: number,
    String: string,
    Boolean: boolean,
    DateTime: any,
    Float: number,
}

export interface Alias {
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    name: Scalars['String']
    updatedAt: Scalars['DateTime']
    __typename: 'Alias'
}

export interface Appearance {
    addedBy: User
    createdAt: Scalars['DateTime']
    faces: Face[]
    id: Scalars['Int']
    image: Image
    person: Person
    updatedAt: Scalars['DateTime']
    __typename: 'Appearance'
}

export interface AppearanceCount {
    count: Scalars['Int']
    group: Group
    __typename: 'AppearanceCount'
}

export interface Face {
    addedBy?: User
    appearance?: Appearance
    createdAt: Scalars['DateTime']
    height: Scalars['Float']
    id: Scalars['Int']
    image: Image
    score: Scalars['Float']
    source: FaceSource
    updatedAt: Scalars['DateTime']
    width: Scalars['Float']
    x: Scalars['Float']
    y: Scalars['Float']
    __typename: 'Face'
}

export type FaceSource = 'Manual' | 'Scan'

export interface Group {
    aliases: GroupAlias[]
    avatar?: Image
    banner?: Image
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    members: GroupMember[]
    name: Scalars['String']
    updatedAt: Scalars['DateTime']
    __typename: 'Group'
}

export interface GroupAlias {
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    name: Scalars['String']
    updatedAt: Scalars['DateTime']
    __typename: 'GroupAlias'
}

export interface GroupMember {
    createdAt: Scalars['DateTime']
    endDate?: Scalars['DateTime']
    group: Group
    id: Scalars['Int']
    person: Person
    startDate?: Scalars['DateTime']
    updatedAt: Scalars['DateTime']
    __typename: 'GroupMember'
}

export interface Image {
    appearances: Appearance[]
    /** The aspect ratio of the image */
    aspectRatio: Scalars['Float']
    bytes: Scalars['Int']
    caption?: Scalars['String']
    /** A graph of connections people in this image share with others based on images they appear together in up to a depth of 4 */
    connections: ImageConnections
    createdAt: Scalars['DateTime']
    faceScanDate?: Scalars['DateTime']
    /** The name the image file was uploaded with. */
    fileName?: Scalars['String']
    /** Human readable file size. Use `bytes` for a number representation. */
    fileSize: Scalars['String']
    /** The center of focus for the image */
    focus: ImageCoordinate
    /** SHA256 checksum of the image. */
    hash: Scalars['String']
    /** Height of the image in pixels. */
    height: Scalars['Int']
    id: Scalars['Int']
    ireneBotId?: Scalars['Int']
    /** ( ͡° ͜ʖ ͡°) */
    isNsfw: Scalars['Boolean']
    /** False if not logged in */
    liked?: Scalars['Boolean']
    /** The IANA media type of the image. */
    mimetype: MimeType
    /** Block hash of the image, useful for doing reverse search using hamming distance. */
    pHash?: Scalars['String']
    /** Dominant colors in the image in decimal format, sorted by frequency. */
    palette: Scalars['Int'][]
    /** The visibility status of the image. */
    public: Scalars['Boolean']
    /** Direct link to the image on the CDN */
    rawUrl: Scalars['String']
    /** The unique url identifier of the image. */
    slug: Scalars['String']
    /** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
    source?: Scalars['String']
    tags: Tag[]
    thumbnail: Thumbnail
    unknownFaces: Face[]
    uploadType: UploadType
    uploadedBy?: User
    /** Link to the image on the site */
    url: Scalars['String']
    views: Scalars['Int']
    /** Width of the image in pixels. */
    width: Scalars['Int']
    __typename: 'Image'
}

export type ImageConnectionEdge = 'IMAGE_TO_PERSON' | 'PERSON_TO_IMAGE'

export interface ImageConnections {
    edges: ImageEdge[]
    images: Image[]
    people: Person[]
    __typename: 'ImageConnections'
}


/** A coordinate representing a position on an image */
export interface ImageCoordinate {
    x: Scalars['Int']
    y: Scalars['Int']
    __typename: 'ImageCoordinate'
}

export interface ImageEdge {
    from: Scalars['Int']
    to: Scalars['Int']
    type?: ImageConnectionEdge
    __typename: 'ImageEdge'
}

export interface ImageMatch {
    face: Face
    image: Image
    person: Person
    __typename: 'ImageMatch'
}

export type MimeType = 'AVIF' | 'GIF' | 'JPG' | 'MP4' | 'PNG' | 'SVG' | 'WEBM' | 'WEBP'

export interface Mutation {
    /** Add an appearance relation on an image. */
    addAppearance: Appearance
    createOnePerson: Person
    /** Add metadata labels to an existing image. Only available to bot accounts */
    labelImage?: Image
    /** Attach an existing face to an apperance. */
    linkFace: Appearance
    /** Removes an appearance from an image */
    removeAppearance: Appearance
    /** Queue an image to get scanned for faces */
    scanFaces: QueueInfo
    toggleLike: Image
    /** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
    unlinkFace: Scalars['Int']
    upsertOneGroup: Group
    upsertOnePerson: Person
    __typename: 'Mutation'
}

export interface Person {
    aliases: Alias[]
    appearances: Appearance[]
    createdAt: Scalars['DateTime']
    faces: Face[]
    id: Scalars['Int']
    memberOf: GroupMember[]
    name: Scalars['String']
    preferredAlias?: Alias
    preferredMembership?: GroupMember
    updatedAt: Scalars['DateTime']
    __typename: 'Person'
}

export interface Query {
    countAppearances: AppearanceCount[]
    group?: Group
    groups: Group[]
    /** Find a single image by its slug. */
    image?: Image
    imageConnections?: ImageConnections
    images: Image[]
    me?: User
    people: Person[]
    person?: Person
    personImages: ImageMatch[]
    user?: User
    __typename: 'Query'
}

export type QueryMode = 'default' | 'insensitive'

export interface QueueInfo {
    queueSize: Scalars['Int']
    __typename: 'QueueInfo'
}

export interface Role {
    createdAt: Scalars['DateTime']
    name: Scalars['String']
    __typename: 'Role'
}

export type SortOrder = 'asc' | 'desc'

export interface Tag {
    addedBy?: User
    createdAt: Scalars['DateTime']
    name: Scalars['String']
    source: TagSource
    __typename: 'Tag'
}

export type TagSource = 'USER'


/** Preview urls of an image */
export interface Thumbnail {
    large: Scalars['String']
    medium: Scalars['String']
    small: Scalars['String']
    __typename: 'Thumbnail'
}

export type UploadType = 'TOKEN' | 'WEBSITE' | 'AUTO_DISCOVERY'

export interface User {
    avatar?: Scalars['String']
    bot: Scalars['Boolean']
    id: Scalars['Int']
    images: Image[]
    name?: Scalars['String']
    roles: Role[]
    __typename: 'User'
}

export interface AliasRequest{
    createdAt?: boolean | number
    id?: boolean | number
    name?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AliasCreateManyPersonInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AliasCreateManyPersonInputEnvelope {data?: (AliasCreateManyPersonInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AliasCreateNestedManyWithoutPersonInput {connect?: (AliasWhereUniqueInput[] | null),connectOrCreate?: (AliasCreateOrConnectWithoutPersonInput[] | null),create?: (AliasCreateWithoutPersonInput[] | null),createMany?: (AliasCreateManyPersonInputEnvelope | null)}

export interface AliasCreateNestedOneWithoutPreferredAliasOfInput {connect?: (AliasWhereUniqueInput | null),connectOrCreate?: (AliasCreateOrConnectWithoutPreferredAliasOfInput | null),create?: (AliasCreateWithoutPreferredAliasOfInput | null)}

export interface AliasCreateOrConnectWithoutPersonInput {create: AliasCreateWithoutPersonInput,where: AliasWhereUniqueInput}

export interface AliasCreateOrConnectWithoutPreferredAliasOfInput {create: AliasCreateWithoutPreferredAliasOfInput,where: AliasWhereUniqueInput}

export interface AliasCreateWithoutPersonInput {createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],preferredAliasOf?: (PersonCreateNestedOneWithoutPreferredAliasInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AliasCreateWithoutPreferredAliasOfInput {createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],person: PersonCreateNestedOneWithoutAliasesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AliasListRelationFilter {every?: (AliasWhereInput | null),none?: (AliasWhereInput | null),some?: (AliasWhereInput | null)}

export interface AliasPersonAliasCompoundUniqueInput {name: Scalars['String'],personId: Scalars['Int']}

export interface AliasScalarWhereInput {AND?: (AliasScalarWhereInput[] | null),NOT?: (AliasScalarWhereInput[] | null),OR?: (AliasScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),personId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AliasUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AliasUpdateManyWithWhereWithoutPersonInput {data: AliasUpdateManyMutationInput,where: AliasScalarWhereInput}

export interface AliasUpdateManyWithoutPersonInput {connect?: (AliasWhereUniqueInput[] | null),connectOrCreate?: (AliasCreateOrConnectWithoutPersonInput[] | null),create?: (AliasCreateWithoutPersonInput[] | null),createMany?: (AliasCreateManyPersonInputEnvelope | null),delete?: (AliasWhereUniqueInput[] | null),deleteMany?: (AliasScalarWhereInput[] | null),disconnect?: (AliasWhereUniqueInput[] | null),set?: (AliasWhereUniqueInput[] | null),update?: (AliasUpdateWithWhereUniqueWithoutPersonInput[] | null),updateMany?: (AliasUpdateManyWithWhereWithoutPersonInput[] | null),upsert?: (AliasUpsertWithWhereUniqueWithoutPersonInput[] | null)}

export interface AliasUpdateOneWithoutPreferredAliasOfInput {connect?: (AliasWhereUniqueInput | null),connectOrCreate?: (AliasCreateOrConnectWithoutPreferredAliasOfInput | null),create?: (AliasCreateWithoutPreferredAliasOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (AliasUpdateWithoutPreferredAliasOfInput | null),upsert?: (AliasUpsertWithoutPreferredAliasOfInput | null)}

export interface AliasUpdateWithWhereUniqueWithoutPersonInput {data: AliasUpdateWithoutPersonInput,where: AliasWhereUniqueInput}

export interface AliasUpdateWithoutPersonInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAliasOf?: (PersonUpdateOneWithoutPreferredAliasInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AliasUpdateWithoutPreferredAliasOfInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),person?: (PersonUpdateOneRequiredWithoutAliasesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AliasUpsertWithWhereUniqueWithoutPersonInput {create: AliasCreateWithoutPersonInput,update: AliasUpdateWithoutPersonInput,where: AliasWhereUniqueInput}

export interface AliasUpsertWithoutPreferredAliasOfInput {create: AliasCreateWithoutPreferredAliasOfInput,update: AliasUpdateWithoutPreferredAliasOfInput}

export interface AliasWhereInput {AND?: (AliasWhereInput[] | null),NOT?: (AliasWhereInput[] | null),OR?: (AliasWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),person?: (PersonWhereInput | null),personId?: (IntFilter | null),preferredAliasOf?: (PersonWhereInput | null),updatedAt?: (DateTimeFilter | null)}

export interface AliasWhereUniqueInput {id?: (Scalars['Int'] | null),personAlias?: (AliasPersonAliasCompoundUniqueInput | null)}

export interface AppearanceRequest{
    addedBy?: UserRequest
    createdAt?: boolean | number
    faces?: [{cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},FaceRequest] | FaceRequest
    id?: boolean | number
    image?: ImageRequest
    person?: PersonRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AppearanceAppearanceCompoundUniqueInput {imageId: Scalars['Int'],personId: Scalars['Int']}

export interface AppearanceCountRequest{
    count?: boolean | number
    group?: GroupRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AppearanceCreateManyAddedByInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],personId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateManyAddedByInputEnvelope {data?: (AppearanceCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceCreateManyImageInput {addedById: Scalars['Int'],createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),personId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateManyImageInputEnvelope {data?: (AppearanceCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceCreateManyPersonInput {addedById: Scalars['Int'],createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateManyPersonInputEnvelope {data?: (AppearanceCreateManyPersonInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceCreateNestedManyWithoutAddedByInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutAddedByInput[] | null),create?: (AppearanceCreateWithoutAddedByInput[] | null),createMany?: (AppearanceCreateManyAddedByInputEnvelope | null)}

export interface AppearanceCreateNestedManyWithoutImageInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutImageInput[] | null),create?: (AppearanceCreateWithoutImageInput[] | null),createMany?: (AppearanceCreateManyImageInputEnvelope | null)}

export interface AppearanceCreateNestedManyWithoutPersonInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutPersonInput[] | null),create?: (AppearanceCreateWithoutPersonInput[] | null),createMany?: (AppearanceCreateManyPersonInputEnvelope | null)}

export interface AppearanceCreateOrConnectWithoutAddedByInput {create: AppearanceCreateWithoutAddedByInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutFacesInput {create: AppearanceCreateWithoutFacesInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutImageInput {create: AppearanceCreateWithoutImageInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutPersonInput {create: AppearanceCreateWithoutPersonInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateWithoutAddedByInput {createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),image: ImageCreateNestedOneWithoutAppearancesInput,person: PersonCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutFacesInput {addedBy: UserCreateNestedOneWithoutTaggedAppearancesInput,createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutAppearancesInput,person: PersonCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutImageInput {addedBy: UserCreateNestedOneWithoutTaggedAppearancesInput,createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),person: PersonCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutPersonInput {addedBy: UserCreateNestedOneWithoutTaggedAppearancesInput,createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),image: ImageCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceListRelationFilter {every?: (AppearanceWhereInput | null),none?: (AppearanceWhereInput | null),some?: (AppearanceWhereInput | null)}

export interface AppearanceScalarWhereInput {AND?: (AppearanceScalarWhereInput[] | null),NOT?: (AppearanceScalarWhereInput[] | null),OR?: (AppearanceScalarWhereInput[] | null),addedById?: (IntFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),personId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AppearanceUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateManyWithWhereWithoutAddedByInput {data: AppearanceUpdateManyMutationInput,where: AppearanceScalarWhereInput}

export interface AppearanceUpdateManyWithWhereWithoutImageInput {data: AppearanceUpdateManyMutationInput,where: AppearanceScalarWhereInput}

export interface AppearanceUpdateManyWithWhereWithoutPersonInput {data: AppearanceUpdateManyMutationInput,where: AppearanceScalarWhereInput}

export interface AppearanceUpdateManyWithoutAddedByInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutAddedByInput[] | null),create?: (AppearanceCreateWithoutAddedByInput[] | null),createMany?: (AppearanceCreateManyAddedByInputEnvelope | null),delete?: (AppearanceWhereUniqueInput[] | null),deleteMany?: (AppearanceScalarWhereInput[] | null),disconnect?: (AppearanceWhereUniqueInput[] | null),set?: (AppearanceWhereUniqueInput[] | null),update?: (AppearanceUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (AppearanceUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (AppearanceUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface AppearanceUpdateManyWithoutImageInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutImageInput[] | null),create?: (AppearanceCreateWithoutImageInput[] | null),createMany?: (AppearanceCreateManyImageInputEnvelope | null),delete?: (AppearanceWhereUniqueInput[] | null),deleteMany?: (AppearanceScalarWhereInput[] | null),disconnect?: (AppearanceWhereUniqueInput[] | null),set?: (AppearanceWhereUniqueInput[] | null),update?: (AppearanceUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (AppearanceUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (AppearanceUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface AppearanceUpdateManyWithoutPersonInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutPersonInput[] | null),create?: (AppearanceCreateWithoutPersonInput[] | null),createMany?: (AppearanceCreateManyPersonInputEnvelope | null),delete?: (AppearanceWhereUniqueInput[] | null),deleteMany?: (AppearanceScalarWhereInput[] | null),disconnect?: (AppearanceWhereUniqueInput[] | null),set?: (AppearanceWhereUniqueInput[] | null),update?: (AppearanceUpdateWithWhereUniqueWithoutPersonInput[] | null),updateMany?: (AppearanceUpdateManyWithWhereWithoutPersonInput[] | null),upsert?: (AppearanceUpsertWithWhereUniqueWithoutPersonInput[] | null)}

export interface AppearanceUpdateOneWithoutFacesInput {connect?: (AppearanceWhereUniqueInput | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutFacesInput | null),create?: (AppearanceCreateWithoutFacesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (AppearanceUpdateWithoutFacesInput | null),upsert?: (AppearanceUpsertWithoutFacesInput | null)}

export interface AppearanceUpdateWithWhereUniqueWithoutAddedByInput {data: AppearanceUpdateWithoutAddedByInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpdateWithWhereUniqueWithoutImageInput {data: AppearanceUpdateWithoutImageInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpdateWithWhereUniqueWithoutPersonInput {data: AppearanceUpdateWithoutPersonInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpdateWithoutAddedByInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutFacesInput {addedBy?: (UserUpdateOneRequiredWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutImageInput {addedBy?: (UserUpdateOneRequiredWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutPersonInput {addedBy?: (UserUpdateOneRequiredWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpsertWithWhereUniqueWithoutAddedByInput {create: AppearanceCreateWithoutAddedByInput,update: AppearanceUpdateWithoutAddedByInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpsertWithWhereUniqueWithoutImageInput {create: AppearanceCreateWithoutImageInput,update: AppearanceUpdateWithoutImageInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpsertWithWhereUniqueWithoutPersonInput {create: AppearanceCreateWithoutPersonInput,update: AppearanceUpdateWithoutPersonInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpsertWithoutFacesInput {create: AppearanceCreateWithoutFacesInput,update: AppearanceUpdateWithoutFacesInput}

export interface AppearanceWhereInput {AND?: (AppearanceWhereInput[] | null),NOT?: (AppearanceWhereInput[] | null),OR?: (AppearanceWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntFilter | null),createdAt?: (DateTimeFilter | null),faces?: (FaceListRelationFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),person?: (PersonWhereInput | null),personId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AppearanceWhereUniqueInput {appearance?: (AppearanceAppearanceCompoundUniqueInput | null),id?: (Scalars['Int'] | null)}

export interface BoolFieldUpdateOperationsInput {set?: (Scalars['Boolean'] | null)}

export interface BoolFilter {equals?: (Scalars['Boolean'] | null),not?: (NestedBoolFilter | null)}

export interface DateTimeFieldUpdateOperationsInput {set?: (Scalars['DateTime'] | null)}

export interface DateTimeFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface DateTimeNullableFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeNullableFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface EnumFaceSourceFieldUpdateOperationsInput {set?: (FaceSource | null)}

export interface EnumFaceSourceFilter {equals?: (FaceSource | null),in?: (FaceSource[] | null),not?: (NestedEnumFaceSourceFilter | null),notIn?: (FaceSource[] | null)}

export interface EnumMimeTypeFieldUpdateOperationsInput {set?: (MimeType | null)}

export interface EnumMimeTypeFilter {equals?: (MimeType | null),in?: (MimeType[] | null),not?: (NestedEnumMimeTypeFilter | null),notIn?: (MimeType[] | null)}

export interface EnumTagSourceFieldUpdateOperationsInput {set?: (TagSource | null)}

export interface EnumTagSourceFilter {equals?: (TagSource | null),in?: (TagSource[] | null),not?: (NestedEnumTagSourceFilter | null),notIn?: (TagSource[] | null)}

export interface EnumUploadTypeFieldUpdateOperationsInput {set?: (UploadType | null)}

export interface EnumUploadTypeFilter {equals?: (UploadType | null),in?: (UploadType[] | null),not?: (NestedEnumUploadTypeFilter | null),notIn?: (UploadType[] | null)}

export interface FaceRequest{
    addedBy?: UserRequest
    appearance?: AppearanceRequest
    createdAt?: boolean | number
    height?: boolean | number
    id?: boolean | number
    image?: ImageRequest
    score?: boolean | number
    source?: boolean | number
    updatedAt?: boolean | number
    width?: boolean | number
    x?: boolean | number
    y?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface FaceCreateNestedManyWithoutAddedByInput {connect?: (FaceWhereUniqueInput[] | null)}

export interface FaceCreateNestedManyWithoutAppearanceInput {connect?: (FaceWhereUniqueInput[] | null)}

export interface FaceCreateNestedManyWithoutImageInput {connect?: (FaceWhereUniqueInput[] | null)}

export interface FaceCreateNestedManyWithoutPersonInput {connect?: (FaceWhereUniqueInput[] | null)}

export interface FaceInput {certainty: Scalars['Float'],descriptor: Scalars['Float'][],height: Scalars['Float'],width: Scalars['Float'],x: Scalars['Float'],y: Scalars['Float']}

export interface FaceListRelationFilter {every?: (FaceWhereInput | null),none?: (FaceWhereInput | null),some?: (FaceWhereInput | null)}

export interface FaceScalarWhereInput {AND?: (FaceScalarWhereInput[] | null),NOT?: (FaceScalarWhereInput[] | null),OR?: (FaceScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),appearanceId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),height?: (FloatFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),personId?: (IntNullableFilter | null),score?: (FloatFilter | null),source?: (EnumFaceSourceFilter | null),updatedAt?: (DateTimeFilter | null),width?: (FloatFilter | null),x?: (FloatFilter | null),y?: (FloatFilter | null)}

export interface FaceUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),height?: (FloatFieldUpdateOperationsInput | null),score?: (FloatFieldUpdateOperationsInput | null),source?: (EnumFaceSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),width?: (FloatFieldUpdateOperationsInput | null),x?: (FloatFieldUpdateOperationsInput | null),y?: (FloatFieldUpdateOperationsInput | null)}

export interface FaceUpdateManyWithWhereWithoutAddedByInput {data: FaceUpdateManyMutationInput,where: FaceScalarWhereInput}

export interface FaceUpdateManyWithWhereWithoutAppearanceInput {data: FaceUpdateManyMutationInput,where: FaceScalarWhereInput}

export interface FaceUpdateManyWithWhereWithoutImageInput {data: FaceUpdateManyMutationInput,where: FaceScalarWhereInput}

export interface FaceUpdateManyWithWhereWithoutPersonInput {data: FaceUpdateManyMutationInput,where: FaceScalarWhereInput}

export interface FaceUpdateManyWithoutAddedByInput {connect?: (FaceWhereUniqueInput[] | null),delete?: (FaceWhereUniqueInput[] | null),deleteMany?: (FaceScalarWhereInput[] | null),disconnect?: (FaceWhereUniqueInput[] | null),set?: (FaceWhereUniqueInput[] | null),update?: (FaceUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (FaceUpdateManyWithWhereWithoutAddedByInput[] | null)}

export interface FaceUpdateManyWithoutAppearanceInput {connect?: (FaceWhereUniqueInput[] | null),delete?: (FaceWhereUniqueInput[] | null),deleteMany?: (FaceScalarWhereInput[] | null),disconnect?: (FaceWhereUniqueInput[] | null),set?: (FaceWhereUniqueInput[] | null),update?: (FaceUpdateWithWhereUniqueWithoutAppearanceInput[] | null),updateMany?: (FaceUpdateManyWithWhereWithoutAppearanceInput[] | null)}

export interface FaceUpdateManyWithoutImageInput {connect?: (FaceWhereUniqueInput[] | null),delete?: (FaceWhereUniqueInput[] | null),deleteMany?: (FaceScalarWhereInput[] | null),disconnect?: (FaceWhereUniqueInput[] | null),set?: (FaceWhereUniqueInput[] | null),update?: (FaceUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (FaceUpdateManyWithWhereWithoutImageInput[] | null)}

export interface FaceUpdateManyWithoutPersonInput {connect?: (FaceWhereUniqueInput[] | null),delete?: (FaceWhereUniqueInput[] | null),deleteMany?: (FaceScalarWhereInput[] | null),disconnect?: (FaceWhereUniqueInput[] | null),set?: (FaceWhereUniqueInput[] | null),update?: (FaceUpdateWithWhereUniqueWithoutPersonInput[] | null),updateMany?: (FaceUpdateManyWithWhereWithoutPersonInput[] | null)}

export interface FaceUpdateWithWhereUniqueWithoutAddedByInput {data: FaceUpdateWithoutAddedByInput,where: FaceWhereUniqueInput}

export interface FaceUpdateWithWhereUniqueWithoutAppearanceInput {data: FaceUpdateWithoutAppearanceInput,where: FaceWhereUniqueInput}

export interface FaceUpdateWithWhereUniqueWithoutImageInput {data: FaceUpdateWithoutImageInput,where: FaceWhereUniqueInput}

export interface FaceUpdateWithWhereUniqueWithoutPersonInput {data: FaceUpdateWithoutPersonInput,where: FaceWhereUniqueInput}

export interface FaceUpdateWithoutAddedByInput {appearance?: (AppearanceUpdateOneWithoutFacesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),height?: (FloatFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutFacesInput | null),person?: (PersonUpdateOneWithoutAppearsInInput | null),score?: (FloatFieldUpdateOperationsInput | null),source?: (EnumFaceSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),width?: (FloatFieldUpdateOperationsInput | null),x?: (FloatFieldUpdateOperationsInput | null),y?: (FloatFieldUpdateOperationsInput | null)}

export interface FaceUpdateWithoutAppearanceInput {addedBy?: (UserUpdateOneWithoutMarkedFacesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),height?: (FloatFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutFacesInput | null),person?: (PersonUpdateOneWithoutAppearsInInput | null),score?: (FloatFieldUpdateOperationsInput | null),source?: (EnumFaceSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),width?: (FloatFieldUpdateOperationsInput | null),x?: (FloatFieldUpdateOperationsInput | null),y?: (FloatFieldUpdateOperationsInput | null)}

export interface FaceUpdateWithoutImageInput {addedBy?: (UserUpdateOneWithoutMarkedFacesInput | null),appearance?: (AppearanceUpdateOneWithoutFacesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),height?: (FloatFieldUpdateOperationsInput | null),person?: (PersonUpdateOneWithoutAppearsInInput | null),score?: (FloatFieldUpdateOperationsInput | null),source?: (EnumFaceSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),width?: (FloatFieldUpdateOperationsInput | null),x?: (FloatFieldUpdateOperationsInput | null),y?: (FloatFieldUpdateOperationsInput | null)}

export interface FaceUpdateWithoutPersonInput {addedBy?: (UserUpdateOneWithoutMarkedFacesInput | null),appearance?: (AppearanceUpdateOneWithoutFacesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),height?: (FloatFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutFacesInput | null),score?: (FloatFieldUpdateOperationsInput | null),source?: (EnumFaceSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),width?: (FloatFieldUpdateOperationsInput | null),x?: (FloatFieldUpdateOperationsInput | null),y?: (FloatFieldUpdateOperationsInput | null)}

export interface FaceWhereInput {AND?: (FaceWhereInput[] | null),NOT?: (FaceWhereInput[] | null),OR?: (FaceWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),appearance?: (AppearanceWhereInput | null),appearanceId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),height?: (FloatFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),person?: (PersonWhereInput | null),personId?: (IntNullableFilter | null),score?: (FloatFilter | null),source?: (EnumFaceSourceFilter | null),updatedAt?: (DateTimeFilter | null),width?: (FloatFilter | null),x?: (FloatFilter | null),y?: (FloatFilter | null)}

export interface FaceWhereUniqueInput {id?: (Scalars['Int'] | null)}

export interface FloatFieldUpdateOperationsInput {decrement?: (Scalars['Float'] | null),divide?: (Scalars['Float'] | null),increment?: (Scalars['Float'] | null),multiply?: (Scalars['Float'] | null),set?: (Scalars['Float'] | null)}

export interface FloatFilter {equals?: (Scalars['Float'] | null),gt?: (Scalars['Float'] | null),gte?: (Scalars['Float'] | null),in?: (Scalars['Float'][] | null),lt?: (Scalars['Float'] | null),lte?: (Scalars['Float'] | null),not?: (NestedFloatFilter | null),notIn?: (Scalars['Float'][] | null)}

export interface GroupRequest{
    aliases?: [{cursor?: (GroupAliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},GroupAliasRequest] | GroupAliasRequest
    avatar?: ImageRequest
    banner?: ImageRequest
    createdAt?: boolean | number
    id?: boolean | number
    members?: [{cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},GroupMemberRequest] | GroupMemberRequest
    name?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GroupAliasRequest{
    createdAt?: boolean | number
    id?: boolean | number
    name?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GroupAliasCreateManyGroupInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupAliasCreateManyGroupInputEnvelope {data?: (GroupAliasCreateManyGroupInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface GroupAliasCreateNestedManyWithoutGroupInput {connect?: (GroupAliasWhereUniqueInput[] | null),connectOrCreate?: (GroupAliasCreateOrConnectWithoutGroupInput[] | null),create?: (GroupAliasCreateWithoutGroupInput[] | null),createMany?: (GroupAliasCreateManyGroupInputEnvelope | null)}

export interface GroupAliasCreateOrConnectWithoutGroupInput {create: GroupAliasCreateWithoutGroupInput,where: GroupAliasWhereUniqueInput}

export interface GroupAliasCreateWithoutGroupInput {createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupAliasListRelationFilter {every?: (GroupAliasWhereInput | null),none?: (GroupAliasWhereInput | null),some?: (GroupAliasWhereInput | null)}

export interface GroupAliasScalarWhereInput {AND?: (GroupAliasScalarWhereInput[] | null),NOT?: (GroupAliasScalarWhereInput[] | null),OR?: (GroupAliasScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),groupId?: (IntFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupAliasUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupAliasUpdateManyWithWhereWithoutGroupInput {data: GroupAliasUpdateManyMutationInput,where: GroupAliasScalarWhereInput}

export interface GroupAliasUpdateManyWithoutGroupInput {connect?: (GroupAliasWhereUniqueInput[] | null),connectOrCreate?: (GroupAliasCreateOrConnectWithoutGroupInput[] | null),create?: (GroupAliasCreateWithoutGroupInput[] | null),createMany?: (GroupAliasCreateManyGroupInputEnvelope | null),delete?: (GroupAliasWhereUniqueInput[] | null),deleteMany?: (GroupAliasScalarWhereInput[] | null),disconnect?: (GroupAliasWhereUniqueInput[] | null),set?: (GroupAliasWhereUniqueInput[] | null),update?: (GroupAliasUpdateWithWhereUniqueWithoutGroupInput[] | null),updateMany?: (GroupAliasUpdateManyWithWhereWithoutGroupInput[] | null),upsert?: (GroupAliasUpsertWithWhereUniqueWithoutGroupInput[] | null)}

export interface GroupAliasUpdateWithWhereUniqueWithoutGroupInput {data: GroupAliasUpdateWithoutGroupInput,where: GroupAliasWhereUniqueInput}

export interface GroupAliasUpdateWithoutGroupInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupAliasUpsertWithWhereUniqueWithoutGroupInput {create: GroupAliasCreateWithoutGroupInput,update: GroupAliasUpdateWithoutGroupInput,where: GroupAliasWhereUniqueInput}

export interface GroupAliasWhereInput {AND?: (GroupAliasWhereInput[] | null),NOT?: (GroupAliasWhereInput[] | null),OR?: (GroupAliasWhereInput[] | null),createdAt?: (DateTimeFilter | null),group?: (GroupWhereInput | null),groupId?: (IntFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupAliasWhereUniqueInput {id?: (Scalars['Int'] | null)}

export interface GroupCreateInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),avatar?: (ImageCreateNestedOneWithoutAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutBannerOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),members?: (GroupMemberCreateNestedManyWithoutGroupInput | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupCreateNestedOneWithoutAvatarInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutAvatarInput | null),create?: (GroupCreateWithoutAvatarInput | null)}

export interface GroupCreateNestedOneWithoutBannerInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutBannerInput | null),create?: (GroupCreateWithoutBannerInput | null)}

export interface GroupCreateNestedOneWithoutMembersInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutMembersInput | null),create?: (GroupCreateWithoutMembersInput | null)}

export interface GroupCreateOrConnectWithoutAvatarInput {create: GroupCreateWithoutAvatarInput,where: GroupWhereUniqueInput}

export interface GroupCreateOrConnectWithoutBannerInput {create: GroupCreateWithoutBannerInput,where: GroupWhereUniqueInput}

export interface GroupCreateOrConnectWithoutMembersInput {create: GroupCreateWithoutMembersInput,where: GroupWhereUniqueInput}

export interface GroupCreateWithoutAvatarInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),banner?: (ImageCreateNestedOneWithoutBannerOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),members?: (GroupMemberCreateNestedManyWithoutGroupInput | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupCreateWithoutBannerInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),avatar?: (ImageCreateNestedOneWithoutAvatarOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),members?: (GroupMemberCreateNestedManyWithoutGroupInput | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupCreateWithoutMembersInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),avatar?: (ImageCreateNestedOneWithoutAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutBannerOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupMemberRequest{
    createdAt?: boolean | number
    endDate?: boolean | number
    group?: GroupRequest
    id?: boolean | number
    person?: PersonRequest
    startDate?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GroupMemberCreateManyGroupInput {createdAt?: (Scalars['DateTime'] | null),endDate?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),personId: Scalars['Int'],startDate?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupMemberCreateManyGroupInputEnvelope {data?: (GroupMemberCreateManyGroupInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface GroupMemberCreateManyPersonInput {createdAt?: (Scalars['DateTime'] | null),endDate?: (Scalars['DateTime'] | null),groupId: Scalars['Int'],id?: (Scalars['Int'] | null),startDate?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupMemberCreateManyPersonInputEnvelope {data?: (GroupMemberCreateManyPersonInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface GroupMemberCreateNestedManyWithoutGroupInput {connect?: (GroupMemberWhereUniqueInput[] | null),connectOrCreate?: (GroupMemberCreateOrConnectWithoutGroupInput[] | null),create?: (GroupMemberCreateWithoutGroupInput[] | null),createMany?: (GroupMemberCreateManyGroupInputEnvelope | null)}

export interface GroupMemberCreateNestedManyWithoutPersonInput {connect?: (GroupMemberWhereUniqueInput[] | null),connectOrCreate?: (GroupMemberCreateOrConnectWithoutPersonInput[] | null),create?: (GroupMemberCreateWithoutPersonInput[] | null),createMany?: (GroupMemberCreateManyPersonInputEnvelope | null)}

export interface GroupMemberCreateNestedOneWithoutPreferredMemberships_Input {connect?: (GroupMemberWhereUniqueInput | null),connectOrCreate?: (GroupMemberCreateOrConnectWithoutPreferredMemberships_Input | null),create?: (GroupMemberCreateWithoutPreferredMemberships_Input | null)}

export interface GroupMemberCreateOrConnectWithoutGroupInput {create: GroupMemberCreateWithoutGroupInput,where: GroupMemberWhereUniqueInput}

export interface GroupMemberCreateOrConnectWithoutPersonInput {create: GroupMemberCreateWithoutPersonInput,where: GroupMemberWhereUniqueInput}

export interface GroupMemberCreateOrConnectWithoutPreferredMemberships_Input {create: GroupMemberCreateWithoutPreferredMemberships_Input,where: GroupMemberWhereUniqueInput}

export interface GroupMemberCreateWithoutGroupInput {createdAt?: (Scalars['DateTime'] | null),endDate?: (Scalars['DateTime'] | null),person: PersonCreateNestedOneWithoutMemberOfInput,preferredMemberships_?: (PersonCreateNestedManyWithoutPreferredMembershipInput | null),startDate?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupMemberCreateWithoutPersonInput {createdAt?: (Scalars['DateTime'] | null),endDate?: (Scalars['DateTime'] | null),group: GroupCreateNestedOneWithoutMembersInput,preferredMemberships_?: (PersonCreateNestedManyWithoutPreferredMembershipInput | null),startDate?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupMemberCreateWithoutPreferredMemberships_Input {createdAt?: (Scalars['DateTime'] | null),endDate?: (Scalars['DateTime'] | null),group: GroupCreateNestedOneWithoutMembersInput,person: PersonCreateNestedOneWithoutMemberOfInput,startDate?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupMemberListRelationFilter {every?: (GroupMemberWhereInput | null),none?: (GroupMemberWhereInput | null),some?: (GroupMemberWhereInput | null)}

export interface GroupMemberMemberCompoundUniqueInput {groupId: Scalars['Int'],personId: Scalars['Int']}

export interface GroupMemberScalarWhereInput {AND?: (GroupMemberScalarWhereInput[] | null),NOT?: (GroupMemberScalarWhereInput[] | null),OR?: (GroupMemberScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),endDate?: (DateTimeNullableFilter | null),groupId?: (IntFilter | null),id?: (IntFilter | null),personId?: (IntFilter | null),startDate?: (DateTimeNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupMemberUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),endDate?: (NullableDateTimeFieldUpdateOperationsInput | null),startDate?: (NullableDateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupMemberUpdateManyWithWhereWithoutGroupInput {data: GroupMemberUpdateManyMutationInput,where: GroupMemberScalarWhereInput}

export interface GroupMemberUpdateManyWithWhereWithoutPersonInput {data: GroupMemberUpdateManyMutationInput,where: GroupMemberScalarWhereInput}

export interface GroupMemberUpdateManyWithoutGroupInput {connect?: (GroupMemberWhereUniqueInput[] | null),connectOrCreate?: (GroupMemberCreateOrConnectWithoutGroupInput[] | null),create?: (GroupMemberCreateWithoutGroupInput[] | null),createMany?: (GroupMemberCreateManyGroupInputEnvelope | null),delete?: (GroupMemberWhereUniqueInput[] | null),deleteMany?: (GroupMemberScalarWhereInput[] | null),disconnect?: (GroupMemberWhereUniqueInput[] | null),set?: (GroupMemberWhereUniqueInput[] | null),update?: (GroupMemberUpdateWithWhereUniqueWithoutGroupInput[] | null),updateMany?: (GroupMemberUpdateManyWithWhereWithoutGroupInput[] | null),upsert?: (GroupMemberUpsertWithWhereUniqueWithoutGroupInput[] | null)}

export interface GroupMemberUpdateManyWithoutPersonInput {connect?: (GroupMemberWhereUniqueInput[] | null),connectOrCreate?: (GroupMemberCreateOrConnectWithoutPersonInput[] | null),create?: (GroupMemberCreateWithoutPersonInput[] | null),createMany?: (GroupMemberCreateManyPersonInputEnvelope | null),delete?: (GroupMemberWhereUniqueInput[] | null),deleteMany?: (GroupMemberScalarWhereInput[] | null),disconnect?: (GroupMemberWhereUniqueInput[] | null),set?: (GroupMemberWhereUniqueInput[] | null),update?: (GroupMemberUpdateWithWhereUniqueWithoutPersonInput[] | null),updateMany?: (GroupMemberUpdateManyWithWhereWithoutPersonInput[] | null),upsert?: (GroupMemberUpsertWithWhereUniqueWithoutPersonInput[] | null)}

export interface GroupMemberUpdateOneWithoutPreferredMemberships_Input {connect?: (GroupMemberWhereUniqueInput | null),connectOrCreate?: (GroupMemberCreateOrConnectWithoutPreferredMemberships_Input | null),create?: (GroupMemberCreateWithoutPreferredMemberships_Input | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (GroupMemberUpdateWithoutPreferredMemberships_Input | null),upsert?: (GroupMemberUpsertWithoutPreferredMemberships_Input | null)}

export interface GroupMemberUpdateWithWhereUniqueWithoutGroupInput {data: GroupMemberUpdateWithoutGroupInput,where: GroupMemberWhereUniqueInput}

export interface GroupMemberUpdateWithWhereUniqueWithoutPersonInput {data: GroupMemberUpdateWithoutPersonInput,where: GroupMemberWhereUniqueInput}

export interface GroupMemberUpdateWithoutGroupInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),endDate?: (NullableDateTimeFieldUpdateOperationsInput | null),person?: (PersonUpdateOneRequiredWithoutMemberOfInput | null),preferredMemberships_?: (PersonUpdateManyWithoutPreferredMembershipInput | null),startDate?: (NullableDateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupMemberUpdateWithoutPersonInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),endDate?: (NullableDateTimeFieldUpdateOperationsInput | null),group?: (GroupUpdateOneRequiredWithoutMembersInput | null),preferredMemberships_?: (PersonUpdateManyWithoutPreferredMembershipInput | null),startDate?: (NullableDateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupMemberUpdateWithoutPreferredMemberships_Input {createdAt?: (DateTimeFieldUpdateOperationsInput | null),endDate?: (NullableDateTimeFieldUpdateOperationsInput | null),group?: (GroupUpdateOneRequiredWithoutMembersInput | null),person?: (PersonUpdateOneRequiredWithoutMemberOfInput | null),startDate?: (NullableDateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupMemberUpsertWithWhereUniqueWithoutGroupInput {create: GroupMemberCreateWithoutGroupInput,update: GroupMemberUpdateWithoutGroupInput,where: GroupMemberWhereUniqueInput}

export interface GroupMemberUpsertWithWhereUniqueWithoutPersonInput {create: GroupMemberCreateWithoutPersonInput,update: GroupMemberUpdateWithoutPersonInput,where: GroupMemberWhereUniqueInput}

export interface GroupMemberUpsertWithoutPreferredMemberships_Input {create: GroupMemberCreateWithoutPreferredMemberships_Input,update: GroupMemberUpdateWithoutPreferredMemberships_Input}

export interface GroupMemberWhereInput {AND?: (GroupMemberWhereInput[] | null),NOT?: (GroupMemberWhereInput[] | null),OR?: (GroupMemberWhereInput[] | null),createdAt?: (DateTimeFilter | null),endDate?: (DateTimeNullableFilter | null),group?: (GroupWhereInput | null),groupId?: (IntFilter | null),id?: (IntFilter | null),person?: (PersonWhereInput | null),personId?: (IntFilter | null),preferredMemberships_?: (PersonListRelationFilter | null),startDate?: (DateTimeNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupMemberWhereUniqueInput {id?: (Scalars['Int'] | null),member?: (GroupMemberMemberCompoundUniqueInput | null)}

export interface GroupOrderByInput {avatarId?: (SortOrder | null),bannerId?: (SortOrder | null),createdAt?: (SortOrder | null),id?: (SortOrder | null),ireneBotId?: (SortOrder | null),name?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface GroupUpdateInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),avatar?: (ImageUpdateOneWithoutAvatarOfInput | null),banner?: (ImageUpdateOneWithoutBannerOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),members?: (GroupMemberUpdateManyWithoutGroupInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpdateOneRequiredWithoutMembersInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutMembersInput | null),create?: (GroupCreateWithoutMembersInput | null),update?: (GroupUpdateWithoutMembersInput | null),upsert?: (GroupUpsertWithoutMembersInput | null)}

export interface GroupUpdateOneWithoutAvatarInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutAvatarInput | null),create?: (GroupCreateWithoutAvatarInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (GroupUpdateWithoutAvatarInput | null),upsert?: (GroupUpsertWithoutAvatarInput | null)}

export interface GroupUpdateOneWithoutBannerInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutBannerInput | null),create?: (GroupCreateWithoutBannerInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (GroupUpdateWithoutBannerInput | null),upsert?: (GroupUpsertWithoutBannerInput | null)}

export interface GroupUpdateWithoutAvatarInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),banner?: (ImageUpdateOneWithoutBannerOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),members?: (GroupMemberUpdateManyWithoutGroupInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpdateWithoutBannerInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),avatar?: (ImageUpdateOneWithoutAvatarOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),members?: (GroupMemberUpdateManyWithoutGroupInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpdateWithoutMembersInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),avatar?: (ImageUpdateOneWithoutAvatarOfInput | null),banner?: (ImageUpdateOneWithoutBannerOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpsertWithoutAvatarInput {create: GroupCreateWithoutAvatarInput,update: GroupUpdateWithoutAvatarInput}

export interface GroupUpsertWithoutBannerInput {create: GroupCreateWithoutBannerInput,update: GroupUpdateWithoutBannerInput}

export interface GroupUpsertWithoutMembersInput {create: GroupCreateWithoutMembersInput,update: GroupUpdateWithoutMembersInput}

export interface GroupWhereInput {AND?: (GroupWhereInput[] | null),NOT?: (GroupWhereInput[] | null),OR?: (GroupWhereInput[] | null),aliases?: (GroupAliasListRelationFilter | null),avatar?: (ImageWhereInput | null),avatarId?: (IntNullableFilter | null),banner?: (ImageWhereInput | null),bannerId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),members?: (GroupMemberListRelationFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupWhereUniqueInput {id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null)}

export interface ImageRequest{
    appearances?: [{cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AppearanceRequest] | AppearanceRequest
    /** The aspect ratio of the image */
    aspectRatio?: boolean | number
    bytes?: boolean | number
    caption?: boolean | number
    /** A graph of connections people in this image share with others based on images they appear together in up to a depth of 4 */
    connections?: [{depth: Scalars['Int']},ImageConnectionsRequest]
    createdAt?: boolean | number
    faceScanDate?: boolean | number
    /** The name the image file was uploaded with. */
    fileName?: boolean | number
    /** Human readable file size. Use `bytes` for a number representation. */
    fileSize?: boolean | number
    /** The center of focus for the image */
    focus?: ImageCoordinateRequest
    /** SHA256 checksum of the image. */
    hash?: boolean | number
    /** Height of the image in pixels. */
    height?: boolean | number
    id?: boolean | number
    ireneBotId?: boolean | number
    /** ( ͡° ͜ʖ ͡°) */
    isNsfw?: boolean | number
    /** False if not logged in */
    liked?: boolean | number
    /** The IANA media type of the image. */
    mimetype?: boolean | number
    /** Block hash of the image, useful for doing reverse search using hamming distance. */
    pHash?: boolean | number
    /** Dominant colors in the image in decimal format, sorted by frequency. */
    palette?: boolean | number
    /** The visibility status of the image. */
    public?: boolean | number
    /** Direct link to the image on the CDN */
    rawUrl?: boolean | number
    /** The unique url identifier of the image. */
    slug?: boolean | number
    /** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
    source?: boolean | number
    tags?: [{cursor?: (TagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},TagRequest] | TagRequest
    thumbnail?: ThumbnailRequest
    unknownFaces?: FaceRequest
    uploadType?: boolean | number
    uploadedBy?: UserRequest
    /** Link to the image on the site */
    url?: boolean | number
    views?: boolean | number
    /** Width of the image in pixels. */
    width?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageConnectionsRequest{
    edges?: ImageEdgeRequest
    images?: ImageRequest
    people?: PersonRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A coordinate representing a position on an image */
export interface ImageCoordinateRequest{
    x?: boolean | number
    y?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageCreateManyUserInput {bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreateManypaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateManyUserInputEnvelope {data?: (ImageCreateManyUserInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageCreateManypaletteInput {set?: (Scalars['Int'][] | null)}

export interface ImageCreateNestedManyWithoutUserInput {connect?: (ImageWhereUniqueInput[] | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserInput[] | null),create?: (ImageCreateWithoutUserInput[] | null),createMany?: (ImageCreateManyUserInputEnvelope | null)}

export interface ImageCreateNestedOneWithoutAppearancesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAppearancesInput | null),create?: (ImageCreateWithoutAppearancesInput | null)}

export interface ImageCreateNestedOneWithoutAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAvatarOfInput | null),create?: (ImageCreateWithoutAvatarOfInput | null)}

export interface ImageCreateNestedOneWithoutBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutBannerOfInput | null),create?: (ImageCreateWithoutBannerOfInput | null)}

export interface ImageCreateNestedOneWithoutLikesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutLikesInput | null),create?: (ImageCreateWithoutLikesInput | null)}

export interface ImageCreateNestedOneWithoutTagsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutTagsInput | null),create?: (ImageCreateWithoutTagsInput | null)}

export interface ImageCreateOrConnectWithoutAppearancesInput {create: ImageCreateWithoutAppearancesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutAvatarOfInput {create: ImageCreateWithoutAvatarOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutBannerOfInput {create: ImageCreateWithoutBannerOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutFacesInput {create: ImageCreateWithoutFacesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutLikesInput {create: ImageCreateWithoutLikesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutTagsInput {create: ImageCreateWithoutTagsInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutUserInput {create: ImageCreateWithoutUserInput,where: ImageWhereUniqueInput}

export interface ImageCreateWithoutAppearancesInput {avatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),bannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),tags?: (TagCreateNestedManyWithoutImageInput | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateWithoutAvatarOfInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),tags?: (TagCreateNestedManyWithoutImageInput | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateWithoutBannerOfInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),avatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),tags?: (TagCreateNestedManyWithoutImageInput | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateWithoutFacesInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),avatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),bannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),tags?: (TagCreateNestedManyWithoutImageInput | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateWithoutLikesInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),avatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),bannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),tags?: (TagCreateNestedManyWithoutImageInput | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateWithoutTagsInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),avatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),bannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreateWithoutUserInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),avatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),bannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),tags?: (TagCreateNestedManyWithoutImageInput | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,views?: (Scalars['Int'] | null),width: Scalars['Int']}

export interface ImageCreatepaletteInput {set?: (Scalars['Int'][] | null)}

export interface ImageEdgeRequest{
    from?: boolean | number
    to?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageLikeCreateManyImageInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),updatedAt?: (Scalars['DateTime'] | null),userId: Scalars['Int']}

export interface ImageLikeCreateManyImageInputEnvelope {data?: (ImageLikeCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageLikeCreateManyUserInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageLikeCreateManyUserInputEnvelope {data?: (ImageLikeCreateManyUserInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageLikeCreateNestedManyWithoutImageInput {connect?: (ImageLikeWhereUniqueInput[] | null),connectOrCreate?: (ImageLikeCreateOrConnectWithoutImageInput[] | null),create?: (ImageLikeCreateWithoutImageInput[] | null),createMany?: (ImageLikeCreateManyImageInputEnvelope | null)}

export interface ImageLikeCreateNestedManyWithoutUserInput {connect?: (ImageLikeWhereUniqueInput[] | null),connectOrCreate?: (ImageLikeCreateOrConnectWithoutUserInput[] | null),create?: (ImageLikeCreateWithoutUserInput[] | null),createMany?: (ImageLikeCreateManyUserInputEnvelope | null)}

export interface ImageLikeCreateOrConnectWithoutImageInput {create: ImageLikeCreateWithoutImageInput,where: ImageLikeWhereUniqueInput}

export interface ImageLikeCreateOrConnectWithoutUserInput {create: ImageLikeCreateWithoutUserInput,where: ImageLikeWhereUniqueInput}

export interface ImageLikeCreateWithoutImageInput {createdAt?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null),user: UserCreateNestedOneWithoutImageLikesInput}

export interface ImageLikeCreateWithoutUserInput {createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutLikesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageLikeLikedImageCompoundUniqueInput {imageId: Scalars['Int'],userId: Scalars['Int']}

export interface ImageLikeListRelationFilter {every?: (ImageLikeWhereInput | null),none?: (ImageLikeWhereInput | null),some?: (ImageLikeWhereInput | null)}

export interface ImageLikeScalarWhereInput {AND?: (ImageLikeScalarWhereInput[] | null),NOT?: (ImageLikeScalarWhereInput[] | null),OR?: (ImageLikeScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null),userId?: (IntFilter | null)}

export interface ImageLikeUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageLikeUpdateManyWithWhereWithoutImageInput {data: ImageLikeUpdateManyMutationInput,where: ImageLikeScalarWhereInput}

export interface ImageLikeUpdateManyWithWhereWithoutUserInput {data: ImageLikeUpdateManyMutationInput,where: ImageLikeScalarWhereInput}

export interface ImageLikeUpdateManyWithoutImageInput {connect?: (ImageLikeWhereUniqueInput[] | null),connectOrCreate?: (ImageLikeCreateOrConnectWithoutImageInput[] | null),create?: (ImageLikeCreateWithoutImageInput[] | null),createMany?: (ImageLikeCreateManyImageInputEnvelope | null),delete?: (ImageLikeWhereUniqueInput[] | null),deleteMany?: (ImageLikeScalarWhereInput[] | null),disconnect?: (ImageLikeWhereUniqueInput[] | null),set?: (ImageLikeWhereUniqueInput[] | null),update?: (ImageLikeUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (ImageLikeUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (ImageLikeUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface ImageLikeUpdateManyWithoutUserInput {connect?: (ImageLikeWhereUniqueInput[] | null),connectOrCreate?: (ImageLikeCreateOrConnectWithoutUserInput[] | null),create?: (ImageLikeCreateWithoutUserInput[] | null),createMany?: (ImageLikeCreateManyUserInputEnvelope | null),delete?: (ImageLikeWhereUniqueInput[] | null),deleteMany?: (ImageLikeScalarWhereInput[] | null),disconnect?: (ImageLikeWhereUniqueInput[] | null),set?: (ImageLikeWhereUniqueInput[] | null),update?: (ImageLikeUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (ImageLikeUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (ImageLikeUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface ImageLikeUpdateWithWhereUniqueWithoutImageInput {data: ImageLikeUpdateWithoutImageInput,where: ImageLikeWhereUniqueInput}

export interface ImageLikeUpdateWithWhereUniqueWithoutUserInput {data: ImageLikeUpdateWithoutUserInput,where: ImageLikeWhereUniqueInput}

export interface ImageLikeUpdateWithoutImageInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),user?: (UserUpdateOneRequiredWithoutImageLikesInput | null)}

export interface ImageLikeUpdateWithoutUserInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutLikesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageLikeUpsertWithWhereUniqueWithoutImageInput {create: ImageLikeCreateWithoutImageInput,update: ImageLikeUpdateWithoutImageInput,where: ImageLikeWhereUniqueInput}

export interface ImageLikeUpsertWithWhereUniqueWithoutUserInput {create: ImageLikeCreateWithoutUserInput,update: ImageLikeUpdateWithoutUserInput,where: ImageLikeWhereUniqueInput}

export interface ImageLikeWhereInput {AND?: (ImageLikeWhereInput[] | null),NOT?: (ImageLikeWhereInput[] | null),OR?: (ImageLikeWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null),user?: (UserWhereInput | null),userId?: (IntFilter | null)}

export interface ImageLikeWhereUniqueInput {id?: (Scalars['Int'] | null),likedImage?: (ImageLikeLikedImageCompoundUniqueInput | null)}

export interface ImageListRelationFilter {every?: (ImageWhereInput | null),none?: (ImageWhereInput | null),some?: (ImageWhereInput | null)}

export interface ImageMatchRequest{
    face?: FaceRequest
    image?: ImageRequest
    person?: PersonRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageOrderByInput {bytes?: (SortOrder | null),caption?: (SortOrder | null),createdAt?: (SortOrder | null),faceScanDate?: (SortOrder | null),faceScanRequestDate?: (SortOrder | null),fileName?: (SortOrder | null),hash?: (SortOrder | null),height?: (SortOrder | null),id?: (SortOrder | null),ireneBotId?: (SortOrder | null),isNsfw?: (SortOrder | null),mimetype?: (SortOrder | null),pHash?: (SortOrder | null),palette?: (SortOrder | null),public?: (SortOrder | null),slug?: (SortOrder | null),source?: (SortOrder | null),updatedAt?: (SortOrder | null),uploadType?: (SortOrder | null),userId?: (SortOrder | null),views?: (SortOrder | null),width?: (SortOrder | null)}

export interface ImageScalarWhereInput {AND?: (ImageScalarWhereInput[] | null),NOT?: (ImageScalarWhereInput[] | null),OR?: (ImageScalarWhereInput[] | null),bytes?: (IntFilter | null),caption?: (StringNullableFilter | null),createdAt?: (DateTimeFilter | null),faceScanDate?: (DateTimeNullableFilter | null),faceScanRequestDate?: (DateTimeNullableFilter | null),fileName?: (StringNullableFilter | null),hash?: (StringFilter | null),height?: (IntFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),isNsfw?: (BoolFilter | null),mimetype?: (EnumMimeTypeFilter | null),pHash?: (StringNullableFilter | null),palette?: (IntNullableListFilter | null),public?: (BoolFilter | null),slug?: (StringFilter | null),source?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null),uploadType?: (EnumUploadTypeFilter | null),userId?: (IntNullableFilter | null),views?: (IntFilter | null),width?: (IntFilter | null)}

export interface ImageUpdateManyMutationInput {bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateManyWithWhereWithoutUserInput {data: ImageUpdateManyMutationInput,where: ImageScalarWhereInput}

export interface ImageUpdateManyWithoutUserInput {connect?: (ImageWhereUniqueInput[] | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserInput[] | null),create?: (ImageCreateWithoutUserInput[] | null),createMany?: (ImageCreateManyUserInputEnvelope | null),delete?: (ImageWhereUniqueInput[] | null),deleteMany?: (ImageScalarWhereInput[] | null),disconnect?: (ImageWhereUniqueInput[] | null),set?: (ImageWhereUniqueInput[] | null),update?: (ImageUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (ImageUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (ImageUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface ImageUpdateOneRequiredWithoutAppearancesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAppearancesInput | null),create?: (ImageCreateWithoutAppearancesInput | null),update?: (ImageUpdateWithoutAppearancesInput | null),upsert?: (ImageUpsertWithoutAppearancesInput | null)}

export interface ImageUpdateOneRequiredWithoutFacesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutFacesInput | null),create?: (ImageCreateWithoutFacesInput | null),update?: (ImageUpdateWithoutFacesInput | null),upsert?: (ImageUpsertWithoutFacesInput | null)}

export interface ImageUpdateOneRequiredWithoutLikesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutLikesInput | null),create?: (ImageCreateWithoutLikesInput | null),update?: (ImageUpdateWithoutLikesInput | null),upsert?: (ImageUpsertWithoutLikesInput | null)}

export interface ImageUpdateOneRequiredWithoutTagsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutTagsInput | null),create?: (ImageCreateWithoutTagsInput | null),update?: (ImageUpdateWithoutTagsInput | null),upsert?: (ImageUpsertWithoutTagsInput | null)}

export interface ImageUpdateOneWithoutAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAvatarOfInput | null),create?: (ImageCreateWithoutAvatarOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutAvatarOfInput | null),upsert?: (ImageUpsertWithoutAvatarOfInput | null)}

export interface ImageUpdateOneWithoutBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutBannerOfInput | null),create?: (ImageCreateWithoutBannerOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutBannerOfInput | null),upsert?: (ImageUpsertWithoutBannerOfInput | null)}

export interface ImageUpdateWithWhereUniqueWithoutUserInput {data: ImageUpdateWithoutUserInput,where: ImageWhereUniqueInput}

export interface ImageUpdateWithoutAppearancesInput {avatarOf?: (GroupUpdateOneWithoutAvatarInput | null),bannerOf?: (GroupUpdateOneWithoutBannerInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutImageInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutAvatarOfInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),bannerOf?: (GroupUpdateOneWithoutBannerInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutImageInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutBannerOfInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),avatarOf?: (GroupUpdateOneWithoutAvatarInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutImageInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutFacesInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),avatarOf?: (GroupUpdateOneWithoutAvatarInput | null),bannerOf?: (GroupUpdateOneWithoutBannerInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutImageInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutLikesInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),avatarOf?: (GroupUpdateOneWithoutAvatarInput | null),bannerOf?: (GroupUpdateOneWithoutBannerInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutImageInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutTagsInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),avatarOf?: (GroupUpdateOneWithoutAvatarInput | null),bannerOf?: (GroupUpdateOneWithoutBannerInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutUserInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),avatarOf?: (GroupUpdateOneWithoutAvatarInput | null),bannerOf?: (GroupUpdateOneWithoutBannerInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutImageInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdatepaletteInput {push?: (Scalars['Int'] | null),set?: (Scalars['Int'][] | null)}

export interface ImageUpsertWithWhereUniqueWithoutUserInput {create: ImageCreateWithoutUserInput,update: ImageUpdateWithoutUserInput,where: ImageWhereUniqueInput}

export interface ImageUpsertWithoutAppearancesInput {create: ImageCreateWithoutAppearancesInput,update: ImageUpdateWithoutAppearancesInput}

export interface ImageUpsertWithoutAvatarOfInput {create: ImageCreateWithoutAvatarOfInput,update: ImageUpdateWithoutAvatarOfInput}

export interface ImageUpsertWithoutBannerOfInput {create: ImageCreateWithoutBannerOfInput,update: ImageUpdateWithoutBannerOfInput}

export interface ImageUpsertWithoutFacesInput {create: ImageCreateWithoutFacesInput,update: ImageUpdateWithoutFacesInput}

export interface ImageUpsertWithoutLikesInput {create: ImageCreateWithoutLikesInput,update: ImageUpdateWithoutLikesInput}

export interface ImageUpsertWithoutTagsInput {create: ImageCreateWithoutTagsInput,update: ImageUpdateWithoutTagsInput}

export interface ImageWhereInput {AND?: (ImageWhereInput[] | null),NOT?: (ImageWhereInput[] | null),OR?: (ImageWhereInput[] | null),appearances?: (AppearanceListRelationFilter | null),avatarOf?: (GroupWhereInput | null),bannerOf?: (GroupWhereInput | null),bytes?: (IntFilter | null),caption?: (StringNullableFilter | null),createdAt?: (DateTimeFilter | null),faceScanDate?: (DateTimeNullableFilter | null),faceScanRequestDate?: (DateTimeNullableFilter | null),faces?: (FaceListRelationFilter | null),fileName?: (StringNullableFilter | null),hash?: (StringFilter | null),height?: (IntFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),isNsfw?: (BoolFilter | null),likes?: (ImageLikeListRelationFilter | null),mimetype?: (EnumMimeTypeFilter | null),pHash?: (StringNullableFilter | null),palette?: (IntNullableListFilter | null),public?: (BoolFilter | null),slug?: (StringFilter | null),source?: (StringNullableFilter | null),tags?: (TagListRelationFilter | null),updatedAt?: (DateTimeFilter | null),uploadType?: (EnumUploadTypeFilter | null),user?: (UserWhereInput | null),userId?: (IntNullableFilter | null),views?: (IntFilter | null),width?: (IntFilter | null)}

export interface ImageWhereUniqueInput {id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),slug?: (Scalars['String'] | null)}

export interface IntFieldUpdateOperationsInput {decrement?: (Scalars['Int'] | null),divide?: (Scalars['Int'] | null),increment?: (Scalars['Int'] | null),multiply?: (Scalars['Int'] | null),set?: (Scalars['Int'] | null)}

export interface IntFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface IntNullableFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntNullableFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface IntNullableListFilter {equals?: (Scalars['Int'][] | null),has?: (Scalars['Int'] | null),hasEvery?: (Scalars['Int'][] | null),hasSome?: (Scalars['Int'][] | null),isEmpty?: (Scalars['Boolean'] | null)}

export interface MutationRequest{
    /** Add an appearance relation on an image. */
    addAppearance?: [{imageId: Scalars['Int'],personId: Scalars['Int']},AppearanceRequest]
    createOnePerson?: [{data: PersonCreateInput},PersonRequest]
    /** Add metadata labels to an existing image. Only available to bot accounts */
    labelImage?: [{faces: FaceInput[],ireneBotId?: (Scalars['Int'] | null),pHash?: (Scalars['String'] | null),palette: Scalars['Int'][],personName?: (Scalars['String'] | null),replacePreviousScan?: (Scalars['Boolean'] | null),slug: Scalars['String']},ImageRequest]
    /** Attach an existing face to an apperance. */
    linkFace?: [{appearanceId: Scalars['Int'],faceId: Scalars['Int']},AppearanceRequest]
    /** Removes an appearance from an image */
    removeAppearance?: [{appearanceId: Scalars['Int']},AppearanceRequest]
    /** Queue an image to get scanned for faces */
    scanFaces?: [{slug: Scalars['String']},QueueInfoRequest]
    toggleLike?: [{imageId: Scalars['Int']},ImageRequest]
    /** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
    unlinkFace?: [{appearanceId: Scalars['Int'],faceId: Scalars['Int']}]
    upsertOneGroup?: [{create: GroupCreateInput,update: GroupUpdateInput,where: GroupWhereUniqueInput},GroupRequest]
    upsertOnePerson?: [{create: PersonCreateInput,update: PersonUpdateInput,where: PersonWhereUniqueInput},PersonRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NestedBoolFilter {equals?: (Scalars['Boolean'] | null),not?: (NestedBoolFilter | null)}

export interface NestedDateTimeFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface NestedDateTimeNullableFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeNullableFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface NestedEnumFaceSourceFilter {equals?: (FaceSource | null),in?: (FaceSource[] | null),not?: (NestedEnumFaceSourceFilter | null),notIn?: (FaceSource[] | null)}

export interface NestedEnumMimeTypeFilter {equals?: (MimeType | null),in?: (MimeType[] | null),not?: (NestedEnumMimeTypeFilter | null),notIn?: (MimeType[] | null)}

export interface NestedEnumTagSourceFilter {equals?: (TagSource | null),in?: (TagSource[] | null),not?: (NestedEnumTagSourceFilter | null),notIn?: (TagSource[] | null)}

export interface NestedEnumUploadTypeFilter {equals?: (UploadType | null),in?: (UploadType[] | null),not?: (NestedEnumUploadTypeFilter | null),notIn?: (UploadType[] | null)}

export interface NestedFloatFilter {equals?: (Scalars['Float'] | null),gt?: (Scalars['Float'] | null),gte?: (Scalars['Float'] | null),in?: (Scalars['Float'][] | null),lt?: (Scalars['Float'] | null),lte?: (Scalars['Float'] | null),not?: (NestedFloatFilter | null),notIn?: (Scalars['Float'][] | null)}

export interface NestedIntFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface NestedIntNullableFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntNullableFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface NestedStringFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),not?: (NestedStringFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface NestedStringNullableFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),not?: (NestedStringNullableFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface NullableDateTimeFieldUpdateOperationsInput {set?: (Scalars['DateTime'] | null)}

export interface NullableIntFieldUpdateOperationsInput {decrement?: (Scalars['Int'] | null),divide?: (Scalars['Int'] | null),increment?: (Scalars['Int'] | null),multiply?: (Scalars['Int'] | null),set?: (Scalars['Int'] | null)}

export interface NullableStringFieldUpdateOperationsInput {set?: (Scalars['String'] | null)}

export interface PersonRequest{
    aliases?: [{cursor?: (AliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AliasRequest] | AliasRequest
    appearances?: [{cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AppearanceRequest] | AppearanceRequest
    createdAt?: boolean | number
    faces?: [{cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},FaceRequest] | FaceRequest
    id?: boolean | number
    memberOf?: [{cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},GroupMemberRequest] | GroupMemberRequest
    name?: boolean | number
    preferredAlias?: AliasRequest
    preferredMembership?: GroupMemberRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface PersonCreateInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateManyPreferredMembershipInput {createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),name: Scalars['String'],preferredAliasId?: (Scalars['Int'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateManyPreferredMembershipInputEnvelope {data?: (PersonCreateManyPreferredMembershipInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface PersonCreateNestedManyWithoutPreferredMembershipInput {connect?: (PersonWhereUniqueInput[] | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredMembershipInput[] | null),create?: (PersonCreateWithoutPreferredMembershipInput[] | null),createMany?: (PersonCreateManyPreferredMembershipInputEnvelope | null)}

export interface PersonCreateNestedOneWithoutAliasesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAliasesInput | null),create?: (PersonCreateWithoutAliasesInput | null)}

export interface PersonCreateNestedOneWithoutAppearancesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAppearancesInput | null),create?: (PersonCreateWithoutAppearancesInput | null)}

export interface PersonCreateNestedOneWithoutMemberOfInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutMemberOfInput | null),create?: (PersonCreateWithoutMemberOfInput | null)}

export interface PersonCreateNestedOneWithoutPreferredAliasInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredAliasInput | null),create?: (PersonCreateWithoutPreferredAliasInput | null)}

export interface PersonCreateOrConnectWithoutAliasesInput {create: PersonCreateWithoutAliasesInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutAppearancesInput {create: PersonCreateWithoutAppearancesInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutAppearsInInput {create: PersonCreateWithoutAppearsInInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutMemberOfInput {create: PersonCreateWithoutMemberOfInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutPreferredAliasInput {create: PersonCreateWithoutPreferredAliasInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutPreferredMembershipInput {create: PersonCreateWithoutPreferredMembershipInput,where: PersonWhereUniqueInput}

export interface PersonCreateWithoutAliasesInput {appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutAppearancesInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutAppearsInInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutMemberOfInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutPreferredAliasInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutPreferredMembershipInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonListRelationFilter {every?: (PersonWhereInput | null),none?: (PersonWhereInput | null),some?: (PersonWhereInput | null)}

export interface PersonScalarWhereInput {AND?: (PersonScalarWhereInput[] | null),NOT?: (PersonScalarWhereInput[] | null),OR?: (PersonScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),description?: (StringNullableFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),name?: (StringFilter | null),preferredAliasId?: (IntNullableFilter | null),preferredMembershipId?: (IntNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface PersonUpdateInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateManyWithWhereWithoutPreferredMembershipInput {data: PersonUpdateManyMutationInput,where: PersonScalarWhereInput}

export interface PersonUpdateManyWithoutPreferredMembershipInput {connect?: (PersonWhereUniqueInput[] | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredMembershipInput[] | null),create?: (PersonCreateWithoutPreferredMembershipInput[] | null),createMany?: (PersonCreateManyPreferredMembershipInputEnvelope | null),delete?: (PersonWhereUniqueInput[] | null),deleteMany?: (PersonScalarWhereInput[] | null),disconnect?: (PersonWhereUniqueInput[] | null),set?: (PersonWhereUniqueInput[] | null),update?: (PersonUpdateWithWhereUniqueWithoutPreferredMembershipInput[] | null),updateMany?: (PersonUpdateManyWithWhereWithoutPreferredMembershipInput[] | null),upsert?: (PersonUpsertWithWhereUniqueWithoutPreferredMembershipInput[] | null)}

export interface PersonUpdateOneRequiredWithoutAliasesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAliasesInput | null),create?: (PersonCreateWithoutAliasesInput | null),update?: (PersonUpdateWithoutAliasesInput | null),upsert?: (PersonUpsertWithoutAliasesInput | null)}

export interface PersonUpdateOneRequiredWithoutAppearancesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAppearancesInput | null),create?: (PersonCreateWithoutAppearancesInput | null),update?: (PersonUpdateWithoutAppearancesInput | null),upsert?: (PersonUpsertWithoutAppearancesInput | null)}

export interface PersonUpdateOneRequiredWithoutMemberOfInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutMemberOfInput | null),create?: (PersonCreateWithoutMemberOfInput | null),update?: (PersonUpdateWithoutMemberOfInput | null),upsert?: (PersonUpsertWithoutMemberOfInput | null)}

export interface PersonUpdateOneWithoutAppearsInInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAppearsInInput | null),create?: (PersonCreateWithoutAppearsInInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (PersonUpdateWithoutAppearsInInput | null),upsert?: (PersonUpsertWithoutAppearsInInput | null)}

export interface PersonUpdateOneWithoutPreferredAliasInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredAliasInput | null),create?: (PersonCreateWithoutPreferredAliasInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (PersonUpdateWithoutPreferredAliasInput | null),upsert?: (PersonUpsertWithoutPreferredAliasInput | null)}

export interface PersonUpdateWithWhereUniqueWithoutPreferredMembershipInput {data: PersonUpdateWithoutPreferredMembershipInput,where: PersonWhereUniqueInput}

export interface PersonUpdateWithoutAliasesInput {appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutAppearancesInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutAppearsInInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutMemberOfInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutPreferredAliasInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutPreferredMembershipInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpsertWithWhereUniqueWithoutPreferredMembershipInput {create: PersonCreateWithoutPreferredMembershipInput,update: PersonUpdateWithoutPreferredMembershipInput,where: PersonWhereUniqueInput}

export interface PersonUpsertWithoutAliasesInput {create: PersonCreateWithoutAliasesInput,update: PersonUpdateWithoutAliasesInput}

export interface PersonUpsertWithoutAppearancesInput {create: PersonCreateWithoutAppearancesInput,update: PersonUpdateWithoutAppearancesInput}

export interface PersonUpsertWithoutAppearsInInput {create: PersonCreateWithoutAppearsInInput,update: PersonUpdateWithoutAppearsInInput}

export interface PersonUpsertWithoutMemberOfInput {create: PersonCreateWithoutMemberOfInput,update: PersonUpdateWithoutMemberOfInput}

export interface PersonUpsertWithoutPreferredAliasInput {create: PersonCreateWithoutPreferredAliasInput,update: PersonUpdateWithoutPreferredAliasInput}

export interface PersonWhereInput {AND?: (PersonWhereInput[] | null),NOT?: (PersonWhereInput[] | null),OR?: (PersonWhereInput[] | null),aliases?: (AliasListRelationFilter | null),appearances?: (AppearanceListRelationFilter | null),appearsIn?: (FaceListRelationFilter | null),createdAt?: (DateTimeFilter | null),description?: (StringNullableFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),memberOf?: (GroupMemberListRelationFilter | null),name?: (StringFilter | null),preferredAlias?: (AliasWhereInput | null),preferredAliasId?: (IntNullableFilter | null),preferredMembership?: (GroupMemberWhereInput | null),preferredMembershipId?: (IntNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface PersonWhereUniqueInput {id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null)}

export interface QueryRequest{
    countAppearances?: [{groups: Scalars['Int'][]},AppearanceCountRequest]
    group?: [{where: GroupWhereUniqueInput},GroupRequest]
    groups?: [{cursor?: (GroupWhereUniqueInput | null),orderBy?: (GroupOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (GroupWhereInput | null)},GroupRequest] | GroupRequest
    /** Find a single image by its slug. */
    image?: [{slug: Scalars['String']},ImageRequest]
    imageConnections?: [{depth: Scalars['Int'],slug: Scalars['String']},ImageConnectionsRequest]
    images?: [{cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)},ImageRequest] | ImageRequest
    me?: UserRequest
    people?: [{cursor?: (PersonWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (PersonWhereInput | null)},PersonRequest] | PersonRequest
    person?: [{where: PersonWhereUniqueInput},PersonRequest]
    personImages?: [{amount?: (Scalars['Int'] | null),personIds: Scalars['Int'][]},ImageMatchRequest]
    user?: [{id?: (Scalars['Int'] | null)},UserRequest] | UserRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueueInfoRequest{
    queueSize?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleRequest{
    createdAt?: boolean | number
    name?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface RoleCreateManyUserInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface RoleCreateManyUserInputEnvelope {data?: (RoleCreateManyUserInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface RoleCreateNestedManyWithoutUserInput {connect?: (RoleWhereUniqueInput[] | null),connectOrCreate?: (RoleCreateOrConnectWithoutUserInput[] | null),create?: (RoleCreateWithoutUserInput[] | null),createMany?: (RoleCreateManyUserInputEnvelope | null)}

export interface RoleCreateOrConnectWithoutUserInput {create: RoleCreateWithoutUserInput,where: RoleWhereUniqueInput}

export interface RoleCreateWithoutUserInput {createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface RoleListRelationFilter {every?: (RoleWhereInput | null),none?: (RoleWhereInput | null),some?: (RoleWhereInput | null)}

export interface RoleScalarWhereInput {AND?: (RoleScalarWhereInput[] | null),NOT?: (RoleScalarWhereInput[] | null),OR?: (RoleScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null),userId?: (IntFilter | null)}

export interface RoleUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface RoleUpdateManyWithWhereWithoutUserInput {data: RoleUpdateManyMutationInput,where: RoleScalarWhereInput}

export interface RoleUpdateManyWithoutUserInput {connect?: (RoleWhereUniqueInput[] | null),connectOrCreate?: (RoleCreateOrConnectWithoutUserInput[] | null),create?: (RoleCreateWithoutUserInput[] | null),createMany?: (RoleCreateManyUserInputEnvelope | null),delete?: (RoleWhereUniqueInput[] | null),deleteMany?: (RoleScalarWhereInput[] | null),disconnect?: (RoleWhereUniqueInput[] | null),set?: (RoleWhereUniqueInput[] | null),update?: (RoleUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (RoleUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (RoleUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface RoleUpdateWithWhereUniqueWithoutUserInput {data: RoleUpdateWithoutUserInput,where: RoleWhereUniqueInput}

export interface RoleUpdateWithoutUserInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface RoleUpsertWithWhereUniqueWithoutUserInput {create: RoleCreateWithoutUserInput,update: RoleUpdateWithoutUserInput,where: RoleWhereUniqueInput}

export interface RoleUserRoleCompoundUniqueInput {name: Scalars['String'],userId: Scalars['Int']}

export interface RoleWhereInput {AND?: (RoleWhereInput[] | null),NOT?: (RoleWhereInput[] | null),OR?: (RoleWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null),user?: (UserWhereInput | null),userId?: (IntFilter | null)}

export interface RoleWhereUniqueInput {id?: (Scalars['Int'] | null),userRole?: (RoleUserRoleCompoundUniqueInput | null)}

export interface StringFieldUpdateOperationsInput {set?: (Scalars['String'] | null)}

export interface StringFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),mode?: (QueryMode | null),not?: (NestedStringFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface StringNullableFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),mode?: (QueryMode | null),not?: (NestedStringNullableFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface TagRequest{
    addedBy?: UserRequest
    createdAt?: boolean | number
    name?: boolean | number
    source?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TagCreateManyAddedByInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],name: Scalars['String'],source: TagSource,updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateManyAddedByInputEnvelope {data?: (TagCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagCreateManyImageInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],source: TagSource,updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateManyImageInputEnvelope {data?: (TagCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagCreateNestedManyWithoutAddedByInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutAddedByInput[] | null),create?: (TagCreateWithoutAddedByInput[] | null),createMany?: (TagCreateManyAddedByInputEnvelope | null)}

export interface TagCreateNestedManyWithoutImageInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutImageInput[] | null),create?: (TagCreateWithoutImageInput[] | null),createMany?: (TagCreateManyImageInputEnvelope | null)}

export interface TagCreateOrConnectWithoutAddedByInput {create: TagCreateWithoutAddedByInput,where: TagWhereUniqueInput}

export interface TagCreateOrConnectWithoutImageInput {create: TagCreateWithoutImageInput,where: TagWhereUniqueInput}

export interface TagCreateWithoutAddedByInput {createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutTagsInput,name: Scalars['String'],source: TagSource,updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateWithoutImageInput {addedBy?: (UserCreateNestedOneWithoutCratedTagsInput | null),createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],source: TagSource,updatedAt?: (Scalars['DateTime'] | null)}

export interface TagListRelationFilter {every?: (TagWhereInput | null),none?: (TagWhereInput | null),some?: (TagWhereInput | null)}

export interface TagScalarWhereInput {AND?: (TagScalarWhereInput[] | null),NOT?: (TagScalarWhereInput[] | null),OR?: (TagScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),name?: (StringFilter | null),source?: (EnumTagSourceFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateManyWithWhereWithoutAddedByInput {data: TagUpdateManyMutationInput,where: TagScalarWhereInput}

export interface TagUpdateManyWithWhereWithoutImageInput {data: TagUpdateManyMutationInput,where: TagScalarWhereInput}

export interface TagUpdateManyWithoutAddedByInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutAddedByInput[] | null),create?: (TagCreateWithoutAddedByInput[] | null),createMany?: (TagCreateManyAddedByInputEnvelope | null),delete?: (TagWhereUniqueInput[] | null),deleteMany?: (TagScalarWhereInput[] | null),disconnect?: (TagWhereUniqueInput[] | null),set?: (TagWhereUniqueInput[] | null),update?: (TagUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (TagUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (TagUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface TagUpdateManyWithoutImageInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutImageInput[] | null),create?: (TagCreateWithoutImageInput[] | null),createMany?: (TagCreateManyImageInputEnvelope | null),delete?: (TagWhereUniqueInput[] | null),deleteMany?: (TagScalarWhereInput[] | null),disconnect?: (TagWhereUniqueInput[] | null),set?: (TagWhereUniqueInput[] | null),update?: (TagUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (TagUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (TagUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface TagUpdateWithWhereUniqueWithoutAddedByInput {data: TagUpdateWithoutAddedByInput,where: TagWhereUniqueInput}

export interface TagUpdateWithWhereUniqueWithoutImageInput {data: TagUpdateWithoutImageInput,where: TagWhereUniqueInput}

export interface TagUpdateWithoutAddedByInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutTagsInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateWithoutImageInput {addedBy?: (UserUpdateOneWithoutCratedTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpsertWithWhereUniqueWithoutAddedByInput {create: TagCreateWithoutAddedByInput,update: TagUpdateWithoutAddedByInput,where: TagWhereUniqueInput}

export interface TagUpsertWithWhereUniqueWithoutImageInput {create: TagCreateWithoutImageInput,update: TagUpdateWithoutImageInput,where: TagWhereUniqueInput}

export interface TagWhereInput {AND?: (TagWhereInput[] | null),NOT?: (TagWhereInput[] | null),OR?: (TagWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),name?: (StringFilter | null),source?: (EnumTagSourceFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagWhereUniqueInput {id?: (Scalars['Int'] | null)}


/** Preview urls of an image */
export interface ThumbnailRequest{
    large?: boolean | number
    medium?: boolean | number
    small?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserRequest{
    avatar?: boolean | number
    bot?: boolean | number
    id?: boolean | number
    images?: [{cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)},ImageRequest] | ImageRequest
    name?: boolean | number
    roles?: [{cursor?: (RoleWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},RoleRequest] | RoleRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserCreateNestedOneWithoutCratedTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutCratedTagsInput | null),create?: (UserCreateWithoutCratedTagsInput | null)}

export interface UserCreateNestedOneWithoutImageLikesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImageLikesInput | null),create?: (UserCreateWithoutImageLikesInput | null)}

export interface UserCreateNestedOneWithoutImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImagesInput | null),create?: (UserCreateWithoutImagesInput | null)}

export interface UserCreateNestedOneWithoutTaggedAppearancesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTaggedAppearancesInput | null),create?: (UserCreateWithoutTaggedAppearancesInput | null)}

export interface UserCreateOrConnectWithoutCratedTagsInput {create: UserCreateWithoutCratedTagsInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutImageLikesInput {create: UserCreateWithoutImageLikesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutImagesInput {create: UserCreateWithoutImagesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutMarkedFacesInput {create: UserCreateWithoutMarkedFacesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutTaggedAppearancesInput {create: UserCreateWithoutTaggedAppearancesInput,where: UserWhereUniqueInput}

export interface UserCreateWithoutCratedTagsInput {bot?: (Scalars['Boolean'] | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutImageLikesInput {bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutImagesInput {bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutMarkedFacesInput {bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),name?: (Scalars['String'] | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutTaggedAppearancesInput {bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserUpdateOneRequiredWithoutImageLikesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImageLikesInput | null),create?: (UserCreateWithoutImageLikesInput | null),update?: (UserUpdateWithoutImageLikesInput | null),upsert?: (UserUpsertWithoutImageLikesInput | null)}

export interface UserUpdateOneRequiredWithoutTaggedAppearancesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTaggedAppearancesInput | null),create?: (UserCreateWithoutTaggedAppearancesInput | null),update?: (UserUpdateWithoutTaggedAppearancesInput | null),upsert?: (UserUpsertWithoutTaggedAppearancesInput | null)}

export interface UserUpdateOneWithoutCratedTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutCratedTagsInput | null),create?: (UserCreateWithoutCratedTagsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutCratedTagsInput | null),upsert?: (UserUpsertWithoutCratedTagsInput | null)}

export interface UserUpdateOneWithoutImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImagesInput | null),create?: (UserCreateWithoutImagesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutImagesInput | null),upsert?: (UserUpsertWithoutImagesInput | null)}

export interface UserUpdateOneWithoutMarkedFacesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutMarkedFacesInput | null),create?: (UserCreateWithoutMarkedFacesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutMarkedFacesInput | null),upsert?: (UserUpsertWithoutMarkedFacesInput | null)}

export interface UserUpdateWithoutCratedTagsInput {bot?: (BoolFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutImageLikesInput {bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutImagesInput {bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutMarkedFacesInput {bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),images?: (ImageUpdateManyWithoutUserInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutTaggedAppearancesInput {bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpsertWithoutCratedTagsInput {create: UserCreateWithoutCratedTagsInput,update: UserUpdateWithoutCratedTagsInput}

export interface UserUpsertWithoutImageLikesInput {create: UserCreateWithoutImageLikesInput,update: UserUpdateWithoutImageLikesInput}

export interface UserUpsertWithoutImagesInput {create: UserCreateWithoutImagesInput,update: UserUpdateWithoutImagesInput}

export interface UserUpsertWithoutMarkedFacesInput {create: UserCreateWithoutMarkedFacesInput,update: UserUpdateWithoutMarkedFacesInput}

export interface UserUpsertWithoutTaggedAppearancesInput {create: UserCreateWithoutTaggedAppearancesInput,update: UserUpdateWithoutTaggedAppearancesInput}

export interface UserWhereInput {AND?: (UserWhereInput[] | null),NOT?: (UserWhereInput[] | null),OR?: (UserWhereInput[] | null),bot?: (BoolFilter | null),cratedTags?: (TagListRelationFilter | null),createdAt?: (DateTimeFilter | null),email?: (StringNullableFilter | null),emailVerified?: (DateTimeNullableFilter | null),id?: (IntFilter | null),image?: (StringNullableFilter | null),imageLikes?: (ImageLikeListRelationFilter | null),images?: (ImageListRelationFilter | null),markedFaces?: (FaceListRelationFilter | null),name?: (StringNullableFilter | null),roles?: (RoleListRelationFilter | null),taggedAppearances?: (AppearanceListRelationFilter | null),token?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface UserWhereUniqueInput {email?: (Scalars['String'] | null),id?: (Scalars['Int'] | null),token?: (Scalars['String'] | null)}


const Alias_possibleTypes = ['Alias']
export const isAlias = (obj?: { __typename?: any } | null): obj is Alias => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAlias"')
  return Alias_possibleTypes.includes(obj.__typename)
}



const Appearance_possibleTypes = ['Appearance']
export const isAppearance = (obj?: { __typename?: any } | null): obj is Appearance => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAppearance"')
  return Appearance_possibleTypes.includes(obj.__typename)
}



const AppearanceCount_possibleTypes = ['AppearanceCount']
export const isAppearanceCount = (obj?: { __typename?: any } | null): obj is AppearanceCount => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAppearanceCount"')
  return AppearanceCount_possibleTypes.includes(obj.__typename)
}



const Face_possibleTypes = ['Face']
export const isFace = (obj?: { __typename?: any } | null): obj is Face => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isFace"')
  return Face_possibleTypes.includes(obj.__typename)
}



const Group_possibleTypes = ['Group']
export const isGroup = (obj?: { __typename?: any } | null): obj is Group => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGroup"')
  return Group_possibleTypes.includes(obj.__typename)
}



const GroupAlias_possibleTypes = ['GroupAlias']
export const isGroupAlias = (obj?: { __typename?: any } | null): obj is GroupAlias => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGroupAlias"')
  return GroupAlias_possibleTypes.includes(obj.__typename)
}



const GroupMember_possibleTypes = ['GroupMember']
export const isGroupMember = (obj?: { __typename?: any } | null): obj is GroupMember => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isGroupMember"')
  return GroupMember_possibleTypes.includes(obj.__typename)
}



const Image_possibleTypes = ['Image']
export const isImage = (obj?: { __typename?: any } | null): obj is Image => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImage"')
  return Image_possibleTypes.includes(obj.__typename)
}



const ImageConnections_possibleTypes = ['ImageConnections']
export const isImageConnections = (obj?: { __typename?: any } | null): obj is ImageConnections => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImageConnections"')
  return ImageConnections_possibleTypes.includes(obj.__typename)
}



const ImageCoordinate_possibleTypes = ['ImageCoordinate']
export const isImageCoordinate = (obj?: { __typename?: any } | null): obj is ImageCoordinate => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImageCoordinate"')
  return ImageCoordinate_possibleTypes.includes(obj.__typename)
}



const ImageEdge_possibleTypes = ['ImageEdge']
export const isImageEdge = (obj?: { __typename?: any } | null): obj is ImageEdge => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImageEdge"')
  return ImageEdge_possibleTypes.includes(obj.__typename)
}



const ImageMatch_possibleTypes = ['ImageMatch']
export const isImageMatch = (obj?: { __typename?: any } | null): obj is ImageMatch => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImageMatch"')
  return ImageMatch_possibleTypes.includes(obj.__typename)
}



const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj?: { __typename?: any } | null): obj is Mutation => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



const Person_possibleTypes = ['Person']
export const isPerson = (obj?: { __typename?: any } | null): obj is Person => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isPerson"')
  return Person_possibleTypes.includes(obj.__typename)
}



const Query_possibleTypes = ['Query']
export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



const QueueInfo_possibleTypes = ['QueueInfo']
export const isQueueInfo = (obj?: { __typename?: any } | null): obj is QueueInfo => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isQueueInfo"')
  return QueueInfo_possibleTypes.includes(obj.__typename)
}



const Role_possibleTypes = ['Role']
export const isRole = (obj?: { __typename?: any } | null): obj is Role => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isRole"')
  return Role_possibleTypes.includes(obj.__typename)
}



const Tag_possibleTypes = ['Tag']
export const isTag = (obj?: { __typename?: any } | null): obj is Tag => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTag"')
  return Tag_possibleTypes.includes(obj.__typename)
}



const Thumbnail_possibleTypes = ['Thumbnail']
export const isThumbnail = (obj?: { __typename?: any } | null): obj is Thumbnail => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isThumbnail"')
  return Thumbnail_possibleTypes.includes(obj.__typename)
}



const User_possibleTypes = ['User']
export const isUser = (obj?: { __typename?: any } | null): obj is User => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}


export interface AliasPromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface AliasObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface AppearancePromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    person: (PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface AppearanceObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    image: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    person: (PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface AppearanceCountPromiseChain{
    count: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    group: (GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>})
}

export interface AppearanceCountObservableChain{
    count: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    group: (GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>})
}

export interface FacePromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    appearance: (AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: (FieldsSelection<Appearance, R> | undefined)) => Promise<(FieldsSelection<Appearance, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    height: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    score: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    source: ({get: (request?: boolean|number, defaultValue?: FaceSource) => Promise<FaceSource>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    width: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    x: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    y: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>})
}

export interface FaceObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    appearance: (AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: (FieldsSelection<Appearance, R> | undefined)) => Observable<(FieldsSelection<Appearance, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    height: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    image: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    score: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    source: ({get: (request?: boolean|number, defaultValue?: FaceSource) => Observable<FaceSource>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    width: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    x: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    y: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>})
}

export interface GroupPromiseChain{
    aliases: ((args?: {cursor?: (GroupAliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupAliasRequest>(request: R, defaultValue?: FieldsSelection<GroupAlias, R>[]) => Promise<FieldsSelection<GroupAlias, R>[]>})&({get: <R extends GroupAliasRequest>(request: R, defaultValue?: FieldsSelection<GroupAlias, R>[]) => Promise<FieldsSelection<GroupAlias, R>[]>}),
    avatar: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    banner: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    members: ((args?: {cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Promise<FieldsSelection<GroupMember, R>[]>})&({get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Promise<FieldsSelection<GroupMember, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface GroupObservableChain{
    aliases: ((args?: {cursor?: (GroupAliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupAliasRequest>(request: R, defaultValue?: FieldsSelection<GroupAlias, R>[]) => Observable<FieldsSelection<GroupAlias, R>[]>})&({get: <R extends GroupAliasRequest>(request: R, defaultValue?: FieldsSelection<GroupAlias, R>[]) => Observable<FieldsSelection<GroupAlias, R>[]>}),
    avatar: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    banner: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    members: ((args?: {cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Observable<FieldsSelection<GroupMember, R>[]>})&({get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Observable<FieldsSelection<GroupMember, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface GroupAliasPromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface GroupAliasObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface GroupMemberPromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    endDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    group: (GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    person: (PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>}),
    startDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface GroupMemberObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    endDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    group: (GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    person: (PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>}),
    startDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface ImagePromiseChain{
    appearances: ((args?: {cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Promise<FieldsSelection<Appearance, R>[]>})&({get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Promise<FieldsSelection<Appearance, R>[]>}),
    
/** The aspect ratio of the image */
aspectRatio: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    bytes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    caption: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** A graph of connections people in this image share with others based on images they appear together in up to a depth of 4 */
connections: ((args: {depth: Scalars['Int']}) => ImageConnectionsPromiseChain & {get: <R extends ImageConnectionsRequest>(request: R, defaultValue?: FieldsSelection<ImageConnections, R>) => Promise<FieldsSelection<ImageConnections, R>>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    faceScanDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    
/** The name the image file was uploaded with. */
fileName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** Human readable file size. Use `bytes` for a number representation. */
fileSize: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The center of focus for the image */
focus: (ImageCoordinatePromiseChain & {get: <R extends ImageCoordinateRequest>(request: R, defaultValue?: FieldsSelection<ImageCoordinate, R>) => Promise<FieldsSelection<ImageCoordinate, R>>}),
    
/** SHA256 checksum of the image. */
hash: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Height of the image in pixels. */
height: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    ireneBotId: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** ( ͡° ͜ʖ ͡°) */
isNsfw: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** False if not logged in */
liked: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    
/** The IANA media type of the image. */
mimetype: ({get: (request?: boolean|number, defaultValue?: MimeType) => Promise<MimeType>}),
    
/** Block hash of the image, useful for doing reverse search using hamming distance. */
pHash: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** Dominant colors in the image in decimal format, sorted by frequency. */
palette: ({get: (request?: boolean|number, defaultValue?: Scalars['Int'][]) => Promise<Scalars['Int'][]>}),
    
/** The visibility status of the image. */
public: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** Direct link to the image on the CDN */
rawUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The unique url identifier of the image. */
slug: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
source: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    tags: ((args?: {cursor?: (TagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>[]) => Promise<FieldsSelection<Tag, R>[]>})&({get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>[]) => Promise<FieldsSelection<Tag, R>[]>}),
    thumbnail: (ThumbnailPromiseChain & {get: <R extends ThumbnailRequest>(request: R, defaultValue?: FieldsSelection<Thumbnail, R>) => Promise<FieldsSelection<Thumbnail, R>>}),
    unknownFaces: ({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>}),
    uploadType: ({get: (request?: boolean|number, defaultValue?: UploadType) => Promise<UploadType>}),
    uploadedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    
/** Link to the image on the site */
url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    views: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    
/** Width of the image in pixels. */
width: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}

export interface ImageObservableChain{
    appearances: ((args?: {cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Observable<FieldsSelection<Appearance, R>[]>})&({get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Observable<FieldsSelection<Appearance, R>[]>}),
    
/** The aspect ratio of the image */
aspectRatio: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    bytes: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    caption: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** A graph of connections people in this image share with others based on images they appear together in up to a depth of 4 */
connections: ((args: {depth: Scalars['Int']}) => ImageConnectionsObservableChain & {get: <R extends ImageConnectionsRequest>(request: R, defaultValue?: FieldsSelection<ImageConnections, R>) => Observable<FieldsSelection<ImageConnections, R>>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    faceScanDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    
/** The name the image file was uploaded with. */
fileName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** Human readable file size. Use `bytes` for a number representation. */
fileSize: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The center of focus for the image */
focus: (ImageCoordinateObservableChain & {get: <R extends ImageCoordinateRequest>(request: R, defaultValue?: FieldsSelection<ImageCoordinate, R>) => Observable<FieldsSelection<ImageCoordinate, R>>}),
    
/** SHA256 checksum of the image. */
hash: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Height of the image in pixels. */
height: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    ireneBotId: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** ( ͡° ͜ʖ ͡°) */
isNsfw: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** False if not logged in */
liked: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    
/** The IANA media type of the image. */
mimetype: ({get: (request?: boolean|number, defaultValue?: MimeType) => Observable<MimeType>}),
    
/** Block hash of the image, useful for doing reverse search using hamming distance. */
pHash: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** Dominant colors in the image in decimal format, sorted by frequency. */
palette: ({get: (request?: boolean|number, defaultValue?: Scalars['Int'][]) => Observable<Scalars['Int'][]>}),
    
/** The visibility status of the image. */
public: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** Direct link to the image on the CDN */
rawUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The unique url identifier of the image. */
slug: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
source: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    tags: ((args?: {cursor?: (TagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>[]) => Observable<FieldsSelection<Tag, R>[]>})&({get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>[]) => Observable<FieldsSelection<Tag, R>[]>}),
    thumbnail: (ThumbnailObservableChain & {get: <R extends ThumbnailRequest>(request: R, defaultValue?: FieldsSelection<Thumbnail, R>) => Observable<FieldsSelection<Thumbnail, R>>}),
    unknownFaces: ({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>}),
    uploadType: ({get: (request?: boolean|number, defaultValue?: UploadType) => Observable<UploadType>}),
    uploadedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    
/** Link to the image on the site */
url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    views: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    
/** Width of the image in pixels. */
width: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}

export interface ImageConnectionsPromiseChain{
    edges: ({get: <R extends ImageEdgeRequest>(request: R, defaultValue?: FieldsSelection<ImageEdge, R>[]) => Promise<FieldsSelection<ImageEdge, R>[]>}),
    images: ({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>}),
    people: ({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>})
}

export interface ImageConnectionsObservableChain{
    edges: ({get: <R extends ImageEdgeRequest>(request: R, defaultValue?: FieldsSelection<ImageEdge, R>[]) => Observable<FieldsSelection<ImageEdge, R>[]>}),
    images: ({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>}),
    people: ({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>})
}


/** A coordinate representing a position on an image */
export interface ImageCoordinatePromiseChain{
    x: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    y: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}


/** A coordinate representing a position on an image */
export interface ImageCoordinateObservableChain{
    x: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    y: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}

export interface ImageEdgePromiseChain{
    from: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    to: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    type: ({get: (request?: boolean|number, defaultValue?: (ImageConnectionEdge | undefined)) => Promise<(ImageConnectionEdge | undefined)>})
}

export interface ImageEdgeObservableChain{
    from: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    to: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    type: ({get: (request?: boolean|number, defaultValue?: (ImageConnectionEdge | undefined)) => Observable<(ImageConnectionEdge | undefined)>})
}

export interface ImageMatchPromiseChain{
    face: (FacePromiseChain & {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>) => Promise<FieldsSelection<Face, R>>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    person: (PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>})
}

export interface ImageMatchObservableChain{
    face: (FaceObservableChain & {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>) => Observable<FieldsSelection<Face, R>>}),
    image: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    person: (PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>})
}

export interface MutationPromiseChain{
    
/** Add an appearance relation on an image. */
addAppearance: ((args: {imageId: Scalars['Int'],personId: Scalars['Int']}) => AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    createOnePerson: ((args: {data: PersonCreateInput}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>}),
    
/** Add metadata labels to an existing image. Only available to bot accounts */
labelImage: ((args: {faces: FaceInput[],ireneBotId?: (Scalars['Int'] | null),pHash?: (Scalars['String'] | null),palette: Scalars['Int'][],personName?: (Scalars['String'] | null),replacePreviousScan?: (Scalars['Boolean'] | null),slug: Scalars['String']}) => ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    
/** Attach an existing face to an apperance. */
linkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    
/** Removes an appearance from an image */
removeAppearance: ((args: {appearanceId: Scalars['Int']}) => AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    
/** Queue an image to get scanned for faces */
scanFaces: ((args: {slug: Scalars['String']}) => QueueInfoPromiseChain & {get: <R extends QueueInfoRequest>(request: R, defaultValue?: FieldsSelection<QueueInfo, R>) => Promise<FieldsSelection<QueueInfo, R>>}),
    toggleLike: ((args: {imageId: Scalars['Int']}) => ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    
/** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
unlinkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    upsertOneGroup: ((args: {create: GroupCreateInput,update: GroupUpdateInput,where: GroupWhereUniqueInput}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>}),
    upsertOnePerson: ((args: {create: PersonCreateInput,update: PersonUpdateInput,where: PersonWhereUniqueInput}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>})
}

export interface MutationObservableChain{
    
/** Add an appearance relation on an image. */
addAppearance: ((args: {imageId: Scalars['Int'],personId: Scalars['Int']}) => AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    createOnePerson: ((args: {data: PersonCreateInput}) => PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>}),
    
/** Add metadata labels to an existing image. Only available to bot accounts */
labelImage: ((args: {faces: FaceInput[],ireneBotId?: (Scalars['Int'] | null),pHash?: (Scalars['String'] | null),palette: Scalars['Int'][],personName?: (Scalars['String'] | null),replacePreviousScan?: (Scalars['Boolean'] | null),slug: Scalars['String']}) => ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    
/** Attach an existing face to an apperance. */
linkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    
/** Removes an appearance from an image */
removeAppearance: ((args: {appearanceId: Scalars['Int']}) => AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    
/** Queue an image to get scanned for faces */
scanFaces: ((args: {slug: Scalars['String']}) => QueueInfoObservableChain & {get: <R extends QueueInfoRequest>(request: R, defaultValue?: FieldsSelection<QueueInfo, R>) => Observable<FieldsSelection<QueueInfo, R>>}),
    toggleLike: ((args: {imageId: Scalars['Int']}) => ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    
/** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
unlinkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    upsertOneGroup: ((args: {create: GroupCreateInput,update: GroupUpdateInput,where: GroupWhereUniqueInput}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>}),
    upsertOnePerson: ((args: {create: PersonCreateInput,update: PersonUpdateInput,where: PersonWhereUniqueInput}) => PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>})
}

export interface PersonPromiseChain{
    aliases: ((args?: {cursor?: (AliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AliasRequest>(request: R, defaultValue?: FieldsSelection<Alias, R>[]) => Promise<FieldsSelection<Alias, R>[]>})&({get: <R extends AliasRequest>(request: R, defaultValue?: FieldsSelection<Alias, R>[]) => Promise<FieldsSelection<Alias, R>[]>}),
    appearances: ((args?: {cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Promise<FieldsSelection<Appearance, R>[]>})&({get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Promise<FieldsSelection<Appearance, R>[]>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    memberOf: ((args?: {cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Promise<FieldsSelection<GroupMember, R>[]>})&({get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Promise<FieldsSelection<GroupMember, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    preferredAlias: (AliasPromiseChain & {get: <R extends AliasRequest>(request: R, defaultValue?: (FieldsSelection<Alias, R> | undefined)) => Promise<(FieldsSelection<Alias, R> | undefined)>}),
    preferredMembership: (GroupMemberPromiseChain & {get: <R extends GroupMemberRequest>(request: R, defaultValue?: (FieldsSelection<GroupMember, R> | undefined)) => Promise<(FieldsSelection<GroupMember, R> | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface PersonObservableChain{
    aliases: ((args?: {cursor?: (AliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AliasRequest>(request: R, defaultValue?: FieldsSelection<Alias, R>[]) => Observable<FieldsSelection<Alias, R>[]>})&({get: <R extends AliasRequest>(request: R, defaultValue?: FieldsSelection<Alias, R>[]) => Observable<FieldsSelection<Alias, R>[]>}),
    appearances: ((args?: {cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Observable<FieldsSelection<Appearance, R>[]>})&({get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Observable<FieldsSelection<Appearance, R>[]>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    memberOf: ((args?: {cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Observable<FieldsSelection<GroupMember, R>[]>})&({get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Observable<FieldsSelection<GroupMember, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    preferredAlias: (AliasObservableChain & {get: <R extends AliasRequest>(request: R, defaultValue?: (FieldsSelection<Alias, R> | undefined)) => Observable<(FieldsSelection<Alias, R> | undefined)>}),
    preferredMembership: (GroupMemberObservableChain & {get: <R extends GroupMemberRequest>(request: R, defaultValue?: (FieldsSelection<GroupMember, R> | undefined)) => Observable<(FieldsSelection<GroupMember, R> | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface QueryPromiseChain{
    countAppearances: ((args: {groups: Scalars['Int'][]}) => {get: <R extends AppearanceCountRequest>(request: R, defaultValue?: FieldsSelection<AppearanceCount, R>[]) => Promise<FieldsSelection<AppearanceCount, R>[]>}),
    group: ((args: {where: GroupWhereUniqueInput}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R> | undefined)) => Promise<(FieldsSelection<Group, R> | undefined)>}),
    groups: ((args?: {cursor?: (GroupWhereUniqueInput | null),orderBy?: (GroupOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (GroupWhereInput | null)}) => {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>})&({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    
/** Find a single image by its slug. */
image: ((args: {slug: Scalars['String']}) => ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    imageConnections: ((args: {depth: Scalars['Int'],slug: Scalars['String']}) => ImageConnectionsPromiseChain & {get: <R extends ImageConnectionsRequest>(request: R, defaultValue?: (FieldsSelection<ImageConnections, R> | undefined)) => Promise<(FieldsSelection<ImageConnections, R> | undefined)>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>}),
    me: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    people: ((args?: {cursor?: (PersonWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (PersonWhereInput | null)}) => {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>})&({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>}),
    person: ((args: {where: PersonWhereUniqueInput}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: (FieldsSelection<Person, R> | undefined)) => Promise<(FieldsSelection<Person, R> | undefined)>}),
    personImages: ((args: {amount?: (Scalars['Int'] | null),personIds: Scalars['Int'][]}) => {get: <R extends ImageMatchRequest>(request: R, defaultValue?: FieldsSelection<ImageMatch, R>[]) => Promise<FieldsSelection<ImageMatch, R>[]>}),
    user: ((args?: {id?: (Scalars['Int'] | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})
}

export interface QueryObservableChain{
    countAppearances: ((args: {groups: Scalars['Int'][]}) => {get: <R extends AppearanceCountRequest>(request: R, defaultValue?: FieldsSelection<AppearanceCount, R>[]) => Observable<FieldsSelection<AppearanceCount, R>[]>}),
    group: ((args: {where: GroupWhereUniqueInput}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R> | undefined)) => Observable<(FieldsSelection<Group, R> | undefined)>}),
    groups: ((args?: {cursor?: (GroupWhereUniqueInput | null),orderBy?: (GroupOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (GroupWhereInput | null)}) => {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>})&({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    
/** Find a single image by its slug. */
image: ((args: {slug: Scalars['String']}) => ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    imageConnections: ((args: {depth: Scalars['Int'],slug: Scalars['String']}) => ImageConnectionsObservableChain & {get: <R extends ImageConnectionsRequest>(request: R, defaultValue?: (FieldsSelection<ImageConnections, R> | undefined)) => Observable<(FieldsSelection<ImageConnections, R> | undefined)>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>}),
    me: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    people: ((args?: {cursor?: (PersonWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (PersonWhereInput | null)}) => {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>})&({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>}),
    person: ((args: {where: PersonWhereUniqueInput}) => PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: (FieldsSelection<Person, R> | undefined)) => Observable<(FieldsSelection<Person, R> | undefined)>}),
    personImages: ((args: {amount?: (Scalars['Int'] | null),personIds: Scalars['Int'][]}) => {get: <R extends ImageMatchRequest>(request: R, defaultValue?: FieldsSelection<ImageMatch, R>[]) => Observable<FieldsSelection<ImageMatch, R>[]>}),
    user: ((args?: {id?: (Scalars['Int'] | null)}) => UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>})&(UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>})
}

export interface QueueInfoPromiseChain{
    queueSize: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}

export interface QueueInfoObservableChain{
    queueSize: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}

export interface RolePromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface RoleObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface TagPromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    source: ({get: (request?: boolean|number, defaultValue?: TagSource) => Promise<TagSource>})
}

export interface TagObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    source: ({get: (request?: boolean|number, defaultValue?: TagSource) => Observable<TagSource>})
}


/** Preview urls of an image */
export interface ThumbnailPromiseChain{
    large: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    medium: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    small: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}


/** Preview urls of an image */
export interface ThumbnailObservableChain{
    large: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    medium: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    small: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface UserPromiseChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    bot: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    roles: ((args?: {cursor?: (RoleWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>})&({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>})
}

export interface UserObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    bot: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    roles: ((args?: {cursor?: (RoleWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>})&({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>})
}