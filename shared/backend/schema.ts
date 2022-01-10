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
    addedBy?: User
    createdAt: Scalars['DateTime']
    faces: Face[]
    id: Scalars['Int']
    image: Image
    person: Person
    tags: AppearanceTag[]
    updatedAt: Scalars['DateTime']
    __typename: 'Appearance'
}

export interface AppearanceCount {
    count: Scalars['Int']
    group: Group
    __typename: 'AppearanceCount'
}

export interface AppearanceTag {
    addedBy?: User
    appearance: Appearance
    createdAt: Scalars['DateTime']
    tag: Tag
    updatedAt: Scalars['DateTime']
    __typename: 'AppearanceTag'
}

export interface DiscoveredImage {
    approvedImage?: Image
    createdAt: Scalars['DateTime']
    duplicateImage?: Image
    id: Scalars['Int']
    providerType: Scalars['String']
    referenceUrl?: Scalars['String']
    /** A smaller thumbnail of the image */
    thumbnail: Scalars['String']
    uniqueIdentifier: Scalars['String']
    updatedAt: Scalars['DateTime']
    url: Scalars['String']
    verdict?: DiscoveredImageVerdict
    /** The vote cast by the currently logged in user */
    vote?: DiscoveredImageVote
    /** Votes cast by all users */
    votes: DiscoveredImageVote[]
    __typename: 'DiscoveredImage'
}

export interface DiscoveredImageVerdict {
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    reason?: Scalars['String']
    verdict: Scalars['String']
    __typename: 'DiscoveredImageVerdict'
}

export interface DiscoveredImageVote {
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    reason?: Scalars['String']
    updatedAt: Scalars['DateTime']
    user: User
    verdict: Scalars['String']
    __typename: 'DiscoveredImageVote'
}

export interface DiscoveredPost {
    accountAvatarUrl?: Scalars['String']
    accountName: Scalars['String']
    body?: Scalars['String']
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    images: DiscoveredImage[]
    originalPostDate?: Scalars['DateTime']
    postUrl?: Scalars['String']
    providerType: Scalars['String']
    /** Groups who are associated with the social media account that created this post. */
    referencingGroups: Group[]
    /** People who are associated with the social media account that created this post. */
    referencingPeople: Person[]
    uniqueIdentifier: Scalars['String']
    updatedAt: Scalars['DateTime']
    __typename: 'DiscoveredPost'
}


/** The list of providers that supply images for the discovery feed */
export interface DiscoveryProvider {
    destination: Scalars['String']
    name?: Scalars['String']
    official: Scalars['Boolean']
    provider: Scalars['String']
    url: Scalars['String']
    /** The number of days remaining until this provider is checked for updates again */
    waitDays: Scalars['Int']
    __typename: 'DiscoveryProvider'
}

export interface DiscoveryStatistic {
    count: Scalars['Int']
    verdict: Scalars['String']
    __typename: 'DiscoveryStatistic'
}

export interface Face {
    addedBy?: User
    appearance?: Appearance
    createdAt: Scalars['DateTime']
    height: Scalars['Float']
    id: Scalars['Int']
    image: Image
    /** @deprecated No longer supported */
    score: Scalars['Float']
    source: FaceSource
    updatedAt: Scalars['DateTime']
    width: Scalars['Float']
    x: Scalars['Float']
    y: Scalars['Float']
    __typename: 'Face'
}

export type FaceSource = 'Manual' | 'Scan'

export type Gender = 'FEMALE' | 'MALE' | 'NONBINARY'

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

export interface Homepage {
    trending: HomepageTrendingPerson[][]
    __typename: 'Homepage'
}

export interface HomepageTrendingPerson {
    person: Person
    __typename: 'HomepageTrendingPerson'
}

export interface Image {
    appearanceTags: AppearanceTag[]
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
    /** The center of focus for the image. Calculated based on the position of the faces in the image. */
    focus: ImageCoordinate
    /** SHA256 checksum of the image. */
    hash: Scalars['String']
    /** Height of the image in pixels. */
    height: Scalars['Int']
    hiddenAt?: Scalars['DateTime']
    id: Scalars['Int']
    imageTags: ImageTag[]
    ireneBotId?: Scalars['Int']
    /** @deprecated Unused field, all images are SFW */
    isNsfw: Scalars['Boolean']
    /** False if not logged in */
    liked?: Scalars['Boolean']
    /** The IANA media type of the image. */
    mimetype: MimeType
    /** Dominant colors in the image in decimal format, sorted by frequency. */
    palette: Scalars['Int'][]
    /** The visibility status of the image. */
    public: Scalars['Boolean']
    /** Direct link to the image on the CDN */
    rawUrl: Scalars['String']
    reported: Scalars['Boolean']
    /** The unique url identifier of the image. */
    slug: Scalars['String']
    /** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
    source?: Scalars['String']
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

export interface ImageReport {
    action?: ImageReportAction
    actionedAt?: Scalars['DateTime']
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    image: Image
    reason?: Scalars['String']
    reportedBy: User
    updatedAt: Scalars['DateTime']
    __typename: 'ImageReport'
}

export type ImageReportAction = 'DELETE_IMAGE' | 'DISMISS' | 'HIDE_IMAGE' | 'OTHER' | 'RESTRICT_USER'

export interface ImageTag {
    addedBy?: User
    createdAt: Scalars['DateTime']
    image: Image
    tag: Tag
    updatedAt: Scalars['DateTime']
    __typename: 'ImageTag'
}

export interface LeaderboardUser {
    rank: Scalars['Int']
    user: User
    xp: Scalars['Int']
    __typename: 'LeaderboardUser'
}

export type MimeType = 'AVIF' | 'GIF' | 'JPG' | 'MP4' | 'PNG' | 'SVG' | 'WEBM' | 'WEBP'

export interface Mutation {
    /** Add an appearance relation on an image. */
    addAppearance: Appearance
    addProvider: Scalars['String']
    createAppearanceTag: AppearanceTag
    createImageTag: ImageTag
    createOnePerson: Person
    createTag: Tag
    deleteAppearanceTag?: AppearanceTag
    deleteImageTag?: ImageTag
    discoveredImageVote: DiscoveredImageVote
    /** Vote using the same verdict on all images in a post */
    discoveredPostVote: DiscoveredImage[]
    /** Action on an image reported by a user. Only usable by moderators */
    imageReportAction?: ImageReport
    /** Attach an existing face to an apperance. */
    linkFace: Appearance
    /** Removes an appearance from an image */
    removeAppearance: Appearance
    reportImage?: ImageReport
    /** Queue an image to get scanned for faces */
    scanFaces: QueueInfo
    toggleLike: Image
    /** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
    unlinkFace: Scalars['Int']
    updatePerson?: Person
    upsertOneGroup: Group
    upsertOnePerson: Person
    __typename: 'Mutation'
}

export interface Person {
    aliases: Alias[]
    appearances: Appearance[]
    avatar?: Image
    banner?: Image
    birthDate?: Scalars['DateTime']
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


/** Statistics associated with each provider */
export interface ProviderStatistic {
    createdAt?: Scalars['DateTime']
    defaultName?: Scalars['String']
    destination: Scalars['String']
    discoveredImages: Scalars['Int']
    enabled: Scalars['Boolean']
    lastPost?: Scalars['DateTime']
    lastScrape?: Scalars['DateTime']
    name: Scalars['String']
    official: Scalars['Boolean']
    priority: Scalars['Float']
    scrapeCount: Scalars['Int']
    tokens: Scalars['Float']
    url: Scalars['String']
    __typename: 'ProviderStatistic'
}

export interface Query {
    countAppearances: AppearanceCount[]
    discoveredImages: DiscoveredImage[]
    discoveredPosts: DiscoveredPost[]
    discoveryFeed: DiscoveredPost[]
    discoveryHistory: DiscoveredPost[]
    discoveryLeaderboard: LeaderboardUser[]
    discoveryProviders: ProviderStatistic[]
    discoverySchedule: DiscoveryProvider[]
    discoveryStats: DiscoveryStatistic[]
    group?: Group
    groups: Group[]
    homepage: Person[]
    /** Find a single image by its slug. */
    image?: Image
    imageConnections?: ImageConnections
    imageReports: ImageReport[]
    images: Image[]
    me?: User
    notifications: UserNotifications
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

export type RestrictionKind = 'NO_IMAGE_REPORT'

export interface Role {
    createdAt: Scalars['DateTime']
    name: Scalars['String']
    __typename: 'Role'
}

export type SortOrder = 'asc' | 'desc'

export interface Tag {
    addedBy?: User
    aliases: TagAlias[]
    category?: TagCategory
    createdAt: Scalars['DateTime']
    name: Scalars['String']
    source: TagSource
    __typename: 'Tag'
}

export interface TagAlias {
    addedBy?: User
    createdAt: Scalars['DateTime']
    name: Scalars['String']
    tag: Tag
    updatedAt: Scalars['DateTime']
    __typename: 'TagAlias'
}

export interface TagCategory {
    addedBy?: User
    createdAt: Scalars['DateTime']
    name: Scalars['String']
    updatedAt: Scalars['DateTime']
    __typename: 'TagCategory'
}

export type TagSource = 'USER'


/** Preview urls of an image */
export interface Thumbnail {
    large: Scalars['String']
    medium: Scalars['String']
    small: Scalars['String']
    __typename: 'Thumbnail'
}

export type UploadType = 'AUTO_DISCOVERY' | 'TOKEN' | 'WEBSITE'

export interface User {
    avatar?: Scalars['String']
    bot: Scalars['Boolean']
    createdAt: Scalars['DateTime']
    id: Scalars['Int']
    images: Image[]
    name?: Scalars['String']
    roles: Role[]
    xp?: Scalars['Int']
    __typename: 'User'
}

export interface UserNotifications {
    unreadReports?: Scalars['Int']
    __typename: 'UserNotifications'
}

export interface AddProviderInput {groups: Scalars['Int'][],name: Scalars['String'],official: Scalars['Boolean'],people: Scalars['Int'][],url: Scalars['String']}

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

export interface AliasOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface AliasOrderByWithRelationInput {createdAt?: (SortOrder | null),id?: (SortOrder | null),name?: (SortOrder | null),person?: (PersonOrderByWithRelationInput | null),personId?: (SortOrder | null),preferredAliasOf?: (PersonOrderByWithRelationInput | null),updatedAt?: (SortOrder | null)}

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
    tags?: [{cursor?: (AppearanceTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AppearanceTagRequest] | AppearanceTagRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AppearanceCountRequest{
    count?: boolean | number
    group?: GroupRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AppearanceCreateManyAddedByInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],personId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateManyAddedByInputEnvelope {data?: (AppearanceCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceCreateManyImageInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),personId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateManyImageInputEnvelope {data?: (AppearanceCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceCreateManyPersonInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateManyPersonInputEnvelope {data?: (AppearanceCreateManyPersonInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceCreateNestedManyWithoutAddedByInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutAddedByInput[] | null),create?: (AppearanceCreateWithoutAddedByInput[] | null),createMany?: (AppearanceCreateManyAddedByInputEnvelope | null)}

export interface AppearanceCreateNestedManyWithoutImageInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutImageInput[] | null),create?: (AppearanceCreateWithoutImageInput[] | null),createMany?: (AppearanceCreateManyImageInputEnvelope | null)}

export interface AppearanceCreateNestedManyWithoutPersonInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutPersonInput[] | null),create?: (AppearanceCreateWithoutPersonInput[] | null),createMany?: (AppearanceCreateManyPersonInputEnvelope | null)}

export interface AppearanceCreateNestedOneWithoutTagsInput {connect?: (AppearanceWhereUniqueInput | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutTagsInput | null),create?: (AppearanceCreateWithoutTagsInput | null)}

export interface AppearanceCreateOrConnectWithoutAddedByInput {create: AppearanceCreateWithoutAddedByInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutFacesInput {create: AppearanceCreateWithoutFacesInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutImageInput {create: AppearanceCreateWithoutImageInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutPersonInput {create: AppearanceCreateWithoutPersonInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateOrConnectWithoutTagsInput {create: AppearanceCreateWithoutTagsInput,where: AppearanceWhereUniqueInput}

export interface AppearanceCreateWithoutAddedByInput {createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),image: ImageCreateNestedOneWithoutAppearancesInput,person: PersonCreateNestedOneWithoutAppearancesInput,tags?: (AppearanceTagCreateNestedManyWithoutAppearanceInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutFacesInput {addedBy?: (UserCreateNestedOneWithoutTaggedAppearancesInput | null),createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutAppearancesInput,person: PersonCreateNestedOneWithoutAppearancesInput,tags?: (AppearanceTagCreateNestedManyWithoutAppearanceInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutImageInput {addedBy?: (UserCreateNestedOneWithoutTaggedAppearancesInput | null),createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),person: PersonCreateNestedOneWithoutAppearancesInput,tags?: (AppearanceTagCreateNestedManyWithoutAppearanceInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutPersonInput {addedBy?: (UserCreateNestedOneWithoutTaggedAppearancesInput | null),createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),image: ImageCreateNestedOneWithoutAppearancesInput,tags?: (AppearanceTagCreateNestedManyWithoutAppearanceInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceCreateWithoutTagsInput {addedBy?: (UserCreateNestedOneWithoutTaggedAppearancesInput | null),createdAt?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutAppearanceInput | null),image: ImageCreateNestedOneWithoutAppearancesInput,person: PersonCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceListRelationFilter {every?: (AppearanceWhereInput | null),none?: (AppearanceWhereInput | null),some?: (AppearanceWhereInput | null)}

export interface AppearanceOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface AppearancePersonIdImageIdCompoundUniqueInput {imageId: Scalars['Int'],personId: Scalars['Int']}

export interface AppearanceScalarWhereInput {AND?: (AppearanceScalarWhereInput[] | null),NOT?: (AppearanceScalarWhereInput[] | null),OR?: (AppearanceScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),personId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AppearanceTagRequest{
    addedBy?: UserRequest
    appearance?: AppearanceRequest
    createdAt?: boolean | number
    tag?: TagRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface AppearanceTagAppearanceTagCompoundUniqueInput {appearanceId: Scalars['Int'],tagId: Scalars['Int']}

export interface AppearanceTagCreateManyAddedByInput {appearanceId: Scalars['Int'],createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId?: (Scalars['Int'] | null),tagId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateManyAddedByInputEnvelope {data?: (AppearanceTagCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceTagCreateManyAppearanceInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId?: (Scalars['Int'] | null),tagId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateManyAppearanceInputEnvelope {data?: (AppearanceTagCreateManyAppearanceInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceTagCreateManyImageInput {addedById?: (Scalars['Int'] | null),appearanceId: Scalars['Int'],createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),tagId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateManyImageInputEnvelope {data?: (AppearanceTagCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceTagCreateManyTagInput {addedById?: (Scalars['Int'] | null),appearanceId: Scalars['Int'],createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId?: (Scalars['Int'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateManyTagInputEnvelope {data?: (AppearanceTagCreateManyTagInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface AppearanceTagCreateNestedManyWithoutAddedByInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutAddedByInput[] | null),create?: (AppearanceTagCreateWithoutAddedByInput[] | null),createMany?: (AppearanceTagCreateManyAddedByInputEnvelope | null)}

export interface AppearanceTagCreateNestedManyWithoutAppearanceInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutAppearanceInput[] | null),create?: (AppearanceTagCreateWithoutAppearanceInput[] | null),createMany?: (AppearanceTagCreateManyAppearanceInputEnvelope | null)}

export interface AppearanceTagCreateNestedManyWithoutImageInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutImageInput[] | null),create?: (AppearanceTagCreateWithoutImageInput[] | null),createMany?: (AppearanceTagCreateManyImageInputEnvelope | null)}

export interface AppearanceTagCreateNestedManyWithoutTagInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutTagInput[] | null),create?: (AppearanceTagCreateWithoutTagInput[] | null),createMany?: (AppearanceTagCreateManyTagInputEnvelope | null)}

export interface AppearanceTagCreateOrConnectWithoutAddedByInput {create: AppearanceTagCreateWithoutAddedByInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagCreateOrConnectWithoutAppearanceInput {create: AppearanceTagCreateWithoutAppearanceInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagCreateOrConnectWithoutImageInput {create: AppearanceTagCreateWithoutImageInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagCreateOrConnectWithoutTagInput {create: AppearanceTagCreateWithoutTagInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagCreateWithoutAddedByInput {Image?: (ImageCreateNestedOneWithoutAppearanceTagsInput | null),appearance: AppearanceCreateNestedOneWithoutTagsInput,createdAt?: (Scalars['DateTime'] | null),tag: TagCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateWithoutAppearanceInput {Image?: (ImageCreateNestedOneWithoutAppearanceTagsInput | null),addedBy?: (UserCreateNestedOneWithoutAppearanceTagsInput | null),createdAt?: (Scalars['DateTime'] | null),tag: TagCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateWithoutImageInput {addedBy?: (UserCreateNestedOneWithoutAppearanceTagsInput | null),appearance: AppearanceCreateNestedOneWithoutTagsInput,createdAt?: (Scalars['DateTime'] | null),tag: TagCreateNestedOneWithoutAppearancesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagCreateWithoutTagInput {Image?: (ImageCreateNestedOneWithoutAppearanceTagsInput | null),addedBy?: (UserCreateNestedOneWithoutAppearanceTagsInput | null),appearance: AppearanceCreateNestedOneWithoutTagsInput,createdAt?: (Scalars['DateTime'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface AppearanceTagListRelationFilter {every?: (AppearanceTagWhereInput | null),none?: (AppearanceTagWhereInput | null),some?: (AppearanceTagWhereInput | null)}

export interface AppearanceTagOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface AppearanceTagScalarWhereInput {AND?: (AppearanceTagScalarWhereInput[] | null),NOT?: (AppearanceTagScalarWhereInput[] | null),OR?: (AppearanceTagScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),appearanceId?: (IntFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntNullableFilter | null),tagId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AppearanceTagUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceTagUpdateManyWithWhereWithoutAddedByInput {data: AppearanceTagUpdateManyMutationInput,where: AppearanceTagScalarWhereInput}

export interface AppearanceTagUpdateManyWithWhereWithoutAppearanceInput {data: AppearanceTagUpdateManyMutationInput,where: AppearanceTagScalarWhereInput}

export interface AppearanceTagUpdateManyWithWhereWithoutImageInput {data: AppearanceTagUpdateManyMutationInput,where: AppearanceTagScalarWhereInput}

export interface AppearanceTagUpdateManyWithWhereWithoutTagInput {data: AppearanceTagUpdateManyMutationInput,where: AppearanceTagScalarWhereInput}

export interface AppearanceTagUpdateManyWithoutAddedByInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutAddedByInput[] | null),create?: (AppearanceTagCreateWithoutAddedByInput[] | null),createMany?: (AppearanceTagCreateManyAddedByInputEnvelope | null),delete?: (AppearanceTagWhereUniqueInput[] | null),deleteMany?: (AppearanceTagScalarWhereInput[] | null),disconnect?: (AppearanceTagWhereUniqueInput[] | null),set?: (AppearanceTagWhereUniqueInput[] | null),update?: (AppearanceTagUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (AppearanceTagUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (AppearanceTagUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface AppearanceTagUpdateManyWithoutAppearanceInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutAppearanceInput[] | null),create?: (AppearanceTagCreateWithoutAppearanceInput[] | null),createMany?: (AppearanceTagCreateManyAppearanceInputEnvelope | null),delete?: (AppearanceTagWhereUniqueInput[] | null),deleteMany?: (AppearanceTagScalarWhereInput[] | null),disconnect?: (AppearanceTagWhereUniqueInput[] | null),set?: (AppearanceTagWhereUniqueInput[] | null),update?: (AppearanceTagUpdateWithWhereUniqueWithoutAppearanceInput[] | null),updateMany?: (AppearanceTagUpdateManyWithWhereWithoutAppearanceInput[] | null),upsert?: (AppearanceTagUpsertWithWhereUniqueWithoutAppearanceInput[] | null)}

export interface AppearanceTagUpdateManyWithoutImageInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutImageInput[] | null),create?: (AppearanceTagCreateWithoutImageInput[] | null),createMany?: (AppearanceTagCreateManyImageInputEnvelope | null),delete?: (AppearanceTagWhereUniqueInput[] | null),deleteMany?: (AppearanceTagScalarWhereInput[] | null),disconnect?: (AppearanceTagWhereUniqueInput[] | null),set?: (AppearanceTagWhereUniqueInput[] | null),update?: (AppearanceTagUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (AppearanceTagUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (AppearanceTagUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface AppearanceTagUpdateManyWithoutTagInput {connect?: (AppearanceTagWhereUniqueInput[] | null),connectOrCreate?: (AppearanceTagCreateOrConnectWithoutTagInput[] | null),create?: (AppearanceTagCreateWithoutTagInput[] | null),createMany?: (AppearanceTagCreateManyTagInputEnvelope | null),delete?: (AppearanceTagWhereUniqueInput[] | null),deleteMany?: (AppearanceTagScalarWhereInput[] | null),disconnect?: (AppearanceTagWhereUniqueInput[] | null),set?: (AppearanceTagWhereUniqueInput[] | null),update?: (AppearanceTagUpdateWithWhereUniqueWithoutTagInput[] | null),updateMany?: (AppearanceTagUpdateManyWithWhereWithoutTagInput[] | null),upsert?: (AppearanceTagUpsertWithWhereUniqueWithoutTagInput[] | null)}

export interface AppearanceTagUpdateWithWhereUniqueWithoutAddedByInput {data: AppearanceTagUpdateWithoutAddedByInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpdateWithWhereUniqueWithoutAppearanceInput {data: AppearanceTagUpdateWithoutAppearanceInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpdateWithWhereUniqueWithoutImageInput {data: AppearanceTagUpdateWithoutImageInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpdateWithWhereUniqueWithoutTagInput {data: AppearanceTagUpdateWithoutTagInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpdateWithoutAddedByInput {Image?: (ImageUpdateOneWithoutAppearanceTagsInput | null),appearance?: (AppearanceUpdateOneRequiredWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),tag?: (TagUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceTagUpdateWithoutAppearanceInput {Image?: (ImageUpdateOneWithoutAppearanceTagsInput | null),addedBy?: (UserUpdateOneWithoutAppearanceTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),tag?: (TagUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceTagUpdateWithoutImageInput {addedBy?: (UserUpdateOneWithoutAppearanceTagsInput | null),appearance?: (AppearanceUpdateOneRequiredWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),tag?: (TagUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceTagUpdateWithoutTagInput {Image?: (ImageUpdateOneWithoutAppearanceTagsInput | null),addedBy?: (UserUpdateOneWithoutAppearanceTagsInput | null),appearance?: (AppearanceUpdateOneRequiredWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceTagUpsertWithWhereUniqueWithoutAddedByInput {create: AppearanceTagCreateWithoutAddedByInput,update: AppearanceTagUpdateWithoutAddedByInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpsertWithWhereUniqueWithoutAppearanceInput {create: AppearanceTagCreateWithoutAppearanceInput,update: AppearanceTagUpdateWithoutAppearanceInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpsertWithWhereUniqueWithoutImageInput {create: AppearanceTagCreateWithoutImageInput,update: AppearanceTagUpdateWithoutImageInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagUpsertWithWhereUniqueWithoutTagInput {create: AppearanceTagCreateWithoutTagInput,update: AppearanceTagUpdateWithoutTagInput,where: AppearanceTagWhereUniqueInput}

export interface AppearanceTagWhereInput {AND?: (AppearanceTagWhereInput[] | null),Image?: (ImageWhereInput | null),NOT?: (AppearanceTagWhereInput[] | null),OR?: (AppearanceTagWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),appearance?: (AppearanceWhereInput | null),appearanceId?: (IntFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntNullableFilter | null),tag?: (TagWhereInput | null),tagId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AppearanceTagWhereUniqueInput {appearanceTag?: (AppearanceTagAppearanceTagCompoundUniqueInput | null),id?: (Scalars['Int'] | null)}

export interface AppearanceUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateManyWithWhereWithoutAddedByInput {data: AppearanceUpdateManyMutationInput,where: AppearanceScalarWhereInput}

export interface AppearanceUpdateManyWithWhereWithoutImageInput {data: AppearanceUpdateManyMutationInput,where: AppearanceScalarWhereInput}

export interface AppearanceUpdateManyWithWhereWithoutPersonInput {data: AppearanceUpdateManyMutationInput,where: AppearanceScalarWhereInput}

export interface AppearanceUpdateManyWithoutAddedByInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutAddedByInput[] | null),create?: (AppearanceCreateWithoutAddedByInput[] | null),createMany?: (AppearanceCreateManyAddedByInputEnvelope | null),delete?: (AppearanceWhereUniqueInput[] | null),deleteMany?: (AppearanceScalarWhereInput[] | null),disconnect?: (AppearanceWhereUniqueInput[] | null),set?: (AppearanceWhereUniqueInput[] | null),update?: (AppearanceUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (AppearanceUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (AppearanceUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface AppearanceUpdateManyWithoutImageInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutImageInput[] | null),create?: (AppearanceCreateWithoutImageInput[] | null),createMany?: (AppearanceCreateManyImageInputEnvelope | null),delete?: (AppearanceWhereUniqueInput[] | null),deleteMany?: (AppearanceScalarWhereInput[] | null),disconnect?: (AppearanceWhereUniqueInput[] | null),set?: (AppearanceWhereUniqueInput[] | null),update?: (AppearanceUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (AppearanceUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (AppearanceUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface AppearanceUpdateManyWithoutPersonInput {connect?: (AppearanceWhereUniqueInput[] | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutPersonInput[] | null),create?: (AppearanceCreateWithoutPersonInput[] | null),createMany?: (AppearanceCreateManyPersonInputEnvelope | null),delete?: (AppearanceWhereUniqueInput[] | null),deleteMany?: (AppearanceScalarWhereInput[] | null),disconnect?: (AppearanceWhereUniqueInput[] | null),set?: (AppearanceWhereUniqueInput[] | null),update?: (AppearanceUpdateWithWhereUniqueWithoutPersonInput[] | null),updateMany?: (AppearanceUpdateManyWithWhereWithoutPersonInput[] | null),upsert?: (AppearanceUpsertWithWhereUniqueWithoutPersonInput[] | null)}

export interface AppearanceUpdateOneRequiredWithoutTagsInput {connect?: (AppearanceWhereUniqueInput | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutTagsInput | null),create?: (AppearanceCreateWithoutTagsInput | null),update?: (AppearanceUpdateWithoutTagsInput | null),upsert?: (AppearanceUpsertWithoutTagsInput | null)}

export interface AppearanceUpdateOneWithoutFacesInput {connect?: (AppearanceWhereUniqueInput | null),connectOrCreate?: (AppearanceCreateOrConnectWithoutFacesInput | null),create?: (AppearanceCreateWithoutFacesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (AppearanceUpdateWithoutFacesInput | null),upsert?: (AppearanceUpsertWithoutFacesInput | null)}

export interface AppearanceUpdateWithWhereUniqueWithoutAddedByInput {data: AppearanceUpdateWithoutAddedByInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpdateWithWhereUniqueWithoutImageInput {data: AppearanceUpdateWithoutImageInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpdateWithWhereUniqueWithoutPersonInput {data: AppearanceUpdateWithoutPersonInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpdateWithoutAddedByInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),tags?: (AppearanceTagUpdateManyWithoutAppearanceInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutFacesInput {addedBy?: (UserUpdateOneWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),tags?: (AppearanceTagUpdateManyWithoutAppearanceInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutImageInput {addedBy?: (UserUpdateOneWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),tags?: (AppearanceTagUpdateManyWithoutAppearanceInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutPersonInput {addedBy?: (UserUpdateOneWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),tags?: (AppearanceTagUpdateManyWithoutAppearanceInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpdateWithoutTagsInput {addedBy?: (UserUpdateOneWithoutTaggedAppearancesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutAppearanceInput | null),image?: (ImageUpdateOneRequiredWithoutAppearancesInput | null),person?: (PersonUpdateOneRequiredWithoutAppearancesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface AppearanceUpsertWithWhereUniqueWithoutAddedByInput {create: AppearanceCreateWithoutAddedByInput,update: AppearanceUpdateWithoutAddedByInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpsertWithWhereUniqueWithoutImageInput {create: AppearanceCreateWithoutImageInput,update: AppearanceUpdateWithoutImageInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpsertWithWhereUniqueWithoutPersonInput {create: AppearanceCreateWithoutPersonInput,update: AppearanceUpdateWithoutPersonInput,where: AppearanceWhereUniqueInput}

export interface AppearanceUpsertWithoutFacesInput {create: AppearanceCreateWithoutFacesInput,update: AppearanceUpdateWithoutFacesInput}

export interface AppearanceUpsertWithoutTagsInput {create: AppearanceCreateWithoutTagsInput,update: AppearanceUpdateWithoutTagsInput}

export interface AppearanceWhereInput {AND?: (AppearanceWhereInput[] | null),NOT?: (AppearanceWhereInput[] | null),OR?: (AppearanceWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),faces?: (FaceListRelationFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),person?: (PersonWhereInput | null),personId?: (IntFilter | null),tags?: (AppearanceTagListRelationFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface AppearanceWhereUniqueInput {id?: (Scalars['Int'] | null),personId_imageId?: (AppearancePersonIdImageIdCompoundUniqueInput | null)}

export interface BoolFieldUpdateOperationsInput {set?: (Scalars['Boolean'] | null)}

export interface BoolFilter {equals?: (Scalars['Boolean'] | null),not?: (NestedBoolFilter | null)}

export interface DateTimeFieldUpdateOperationsInput {set?: (Scalars['DateTime'] | null)}

export interface DateTimeFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface DateTimeNullableFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeNullableFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface DiscoveredImageRequest{
    approvedImage?: ImageRequest
    createdAt?: boolean | number
    duplicateImage?: ImageRequest
    id?: boolean | number
    providerType?: boolean | number
    referenceUrl?: boolean | number
    /** A smaller thumbnail of the image */
    thumbnail?: boolean | number
    uniqueIdentifier?: boolean | number
    updatedAt?: boolean | number
    url?: boolean | number
    verdict?: DiscoveredImageVerdictRequest
    /** The vote cast by the currently logged in user */
    vote?: DiscoveredImageVoteRequest
    /** Votes cast by all users */
    votes?: [{cursor?: (DiscoveredImageVoteWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredImageVoteWhereInput | null)},DiscoveredImageVoteRequest] | DiscoveredImageVoteRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscoveredImageCreateManyDuplicateDiscoveredImageInput {createdAt?: (Scalars['DateTime'] | null),duplicateImageId?: (Scalars['Int'] | null),id?: (Scalars['Int'] | null),imageId?: (Scalars['Int'] | null),mediaType: Scalars['String'],postId?: (Scalars['Int'] | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String']}

export interface DiscoveredImageCreateManyDuplicateDiscoveredImageInputEnvelope {data?: (DiscoveredImageCreateManyDuplicateDiscoveredImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface DiscoveredImageCreateManyDuplicateImageInput {createdAt?: (Scalars['DateTime'] | null),duplicateDiscoveredImageId?: (Scalars['Int'] | null),id?: (Scalars['Int'] | null),imageId?: (Scalars['Int'] | null),mediaType: Scalars['String'],postId?: (Scalars['Int'] | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String']}

export interface DiscoveredImageCreateManyDuplicateImageInputEnvelope {data?: (DiscoveredImageCreateManyDuplicateImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface DiscoveredImageCreateNestedManyWithoutDuplicateDiscoveredImageInput {connect?: (DiscoveredImageWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutDuplicateDiscoveredImageInput[] | null),create?: (DiscoveredImageCreateWithoutDuplicateDiscoveredImageInput[] | null),createMany?: (DiscoveredImageCreateManyDuplicateDiscoveredImageInputEnvelope | null)}

export interface DiscoveredImageCreateNestedManyWithoutDuplicateImageInput {connect?: (DiscoveredImageWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutDuplicateImageInput[] | null),create?: (DiscoveredImageCreateWithoutDuplicateImageInput[] | null),createMany?: (DiscoveredImageCreateManyDuplicateImageInputEnvelope | null)}

export interface DiscoveredImageCreateNestedOneWithoutDuplicateDiscoveredImagesInput {connect?: (DiscoveredImageWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutDuplicateDiscoveredImagesInput | null),create?: (DiscoveredImageCreateWithoutDuplicateDiscoveredImagesInput | null)}

export interface DiscoveredImageCreateNestedOneWithoutImageInput {connect?: (DiscoveredImageWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutImageInput | null),create?: (DiscoveredImageCreateWithoutImageInput | null)}

export interface DiscoveredImageCreateNestedOneWithoutVotesInput {connect?: (DiscoveredImageWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutVotesInput | null),create?: (DiscoveredImageCreateWithoutVotesInput | null)}

export interface DiscoveredImageCreateOrConnectWithoutDuplicateDiscoveredImageInput {create: DiscoveredImageCreateWithoutDuplicateDiscoveredImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageCreateOrConnectWithoutDuplicateDiscoveredImagesInput {create: DiscoveredImageCreateWithoutDuplicateDiscoveredImagesInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageCreateOrConnectWithoutDuplicateImageInput {create: DiscoveredImageCreateWithoutDuplicateImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageCreateOrConnectWithoutImageInput {create: DiscoveredImageCreateWithoutImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageCreateOrConnectWithoutVotesInput {create: DiscoveredImageCreateWithoutVotesInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageCreateWithoutDuplicateDiscoveredImageInput {createdAt?: (Scalars['DateTime'] | null),duplicateDiscoveredImages?: (DiscoveredImageCreateNestedManyWithoutDuplicateDiscoveredImageInput | null),duplicateImage?: (ImageCreateNestedOneWithoutPotentialDuplicatesInput | null),image?: (ImageCreateNestedOneWithoutDiscoverySourceInput | null),mediaType: Scalars['String'],post?: (DiscoveredPostCreateNestedOneWithoutDiscoveredImagesInput | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String'],verdict?: (DiscoveredImageVerdictCreateNestedOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteCreateNestedManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageCreateWithoutDuplicateDiscoveredImagesInput {createdAt?: (Scalars['DateTime'] | null),duplicateDiscoveredImage?: (DiscoveredImageCreateNestedOneWithoutDuplicateDiscoveredImagesInput | null),duplicateImage?: (ImageCreateNestedOneWithoutPotentialDuplicatesInput | null),image?: (ImageCreateNestedOneWithoutDiscoverySourceInput | null),mediaType: Scalars['String'],post?: (DiscoveredPostCreateNestedOneWithoutDiscoveredImagesInput | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String'],verdict?: (DiscoveredImageVerdictCreateNestedOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteCreateNestedManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageCreateWithoutDuplicateImageInput {createdAt?: (Scalars['DateTime'] | null),duplicateDiscoveredImage?: (DiscoveredImageCreateNestedOneWithoutDuplicateDiscoveredImagesInput | null),duplicateDiscoveredImages?: (DiscoveredImageCreateNestedManyWithoutDuplicateDiscoveredImageInput | null),image?: (ImageCreateNestedOneWithoutDiscoverySourceInput | null),mediaType: Scalars['String'],post?: (DiscoveredPostCreateNestedOneWithoutDiscoveredImagesInput | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String'],verdict?: (DiscoveredImageVerdictCreateNestedOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteCreateNestedManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageCreateWithoutImageInput {createdAt?: (Scalars['DateTime'] | null),duplicateDiscoveredImage?: (DiscoveredImageCreateNestedOneWithoutDuplicateDiscoveredImagesInput | null),duplicateDiscoveredImages?: (DiscoveredImageCreateNestedManyWithoutDuplicateDiscoveredImageInput | null),duplicateImage?: (ImageCreateNestedOneWithoutPotentialDuplicatesInput | null),mediaType: Scalars['String'],post?: (DiscoveredPostCreateNestedOneWithoutDiscoveredImagesInput | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String'],verdict?: (DiscoveredImageVerdictCreateNestedOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteCreateNestedManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageCreateWithoutVotesInput {createdAt?: (Scalars['DateTime'] | null),duplicateDiscoveredImage?: (DiscoveredImageCreateNestedOneWithoutDuplicateDiscoveredImagesInput | null),duplicateDiscoveredImages?: (DiscoveredImageCreateNestedManyWithoutDuplicateDiscoveredImageInput | null),duplicateImage?: (ImageCreateNestedOneWithoutPotentialDuplicatesInput | null),image?: (ImageCreateNestedOneWithoutDiscoverySourceInput | null),mediaType: Scalars['String'],post?: (DiscoveredPostCreateNestedOneWithoutDiscoveredImagesInput | null),providerType: Scalars['String'],referenceUrl?: (Scalars['String'] | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null),url: Scalars['String'],verdict?: (DiscoveredImageVerdictCreateNestedOneWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageListRelationFilter {every?: (DiscoveredImageWhereInput | null),none?: (DiscoveredImageWhereInput | null),some?: (DiscoveredImageWhereInput | null)}

export interface DiscoveredImageOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface DiscoveredImageOrderByWithRelationInput {createdAt?: (SortOrder | null),duplicateDiscoveredImage?: (DiscoveredImageOrderByWithRelationInput | null),duplicateDiscoveredImageId?: (SortOrder | null),duplicateDiscoveredImages?: (DiscoveredImageOrderByRelationAggregateInput | null),duplicateImage?: (ImageOrderByWithRelationInput | null),duplicateImageId?: (SortOrder | null),id?: (SortOrder | null),image?: (ImageOrderByWithRelationInput | null),imageId?: (SortOrder | null),mediaType?: (SortOrder | null),post?: (DiscoveredPostOrderByWithRelationInput | null),postId?: (SortOrder | null),providerType?: (SortOrder | null),referenceUrl?: (SortOrder | null),uniqueIdentifier?: (SortOrder | null),updatedAt?: (SortOrder | null),url?: (SortOrder | null),verdict?: (DiscoveredImageVerdictOrderByWithRelationInput | null),votes?: (DiscoveredImageVoteOrderByRelationAggregateInput | null)}

export interface DiscoveredImageProviderTypeUniqueIdentifierCompoundUniqueInput {providerType: Scalars['String'],uniqueIdentifier: Scalars['String']}

export interface DiscoveredImageScalarWhereInput {AND?: (DiscoveredImageScalarWhereInput[] | null),NOT?: (DiscoveredImageScalarWhereInput[] | null),OR?: (DiscoveredImageScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),duplicateDiscoveredImageId?: (IntNullableFilter | null),duplicateImageId?: (IntNullableFilter | null),id?: (IntFilter | null),imageId?: (IntNullableFilter | null),mediaType?: (StringFilter | null),postId?: (IntNullableFilter | null),providerType?: (StringFilter | null),referenceUrl?: (StringNullableFilter | null),uniqueIdentifier?: (StringFilter | null),updatedAt?: (DateTimeFilter | null),url?: (StringFilter | null)}

export interface DiscoveredImageUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),mediaType?: (StringFieldUpdateOperationsInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referenceUrl?: (NullableStringFieldUpdateOperationsInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),url?: (StringFieldUpdateOperationsInput | null)}

export interface DiscoveredImageUpdateManyWithWhereWithoutDuplicateDiscoveredImageInput {data: DiscoveredImageUpdateManyMutationInput,where: DiscoveredImageScalarWhereInput}

export interface DiscoveredImageUpdateManyWithWhereWithoutDuplicateImageInput {data: DiscoveredImageUpdateManyMutationInput,where: DiscoveredImageScalarWhereInput}

export interface DiscoveredImageUpdateManyWithoutDuplicateDiscoveredImageInput {connect?: (DiscoveredImageWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutDuplicateDiscoveredImageInput[] | null),create?: (DiscoveredImageCreateWithoutDuplicateDiscoveredImageInput[] | null),createMany?: (DiscoveredImageCreateManyDuplicateDiscoveredImageInputEnvelope | null),delete?: (DiscoveredImageWhereUniqueInput[] | null),deleteMany?: (DiscoveredImageScalarWhereInput[] | null),disconnect?: (DiscoveredImageWhereUniqueInput[] | null),set?: (DiscoveredImageWhereUniqueInput[] | null),update?: (DiscoveredImageUpdateWithWhereUniqueWithoutDuplicateDiscoveredImageInput[] | null),updateMany?: (DiscoveredImageUpdateManyWithWhereWithoutDuplicateDiscoveredImageInput[] | null),upsert?: (DiscoveredImageUpsertWithWhereUniqueWithoutDuplicateDiscoveredImageInput[] | null)}

export interface DiscoveredImageUpdateManyWithoutDuplicateImageInput {connect?: (DiscoveredImageWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutDuplicateImageInput[] | null),create?: (DiscoveredImageCreateWithoutDuplicateImageInput[] | null),createMany?: (DiscoveredImageCreateManyDuplicateImageInputEnvelope | null),delete?: (DiscoveredImageWhereUniqueInput[] | null),deleteMany?: (DiscoveredImageScalarWhereInput[] | null),disconnect?: (DiscoveredImageWhereUniqueInput[] | null),set?: (DiscoveredImageWhereUniqueInput[] | null),update?: (DiscoveredImageUpdateWithWhereUniqueWithoutDuplicateImageInput[] | null),updateMany?: (DiscoveredImageUpdateManyWithWhereWithoutDuplicateImageInput[] | null),upsert?: (DiscoveredImageUpsertWithWhereUniqueWithoutDuplicateImageInput[] | null)}

export interface DiscoveredImageUpdateOneRequiredWithoutVotesInput {connect?: (DiscoveredImageWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutVotesInput | null),create?: (DiscoveredImageCreateWithoutVotesInput | null),update?: (DiscoveredImageUpdateWithoutVotesInput | null),upsert?: (DiscoveredImageUpsertWithoutVotesInput | null)}

export interface DiscoveredImageUpdateOneWithoutDuplicateDiscoveredImagesInput {connect?: (DiscoveredImageWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutDuplicateDiscoveredImagesInput | null),create?: (DiscoveredImageCreateWithoutDuplicateDiscoveredImagesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (DiscoveredImageUpdateWithoutDuplicateDiscoveredImagesInput | null),upsert?: (DiscoveredImageUpsertWithoutDuplicateDiscoveredImagesInput | null)}

export interface DiscoveredImageUpdateOneWithoutImageInput {connect?: (DiscoveredImageWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageCreateOrConnectWithoutImageInput | null),create?: (DiscoveredImageCreateWithoutImageInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (DiscoveredImageUpdateWithoutImageInput | null),upsert?: (DiscoveredImageUpsertWithoutImageInput | null)}

export interface DiscoveredImageUpdateWithWhereUniqueWithoutDuplicateDiscoveredImageInput {data: DiscoveredImageUpdateWithoutDuplicateDiscoveredImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageUpdateWithWhereUniqueWithoutDuplicateImageInput {data: DiscoveredImageUpdateWithoutDuplicateImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageUpdateWithoutDuplicateDiscoveredImageInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),duplicateDiscoveredImages?: (DiscoveredImageUpdateManyWithoutDuplicateDiscoveredImageInput | null),duplicateImage?: (ImageUpdateOneWithoutPotentialDuplicatesInput | null),image?: (ImageUpdateOneWithoutDiscoverySourceInput | null),mediaType?: (StringFieldUpdateOperationsInput | null),post?: (DiscoveredPostUpdateOneWithoutDiscoveredImagesInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referenceUrl?: (NullableStringFieldUpdateOperationsInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),url?: (StringFieldUpdateOperationsInput | null),verdict?: (DiscoveredImageVerdictUpdateOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteUpdateManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageUpdateWithoutDuplicateDiscoveredImagesInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),duplicateDiscoveredImage?: (DiscoveredImageUpdateOneWithoutDuplicateDiscoveredImagesInput | null),duplicateImage?: (ImageUpdateOneWithoutPotentialDuplicatesInput | null),image?: (ImageUpdateOneWithoutDiscoverySourceInput | null),mediaType?: (StringFieldUpdateOperationsInput | null),post?: (DiscoveredPostUpdateOneWithoutDiscoveredImagesInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referenceUrl?: (NullableStringFieldUpdateOperationsInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),url?: (StringFieldUpdateOperationsInput | null),verdict?: (DiscoveredImageVerdictUpdateOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteUpdateManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageUpdateWithoutDuplicateImageInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),duplicateDiscoveredImage?: (DiscoveredImageUpdateOneWithoutDuplicateDiscoveredImagesInput | null),duplicateDiscoveredImages?: (DiscoveredImageUpdateManyWithoutDuplicateDiscoveredImageInput | null),image?: (ImageUpdateOneWithoutDiscoverySourceInput | null),mediaType?: (StringFieldUpdateOperationsInput | null),post?: (DiscoveredPostUpdateOneWithoutDiscoveredImagesInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referenceUrl?: (NullableStringFieldUpdateOperationsInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),url?: (StringFieldUpdateOperationsInput | null),verdict?: (DiscoveredImageVerdictUpdateOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteUpdateManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageUpdateWithoutImageInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),duplicateDiscoveredImage?: (DiscoveredImageUpdateOneWithoutDuplicateDiscoveredImagesInput | null),duplicateDiscoveredImages?: (DiscoveredImageUpdateManyWithoutDuplicateDiscoveredImageInput | null),duplicateImage?: (ImageUpdateOneWithoutPotentialDuplicatesInput | null),mediaType?: (StringFieldUpdateOperationsInput | null),post?: (DiscoveredPostUpdateOneWithoutDiscoveredImagesInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referenceUrl?: (NullableStringFieldUpdateOperationsInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),url?: (StringFieldUpdateOperationsInput | null),verdict?: (DiscoveredImageVerdictUpdateOneWithoutDiscoveredImageInput | null),votes?: (DiscoveredImageVoteUpdateManyWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageUpdateWithoutVotesInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),duplicateDiscoveredImage?: (DiscoveredImageUpdateOneWithoutDuplicateDiscoveredImagesInput | null),duplicateDiscoveredImages?: (DiscoveredImageUpdateManyWithoutDuplicateDiscoveredImageInput | null),duplicateImage?: (ImageUpdateOneWithoutPotentialDuplicatesInput | null),image?: (ImageUpdateOneWithoutDiscoverySourceInput | null),mediaType?: (StringFieldUpdateOperationsInput | null),post?: (DiscoveredPostUpdateOneWithoutDiscoveredImagesInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referenceUrl?: (NullableStringFieldUpdateOperationsInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),url?: (StringFieldUpdateOperationsInput | null),verdict?: (DiscoveredImageVerdictUpdateOneWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageUpsertWithWhereUniqueWithoutDuplicateDiscoveredImageInput {create: DiscoveredImageCreateWithoutDuplicateDiscoveredImageInput,update: DiscoveredImageUpdateWithoutDuplicateDiscoveredImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageUpsertWithWhereUniqueWithoutDuplicateImageInput {create: DiscoveredImageCreateWithoutDuplicateImageInput,update: DiscoveredImageUpdateWithoutDuplicateImageInput,where: DiscoveredImageWhereUniqueInput}

export interface DiscoveredImageUpsertWithoutDuplicateDiscoveredImagesInput {create: DiscoveredImageCreateWithoutDuplicateDiscoveredImagesInput,update: DiscoveredImageUpdateWithoutDuplicateDiscoveredImagesInput}

export interface DiscoveredImageUpsertWithoutImageInput {create: DiscoveredImageCreateWithoutImageInput,update: DiscoveredImageUpdateWithoutImageInput}

export interface DiscoveredImageUpsertWithoutVotesInput {create: DiscoveredImageCreateWithoutVotesInput,update: DiscoveredImageUpdateWithoutVotesInput}

export interface DiscoveredImageVerdictRequest{
    createdAt?: boolean | number
    id?: boolean | number
    reason?: boolean | number
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscoveredImageVerdictCreateNestedOneWithoutDiscoveredImageInput {connect?: (DiscoveredImageVerdictWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageVerdictCreateOrConnectWithoutDiscoveredImageInput | null),create?: (DiscoveredImageVerdictCreateWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageVerdictCreateOrConnectWithoutDiscoveredImageInput {create: DiscoveredImageVerdictCreateWithoutDiscoveredImageInput,where: DiscoveredImageVerdictWhereUniqueInput}

export interface DiscoveredImageVerdictCreateWithoutDiscoveredImageInput {createdAt?: (Scalars['DateTime'] | null),reason?: (Scalars['String'] | null),verdict: Scalars['String']}

export interface DiscoveredImageVerdictOrderByWithRelationInput {createdAt?: (SortOrder | null),discoveredImage?: (DiscoveredImageOrderByWithRelationInput | null),discoveredImageId?: (SortOrder | null),id?: (SortOrder | null),reason?: (SortOrder | null),verdict?: (SortOrder | null)}

export interface DiscoveredImageVerdictUpdateOneWithoutDiscoveredImageInput {connect?: (DiscoveredImageVerdictWhereUniqueInput | null),connectOrCreate?: (DiscoveredImageVerdictCreateOrConnectWithoutDiscoveredImageInput | null),create?: (DiscoveredImageVerdictCreateWithoutDiscoveredImageInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (DiscoveredImageVerdictUpdateWithoutDiscoveredImageInput | null),upsert?: (DiscoveredImageVerdictUpsertWithoutDiscoveredImageInput | null)}

export interface DiscoveredImageVerdictUpdateWithoutDiscoveredImageInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),verdict?: (StringFieldUpdateOperationsInput | null)}

export interface DiscoveredImageVerdictUpsertWithoutDiscoveredImageInput {create: DiscoveredImageVerdictCreateWithoutDiscoveredImageInput,update: DiscoveredImageVerdictUpdateWithoutDiscoveredImageInput}

export interface DiscoveredImageVerdictWhereInput {AND?: (DiscoveredImageVerdictWhereInput[] | null),NOT?: (DiscoveredImageVerdictWhereInput[] | null),OR?: (DiscoveredImageVerdictWhereInput[] | null),createdAt?: (DateTimeFilter | null),discoveredImage?: (DiscoveredImageWhereInput | null),discoveredImageId?: (IntFilter | null),id?: (IntFilter | null),reason?: (StringNullableFilter | null),verdict?: (StringFilter | null)}

export interface DiscoveredImageVerdictWhereUniqueInput {discoveredImageId?: (Scalars['Int'] | null),id?: (Scalars['Int'] | null)}

export interface DiscoveredImageVoteRequest{
    createdAt?: boolean | number
    id?: boolean | number
    reason?: boolean | number
    updatedAt?: boolean | number
    user?: UserRequest
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscoveredImageVoteCreateManyDiscoveredImageInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),reason?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),userId: Scalars['Int'],verdict: Scalars['String'],xp?: (Scalars['Int'] | null)}

export interface DiscoveredImageVoteCreateManyDiscoveredImageInputEnvelope {data?: (DiscoveredImageVoteCreateManyDiscoveredImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface DiscoveredImageVoteCreateManyUserInput {createdAt?: (Scalars['DateTime'] | null),discoveredImageId: Scalars['Int'],id?: (Scalars['Int'] | null),reason?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),verdict: Scalars['String'],xp?: (Scalars['Int'] | null)}

export interface DiscoveredImageVoteCreateManyUserInputEnvelope {data?: (DiscoveredImageVoteCreateManyUserInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface DiscoveredImageVoteCreateNestedManyWithoutDiscoveredImageInput {connect?: (DiscoveredImageVoteWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageVoteCreateOrConnectWithoutDiscoveredImageInput[] | null),create?: (DiscoveredImageVoteCreateWithoutDiscoveredImageInput[] | null),createMany?: (DiscoveredImageVoteCreateManyDiscoveredImageInputEnvelope | null)}

export interface DiscoveredImageVoteCreateNestedManyWithoutUserInput {connect?: (DiscoveredImageVoteWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageVoteCreateOrConnectWithoutUserInput[] | null),create?: (DiscoveredImageVoteCreateWithoutUserInput[] | null),createMany?: (DiscoveredImageVoteCreateManyUserInputEnvelope | null)}

export interface DiscoveredImageVoteCreateOrConnectWithoutDiscoveredImageInput {create: DiscoveredImageVoteCreateWithoutDiscoveredImageInput,where: DiscoveredImageVoteWhereUniqueInput}

export interface DiscoveredImageVoteCreateOrConnectWithoutUserInput {create: DiscoveredImageVoteCreateWithoutUserInput,where: DiscoveredImageVoteWhereUniqueInput}

export interface DiscoveredImageVoteCreateWithoutDiscoveredImageInput {createdAt?: (Scalars['DateTime'] | null),reason?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),user: UserCreateNestedOneWithoutDiscoveredImageVoteInput,verdict: Scalars['String'],xp?: (Scalars['Int'] | null)}

export interface DiscoveredImageVoteCreateWithoutUserInput {createdAt?: (Scalars['DateTime'] | null),discoveredImage: DiscoveredImageCreateNestedOneWithoutVotesInput,reason?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),verdict: Scalars['String'],xp?: (Scalars['Int'] | null)}

export interface DiscoveredImageVoteListRelationFilter {every?: (DiscoveredImageVoteWhereInput | null),none?: (DiscoveredImageVoteWhereInput | null),some?: (DiscoveredImageVoteWhereInput | null)}

export interface DiscoveredImageVoteOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface DiscoveredImageVoteScalarWhereInput {AND?: (DiscoveredImageVoteScalarWhereInput[] | null),NOT?: (DiscoveredImageVoteScalarWhereInput[] | null),OR?: (DiscoveredImageVoteScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),discoveredImageId?: (IntFilter | null),id?: (IntFilter | null),reason?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null),userId?: (IntFilter | null),verdict?: (StringFilter | null),xp?: (IntFilter | null)}

export interface DiscoveredImageVoteUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),verdict?: (StringFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface DiscoveredImageVoteUpdateManyWithWhereWithoutDiscoveredImageInput {data: DiscoveredImageVoteUpdateManyMutationInput,where: DiscoveredImageVoteScalarWhereInput}

export interface DiscoveredImageVoteUpdateManyWithWhereWithoutUserInput {data: DiscoveredImageVoteUpdateManyMutationInput,where: DiscoveredImageVoteScalarWhereInput}

export interface DiscoveredImageVoteUpdateManyWithoutDiscoveredImageInput {connect?: (DiscoveredImageVoteWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageVoteCreateOrConnectWithoutDiscoveredImageInput[] | null),create?: (DiscoveredImageVoteCreateWithoutDiscoveredImageInput[] | null),createMany?: (DiscoveredImageVoteCreateManyDiscoveredImageInputEnvelope | null),delete?: (DiscoveredImageVoteWhereUniqueInput[] | null),deleteMany?: (DiscoveredImageVoteScalarWhereInput[] | null),disconnect?: (DiscoveredImageVoteWhereUniqueInput[] | null),set?: (DiscoveredImageVoteWhereUniqueInput[] | null),update?: (DiscoveredImageVoteUpdateWithWhereUniqueWithoutDiscoveredImageInput[] | null),updateMany?: (DiscoveredImageVoteUpdateManyWithWhereWithoutDiscoveredImageInput[] | null),upsert?: (DiscoveredImageVoteUpsertWithWhereUniqueWithoutDiscoveredImageInput[] | null)}

export interface DiscoveredImageVoteUpdateManyWithoutUserInput {connect?: (DiscoveredImageVoteWhereUniqueInput[] | null),connectOrCreate?: (DiscoveredImageVoteCreateOrConnectWithoutUserInput[] | null),create?: (DiscoveredImageVoteCreateWithoutUserInput[] | null),createMany?: (DiscoveredImageVoteCreateManyUserInputEnvelope | null),delete?: (DiscoveredImageVoteWhereUniqueInput[] | null),deleteMany?: (DiscoveredImageVoteScalarWhereInput[] | null),disconnect?: (DiscoveredImageVoteWhereUniqueInput[] | null),set?: (DiscoveredImageVoteWhereUniqueInput[] | null),update?: (DiscoveredImageVoteUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (DiscoveredImageVoteUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (DiscoveredImageVoteUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface DiscoveredImageVoteUpdateWithWhereUniqueWithoutDiscoveredImageInput {data: DiscoveredImageVoteUpdateWithoutDiscoveredImageInput,where: DiscoveredImageVoteWhereUniqueInput}

export interface DiscoveredImageVoteUpdateWithWhereUniqueWithoutUserInput {data: DiscoveredImageVoteUpdateWithoutUserInput,where: DiscoveredImageVoteWhereUniqueInput}

export interface DiscoveredImageVoteUpdateWithoutDiscoveredImageInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),user?: (UserUpdateOneRequiredWithoutDiscoveredImageVoteInput | null),verdict?: (StringFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface DiscoveredImageVoteUpdateWithoutUserInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoveredImage?: (DiscoveredImageUpdateOneRequiredWithoutVotesInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),verdict?: (StringFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface DiscoveredImageVoteUpsertWithWhereUniqueWithoutDiscoveredImageInput {create: DiscoveredImageVoteCreateWithoutDiscoveredImageInput,update: DiscoveredImageVoteUpdateWithoutDiscoveredImageInput,where: DiscoveredImageVoteWhereUniqueInput}

export interface DiscoveredImageVoteUpsertWithWhereUniqueWithoutUserInput {create: DiscoveredImageVoteCreateWithoutUserInput,update: DiscoveredImageVoteUpdateWithoutUserInput,where: DiscoveredImageVoteWhereUniqueInput}

export interface DiscoveredImageVoteUserVoteCompoundUniqueInput {discoveredImageId: Scalars['Int'],userId: Scalars['Int']}

export interface DiscoveredImageVoteWhereInput {AND?: (DiscoveredImageVoteWhereInput[] | null),NOT?: (DiscoveredImageVoteWhereInput[] | null),OR?: (DiscoveredImageVoteWhereInput[] | null),createdAt?: (DateTimeFilter | null),discoveredImage?: (DiscoveredImageWhereInput | null),discoveredImageId?: (IntFilter | null),id?: (IntFilter | null),reason?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null),user?: (UserWhereInput | null),userId?: (IntFilter | null),verdict?: (StringFilter | null),xp?: (IntFilter | null)}

export interface DiscoveredImageVoteWhereUniqueInput {id?: (Scalars['Int'] | null),userVote?: (DiscoveredImageVoteUserVoteCompoundUniqueInput | null)}

export interface DiscoveredImageWhereInput {AND?: (DiscoveredImageWhereInput[] | null),NOT?: (DiscoveredImageWhereInput[] | null),OR?: (DiscoveredImageWhereInput[] | null),createdAt?: (DateTimeFilter | null),duplicateDiscoveredImage?: (DiscoveredImageWhereInput | null),duplicateDiscoveredImageId?: (IntNullableFilter | null),duplicateDiscoveredImages?: (DiscoveredImageListRelationFilter | null),duplicateImage?: (ImageWhereInput | null),duplicateImageId?: (IntNullableFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntNullableFilter | null),mediaType?: (StringFilter | null),post?: (DiscoveredPostWhereInput | null),postId?: (IntNullableFilter | null),providerType?: (StringFilter | null),referenceUrl?: (StringNullableFilter | null),uniqueIdentifier?: (StringFilter | null),updatedAt?: (DateTimeFilter | null),url?: (StringFilter | null),verdict?: (DiscoveredImageVerdictWhereInput | null),votes?: (DiscoveredImageVoteListRelationFilter | null)}

export interface DiscoveredImageWhereUniqueInput {id?: (Scalars['Int'] | null),imageId?: (Scalars['Int'] | null),providerType_uniqueIdentifier?: (DiscoveredImageProviderTypeUniqueIdentifierCompoundUniqueInput | null)}

export interface DiscoveredPostRequest{
    accountAvatarUrl?: boolean | number
    accountName?: boolean | number
    body?: boolean | number
    createdAt?: boolean | number
    id?: boolean | number
    images?: [{cursor?: (DiscoveredImageWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},DiscoveredImageRequest] | DiscoveredImageRequest
    originalPostDate?: boolean | number
    postUrl?: boolean | number
    providerType?: boolean | number
    /** Groups who are associated with the social media account that created this post. */
    referencingGroups?: GroupRequest
    /** People who are associated with the social media account that created this post. */
    referencingPeople?: PersonRequest
    uniqueIdentifier?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscoveredPostCreateNestedOneWithoutDiscoveredImagesInput {connect?: (DiscoveredPostWhereUniqueInput | null),connectOrCreate?: (DiscoveredPostCreateOrConnectWithoutDiscoveredImagesInput | null),create?: (DiscoveredPostCreateWithoutDiscoveredImagesInput | null)}

export interface DiscoveredPostCreateOrConnectWithoutDiscoveredImagesInput {create: DiscoveredPostCreateWithoutDiscoveredImagesInput,where: DiscoveredPostWhereUniqueInput}

export interface DiscoveredPostCreateWithoutDiscoveredImagesInput {accountAvatarUrl?: (Scalars['String'] | null),accountName: Scalars['String'],body?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),official?: (Scalars['Boolean'] | null),originalPostDate?: (Scalars['DateTime'] | null),postUrl?: (Scalars['String'] | null),providerType: Scalars['String'],referencingGroups?: (DiscoveredPostCreatereferencingGroupsInput | null),referencingPeople?: (DiscoveredPostCreatereferencingPeopleInput | null),uniqueIdentifier: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface DiscoveredPostCreatereferencingGroupsInput {set?: (Scalars['Int'][] | null)}

export interface DiscoveredPostCreatereferencingPeopleInput {set?: (Scalars['Int'][] | null)}

export interface DiscoveredPostDiscoveredProviderCompoundUniqueInput {providerType: Scalars['String'],uniqueIdentifier: Scalars['String']}

export interface DiscoveredPostOrderByWithRelationInput {accountAvatarUrl?: (SortOrder | null),accountName?: (SortOrder | null),body?: (SortOrder | null),createdAt?: (SortOrder | null),discoveredImages?: (DiscoveredImageOrderByRelationAggregateInput | null),id?: (SortOrder | null),official?: (SortOrder | null),originalPostDate?: (SortOrder | null),postUrl?: (SortOrder | null),providerType?: (SortOrder | null),referencingGroups?: (SortOrder | null),referencingPeople?: (SortOrder | null),uniqueIdentifier?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface DiscoveredPostUpdateOneWithoutDiscoveredImagesInput {connect?: (DiscoveredPostWhereUniqueInput | null),connectOrCreate?: (DiscoveredPostCreateOrConnectWithoutDiscoveredImagesInput | null),create?: (DiscoveredPostCreateWithoutDiscoveredImagesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (DiscoveredPostUpdateWithoutDiscoveredImagesInput | null),upsert?: (DiscoveredPostUpsertWithoutDiscoveredImagesInput | null)}

export interface DiscoveredPostUpdateWithoutDiscoveredImagesInput {accountAvatarUrl?: (NullableStringFieldUpdateOperationsInput | null),accountName?: (StringFieldUpdateOperationsInput | null),body?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),official?: (BoolFieldUpdateOperationsInput | null),originalPostDate?: (NullableDateTimeFieldUpdateOperationsInput | null),postUrl?: (NullableStringFieldUpdateOperationsInput | null),providerType?: (StringFieldUpdateOperationsInput | null),referencingGroups?: (DiscoveredPostUpdatereferencingGroupsInput | null),referencingPeople?: (DiscoveredPostUpdatereferencingPeopleInput | null),uniqueIdentifier?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface DiscoveredPostUpdatereferencingGroupsInput {push?: (Scalars['Int'] | null),set?: (Scalars['Int'][] | null)}

export interface DiscoveredPostUpdatereferencingPeopleInput {push?: (Scalars['Int'] | null),set?: (Scalars['Int'][] | null)}

export interface DiscoveredPostUpsertWithoutDiscoveredImagesInput {create: DiscoveredPostCreateWithoutDiscoveredImagesInput,update: DiscoveredPostUpdateWithoutDiscoveredImagesInput}

export interface DiscoveredPostWhereInput {AND?: (DiscoveredPostWhereInput[] | null),NOT?: (DiscoveredPostWhereInput[] | null),OR?: (DiscoveredPostWhereInput[] | null),accountAvatarUrl?: (StringNullableFilter | null),accountName?: (StringFilter | null),body?: (StringNullableFilter | null),createdAt?: (DateTimeFilter | null),discoveredImages?: (DiscoveredImageListRelationFilter | null),id?: (IntFilter | null),official?: (BoolFilter | null),originalPostDate?: (DateTimeNullableFilter | null),postUrl?: (StringNullableFilter | null),providerType?: (StringFilter | null),referencingGroups?: (IntNullableListFilter | null),referencingPeople?: (IntNullableListFilter | null),uniqueIdentifier?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface DiscoveredPostWhereUniqueInput {discoveredProvider?: (DiscoveredPostDiscoveredProviderCompoundUniqueInput | null),id?: (Scalars['Int'] | null)}


/** The list of providers that supply images for the discovery feed */
export interface DiscoveryProviderRequest{
    destination?: boolean | number
    name?: boolean | number
    official?: boolean | number
    provider?: boolean | number
    url?: boolean | number
    /** The number of days remaining until this provider is checked for updates again */
    waitDays?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscoveryStatisticRequest{
    count?: boolean | number
    verdict?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface EnumFaceSourceFieldUpdateOperationsInput {set?: (FaceSource | null)}

export interface EnumFaceSourceFilter {equals?: (FaceSource | null),in?: (FaceSource[] | null),not?: (NestedEnumFaceSourceFilter | null),notIn?: (FaceSource[] | null)}

export interface EnumGenderNullableFilter {equals?: (Gender | null),in?: (Gender[] | null),not?: (NestedEnumGenderNullableFilter | null),notIn?: (Gender[] | null)}

export interface EnumImageReportActionNullableFilter {equals?: (ImageReportAction | null),in?: (ImageReportAction[] | null),not?: (NestedEnumImageReportActionNullableFilter | null),notIn?: (ImageReportAction[] | null)}

export interface EnumMimeTypeFieldUpdateOperationsInput {set?: (MimeType | null)}

export interface EnumMimeTypeFilter {equals?: (MimeType | null),in?: (MimeType[] | null),not?: (NestedEnumMimeTypeFilter | null),notIn?: (MimeType[] | null)}

export interface EnumRestrictionKindFieldUpdateOperationsInput {set?: (RestrictionKind | null)}

export interface EnumRestrictionKindFilter {equals?: (RestrictionKind | null),in?: (RestrictionKind[] | null),not?: (NestedEnumRestrictionKindFilter | null),notIn?: (RestrictionKind[] | null)}

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
    /** @deprecated No longer supported */
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

export interface FaceOrderByRelationAggregateInput {_count?: (SortOrder | null)}

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

export interface GroupAliasOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface GroupAliasScalarWhereInput {AND?: (GroupAliasScalarWhereInput[] | null),NOT?: (GroupAliasScalarWhereInput[] | null),OR?: (GroupAliasScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),groupId?: (IntFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupAliasUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupAliasUpdateManyWithWhereWithoutGroupInput {data: GroupAliasUpdateManyMutationInput,where: GroupAliasScalarWhereInput}

export interface GroupAliasUpdateManyWithoutGroupInput {connect?: (GroupAliasWhereUniqueInput[] | null),connectOrCreate?: (GroupAliasCreateOrConnectWithoutGroupInput[] | null),create?: (GroupAliasCreateWithoutGroupInput[] | null),createMany?: (GroupAliasCreateManyGroupInputEnvelope | null),delete?: (GroupAliasWhereUniqueInput[] | null),deleteMany?: (GroupAliasScalarWhereInput[] | null),disconnect?: (GroupAliasWhereUniqueInput[] | null),set?: (GroupAliasWhereUniqueInput[] | null),update?: (GroupAliasUpdateWithWhereUniqueWithoutGroupInput[] | null),updateMany?: (GroupAliasUpdateManyWithWhereWithoutGroupInput[] | null),upsert?: (GroupAliasUpsertWithWhereUniqueWithoutGroupInput[] | null)}

export interface GroupAliasUpdateWithWhereUniqueWithoutGroupInput {data: GroupAliasUpdateWithoutGroupInput,where: GroupAliasWhereUniqueInput}

export interface GroupAliasUpdateWithoutGroupInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupAliasUpsertWithWhereUniqueWithoutGroupInput {create: GroupAliasCreateWithoutGroupInput,update: GroupAliasUpdateWithoutGroupInput,where: GroupAliasWhereUniqueInput}

export interface GroupAliasWhereInput {AND?: (GroupAliasWhereInput[] | null),NOT?: (GroupAliasWhereInput[] | null),OR?: (GroupAliasWhereInput[] | null),createdAt?: (DateTimeFilter | null),group?: (GroupWhereInput | null),groupId?: (IntFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupAliasWhereUniqueInput {id?: (Scalars['Int'] | null)}

export interface GroupCreateInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),avatar?: (ImageCreateNestedOneWithoutGroupAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutGroupBannerOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),members?: (GroupMemberCreateNestedManyWithoutGroupInput | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupCreateNestedOneWithoutAvatarInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutAvatarInput | null),create?: (GroupCreateWithoutAvatarInput | null)}

export interface GroupCreateNestedOneWithoutBannerInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutBannerInput | null),create?: (GroupCreateWithoutBannerInput | null)}

export interface GroupCreateNestedOneWithoutMembersInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutMembersInput | null),create?: (GroupCreateWithoutMembersInput | null)}

export interface GroupCreateOrConnectWithoutAvatarInput {create: GroupCreateWithoutAvatarInput,where: GroupWhereUniqueInput}

export interface GroupCreateOrConnectWithoutBannerInput {create: GroupCreateWithoutBannerInput,where: GroupWhereUniqueInput}

export interface GroupCreateOrConnectWithoutMembersInput {create: GroupCreateWithoutMembersInput,where: GroupWhereUniqueInput}

export interface GroupCreateWithoutAvatarInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),banner?: (ImageCreateNestedOneWithoutGroupBannerOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),members?: (GroupMemberCreateNestedManyWithoutGroupInput | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupCreateWithoutBannerInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),avatar?: (ImageCreateNestedOneWithoutGroupAvatarOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),members?: (GroupMemberCreateNestedManyWithoutGroupInput | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface GroupCreateWithoutMembersInput {aliases?: (GroupAliasCreateNestedManyWithoutGroupInput | null),avatar?: (ImageCreateNestedOneWithoutGroupAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutGroupBannerOfInput | null),createdAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

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

export interface GroupMemberGroupIdPersonIdCompoundUniqueInput {groupId: Scalars['Int'],personId: Scalars['Int']}

export interface GroupMemberListRelationFilter {every?: (GroupMemberWhereInput | null),none?: (GroupMemberWhereInput | null),some?: (GroupMemberWhereInput | null)}

export interface GroupMemberOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface GroupMemberOrderByWithRelationInput {createdAt?: (SortOrder | null),endDate?: (SortOrder | null),group?: (GroupOrderByWithRelationInput | null),groupId?: (SortOrder | null),id?: (SortOrder | null),person?: (PersonOrderByWithRelationInput | null),personId?: (SortOrder | null),preferredMemberships_?: (PersonOrderByRelationAggregateInput | null),startDate?: (SortOrder | null),updatedAt?: (SortOrder | null)}

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

export interface GroupMemberWhereUniqueInput {groupId_personId?: (GroupMemberGroupIdPersonIdCompoundUniqueInput | null),id?: (Scalars['Int'] | null)}

export interface GroupMembership {endDate?: (Scalars['String'] | null),id: Scalars['Int'],startDate?: (Scalars['String'] | null)}

export interface GroupOrderByWithRelationInput {aliases?: (GroupAliasOrderByRelationAggregateInput | null),avatar?: (ImageOrderByWithRelationInput | null),avatarId?: (SortOrder | null),banner?: (ImageOrderByWithRelationInput | null),bannerId?: (SortOrder | null),createdAt?: (SortOrder | null),id?: (SortOrder | null),ireneBotId?: (SortOrder | null),members?: (GroupMemberOrderByRelationAggregateInput | null),name?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface GroupUpdateInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),avatar?: (ImageUpdateOneWithoutGroupAvatarOfInput | null),banner?: (ImageUpdateOneWithoutGroupBannerOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),members?: (GroupMemberUpdateManyWithoutGroupInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpdateOneRequiredWithoutMembersInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutMembersInput | null),create?: (GroupCreateWithoutMembersInput | null),update?: (GroupUpdateWithoutMembersInput | null),upsert?: (GroupUpsertWithoutMembersInput | null)}

export interface GroupUpdateOneWithoutAvatarInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutAvatarInput | null),create?: (GroupCreateWithoutAvatarInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (GroupUpdateWithoutAvatarInput | null),upsert?: (GroupUpsertWithoutAvatarInput | null)}

export interface GroupUpdateOneWithoutBannerInput {connect?: (GroupWhereUniqueInput | null),connectOrCreate?: (GroupCreateOrConnectWithoutBannerInput | null),create?: (GroupCreateWithoutBannerInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (GroupUpdateWithoutBannerInput | null),upsert?: (GroupUpsertWithoutBannerInput | null)}

export interface GroupUpdateWithoutAvatarInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),banner?: (ImageUpdateOneWithoutGroupBannerOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),members?: (GroupMemberUpdateManyWithoutGroupInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpdateWithoutBannerInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),avatar?: (ImageUpdateOneWithoutGroupAvatarOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),members?: (GroupMemberUpdateManyWithoutGroupInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpdateWithoutMembersInput {aliases?: (GroupAliasUpdateManyWithoutGroupInput | null),avatar?: (ImageUpdateOneWithoutGroupAvatarOfInput | null),banner?: (ImageUpdateOneWithoutGroupBannerOfInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface GroupUpsertWithoutAvatarInput {create: GroupCreateWithoutAvatarInput,update: GroupUpdateWithoutAvatarInput}

export interface GroupUpsertWithoutBannerInput {create: GroupCreateWithoutBannerInput,update: GroupUpdateWithoutBannerInput}

export interface GroupUpsertWithoutMembersInput {create: GroupCreateWithoutMembersInput,update: GroupUpdateWithoutMembersInput}

export interface GroupWhereInput {AND?: (GroupWhereInput[] | null),NOT?: (GroupWhereInput[] | null),OR?: (GroupWhereInput[] | null),aliases?: (GroupAliasListRelationFilter | null),avatar?: (ImageWhereInput | null),avatarId?: (IntNullableFilter | null),banner?: (ImageWhereInput | null),bannerId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),members?: (GroupMemberListRelationFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface GroupWhereUniqueInput {avatarId?: (Scalars['Int'] | null),bannerId?: (Scalars['Int'] | null),id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null)}

export interface HomepageRequest{
    trending?: HomepageTrendingPersonRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface HomepageTrendingPersonRequest{
    person?: PersonRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageRequest{
    appearanceTags?: [{cursor?: (AppearanceTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AppearanceTagRequest] | AppearanceTagRequest
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
    /** The center of focus for the image. Calculated based on the position of the faces in the image. */
    focus?: ImageCoordinateRequest
    /** SHA256 checksum of the image. */
    hash?: boolean | number
    /** Height of the image in pixels. */
    height?: boolean | number
    hiddenAt?: boolean | number
    id?: boolean | number
    imageTags?: [{cursor?: (ImageTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},ImageTagRequest] | ImageTagRequest
    ireneBotId?: boolean | number
    /** @deprecated Unused field, all images are SFW */
    isNsfw?: boolean | number
    /** False if not logged in */
    liked?: boolean | number
    /** The IANA media type of the image. */
    mimetype?: boolean | number
    /** Dominant colors in the image in decimal format, sorted by frequency. */
    palette?: boolean | number
    /** The visibility status of the image. */
    public?: boolean | number
    /** Direct link to the image on the CDN */
    rawUrl?: boolean | number
    reported?: boolean | number
    /** The unique url identifier of the image. */
    slug?: boolean | number
    /** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
    source?: boolean | number
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

export interface ImageCreateManyUserInput {bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),fileName?: (Scalars['String'] | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreateManypaletteInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateManyUserInputEnvelope {data?: (ImageCreateManyUserInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageCreateManypaletteInput {set?: (Scalars['Int'][] | null)}

export interface ImageCreateNestedManyWithoutUserInput {connect?: (ImageWhereUniqueInput[] | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserInput[] | null),create?: (ImageCreateWithoutUserInput[] | null),createMany?: (ImageCreateManyUserInputEnvelope | null)}

export interface ImageCreateNestedOneWithoutAppearanceTagsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAppearanceTagsInput | null),create?: (ImageCreateWithoutAppearanceTagsInput | null)}

export interface ImageCreateNestedOneWithoutAppearancesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAppearancesInput | null),create?: (ImageCreateWithoutAppearancesInput | null)}

export interface ImageCreateNestedOneWithoutDiscoverySourceInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutDiscoverySourceInput | null),create?: (ImageCreateWithoutDiscoverySourceInput | null)}

export interface ImageCreateNestedOneWithoutGroupAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutGroupAvatarOfInput | null),create?: (ImageCreateWithoutGroupAvatarOfInput | null)}

export interface ImageCreateNestedOneWithoutGroupBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutGroupBannerOfInput | null),create?: (ImageCreateWithoutGroupBannerOfInput | null)}

export interface ImageCreateNestedOneWithoutImageTagsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutImageTagsInput | null),create?: (ImageCreateWithoutImageTagsInput | null)}

export interface ImageCreateNestedOneWithoutLikesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutLikesInput | null),create?: (ImageCreateWithoutLikesInput | null)}

export interface ImageCreateNestedOneWithoutPersonAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutPersonAvatarOfInput | null),create?: (ImageCreateWithoutPersonAvatarOfInput | null)}

export interface ImageCreateNestedOneWithoutPersonBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutPersonBannerOfInput | null),create?: (ImageCreateWithoutPersonBannerOfInput | null)}

export interface ImageCreateNestedOneWithoutPotentialDuplicatesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutPotentialDuplicatesInput | null),create?: (ImageCreateWithoutPotentialDuplicatesInput | null)}

export interface ImageCreateNestedOneWithoutReportsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutReportsInput | null),create?: (ImageCreateWithoutReportsInput | null)}

export interface ImageCreateNestedOneWithoutUserAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserAvatarOfInput | null),create?: (ImageCreateWithoutUserAvatarOfInput | null)}

export interface ImageCreateNestedOneWithoutUserBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserBannerOfInput | null),create?: (ImageCreateWithoutUserBannerOfInput | null)}

export interface ImageCreateOrConnectWithoutAppearanceTagsInput {create: ImageCreateWithoutAppearanceTagsInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutAppearancesInput {create: ImageCreateWithoutAppearancesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutDiscoverySourceInput {create: ImageCreateWithoutDiscoverySourceInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutFacesInput {create: ImageCreateWithoutFacesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutGroupAvatarOfInput {create: ImageCreateWithoutGroupAvatarOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutGroupBannerOfInput {create: ImageCreateWithoutGroupBannerOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutImageTagsInput {create: ImageCreateWithoutImageTagsInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutLikesInput {create: ImageCreateWithoutLikesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutPersonAvatarOfInput {create: ImageCreateWithoutPersonAvatarOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutPersonBannerOfInput {create: ImageCreateWithoutPersonBannerOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutPotentialDuplicatesInput {create: ImageCreateWithoutPotentialDuplicatesInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutReportsInput {create: ImageCreateWithoutReportsInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutUserAvatarOfInput {create: ImageCreateWithoutUserAvatarOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutUserBannerOfInput {create: ImageCreateWithoutUserBannerOfInput,where: ImageWhereUniqueInput}

export interface ImageCreateOrConnectWithoutUserInput {create: ImageCreateWithoutUserInput,where: ImageWhereUniqueInput}

export interface ImageCreateWithoutAppearanceTagsInput {appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutAppearancesInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutDiscoverySourceInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutFacesInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutGroupAvatarOfInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutGroupBannerOfInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutImageTagsInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutLikesInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutPersonAvatarOfInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutPersonBannerOfInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutPotentialDuplicatesInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutReportsInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutUserAvatarOfInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutUserBannerOfInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,user?: (UserCreateNestedOneWithoutImagesInput | null),userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

export interface ImageCreateWithoutUserInput {appearanceTags?: (AppearanceTagCreateNestedManyWithoutImageInput | null),appearances?: (AppearanceCreateNestedManyWithoutImageInput | null),bytes?: (Scalars['Int'] | null),caption?: (Scalars['String'] | null),createdAt?: (Scalars['DateTime'] | null),discoverySource?: (DiscoveredImageCreateNestedOneWithoutImageInput | null),faceScanDate?: (Scalars['DateTime'] | null),faceScanRequestDate?: (Scalars['DateTime'] | null),faces?: (FaceCreateNestedManyWithoutImageInput | null),fileName?: (Scalars['String'] | null),groupAvatarOf?: (GroupCreateNestedOneWithoutAvatarInput | null),groupBannerOf?: (GroupCreateNestedOneWithoutBannerInput | null),hash: Scalars['String'],height: Scalars['Int'],hiddenAt?: (Scalars['DateTime'] | null),imageTags?: (ImageTagCreateNestedManyWithoutImageInput | null),ireneBotId?: (Scalars['Int'] | null),isNsfw?: (Scalars['Boolean'] | null),likes?: (ImageLikeCreateNestedManyWithoutImageInput | null),mimetype: MimeType,pHash?: (Scalars['String'] | null),palette?: (ImageCreatepaletteInput | null),personAvatarOf?: (PersonCreateNestedOneWithoutAvatarInput | null),personBannerOf?: (PersonCreateNestedOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageCreateNestedManyWithoutDuplicateImageInput | null),public?: (Scalars['Boolean'] | null),reports?: (ImageReportCreateNestedManyWithoutImageInput | null),slug: Scalars['String'],source?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null),uploadType: UploadType,userAvatarOf?: (UserCreateNestedOneWithoutAvatarInput | null),userBannerOf?: (UserCreateNestedOneWithoutBannerInput | null),views?: (Scalars['Int'] | null),width: Scalars['Int'],xp?: (Scalars['Int'] | null)}

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

export interface ImageLikeListRelationFilter {every?: (ImageLikeWhereInput | null),none?: (ImageLikeWhereInput | null),some?: (ImageLikeWhereInput | null)}

export interface ImageLikeOrderByRelationAggregateInput {_count?: (SortOrder | null)}

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

export interface ImageLikeUserIdImageIdCompoundUniqueInput {imageId: Scalars['Int'],userId: Scalars['Int']}

export interface ImageLikeWhereInput {AND?: (ImageLikeWhereInput[] | null),NOT?: (ImageLikeWhereInput[] | null),OR?: (ImageLikeWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null),user?: (UserWhereInput | null),userId?: (IntFilter | null)}

export interface ImageLikeWhereUniqueInput {id?: (Scalars['Int'] | null),userId_imageId?: (ImageLikeUserIdImageIdCompoundUniqueInput | null)}

export interface ImageListRelationFilter {every?: (ImageWhereInput | null),none?: (ImageWhereInput | null),some?: (ImageWhereInput | null)}

export interface ImageMatchRequest{
    face?: FaceRequest
    image?: ImageRequest
    person?: PersonRequest
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface ImageOrderByWithRelationInput {appearanceTags?: (AppearanceTagOrderByRelationAggregateInput | null),appearances?: (AppearanceOrderByRelationAggregateInput | null),bytes?: (SortOrder | null),caption?: (SortOrder | null),createdAt?: (SortOrder | null),discoverySource?: (DiscoveredImageOrderByWithRelationInput | null),faceScanDate?: (SortOrder | null),faceScanRequestDate?: (SortOrder | null),faces?: (FaceOrderByRelationAggregateInput | null),fileName?: (SortOrder | null),groupAvatarOf?: (GroupOrderByWithRelationInput | null),groupBannerOf?: (GroupOrderByWithRelationInput | null),hash?: (SortOrder | null),height?: (SortOrder | null),hiddenAt?: (SortOrder | null),id?: (SortOrder | null),imageTags?: (ImageTagOrderByRelationAggregateInput | null),ireneBotId?: (SortOrder | null),isNsfw?: (SortOrder | null),likes?: (ImageLikeOrderByRelationAggregateInput | null),mimetype?: (SortOrder | null),pHash?: (SortOrder | null),palette?: (SortOrder | null),personAvatarOf?: (PersonOrderByWithRelationInput | null),personBannerOf?: (PersonOrderByWithRelationInput | null),potentialDuplicates?: (DiscoveredImageOrderByRelationAggregateInput | null),public?: (SortOrder | null),reports?: (ImageReportOrderByRelationAggregateInput | null),slug?: (SortOrder | null),source?: (SortOrder | null),updatedAt?: (SortOrder | null),uploadType?: (SortOrder | null),user?: (UserOrderByWithRelationInput | null),userAvatarOf?: (UserOrderByWithRelationInput | null),userBannerOf?: (UserOrderByWithRelationInput | null),userId?: (SortOrder | null),views?: (SortOrder | null),width?: (SortOrder | null),xp?: (SortOrder | null)}

export interface ImageReportRequest{
    action?: boolean | number
    actionedAt?: boolean | number
    createdAt?: boolean | number
    id?: boolean | number
    image?: ImageRequest
    reason?: boolean | number
    reportedBy?: UserRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageReportCreateManyActionedByInput {action?: (ImageReportAction | null),actionedAt?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],reason?: (Scalars['String'] | null),reportedById: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageReportCreateManyActionedByInputEnvelope {data?: (ImageReportCreateManyActionedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageReportCreateManyImageInput {action?: (ImageReportAction | null),actionedAt?: (Scalars['DateTime'] | null),actionedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),reason?: (Scalars['String'] | null),reportedById: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageReportCreateManyImageInputEnvelope {data?: (ImageReportCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageReportCreateManyReportedByInput {action?: (ImageReportAction | null),actionedAt?: (Scalars['DateTime'] | null),actionedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],reason?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageReportCreateManyReportedByInputEnvelope {data?: (ImageReportCreateManyReportedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageReportCreateNestedManyWithoutActionedByInput {connect?: (ImageReportWhereUniqueInput[] | null),connectOrCreate?: (ImageReportCreateOrConnectWithoutActionedByInput[] | null),create?: (ImageReportCreateWithoutActionedByInput[] | null),createMany?: (ImageReportCreateManyActionedByInputEnvelope | null)}

export interface ImageReportCreateNestedManyWithoutImageInput {connect?: (ImageReportWhereUniqueInput[] | null),connectOrCreate?: (ImageReportCreateOrConnectWithoutImageInput[] | null),create?: (ImageReportCreateWithoutImageInput[] | null),createMany?: (ImageReportCreateManyImageInputEnvelope | null)}

export interface ImageReportCreateNestedManyWithoutReportedByInput {connect?: (ImageReportWhereUniqueInput[] | null),connectOrCreate?: (ImageReportCreateOrConnectWithoutReportedByInput[] | null),create?: (ImageReportCreateWithoutReportedByInput[] | null),createMany?: (ImageReportCreateManyReportedByInputEnvelope | null)}

export interface ImageReportCreateOrConnectWithoutActionedByInput {create: ImageReportCreateWithoutActionedByInput,where: ImageReportWhereUniqueInput}

export interface ImageReportCreateOrConnectWithoutImageInput {create: ImageReportCreateWithoutImageInput,where: ImageReportWhereUniqueInput}

export interface ImageReportCreateOrConnectWithoutReportedByInput {create: ImageReportCreateWithoutReportedByInput,where: ImageReportWhereUniqueInput}

export interface ImageReportCreateWithoutActionedByInput {action?: (ImageReportAction | null),actionedAt?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutReportsInput,reason?: (Scalars['String'] | null),reportedBy: UserCreateNestedOneWithoutReportedImagesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageReportCreateWithoutImageInput {action?: (ImageReportAction | null),actionedAt?: (Scalars['DateTime'] | null),actionedBy?: (UserCreateNestedOneWithoutActionedReportedImagesInput | null),createdAt?: (Scalars['DateTime'] | null),reason?: (Scalars['String'] | null),reportedBy: UserCreateNestedOneWithoutReportedImagesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageReportCreateWithoutReportedByInput {action?: (ImageReportAction | null),actionedAt?: (Scalars['DateTime'] | null),actionedBy?: (UserCreateNestedOneWithoutActionedReportedImagesInput | null),createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutReportsInput,reason?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageReportImageReportUserCompoundUniqueInput {imageId: Scalars['Int'],reportedById: Scalars['Int']}

export interface ImageReportListRelationFilter {every?: (ImageReportWhereInput | null),none?: (ImageReportWhereInput | null),some?: (ImageReportWhereInput | null)}

export interface ImageReportOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface ImageReportOrderByWithRelationInput {action?: (SortOrder | null),actionedAt?: (SortOrder | null),actionedBy?: (UserOrderByWithRelationInput | null),actionedById?: (SortOrder | null),createdAt?: (SortOrder | null),id?: (SortOrder | null),image?: (ImageOrderByWithRelationInput | null),imageId?: (SortOrder | null),reason?: (SortOrder | null),reportedBy?: (UserOrderByWithRelationInput | null),reportedById?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface ImageReportScalarWhereInput {AND?: (ImageReportScalarWhereInput[] | null),NOT?: (ImageReportScalarWhereInput[] | null),OR?: (ImageReportScalarWhereInput[] | null),action?: (EnumImageReportActionNullableFilter | null),actionedAt?: (DateTimeNullableFilter | null),actionedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),reason?: (StringNullableFilter | null),reportedById?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface ImageReportUpdateManyMutationInput {action?: (NullableEnumImageReportActionFieldUpdateOperationsInput | null),actionedAt?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageReportUpdateManyWithWhereWithoutActionedByInput {data: ImageReportUpdateManyMutationInput,where: ImageReportScalarWhereInput}

export interface ImageReportUpdateManyWithWhereWithoutImageInput {data: ImageReportUpdateManyMutationInput,where: ImageReportScalarWhereInput}

export interface ImageReportUpdateManyWithWhereWithoutReportedByInput {data: ImageReportUpdateManyMutationInput,where: ImageReportScalarWhereInput}

export interface ImageReportUpdateManyWithoutActionedByInput {connect?: (ImageReportWhereUniqueInput[] | null),connectOrCreate?: (ImageReportCreateOrConnectWithoutActionedByInput[] | null),create?: (ImageReportCreateWithoutActionedByInput[] | null),createMany?: (ImageReportCreateManyActionedByInputEnvelope | null),delete?: (ImageReportWhereUniqueInput[] | null),deleteMany?: (ImageReportScalarWhereInput[] | null),disconnect?: (ImageReportWhereUniqueInput[] | null),set?: (ImageReportWhereUniqueInput[] | null),update?: (ImageReportUpdateWithWhereUniqueWithoutActionedByInput[] | null),updateMany?: (ImageReportUpdateManyWithWhereWithoutActionedByInput[] | null),upsert?: (ImageReportUpsertWithWhereUniqueWithoutActionedByInput[] | null)}

export interface ImageReportUpdateManyWithoutImageInput {connect?: (ImageReportWhereUniqueInput[] | null),connectOrCreate?: (ImageReportCreateOrConnectWithoutImageInput[] | null),create?: (ImageReportCreateWithoutImageInput[] | null),createMany?: (ImageReportCreateManyImageInputEnvelope | null),delete?: (ImageReportWhereUniqueInput[] | null),deleteMany?: (ImageReportScalarWhereInput[] | null),disconnect?: (ImageReportWhereUniqueInput[] | null),set?: (ImageReportWhereUniqueInput[] | null),update?: (ImageReportUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (ImageReportUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (ImageReportUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface ImageReportUpdateManyWithoutReportedByInput {connect?: (ImageReportWhereUniqueInput[] | null),connectOrCreate?: (ImageReportCreateOrConnectWithoutReportedByInput[] | null),create?: (ImageReportCreateWithoutReportedByInput[] | null),createMany?: (ImageReportCreateManyReportedByInputEnvelope | null),delete?: (ImageReportWhereUniqueInput[] | null),deleteMany?: (ImageReportScalarWhereInput[] | null),disconnect?: (ImageReportWhereUniqueInput[] | null),set?: (ImageReportWhereUniqueInput[] | null),update?: (ImageReportUpdateWithWhereUniqueWithoutReportedByInput[] | null),updateMany?: (ImageReportUpdateManyWithWhereWithoutReportedByInput[] | null),upsert?: (ImageReportUpsertWithWhereUniqueWithoutReportedByInput[] | null)}

export interface ImageReportUpdateWithWhereUniqueWithoutActionedByInput {data: ImageReportUpdateWithoutActionedByInput,where: ImageReportWhereUniqueInput}

export interface ImageReportUpdateWithWhereUniqueWithoutImageInput {data: ImageReportUpdateWithoutImageInput,where: ImageReportWhereUniqueInput}

export interface ImageReportUpdateWithWhereUniqueWithoutReportedByInput {data: ImageReportUpdateWithoutReportedByInput,where: ImageReportWhereUniqueInput}

export interface ImageReportUpdateWithoutActionedByInput {action?: (NullableEnumImageReportActionFieldUpdateOperationsInput | null),actionedAt?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutReportsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),reportedBy?: (UserUpdateOneRequiredWithoutReportedImagesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageReportUpdateWithoutImageInput {action?: (NullableEnumImageReportActionFieldUpdateOperationsInput | null),actionedAt?: (NullableDateTimeFieldUpdateOperationsInput | null),actionedBy?: (UserUpdateOneWithoutActionedReportedImagesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),reportedBy?: (UserUpdateOneRequiredWithoutReportedImagesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageReportUpdateWithoutReportedByInput {action?: (NullableEnumImageReportActionFieldUpdateOperationsInput | null),actionedAt?: (NullableDateTimeFieldUpdateOperationsInput | null),actionedBy?: (UserUpdateOneWithoutActionedReportedImagesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutReportsInput | null),reason?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageReportUpsertWithWhereUniqueWithoutActionedByInput {create: ImageReportCreateWithoutActionedByInput,update: ImageReportUpdateWithoutActionedByInput,where: ImageReportWhereUniqueInput}

export interface ImageReportUpsertWithWhereUniqueWithoutImageInput {create: ImageReportCreateWithoutImageInput,update: ImageReportUpdateWithoutImageInput,where: ImageReportWhereUniqueInput}

export interface ImageReportUpsertWithWhereUniqueWithoutReportedByInput {create: ImageReportCreateWithoutReportedByInput,update: ImageReportUpdateWithoutReportedByInput,where: ImageReportWhereUniqueInput}

export interface ImageReportWhereInput {AND?: (ImageReportWhereInput[] | null),NOT?: (ImageReportWhereInput[] | null),OR?: (ImageReportWhereInput[] | null),action?: (EnumImageReportActionNullableFilter | null),actionedAt?: (DateTimeNullableFilter | null),actionedBy?: (UserWhereInput | null),actionedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),reason?: (StringNullableFilter | null),reportedBy?: (UserWhereInput | null),reportedById?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface ImageReportWhereUniqueInput {id?: (Scalars['Int'] | null),imageReportUser?: (ImageReportImageReportUserCompoundUniqueInput | null)}

export interface ImageScalarWhereInput {AND?: (ImageScalarWhereInput[] | null),NOT?: (ImageScalarWhereInput[] | null),OR?: (ImageScalarWhereInput[] | null),bytes?: (IntFilter | null),caption?: (StringNullableFilter | null),createdAt?: (DateTimeFilter | null),faceScanDate?: (DateTimeNullableFilter | null),faceScanRequestDate?: (DateTimeNullableFilter | null),fileName?: (StringNullableFilter | null),hash?: (StringFilter | null),height?: (IntFilter | null),hiddenAt?: (DateTimeNullableFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),isNsfw?: (BoolFilter | null),mimetype?: (EnumMimeTypeFilter | null),pHash?: (StringNullableFilter | null),palette?: (IntNullableListFilter | null),public?: (BoolFilter | null),slug?: (StringFilter | null),source?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null),uploadType?: (EnumUploadTypeFilter | null),userId?: (IntNullableFilter | null),views?: (IntFilter | null),width?: (IntFilter | null),xp?: (IntFilter | null)}

export interface ImageTagRequest{
    addedBy?: UserRequest
    createdAt?: boolean | number
    image?: ImageRequest
    tag?: TagRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ImageTagCreateManyAddedByInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],tagId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageTagCreateManyAddedByInputEnvelope {data?: (ImageTagCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageTagCreateManyImageInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),tagId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageTagCreateManyImageInputEnvelope {data?: (ImageTagCreateManyImageInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageTagCreateManyTagInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),imageId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageTagCreateManyTagInputEnvelope {data?: (ImageTagCreateManyTagInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface ImageTagCreateNestedManyWithoutAddedByInput {connect?: (ImageTagWhereUniqueInput[] | null),connectOrCreate?: (ImageTagCreateOrConnectWithoutAddedByInput[] | null),create?: (ImageTagCreateWithoutAddedByInput[] | null),createMany?: (ImageTagCreateManyAddedByInputEnvelope | null)}

export interface ImageTagCreateNestedManyWithoutImageInput {connect?: (ImageTagWhereUniqueInput[] | null),connectOrCreate?: (ImageTagCreateOrConnectWithoutImageInput[] | null),create?: (ImageTagCreateWithoutImageInput[] | null),createMany?: (ImageTagCreateManyImageInputEnvelope | null)}

export interface ImageTagCreateNestedManyWithoutTagInput {connect?: (ImageTagWhereUniqueInput[] | null),connectOrCreate?: (ImageTagCreateOrConnectWithoutTagInput[] | null),create?: (ImageTagCreateWithoutTagInput[] | null),createMany?: (ImageTagCreateManyTagInputEnvelope | null)}

export interface ImageTagCreateOrConnectWithoutAddedByInput {create: ImageTagCreateWithoutAddedByInput,where: ImageTagWhereUniqueInput}

export interface ImageTagCreateOrConnectWithoutImageInput {create: ImageTagCreateWithoutImageInput,where: ImageTagWhereUniqueInput}

export interface ImageTagCreateOrConnectWithoutTagInput {create: ImageTagCreateWithoutTagInput,where: ImageTagWhereUniqueInput}

export interface ImageTagCreateWithoutAddedByInput {createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutImageTagsInput,tag: TagCreateNestedOneWithoutImagesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageTagCreateWithoutImageInput {addedBy?: (UserCreateNestedOneWithoutImageTagsInput | null),createdAt?: (Scalars['DateTime'] | null),tag: TagCreateNestedOneWithoutImagesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageTagCreateWithoutTagInput {addedBy?: (UserCreateNestedOneWithoutImageTagsInput | null),createdAt?: (Scalars['DateTime'] | null),image: ImageCreateNestedOneWithoutImageTagsInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface ImageTagImageTagCompoundUniqueInput {imageId: Scalars['Int'],tagId: Scalars['Int']}

export interface ImageTagListRelationFilter {every?: (ImageTagWhereInput | null),none?: (ImageTagWhereInput | null),some?: (ImageTagWhereInput | null)}

export interface ImageTagOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface ImageTagScalarWhereInput {AND?: (ImageTagScalarWhereInput[] | null),NOT?: (ImageTagScalarWhereInput[] | null),OR?: (ImageTagScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),imageId?: (IntFilter | null),tagId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface ImageTagUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageTagUpdateManyWithWhereWithoutAddedByInput {data: ImageTagUpdateManyMutationInput,where: ImageTagScalarWhereInput}

export interface ImageTagUpdateManyWithWhereWithoutImageInput {data: ImageTagUpdateManyMutationInput,where: ImageTagScalarWhereInput}

export interface ImageTagUpdateManyWithWhereWithoutTagInput {data: ImageTagUpdateManyMutationInput,where: ImageTagScalarWhereInput}

export interface ImageTagUpdateManyWithoutAddedByInput {connect?: (ImageTagWhereUniqueInput[] | null),connectOrCreate?: (ImageTagCreateOrConnectWithoutAddedByInput[] | null),create?: (ImageTagCreateWithoutAddedByInput[] | null),createMany?: (ImageTagCreateManyAddedByInputEnvelope | null),delete?: (ImageTagWhereUniqueInput[] | null),deleteMany?: (ImageTagScalarWhereInput[] | null),disconnect?: (ImageTagWhereUniqueInput[] | null),set?: (ImageTagWhereUniqueInput[] | null),update?: (ImageTagUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (ImageTagUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (ImageTagUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface ImageTagUpdateManyWithoutImageInput {connect?: (ImageTagWhereUniqueInput[] | null),connectOrCreate?: (ImageTagCreateOrConnectWithoutImageInput[] | null),create?: (ImageTagCreateWithoutImageInput[] | null),createMany?: (ImageTagCreateManyImageInputEnvelope | null),delete?: (ImageTagWhereUniqueInput[] | null),deleteMany?: (ImageTagScalarWhereInput[] | null),disconnect?: (ImageTagWhereUniqueInput[] | null),set?: (ImageTagWhereUniqueInput[] | null),update?: (ImageTagUpdateWithWhereUniqueWithoutImageInput[] | null),updateMany?: (ImageTagUpdateManyWithWhereWithoutImageInput[] | null),upsert?: (ImageTagUpsertWithWhereUniqueWithoutImageInput[] | null)}

export interface ImageTagUpdateManyWithoutTagInput {connect?: (ImageTagWhereUniqueInput[] | null),connectOrCreate?: (ImageTagCreateOrConnectWithoutTagInput[] | null),create?: (ImageTagCreateWithoutTagInput[] | null),createMany?: (ImageTagCreateManyTagInputEnvelope | null),delete?: (ImageTagWhereUniqueInput[] | null),deleteMany?: (ImageTagScalarWhereInput[] | null),disconnect?: (ImageTagWhereUniqueInput[] | null),set?: (ImageTagWhereUniqueInput[] | null),update?: (ImageTagUpdateWithWhereUniqueWithoutTagInput[] | null),updateMany?: (ImageTagUpdateManyWithWhereWithoutTagInput[] | null),upsert?: (ImageTagUpsertWithWhereUniqueWithoutTagInput[] | null)}

export interface ImageTagUpdateWithWhereUniqueWithoutAddedByInput {data: ImageTagUpdateWithoutAddedByInput,where: ImageTagWhereUniqueInput}

export interface ImageTagUpdateWithWhereUniqueWithoutImageInput {data: ImageTagUpdateWithoutImageInput,where: ImageTagWhereUniqueInput}

export interface ImageTagUpdateWithWhereUniqueWithoutTagInput {data: ImageTagUpdateWithoutTagInput,where: ImageTagWhereUniqueInput}

export interface ImageTagUpdateWithoutAddedByInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutImageTagsInput | null),tag?: (TagUpdateOneRequiredWithoutImagesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageTagUpdateWithoutImageInput {addedBy?: (UserUpdateOneWithoutImageTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),tag?: (TagUpdateOneRequiredWithoutImagesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageTagUpdateWithoutTagInput {addedBy?: (UserUpdateOneWithoutImageTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),image?: (ImageUpdateOneRequiredWithoutImageTagsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface ImageTagUpsertWithWhereUniqueWithoutAddedByInput {create: ImageTagCreateWithoutAddedByInput,update: ImageTagUpdateWithoutAddedByInput,where: ImageTagWhereUniqueInput}

export interface ImageTagUpsertWithWhereUniqueWithoutImageInput {create: ImageTagCreateWithoutImageInput,update: ImageTagUpdateWithoutImageInput,where: ImageTagWhereUniqueInput}

export interface ImageTagUpsertWithWhereUniqueWithoutTagInput {create: ImageTagCreateWithoutTagInput,update: ImageTagUpdateWithoutTagInput,where: ImageTagWhereUniqueInput}

export interface ImageTagWhereInput {AND?: (ImageTagWhereInput[] | null),NOT?: (ImageTagWhereInput[] | null),OR?: (ImageTagWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),image?: (ImageWhereInput | null),imageId?: (IntFilter | null),tag?: (TagWhereInput | null),tagId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface ImageTagWhereUniqueInput {id?: (Scalars['Int'] | null),imageTag?: (ImageTagImageTagCompoundUniqueInput | null)}

export interface ImageUpdateManyMutationInput {bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateManyWithWhereWithoutUserInput {data: ImageUpdateManyMutationInput,where: ImageScalarWhereInput}

export interface ImageUpdateManyWithoutUserInput {connect?: (ImageWhereUniqueInput[] | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserInput[] | null),create?: (ImageCreateWithoutUserInput[] | null),createMany?: (ImageCreateManyUserInputEnvelope | null),delete?: (ImageWhereUniqueInput[] | null),deleteMany?: (ImageScalarWhereInput[] | null),disconnect?: (ImageWhereUniqueInput[] | null),set?: (ImageWhereUniqueInput[] | null),update?: (ImageUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (ImageUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (ImageUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface ImageUpdateOneRequiredWithoutAppearancesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAppearancesInput | null),create?: (ImageCreateWithoutAppearancesInput | null),update?: (ImageUpdateWithoutAppearancesInput | null),upsert?: (ImageUpsertWithoutAppearancesInput | null)}

export interface ImageUpdateOneRequiredWithoutFacesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutFacesInput | null),create?: (ImageCreateWithoutFacesInput | null),update?: (ImageUpdateWithoutFacesInput | null),upsert?: (ImageUpsertWithoutFacesInput | null)}

export interface ImageUpdateOneRequiredWithoutImageTagsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutImageTagsInput | null),create?: (ImageCreateWithoutImageTagsInput | null),update?: (ImageUpdateWithoutImageTagsInput | null),upsert?: (ImageUpsertWithoutImageTagsInput | null)}

export interface ImageUpdateOneRequiredWithoutLikesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutLikesInput | null),create?: (ImageCreateWithoutLikesInput | null),update?: (ImageUpdateWithoutLikesInput | null),upsert?: (ImageUpsertWithoutLikesInput | null)}

export interface ImageUpdateOneRequiredWithoutReportsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutReportsInput | null),create?: (ImageCreateWithoutReportsInput | null),update?: (ImageUpdateWithoutReportsInput | null),upsert?: (ImageUpsertWithoutReportsInput | null)}

export interface ImageUpdateOneWithoutAppearanceTagsInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutAppearanceTagsInput | null),create?: (ImageCreateWithoutAppearanceTagsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutAppearanceTagsInput | null),upsert?: (ImageUpsertWithoutAppearanceTagsInput | null)}

export interface ImageUpdateOneWithoutDiscoverySourceInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutDiscoverySourceInput | null),create?: (ImageCreateWithoutDiscoverySourceInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutDiscoverySourceInput | null),upsert?: (ImageUpsertWithoutDiscoverySourceInput | null)}

export interface ImageUpdateOneWithoutGroupAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutGroupAvatarOfInput | null),create?: (ImageCreateWithoutGroupAvatarOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutGroupAvatarOfInput | null),upsert?: (ImageUpsertWithoutGroupAvatarOfInput | null)}

export interface ImageUpdateOneWithoutGroupBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutGroupBannerOfInput | null),create?: (ImageCreateWithoutGroupBannerOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutGroupBannerOfInput | null),upsert?: (ImageUpsertWithoutGroupBannerOfInput | null)}

export interface ImageUpdateOneWithoutPersonAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutPersonAvatarOfInput | null),create?: (ImageCreateWithoutPersonAvatarOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutPersonAvatarOfInput | null),upsert?: (ImageUpsertWithoutPersonAvatarOfInput | null)}

export interface ImageUpdateOneWithoutPersonBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutPersonBannerOfInput | null),create?: (ImageCreateWithoutPersonBannerOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutPersonBannerOfInput | null),upsert?: (ImageUpsertWithoutPersonBannerOfInput | null)}

export interface ImageUpdateOneWithoutPotentialDuplicatesInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutPotentialDuplicatesInput | null),create?: (ImageCreateWithoutPotentialDuplicatesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutPotentialDuplicatesInput | null),upsert?: (ImageUpsertWithoutPotentialDuplicatesInput | null)}

export interface ImageUpdateOneWithoutUserAvatarOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserAvatarOfInput | null),create?: (ImageCreateWithoutUserAvatarOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutUserAvatarOfInput | null),upsert?: (ImageUpsertWithoutUserAvatarOfInput | null)}

export interface ImageUpdateOneWithoutUserBannerOfInput {connect?: (ImageWhereUniqueInput | null),connectOrCreate?: (ImageCreateOrConnectWithoutUserBannerOfInput | null),create?: (ImageCreateWithoutUserBannerOfInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (ImageUpdateWithoutUserBannerOfInput | null),upsert?: (ImageUpsertWithoutUserBannerOfInput | null)}

export interface ImageUpdateWithWhereUniqueWithoutUserInput {data: ImageUpdateWithoutUserInput,where: ImageWhereUniqueInput}

export interface ImageUpdateWithoutAppearanceTagsInput {appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutAppearancesInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutDiscoverySourceInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutFacesInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutGroupAvatarOfInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutGroupBannerOfInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutImageTagsInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutLikesInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutPersonAvatarOfInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutPersonBannerOfInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutPotentialDuplicatesInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutReportsInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutUserAvatarOfInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutUserBannerOfInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),user?: (UserUpdateOneWithoutImagesInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdateWithoutUserInput {appearanceTags?: (AppearanceTagUpdateManyWithoutImageInput | null),appearances?: (AppearanceUpdateManyWithoutImageInput | null),bytes?: (IntFieldUpdateOperationsInput | null),caption?: (NullableStringFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),discoverySource?: (DiscoveredImageUpdateOneWithoutImageInput | null),faceScanDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faceScanRequestDate?: (NullableDateTimeFieldUpdateOperationsInput | null),faces?: (FaceUpdateManyWithoutImageInput | null),fileName?: (NullableStringFieldUpdateOperationsInput | null),groupAvatarOf?: (GroupUpdateOneWithoutAvatarInput | null),groupBannerOf?: (GroupUpdateOneWithoutBannerInput | null),hash?: (StringFieldUpdateOperationsInput | null),height?: (IntFieldUpdateOperationsInput | null),hiddenAt?: (NullableDateTimeFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutImageInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),isNsfw?: (BoolFieldUpdateOperationsInput | null),likes?: (ImageLikeUpdateManyWithoutImageInput | null),mimetype?: (EnumMimeTypeFieldUpdateOperationsInput | null),pHash?: (NullableStringFieldUpdateOperationsInput | null),palette?: (ImageUpdatepaletteInput | null),personAvatarOf?: (PersonUpdateOneWithoutAvatarInput | null),personBannerOf?: (PersonUpdateOneWithoutBannerInput | null),potentialDuplicates?: (DiscoveredImageUpdateManyWithoutDuplicateImageInput | null),public?: (BoolFieldUpdateOperationsInput | null),reports?: (ImageReportUpdateManyWithoutImageInput | null),slug?: (StringFieldUpdateOperationsInput | null),source?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),uploadType?: (EnumUploadTypeFieldUpdateOperationsInput | null),userAvatarOf?: (UserUpdateOneWithoutAvatarInput | null),userBannerOf?: (UserUpdateOneWithoutBannerInput | null),views?: (IntFieldUpdateOperationsInput | null),width?: (IntFieldUpdateOperationsInput | null),xp?: (IntFieldUpdateOperationsInput | null)}

export interface ImageUpdatepaletteInput {push?: (Scalars['Int'] | null),set?: (Scalars['Int'][] | null)}

export interface ImageUpsertWithWhereUniqueWithoutUserInput {create: ImageCreateWithoutUserInput,update: ImageUpdateWithoutUserInput,where: ImageWhereUniqueInput}

export interface ImageUpsertWithoutAppearanceTagsInput {create: ImageCreateWithoutAppearanceTagsInput,update: ImageUpdateWithoutAppearanceTagsInput}

export interface ImageUpsertWithoutAppearancesInput {create: ImageCreateWithoutAppearancesInput,update: ImageUpdateWithoutAppearancesInput}

export interface ImageUpsertWithoutDiscoverySourceInput {create: ImageCreateWithoutDiscoverySourceInput,update: ImageUpdateWithoutDiscoverySourceInput}

export interface ImageUpsertWithoutFacesInput {create: ImageCreateWithoutFacesInput,update: ImageUpdateWithoutFacesInput}

export interface ImageUpsertWithoutGroupAvatarOfInput {create: ImageCreateWithoutGroupAvatarOfInput,update: ImageUpdateWithoutGroupAvatarOfInput}

export interface ImageUpsertWithoutGroupBannerOfInput {create: ImageCreateWithoutGroupBannerOfInput,update: ImageUpdateWithoutGroupBannerOfInput}

export interface ImageUpsertWithoutImageTagsInput {create: ImageCreateWithoutImageTagsInput,update: ImageUpdateWithoutImageTagsInput}

export interface ImageUpsertWithoutLikesInput {create: ImageCreateWithoutLikesInput,update: ImageUpdateWithoutLikesInput}

export interface ImageUpsertWithoutPersonAvatarOfInput {create: ImageCreateWithoutPersonAvatarOfInput,update: ImageUpdateWithoutPersonAvatarOfInput}

export interface ImageUpsertWithoutPersonBannerOfInput {create: ImageCreateWithoutPersonBannerOfInput,update: ImageUpdateWithoutPersonBannerOfInput}

export interface ImageUpsertWithoutPotentialDuplicatesInput {create: ImageCreateWithoutPotentialDuplicatesInput,update: ImageUpdateWithoutPotentialDuplicatesInput}

export interface ImageUpsertWithoutReportsInput {create: ImageCreateWithoutReportsInput,update: ImageUpdateWithoutReportsInput}

export interface ImageUpsertWithoutUserAvatarOfInput {create: ImageCreateWithoutUserAvatarOfInput,update: ImageUpdateWithoutUserAvatarOfInput}

export interface ImageUpsertWithoutUserBannerOfInput {create: ImageCreateWithoutUserBannerOfInput,update: ImageUpdateWithoutUserBannerOfInput}

export interface ImageWhereInput {AND?: (ImageWhereInput[] | null),NOT?: (ImageWhereInput[] | null),OR?: (ImageWhereInput[] | null),appearanceTags?: (AppearanceTagListRelationFilter | null),appearances?: (AppearanceListRelationFilter | null),bytes?: (IntFilter | null),caption?: (StringNullableFilter | null),createdAt?: (DateTimeFilter | null),discoverySource?: (DiscoveredImageWhereInput | null),faceScanDate?: (DateTimeNullableFilter | null),faceScanRequestDate?: (DateTimeNullableFilter | null),faces?: (FaceListRelationFilter | null),fileName?: (StringNullableFilter | null),groupAvatarOf?: (GroupWhereInput | null),groupBannerOf?: (GroupWhereInput | null),hash?: (StringFilter | null),height?: (IntFilter | null),hiddenAt?: (DateTimeNullableFilter | null),id?: (IntFilter | null),imageTags?: (ImageTagListRelationFilter | null),ireneBotId?: (IntNullableFilter | null),isNsfw?: (BoolFilter | null),likes?: (ImageLikeListRelationFilter | null),mimetype?: (EnumMimeTypeFilter | null),pHash?: (StringNullableFilter | null),palette?: (IntNullableListFilter | null),personAvatarOf?: (PersonWhereInput | null),personBannerOf?: (PersonWhereInput | null),potentialDuplicates?: (DiscoveredImageListRelationFilter | null),public?: (BoolFilter | null),reports?: (ImageReportListRelationFilter | null),slug?: (StringFilter | null),source?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null),uploadType?: (EnumUploadTypeFilter | null),user?: (UserWhereInput | null),userAvatarOf?: (UserWhereInput | null),userBannerOf?: (UserWhereInput | null),userId?: (IntNullableFilter | null),views?: (IntFilter | null),width?: (IntFilter | null),xp?: (IntFilter | null)}

export interface ImageWhereUniqueInput {id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),slug?: (Scalars['String'] | null)}

export interface IntFieldUpdateOperationsInput {decrement?: (Scalars['Int'] | null),divide?: (Scalars['Int'] | null),increment?: (Scalars['Int'] | null),multiply?: (Scalars['Int'] | null),set?: (Scalars['Int'] | null)}

export interface IntFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface IntNullableFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntNullableFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface IntNullableListFilter {equals?: (Scalars['Int'][] | null),has?: (Scalars['Int'] | null),hasEvery?: (Scalars['Int'][] | null),hasSome?: (Scalars['Int'][] | null),isEmpty?: (Scalars['Boolean'] | null)}

export interface LeaderboardUserRequest{
    rank?: boolean | number
    user?: UserRequest
    xp?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MutationRequest{
    /** Add an appearance relation on an image. */
    addAppearance?: [{imageId: Scalars['Int'],personId: Scalars['Int']},AppearanceRequest]
    addProvider?: [{provider: AddProviderInput}]
    createAppearanceTag?: [{appearanceId: Scalars['Int'],name: Scalars['String']},AppearanceTagRequest]
    createImageTag?: [{imageId: Scalars['Int'],name: Scalars['String']},ImageTagRequest]
    createOnePerson?: [{data: PersonCreateInput},PersonRequest]
    createTag?: [{name: Scalars['String']},TagRequest]
    deleteAppearanceTag?: [{appearanceId: Scalars['Int'],name: Scalars['String']},AppearanceTagRequest]
    deleteImageTag?: [{imageId: Scalars['Int'],name: Scalars['String']},ImageTagRequest]
    discoveredImageVote?: [{imageId: Scalars['Int'],reason?: (Scalars['String'] | null),verdict: Scalars['String']},DiscoveredImageVoteRequest]
    /** Vote using the same verdict on all images in a post */
    discoveredPostVote?: [{postId: Scalars['Int'],reason?: (Scalars['String'] | null),verdict: Scalars['String']},DiscoveredImageRequest]
    /** Action on an image reported by a user. Only usable by moderators */
    imageReportAction?: [{action: ImageReportAction,reportId: Scalars['Int']},ImageReportRequest]
    /** Attach an existing face to an apperance. */
    linkFace?: [{appearanceId: Scalars['Int'],faceId: Scalars['Int']},AppearanceRequest]
    /** Removes an appearance from an image */
    removeAppearance?: [{appearanceId: Scalars['Int']},AppearanceRequest]
    reportImage?: [{imageId: Scalars['Int'],reason?: (Scalars['String'] | null)},ImageReportRequest]
    /** Queue an image to get scanned for faces */
    scanFaces?: [{slug: Scalars['String']},QueueInfoRequest]
    toggleLike?: [{imageId: Scalars['Int']},ImageRequest]
    /** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
    unlinkFace?: [{appearanceId: Scalars['Int'],faceId: Scalars['Int']}]
    updatePerson?: [{id: Scalars['Int'],update: UpdatePersonInputs},PersonRequest]
    upsertOneGroup?: [{create: GroupCreateInput,update: GroupUpdateInput,where: GroupWhereUniqueInput},GroupRequest]
    upsertOnePerson?: [{create: PersonCreateInput,update: PersonUpdateInput,where: PersonWhereUniqueInput},PersonRequest]
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface NestedBoolFilter {equals?: (Scalars['Boolean'] | null),not?: (NestedBoolFilter | null)}

export interface NestedDateTimeFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface NestedDateTimeNullableFilter {equals?: (Scalars['DateTime'] | null),gt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),in?: (Scalars['DateTime'][] | null),lt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),not?: (NestedDateTimeNullableFilter | null),notIn?: (Scalars['DateTime'][] | null)}

export interface NestedEnumFaceSourceFilter {equals?: (FaceSource | null),in?: (FaceSource[] | null),not?: (NestedEnumFaceSourceFilter | null),notIn?: (FaceSource[] | null)}

export interface NestedEnumGenderNullableFilter {equals?: (Gender | null),in?: (Gender[] | null),not?: (NestedEnumGenderNullableFilter | null),notIn?: (Gender[] | null)}

export interface NestedEnumImageReportActionNullableFilter {equals?: (ImageReportAction | null),in?: (ImageReportAction[] | null),not?: (NestedEnumImageReportActionNullableFilter | null),notIn?: (ImageReportAction[] | null)}

export interface NestedEnumMimeTypeFilter {equals?: (MimeType | null),in?: (MimeType[] | null),not?: (NestedEnumMimeTypeFilter | null),notIn?: (MimeType[] | null)}

export interface NestedEnumRestrictionKindFilter {equals?: (RestrictionKind | null),in?: (RestrictionKind[] | null),not?: (NestedEnumRestrictionKindFilter | null),notIn?: (RestrictionKind[] | null)}

export interface NestedEnumTagSourceFilter {equals?: (TagSource | null),in?: (TagSource[] | null),not?: (NestedEnumTagSourceFilter | null),notIn?: (TagSource[] | null)}

export interface NestedEnumUploadTypeFilter {equals?: (UploadType | null),in?: (UploadType[] | null),not?: (NestedEnumUploadTypeFilter | null),notIn?: (UploadType[] | null)}

export interface NestedFloatFilter {equals?: (Scalars['Float'] | null),gt?: (Scalars['Float'] | null),gte?: (Scalars['Float'] | null),in?: (Scalars['Float'][] | null),lt?: (Scalars['Float'] | null),lte?: (Scalars['Float'] | null),not?: (NestedFloatFilter | null),notIn?: (Scalars['Float'][] | null)}

export interface NestedIntFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface NestedIntNullableFilter {equals?: (Scalars['Int'] | null),gt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),in?: (Scalars['Int'][] | null),lt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),not?: (NestedIntNullableFilter | null),notIn?: (Scalars['Int'][] | null)}

export interface NestedStringFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),not?: (NestedStringFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface NestedStringNullableFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),not?: (NestedStringNullableFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface NullableDateTimeFieldUpdateOperationsInput {set?: (Scalars['DateTime'] | null)}

export interface NullableEnumGenderFieldUpdateOperationsInput {set?: (Gender | null)}

export interface NullableEnumImageReportActionFieldUpdateOperationsInput {set?: (ImageReportAction | null)}

export interface NullableIntFieldUpdateOperationsInput {decrement?: (Scalars['Int'] | null),divide?: (Scalars['Int'] | null),increment?: (Scalars['Int'] | null),multiply?: (Scalars['Int'] | null),set?: (Scalars['Int'] | null)}

export interface NullableStringFieldUpdateOperationsInput {set?: (Scalars['String'] | null)}

export interface PersonRequest{
    aliases?: [{cursor?: (AliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AliasRequest] | AliasRequest
    appearances?: [{cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},AppearanceRequest] | AppearanceRequest
    avatar?: ImageRequest
    banner?: ImageRequest
    birthDate?: boolean | number
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

export interface PersonCreateInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateManyPreferredMembershipInput {avatarId?: (Scalars['Int'] | null),bannerId?: (Scalars['Int'] | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),name: Scalars['String'],preferredAliasId?: (Scalars['Int'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateManyPreferredMembershipInputEnvelope {data?: (PersonCreateManyPreferredMembershipInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface PersonCreateNestedManyWithoutPreferredMembershipInput {connect?: (PersonWhereUniqueInput[] | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredMembershipInput[] | null),create?: (PersonCreateWithoutPreferredMembershipInput[] | null),createMany?: (PersonCreateManyPreferredMembershipInputEnvelope | null)}

export interface PersonCreateNestedOneWithoutAliasesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAliasesInput | null),create?: (PersonCreateWithoutAliasesInput | null)}

export interface PersonCreateNestedOneWithoutAppearancesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAppearancesInput | null),create?: (PersonCreateWithoutAppearancesInput | null)}

export interface PersonCreateNestedOneWithoutAvatarInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAvatarInput | null),create?: (PersonCreateWithoutAvatarInput | null)}

export interface PersonCreateNestedOneWithoutBannerInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutBannerInput | null),create?: (PersonCreateWithoutBannerInput | null)}

export interface PersonCreateNestedOneWithoutMemberOfInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutMemberOfInput | null),create?: (PersonCreateWithoutMemberOfInput | null)}

export interface PersonCreateNestedOneWithoutPreferredAliasInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredAliasInput | null),create?: (PersonCreateWithoutPreferredAliasInput | null)}

export interface PersonCreateOrConnectWithoutAliasesInput {create: PersonCreateWithoutAliasesInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutAppearancesInput {create: PersonCreateWithoutAppearancesInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutAppearsInInput {create: PersonCreateWithoutAppearsInInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutAvatarInput {create: PersonCreateWithoutAvatarInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutBannerInput {create: PersonCreateWithoutBannerInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutMemberOfInput {create: PersonCreateWithoutMemberOfInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutPreferredAliasInput {create: PersonCreateWithoutPreferredAliasInput,where: PersonWhereUniqueInput}

export interface PersonCreateOrConnectWithoutPreferredMembershipInput {create: PersonCreateWithoutPreferredMembershipInput,where: PersonWhereUniqueInput}

export interface PersonCreateWithoutAliasesInput {appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutAppearancesInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutAppearsInInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutAvatarInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutBannerInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutMemberOfInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutPreferredAliasInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredMembership?: (GroupMemberCreateNestedOneWithoutPreferredMemberships_Input | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonCreateWithoutPreferredMembershipInput {aliases?: (AliasCreateNestedManyWithoutPersonInput | null),appearances?: (AppearanceCreateNestedManyWithoutPersonInput | null),appearsIn?: (FaceCreateNestedManyWithoutPersonInput | null),avatar?: (ImageCreateNestedOneWithoutPersonAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutPersonBannerOfInput | null),birthDate?: (Scalars['DateTime'] | null),createdAt?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),ireneBotId?: (Scalars['Int'] | null),memberOf?: (GroupMemberCreateNestedManyWithoutPersonInput | null),name: Scalars['String'],preferredAlias?: (AliasCreateNestedOneWithoutPreferredAliasOfInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface PersonListRelationFilter {every?: (PersonWhereInput | null),none?: (PersonWhereInput | null),some?: (PersonWhereInput | null)}

export interface PersonOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface PersonOrderByWithRelationInput {aliases?: (AliasOrderByRelationAggregateInput | null),appearances?: (AppearanceOrderByRelationAggregateInput | null),appearsIn?: (FaceOrderByRelationAggregateInput | null),avatar?: (ImageOrderByWithRelationInput | null),avatarId?: (SortOrder | null),banner?: (ImageOrderByWithRelationInput | null),bannerId?: (SortOrder | null),birthDate?: (SortOrder | null),createdAt?: (SortOrder | null),description?: (SortOrder | null),gender?: (SortOrder | null),id?: (SortOrder | null),ireneBotId?: (SortOrder | null),memberOf?: (GroupMemberOrderByRelationAggregateInput | null),name?: (SortOrder | null),preferredAlias?: (AliasOrderByWithRelationInput | null),preferredAliasId?: (SortOrder | null),preferredMembership?: (GroupMemberOrderByWithRelationInput | null),preferredMembershipId?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface PersonScalarWhereInput {AND?: (PersonScalarWhereInput[] | null),NOT?: (PersonScalarWhereInput[] | null),OR?: (PersonScalarWhereInput[] | null),avatarId?: (IntNullableFilter | null),bannerId?: (IntNullableFilter | null),birthDate?: (DateTimeNullableFilter | null),createdAt?: (DateTimeFilter | null),description?: (StringNullableFilter | null),gender?: (EnumGenderNullableFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),name?: (StringFilter | null),preferredAliasId?: (IntNullableFilter | null),preferredMembershipId?: (IntNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface PersonUpdateInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateManyMutationInput {birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateManyWithWhereWithoutPreferredMembershipInput {data: PersonUpdateManyMutationInput,where: PersonScalarWhereInput}

export interface PersonUpdateManyWithoutPreferredMembershipInput {connect?: (PersonWhereUniqueInput[] | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredMembershipInput[] | null),create?: (PersonCreateWithoutPreferredMembershipInput[] | null),createMany?: (PersonCreateManyPreferredMembershipInputEnvelope | null),delete?: (PersonWhereUniqueInput[] | null),deleteMany?: (PersonScalarWhereInput[] | null),disconnect?: (PersonWhereUniqueInput[] | null),set?: (PersonWhereUniqueInput[] | null),update?: (PersonUpdateWithWhereUniqueWithoutPreferredMembershipInput[] | null),updateMany?: (PersonUpdateManyWithWhereWithoutPreferredMembershipInput[] | null),upsert?: (PersonUpsertWithWhereUniqueWithoutPreferredMembershipInput[] | null)}

export interface PersonUpdateOneRequiredWithoutAliasesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAliasesInput | null),create?: (PersonCreateWithoutAliasesInput | null),update?: (PersonUpdateWithoutAliasesInput | null),upsert?: (PersonUpsertWithoutAliasesInput | null)}

export interface PersonUpdateOneRequiredWithoutAppearancesInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAppearancesInput | null),create?: (PersonCreateWithoutAppearancesInput | null),update?: (PersonUpdateWithoutAppearancesInput | null),upsert?: (PersonUpsertWithoutAppearancesInput | null)}

export interface PersonUpdateOneRequiredWithoutMemberOfInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutMemberOfInput | null),create?: (PersonCreateWithoutMemberOfInput | null),update?: (PersonUpdateWithoutMemberOfInput | null),upsert?: (PersonUpsertWithoutMemberOfInput | null)}

export interface PersonUpdateOneWithoutAppearsInInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAppearsInInput | null),create?: (PersonCreateWithoutAppearsInInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (PersonUpdateWithoutAppearsInInput | null),upsert?: (PersonUpsertWithoutAppearsInInput | null)}

export interface PersonUpdateOneWithoutAvatarInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutAvatarInput | null),create?: (PersonCreateWithoutAvatarInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (PersonUpdateWithoutAvatarInput | null),upsert?: (PersonUpsertWithoutAvatarInput | null)}

export interface PersonUpdateOneWithoutBannerInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutBannerInput | null),create?: (PersonCreateWithoutBannerInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (PersonUpdateWithoutBannerInput | null),upsert?: (PersonUpsertWithoutBannerInput | null)}

export interface PersonUpdateOneWithoutPreferredAliasInput {connect?: (PersonWhereUniqueInput | null),connectOrCreate?: (PersonCreateOrConnectWithoutPreferredAliasInput | null),create?: (PersonCreateWithoutPreferredAliasInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (PersonUpdateWithoutPreferredAliasInput | null),upsert?: (PersonUpsertWithoutPreferredAliasInput | null)}

export interface PersonUpdateWithWhereUniqueWithoutPreferredMembershipInput {data: PersonUpdateWithoutPreferredMembershipInput,where: PersonWhereUniqueInput}

export interface PersonUpdateWithoutAliasesInput {appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutAppearancesInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutAppearsInInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutAvatarInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutBannerInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutMemberOfInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutPreferredAliasInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredMembership?: (GroupMemberUpdateOneWithoutPreferredMemberships_Input | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpdateWithoutPreferredMembershipInput {aliases?: (AliasUpdateManyWithoutPersonInput | null),appearances?: (AppearanceUpdateManyWithoutPersonInput | null),appearsIn?: (FaceUpdateManyWithoutPersonInput | null),avatar?: (ImageUpdateOneWithoutPersonAvatarOfInput | null),banner?: (ImageUpdateOneWithoutPersonBannerOfInput | null),birthDate?: (NullableDateTimeFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),description?: (NullableStringFieldUpdateOperationsInput | null),gender?: (NullableEnumGenderFieldUpdateOperationsInput | null),ireneBotId?: (NullableIntFieldUpdateOperationsInput | null),memberOf?: (GroupMemberUpdateManyWithoutPersonInput | null),name?: (StringFieldUpdateOperationsInput | null),preferredAlias?: (AliasUpdateOneWithoutPreferredAliasOfInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface PersonUpsertWithWhereUniqueWithoutPreferredMembershipInput {create: PersonCreateWithoutPreferredMembershipInput,update: PersonUpdateWithoutPreferredMembershipInput,where: PersonWhereUniqueInput}

export interface PersonUpsertWithoutAliasesInput {create: PersonCreateWithoutAliasesInput,update: PersonUpdateWithoutAliasesInput}

export interface PersonUpsertWithoutAppearancesInput {create: PersonCreateWithoutAppearancesInput,update: PersonUpdateWithoutAppearancesInput}

export interface PersonUpsertWithoutAppearsInInput {create: PersonCreateWithoutAppearsInInput,update: PersonUpdateWithoutAppearsInInput}

export interface PersonUpsertWithoutAvatarInput {create: PersonCreateWithoutAvatarInput,update: PersonUpdateWithoutAvatarInput}

export interface PersonUpsertWithoutBannerInput {create: PersonCreateWithoutBannerInput,update: PersonUpdateWithoutBannerInput}

export interface PersonUpsertWithoutMemberOfInput {create: PersonCreateWithoutMemberOfInput,update: PersonUpdateWithoutMemberOfInput}

export interface PersonUpsertWithoutPreferredAliasInput {create: PersonCreateWithoutPreferredAliasInput,update: PersonUpdateWithoutPreferredAliasInput}

export interface PersonWhereInput {AND?: (PersonWhereInput[] | null),NOT?: (PersonWhereInput[] | null),OR?: (PersonWhereInput[] | null),aliases?: (AliasListRelationFilter | null),appearances?: (AppearanceListRelationFilter | null),appearsIn?: (FaceListRelationFilter | null),avatar?: (ImageWhereInput | null),avatarId?: (IntNullableFilter | null),banner?: (ImageWhereInput | null),bannerId?: (IntNullableFilter | null),birthDate?: (DateTimeNullableFilter | null),createdAt?: (DateTimeFilter | null),description?: (StringNullableFilter | null),gender?: (EnumGenderNullableFilter | null),id?: (IntFilter | null),ireneBotId?: (IntNullableFilter | null),memberOf?: (GroupMemberListRelationFilter | null),name?: (StringFilter | null),preferredAlias?: (AliasWhereInput | null),preferredAliasId?: (IntNullableFilter | null),preferredMembership?: (GroupMemberWhereInput | null),preferredMembershipId?: (IntNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface PersonWhereUniqueInput {avatarId?: (Scalars['Int'] | null),bannerId?: (Scalars['Int'] | null),id?: (Scalars['Int'] | null),ireneBotId?: (Scalars['Int'] | null),preferredAliasId?: (Scalars['Int'] | null)}


/** Statistics associated with each provider */
export interface ProviderStatisticRequest{
    createdAt?: boolean | number
    defaultName?: boolean | number
    destination?: boolean | number
    discoveredImages?: boolean | number
    enabled?: boolean | number
    lastPost?: boolean | number
    lastScrape?: boolean | number
    name?: boolean | number
    official?: boolean | number
    priority?: boolean | number
    scrapeCount?: boolean | number
    tokens?: boolean | number
    url?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface QueryRequest{
    countAppearances?: [{groups: Scalars['Int'][]},AppearanceCountRequest]
    discoveredImages?: [{cursor?: (DiscoveredImageWhereUniqueInput | null),orderBy?: (DiscoveredImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredImageWhereInput | null)},DiscoveredImageRequest] | DiscoveredImageRequest
    discoveredPosts?: [{cursor?: (DiscoveredPostWhereUniqueInput | null),orderBy?: (DiscoveredPostOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredPostWhereInput | null)},DiscoveredPostRequest] | DiscoveredPostRequest
    discoveryFeed?: [{groupIds: Scalars['Int'][],peopleIds: Scalars['Int'][],skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},DiscoveredPostRequest]
    discoveryHistory?: [{skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},DiscoveredPostRequest] | DiscoveredPostRequest
    discoveryLeaderboard?: [{skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},LeaderboardUserRequest] | LeaderboardUserRequest
    discoveryProviders?: ProviderStatisticRequest
    discoverySchedule?: DiscoveryProviderRequest
    discoveryStats?: DiscoveryStatisticRequest
    group?: [{where: GroupWhereUniqueInput},GroupRequest]
    groups?: [{cursor?: (GroupWhereUniqueInput | null),orderBy?: (GroupOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (GroupWhereInput | null)},GroupRequest] | GroupRequest
    homepage?: PersonRequest
    /** Find a single image by its slug. */
    image?: [{slug: Scalars['String']},ImageRequest]
    imageConnections?: [{depth: Scalars['Int'],slug: Scalars['String']},ImageConnectionsRequest]
    imageReports?: [{cursor?: (ImageReportWhereUniqueInput | null),orderBy?: (ImageReportOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageReportWhereInput | null)},ImageReportRequest] | ImageReportRequest
    images?: [{cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)},ImageRequest] | ImageRequest
    me?: UserRequest
    notifications?: UserNotificationsRequest
    people?: [{cursor?: (PersonWhereUniqueInput | null),orderBy?: (PersonOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (PersonWhereInput | null)},PersonRequest] | PersonRequest
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

export interface RoleNameUserIdCompoundUniqueInput {name: Scalars['String'],userId: Scalars['Int']}

export interface RoleOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface RoleScalarWhereInput {AND?: (RoleScalarWhereInput[] | null),NOT?: (RoleScalarWhereInput[] | null),OR?: (RoleScalarWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null),userId?: (IntFilter | null)}

export interface RoleUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface RoleUpdateManyWithWhereWithoutUserInput {data: RoleUpdateManyMutationInput,where: RoleScalarWhereInput}

export interface RoleUpdateManyWithoutUserInput {connect?: (RoleWhereUniqueInput[] | null),connectOrCreate?: (RoleCreateOrConnectWithoutUserInput[] | null),create?: (RoleCreateWithoutUserInput[] | null),createMany?: (RoleCreateManyUserInputEnvelope | null),delete?: (RoleWhereUniqueInput[] | null),deleteMany?: (RoleScalarWhereInput[] | null),disconnect?: (RoleWhereUniqueInput[] | null),set?: (RoleWhereUniqueInput[] | null),update?: (RoleUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (RoleUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (RoleUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface RoleUpdateWithWhereUniqueWithoutUserInput {data: RoleUpdateWithoutUserInput,where: RoleWhereUniqueInput}

export interface RoleUpdateWithoutUserInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface RoleUpsertWithWhereUniqueWithoutUserInput {create: RoleCreateWithoutUserInput,update: RoleUpdateWithoutUserInput,where: RoleWhereUniqueInput}

export interface RoleWhereInput {AND?: (RoleWhereInput[] | null),NOT?: (RoleWhereInput[] | null),OR?: (RoleWhereInput[] | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null),user?: (UserWhereInput | null),userId?: (IntFilter | null)}

export interface RoleWhereUniqueInput {id?: (Scalars['Int'] | null),name_userId?: (RoleNameUserIdCompoundUniqueInput | null)}

export interface StringFieldUpdateOperationsInput {set?: (Scalars['String'] | null)}

export interface StringFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),mode?: (QueryMode | null),not?: (NestedStringFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface StringNullableFilter {contains?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),equals?: (Scalars['String'] | null),gt?: (Scalars['String'] | null),gte?: (Scalars['String'] | null),in?: (Scalars['String'][] | null),lt?: (Scalars['String'] | null),lte?: (Scalars['String'] | null),mode?: (QueryMode | null),not?: (NestedStringNullableFilter | null),notIn?: (Scalars['String'][] | null),startsWith?: (Scalars['String'] | null)}

export interface TagRequest{
    addedBy?: UserRequest
    aliases?: [{cursor?: (TagAliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)},TagAliasRequest] | TagAliasRequest
    category?: TagCategoryRequest
    createdAt?: boolean | number
    name?: boolean | number
    source?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TagAliasRequest{
    addedBy?: UserRequest
    createdAt?: boolean | number
    name?: boolean | number
    tag?: TagRequest
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TagAliasAliasTagCompoundUniqueInput {name: Scalars['String'],tagId: Scalars['Int']}

export interface TagAliasCreateManyAddedByInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],tagId: Scalars['Int'],updatedAt?: (Scalars['DateTime'] | null)}

export interface TagAliasCreateManyAddedByInputEnvelope {data?: (TagAliasCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagAliasCreateManyTagInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface TagAliasCreateManyTagInputEnvelope {data?: (TagAliasCreateManyTagInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagAliasCreateNestedManyWithoutAddedByInput {connect?: (TagAliasWhereUniqueInput[] | null),connectOrCreate?: (TagAliasCreateOrConnectWithoutAddedByInput[] | null),create?: (TagAliasCreateWithoutAddedByInput[] | null),createMany?: (TagAliasCreateManyAddedByInputEnvelope | null)}

export interface TagAliasCreateNestedManyWithoutTagInput {connect?: (TagAliasWhereUniqueInput[] | null),connectOrCreate?: (TagAliasCreateOrConnectWithoutTagInput[] | null),create?: (TagAliasCreateWithoutTagInput[] | null),createMany?: (TagAliasCreateManyTagInputEnvelope | null)}

export interface TagAliasCreateOrConnectWithoutAddedByInput {create: TagAliasCreateWithoutAddedByInput,where: TagAliasWhereUniqueInput}

export interface TagAliasCreateOrConnectWithoutTagInput {create: TagAliasCreateWithoutTagInput,where: TagAliasWhereUniqueInput}

export interface TagAliasCreateWithoutAddedByInput {createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],tag: TagCreateNestedOneWithoutAliasesInput,updatedAt?: (Scalars['DateTime'] | null)}

export interface TagAliasCreateWithoutTagInput {addedBy?: (UserCreateNestedOneWithoutTagAliasesInput | null),createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface TagAliasListRelationFilter {every?: (TagAliasWhereInput | null),none?: (TagAliasWhereInput | null),some?: (TagAliasWhereInput | null)}

export interface TagAliasOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface TagAliasScalarWhereInput {AND?: (TagAliasScalarWhereInput[] | null),NOT?: (TagAliasScalarWhereInput[] | null),OR?: (TagAliasScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),tagId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagAliasUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagAliasUpdateManyWithWhereWithoutAddedByInput {data: TagAliasUpdateManyMutationInput,where: TagAliasScalarWhereInput}

export interface TagAliasUpdateManyWithWhereWithoutTagInput {data: TagAliasUpdateManyMutationInput,where: TagAliasScalarWhereInput}

export interface TagAliasUpdateManyWithoutAddedByInput {connect?: (TagAliasWhereUniqueInput[] | null),connectOrCreate?: (TagAliasCreateOrConnectWithoutAddedByInput[] | null),create?: (TagAliasCreateWithoutAddedByInput[] | null),createMany?: (TagAliasCreateManyAddedByInputEnvelope | null),delete?: (TagAliasWhereUniqueInput[] | null),deleteMany?: (TagAliasScalarWhereInput[] | null),disconnect?: (TagAliasWhereUniqueInput[] | null),set?: (TagAliasWhereUniqueInput[] | null),update?: (TagAliasUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (TagAliasUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (TagAliasUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface TagAliasUpdateManyWithoutTagInput {connect?: (TagAliasWhereUniqueInput[] | null),connectOrCreate?: (TagAliasCreateOrConnectWithoutTagInput[] | null),create?: (TagAliasCreateWithoutTagInput[] | null),createMany?: (TagAliasCreateManyTagInputEnvelope | null),delete?: (TagAliasWhereUniqueInput[] | null),deleteMany?: (TagAliasScalarWhereInput[] | null),disconnect?: (TagAliasWhereUniqueInput[] | null),set?: (TagAliasWhereUniqueInput[] | null),update?: (TagAliasUpdateWithWhereUniqueWithoutTagInput[] | null),updateMany?: (TagAliasUpdateManyWithWhereWithoutTagInput[] | null),upsert?: (TagAliasUpsertWithWhereUniqueWithoutTagInput[] | null)}

export interface TagAliasUpdateWithWhereUniqueWithoutAddedByInput {data: TagAliasUpdateWithoutAddedByInput,where: TagAliasWhereUniqueInput}

export interface TagAliasUpdateWithWhereUniqueWithoutTagInput {data: TagAliasUpdateWithoutTagInput,where: TagAliasWhereUniqueInput}

export interface TagAliasUpdateWithoutAddedByInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),tag?: (TagUpdateOneRequiredWithoutAliasesInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagAliasUpdateWithoutTagInput {addedBy?: (UserUpdateOneWithoutTagAliasesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagAliasUpsertWithWhereUniqueWithoutAddedByInput {create: TagAliasCreateWithoutAddedByInput,update: TagAliasUpdateWithoutAddedByInput,where: TagAliasWhereUniqueInput}

export interface TagAliasUpsertWithWhereUniqueWithoutTagInput {create: TagAliasCreateWithoutTagInput,update: TagAliasUpdateWithoutTagInput,where: TagAliasWhereUniqueInput}

export interface TagAliasWhereInput {AND?: (TagAliasWhereInput[] | null),NOT?: (TagAliasWhereInput[] | null),OR?: (TagAliasWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),tag?: (TagWhereInput | null),tagId?: (IntFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagAliasWhereUniqueInput {aliasTag?: (TagAliasAliasTagCompoundUniqueInput | null),id?: (Scalars['Int'] | null)}

export interface TagCategoryRequest{
    addedBy?: UserRequest
    createdAt?: boolean | number
    name?: boolean | number
    updatedAt?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TagCategoryCreateManyAddedByInput {createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCategoryCreateManyAddedByInputEnvelope {data?: (TagCategoryCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagCategoryCreateNestedManyWithoutAddedByInput {connect?: (TagCategoryWhereUniqueInput[] | null),connectOrCreate?: (TagCategoryCreateOrConnectWithoutAddedByInput[] | null),create?: (TagCategoryCreateWithoutAddedByInput[] | null),createMany?: (TagCategoryCreateManyAddedByInputEnvelope | null)}

export interface TagCategoryCreateNestedOneWithoutTagsInput {connect?: (TagCategoryWhereUniqueInput | null),connectOrCreate?: (TagCategoryCreateOrConnectWithoutTagsInput | null),create?: (TagCategoryCreateWithoutTagsInput | null)}

export interface TagCategoryCreateOrConnectWithoutAddedByInput {create: TagCategoryCreateWithoutAddedByInput,where: TagCategoryWhereUniqueInput}

export interface TagCategoryCreateOrConnectWithoutTagsInput {create: TagCategoryCreateWithoutTagsInput,where: TagCategoryWhereUniqueInput}

export interface TagCategoryCreateWithoutAddedByInput {createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],tags?: (TagCreateNestedManyWithoutCategoryInput | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCategoryCreateWithoutTagsInput {addedBy?: (UserCreateNestedOneWithoutTagCategoriesInput | null),createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCategoryListRelationFilter {every?: (TagCategoryWhereInput | null),none?: (TagCategoryWhereInput | null),some?: (TagCategoryWhereInput | null)}

export interface TagCategoryOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface TagCategoryScalarWhereInput {AND?: (TagCategoryScalarWhereInput[] | null),NOT?: (TagCategoryScalarWhereInput[] | null),OR?: (TagCategoryScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagCategoryUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagCategoryUpdateManyWithWhereWithoutAddedByInput {data: TagCategoryUpdateManyMutationInput,where: TagCategoryScalarWhereInput}

export interface TagCategoryUpdateManyWithoutAddedByInput {connect?: (TagCategoryWhereUniqueInput[] | null),connectOrCreate?: (TagCategoryCreateOrConnectWithoutAddedByInput[] | null),create?: (TagCategoryCreateWithoutAddedByInput[] | null),createMany?: (TagCategoryCreateManyAddedByInputEnvelope | null),delete?: (TagCategoryWhereUniqueInput[] | null),deleteMany?: (TagCategoryScalarWhereInput[] | null),disconnect?: (TagCategoryWhereUniqueInput[] | null),set?: (TagCategoryWhereUniqueInput[] | null),update?: (TagCategoryUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (TagCategoryUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (TagCategoryUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface TagCategoryUpdateOneWithoutTagsInput {connect?: (TagCategoryWhereUniqueInput | null),connectOrCreate?: (TagCategoryCreateOrConnectWithoutTagsInput | null),create?: (TagCategoryCreateWithoutTagsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (TagCategoryUpdateWithoutTagsInput | null),upsert?: (TagCategoryUpsertWithoutTagsInput | null)}

export interface TagCategoryUpdateWithWhereUniqueWithoutAddedByInput {data: TagCategoryUpdateWithoutAddedByInput,where: TagCategoryWhereUniqueInput}

export interface TagCategoryUpdateWithoutAddedByInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),tags?: (TagUpdateManyWithoutCategoryInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagCategoryUpdateWithoutTagsInput {addedBy?: (UserUpdateOneWithoutTagCategoriesInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagCategoryUpsertWithWhereUniqueWithoutAddedByInput {create: TagCategoryCreateWithoutAddedByInput,update: TagCategoryUpdateWithoutAddedByInput,where: TagCategoryWhereUniqueInput}

export interface TagCategoryUpsertWithoutTagsInput {create: TagCategoryCreateWithoutTagsInput,update: TagCategoryUpdateWithoutTagsInput}

export interface TagCategoryWhereInput {AND?: (TagCategoryWhereInput[] | null),NOT?: (TagCategoryWhereInput[] | null),OR?: (TagCategoryWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),tags?: (TagListRelationFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagCategoryWhereUniqueInput {id?: (Scalars['Int'] | null),name?: (Scalars['String'] | null)}

export interface TagCreateManyAddedByInput {categoryId?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateManyAddedByInputEnvelope {data?: (TagCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagCreateManyCategoryInput {addedById?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateManyCategoryInputEnvelope {data?: (TagCreateManyCategoryInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface TagCreateNestedManyWithoutAddedByInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutAddedByInput[] | null),create?: (TagCreateWithoutAddedByInput[] | null),createMany?: (TagCreateManyAddedByInputEnvelope | null)}

export interface TagCreateNestedManyWithoutCategoryInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutCategoryInput[] | null),create?: (TagCreateWithoutCategoryInput[] | null),createMany?: (TagCreateManyCategoryInputEnvelope | null)}

export interface TagCreateNestedOneWithoutAliasesInput {connect?: (TagWhereUniqueInput | null),connectOrCreate?: (TagCreateOrConnectWithoutAliasesInput | null),create?: (TagCreateWithoutAliasesInput | null)}

export interface TagCreateNestedOneWithoutAppearancesInput {connect?: (TagWhereUniqueInput | null),connectOrCreate?: (TagCreateOrConnectWithoutAppearancesInput | null),create?: (TagCreateWithoutAppearancesInput | null)}

export interface TagCreateNestedOneWithoutImagesInput {connect?: (TagWhereUniqueInput | null),connectOrCreate?: (TagCreateOrConnectWithoutImagesInput | null),create?: (TagCreateWithoutImagesInput | null)}

export interface TagCreateOrConnectWithoutAddedByInput {create: TagCreateWithoutAddedByInput,where: TagWhereUniqueInput}

export interface TagCreateOrConnectWithoutAliasesInput {create: TagCreateWithoutAliasesInput,where: TagWhereUniqueInput}

export interface TagCreateOrConnectWithoutAppearancesInput {create: TagCreateWithoutAppearancesInput,where: TagWhereUniqueInput}

export interface TagCreateOrConnectWithoutCategoryInput {create: TagCreateWithoutCategoryInput,where: TagWhereUniqueInput}

export interface TagCreateOrConnectWithoutImagesInput {create: TagCreateWithoutImagesInput,where: TagWhereUniqueInput}

export interface TagCreateWithoutAddedByInput {aliases?: (TagAliasCreateNestedManyWithoutTagInput | null),appearances?: (AppearanceTagCreateNestedManyWithoutTagInput | null),category?: (TagCategoryCreateNestedOneWithoutTagsInput | null),createdAt?: (Scalars['DateTime'] | null),images?: (ImageTagCreateNestedManyWithoutTagInput | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateWithoutAliasesInput {addedBy?: (UserCreateNestedOneWithoutCratedTagsInput | null),appearances?: (AppearanceTagCreateNestedManyWithoutTagInput | null),category?: (TagCategoryCreateNestedOneWithoutTagsInput | null),createdAt?: (Scalars['DateTime'] | null),images?: (ImageTagCreateNestedManyWithoutTagInput | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateWithoutAppearancesInput {addedBy?: (UserCreateNestedOneWithoutCratedTagsInput | null),aliases?: (TagAliasCreateNestedManyWithoutTagInput | null),category?: (TagCategoryCreateNestedOneWithoutTagsInput | null),createdAt?: (Scalars['DateTime'] | null),images?: (ImageTagCreateNestedManyWithoutTagInput | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateWithoutCategoryInput {addedBy?: (UserCreateNestedOneWithoutCratedTagsInput | null),aliases?: (TagAliasCreateNestedManyWithoutTagInput | null),appearances?: (AppearanceTagCreateNestedManyWithoutTagInput | null),createdAt?: (Scalars['DateTime'] | null),images?: (ImageTagCreateNestedManyWithoutTagInput | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagCreateWithoutImagesInput {addedBy?: (UserCreateNestedOneWithoutCratedTagsInput | null),aliases?: (TagAliasCreateNestedManyWithoutTagInput | null),appearances?: (AppearanceTagCreateNestedManyWithoutTagInput | null),category?: (TagCategoryCreateNestedOneWithoutTagsInput | null),createdAt?: (Scalars['DateTime'] | null),name: Scalars['String'],source?: (TagSource | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface TagListRelationFilter {every?: (TagWhereInput | null),none?: (TagWhereInput | null),some?: (TagWhereInput | null)}

export interface TagOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface TagScalarWhereInput {AND?: (TagScalarWhereInput[] | null),NOT?: (TagScalarWhereInput[] | null),OR?: (TagScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),categoryId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),name?: (StringFilter | null),source?: (EnumTagSourceFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagUpdateManyMutationInput {createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateManyWithWhereWithoutAddedByInput {data: TagUpdateManyMutationInput,where: TagScalarWhereInput}

export interface TagUpdateManyWithWhereWithoutCategoryInput {data: TagUpdateManyMutationInput,where: TagScalarWhereInput}

export interface TagUpdateManyWithoutAddedByInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutAddedByInput[] | null),create?: (TagCreateWithoutAddedByInput[] | null),createMany?: (TagCreateManyAddedByInputEnvelope | null),delete?: (TagWhereUniqueInput[] | null),deleteMany?: (TagScalarWhereInput[] | null),disconnect?: (TagWhereUniqueInput[] | null),set?: (TagWhereUniqueInput[] | null),update?: (TagUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (TagUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (TagUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface TagUpdateManyWithoutCategoryInput {connect?: (TagWhereUniqueInput[] | null),connectOrCreate?: (TagCreateOrConnectWithoutCategoryInput[] | null),create?: (TagCreateWithoutCategoryInput[] | null),createMany?: (TagCreateManyCategoryInputEnvelope | null),delete?: (TagWhereUniqueInput[] | null),deleteMany?: (TagScalarWhereInput[] | null),disconnect?: (TagWhereUniqueInput[] | null),set?: (TagWhereUniqueInput[] | null),update?: (TagUpdateWithWhereUniqueWithoutCategoryInput[] | null),updateMany?: (TagUpdateManyWithWhereWithoutCategoryInput[] | null),upsert?: (TagUpsertWithWhereUniqueWithoutCategoryInput[] | null)}

export interface TagUpdateOneRequiredWithoutAliasesInput {connect?: (TagWhereUniqueInput | null),connectOrCreate?: (TagCreateOrConnectWithoutAliasesInput | null),create?: (TagCreateWithoutAliasesInput | null),update?: (TagUpdateWithoutAliasesInput | null),upsert?: (TagUpsertWithoutAliasesInput | null)}

export interface TagUpdateOneRequiredWithoutAppearancesInput {connect?: (TagWhereUniqueInput | null),connectOrCreate?: (TagCreateOrConnectWithoutAppearancesInput | null),create?: (TagCreateWithoutAppearancesInput | null),update?: (TagUpdateWithoutAppearancesInput | null),upsert?: (TagUpsertWithoutAppearancesInput | null)}

export interface TagUpdateOneRequiredWithoutImagesInput {connect?: (TagWhereUniqueInput | null),connectOrCreate?: (TagCreateOrConnectWithoutImagesInput | null),create?: (TagCreateWithoutImagesInput | null),update?: (TagUpdateWithoutImagesInput | null),upsert?: (TagUpsertWithoutImagesInput | null)}

export interface TagUpdateWithWhereUniqueWithoutAddedByInput {data: TagUpdateWithoutAddedByInput,where: TagWhereUniqueInput}

export interface TagUpdateWithWhereUniqueWithoutCategoryInput {data: TagUpdateWithoutCategoryInput,where: TagWhereUniqueInput}

export interface TagUpdateWithoutAddedByInput {aliases?: (TagAliasUpdateManyWithoutTagInput | null),appearances?: (AppearanceTagUpdateManyWithoutTagInput | null),category?: (TagCategoryUpdateOneWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),images?: (ImageTagUpdateManyWithoutTagInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateWithoutAliasesInput {addedBy?: (UserUpdateOneWithoutCratedTagsInput | null),appearances?: (AppearanceTagUpdateManyWithoutTagInput | null),category?: (TagCategoryUpdateOneWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),images?: (ImageTagUpdateManyWithoutTagInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateWithoutAppearancesInput {addedBy?: (UserUpdateOneWithoutCratedTagsInput | null),aliases?: (TagAliasUpdateManyWithoutTagInput | null),category?: (TagCategoryUpdateOneWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),images?: (ImageTagUpdateManyWithoutTagInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateWithoutCategoryInput {addedBy?: (UserUpdateOneWithoutCratedTagsInput | null),aliases?: (TagAliasUpdateManyWithoutTagInput | null),appearances?: (AppearanceTagUpdateManyWithoutTagInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),images?: (ImageTagUpdateManyWithoutTagInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpdateWithoutImagesInput {addedBy?: (UserUpdateOneWithoutCratedTagsInput | null),aliases?: (TagAliasUpdateManyWithoutTagInput | null),appearances?: (AppearanceTagUpdateManyWithoutTagInput | null),category?: (TagCategoryUpdateOneWithoutTagsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),name?: (StringFieldUpdateOperationsInput | null),source?: (EnumTagSourceFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface TagUpsertWithWhereUniqueWithoutAddedByInput {create: TagCreateWithoutAddedByInput,update: TagUpdateWithoutAddedByInput,where: TagWhereUniqueInput}

export interface TagUpsertWithWhereUniqueWithoutCategoryInput {create: TagCreateWithoutCategoryInput,update: TagUpdateWithoutCategoryInput,where: TagWhereUniqueInput}

export interface TagUpsertWithoutAliasesInput {create: TagCreateWithoutAliasesInput,update: TagUpdateWithoutAliasesInput}

export interface TagUpsertWithoutAppearancesInput {create: TagCreateWithoutAppearancesInput,update: TagUpdateWithoutAppearancesInput}

export interface TagUpsertWithoutImagesInput {create: TagCreateWithoutImagesInput,update: TagUpdateWithoutImagesInput}

export interface TagWhereInput {AND?: (TagWhereInput[] | null),NOT?: (TagWhereInput[] | null),OR?: (TagWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),aliases?: (TagAliasListRelationFilter | null),appearances?: (AppearanceTagListRelationFilter | null),category?: (TagCategoryWhereInput | null),categoryId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),images?: (ImageTagListRelationFilter | null),name?: (StringFilter | null),source?: (EnumTagSourceFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface TagWhereUniqueInput {id?: (Scalars['Int'] | null),name?: (Scalars['String'] | null)}


/** Preview urls of an image */
export interface ThumbnailRequest{
    large?: boolean | number
    medium?: boolean | number
    small?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UpdatePersonInputs {aliases: Scalars['String'][],avatarId?: (Scalars['Int'] | null),bannerId?: (Scalars['Int'] | null),birthDate?: (Scalars['DateTime'] | null),description?: (Scalars['String'] | null),gender?: (Gender | null),groups: GroupMembership[],name: Scalars['String'],preferredAliasId?: (Scalars['Int'] | null),preferredMembershipId?: (Scalars['Int'] | null)}

export interface UserRequest{
    avatar?: boolean | number
    bot?: boolean | number
    createdAt?: boolean | number
    id?: boolean | number
    images?: [{cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)},ImageRequest] | ImageRequest
    name?: boolean | number
    roles?: RoleRequest
    xp?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserCreateNestedOneWithoutActionedReportedImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutActionedReportedImagesInput | null),create?: (UserCreateWithoutActionedReportedImagesInput | null)}

export interface UserCreateNestedOneWithoutAppearanceTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutAppearanceTagsInput | null),create?: (UserCreateWithoutAppearanceTagsInput | null)}

export interface UserCreateNestedOneWithoutAvatarInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutAvatarInput | null),create?: (UserCreateWithoutAvatarInput | null)}

export interface UserCreateNestedOneWithoutBannerInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutBannerInput | null),create?: (UserCreateWithoutBannerInput | null)}

export interface UserCreateNestedOneWithoutCratedTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutCratedTagsInput | null),create?: (UserCreateWithoutCratedTagsInput | null)}

export interface UserCreateNestedOneWithoutDiscoveredImageVoteInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutDiscoveredImageVoteInput | null),create?: (UserCreateWithoutDiscoveredImageVoteInput | null)}

export interface UserCreateNestedOneWithoutImageLikesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImageLikesInput | null),create?: (UserCreateWithoutImageLikesInput | null)}

export interface UserCreateNestedOneWithoutImageTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImageTagsInput | null),create?: (UserCreateWithoutImageTagsInput | null)}

export interface UserCreateNestedOneWithoutImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImagesInput | null),create?: (UserCreateWithoutImagesInput | null)}

export interface UserCreateNestedOneWithoutPlacedRestrictionsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutPlacedRestrictionsInput | null),create?: (UserCreateWithoutPlacedRestrictionsInput | null)}

export interface UserCreateNestedOneWithoutReportedImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutReportedImagesInput | null),create?: (UserCreateWithoutReportedImagesInput | null)}

export interface UserCreateNestedOneWithoutRestrictionsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutRestrictionsInput | null),create?: (UserCreateWithoutRestrictionsInput | null)}

export interface UserCreateNestedOneWithoutTagAliasesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTagAliasesInput | null),create?: (UserCreateWithoutTagAliasesInput | null)}

export interface UserCreateNestedOneWithoutTagCategoriesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTagCategoriesInput | null),create?: (UserCreateWithoutTagCategoriesInput | null)}

export interface UserCreateNestedOneWithoutTaggedAppearancesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTaggedAppearancesInput | null),create?: (UserCreateWithoutTaggedAppearancesInput | null)}

export interface UserCreateOrConnectWithoutActionedReportedImagesInput {create: UserCreateWithoutActionedReportedImagesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutAppearanceTagsInput {create: UserCreateWithoutAppearanceTagsInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutAvatarInput {create: UserCreateWithoutAvatarInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutBannerInput {create: UserCreateWithoutBannerInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutCratedTagsInput {create: UserCreateWithoutCratedTagsInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutDiscoveredImageVoteInput {create: UserCreateWithoutDiscoveredImageVoteInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutImageLikesInput {create: UserCreateWithoutImageLikesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutImageTagsInput {create: UserCreateWithoutImageTagsInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutImagesInput {create: UserCreateWithoutImagesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutMarkedFacesInput {create: UserCreateWithoutMarkedFacesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutPlacedRestrictionsInput {create: UserCreateWithoutPlacedRestrictionsInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutReportedImagesInput {create: UserCreateWithoutReportedImagesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutRestrictionsInput {create: UserCreateWithoutRestrictionsInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutTagAliasesInput {create: UserCreateWithoutTagAliasesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutTagCategoriesInput {create: UserCreateWithoutTagCategoriesInput,where: UserWhereUniqueInput}

export interface UserCreateOrConnectWithoutTaggedAppearancesInput {create: UserCreateWithoutTaggedAppearancesInput,where: UserWhereUniqueInput}

export interface UserCreateWithoutActionedReportedImagesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutAppearanceTagsInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutAvatarInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutBannerInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutCratedTagsInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutDiscoveredImageVoteInput {actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutImageLikesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutImageTagsInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutImagesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutMarkedFacesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutPlacedRestrictionsInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutReportedImagesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutRestrictionsInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutTagAliasesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutTagCategoriesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserCreateWithoutTaggedAppearancesInput {DiscoveredImageVote?: (DiscoveredImageVoteCreateNestedManyWithoutUserInput | null),actionedReportedImages?: (ImageReportCreateNestedManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagCreateNestedManyWithoutAddedByInput | null),avatar?: (ImageCreateNestedOneWithoutUserAvatarOfInput | null),banner?: (ImageCreateNestedOneWithoutUserBannerOfInput | null),bot?: (Scalars['Boolean'] | null),cratedTags?: (TagCreateNestedManyWithoutAddedByInput | null),createdAt?: (Scalars['DateTime'] | null),email?: (Scalars['String'] | null),emailVerified?: (Scalars['DateTime'] | null),image?: (Scalars['String'] | null),imageLikes?: (ImageLikeCreateNestedManyWithoutUserInput | null),imageTags?: (ImageTagCreateNestedManyWithoutAddedByInput | null),images?: (ImageCreateNestedManyWithoutUserInput | null),markedFaces?: (FaceCreateNestedManyWithoutAddedByInput | null),name?: (Scalars['String'] | null),placedRestrictions?: (UserRestrictionCreateNestedManyWithoutAddedByInput | null),reportedImages?: (ImageReportCreateNestedManyWithoutReportedByInput | null),restrictions?: (UserRestrictionCreateNestedManyWithoutUserInput | null),roles?: (RoleCreateNestedManyWithoutUserInput | null),tagAliases?: (TagAliasCreateNestedManyWithoutAddedByInput | null),tagCategories?: (TagCategoryCreateNestedManyWithoutAddedByInput | null),token?: (Scalars['String'] | null),updatedAt?: (Scalars['DateTime'] | null)}

export interface UserNotificationsRequest{
    unreadReports?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface UserOrderByWithRelationInput {DiscoveredImageVote?: (DiscoveredImageVoteOrderByRelationAggregateInput | null),actionedReportedImages?: (ImageReportOrderByRelationAggregateInput | null),appearanceTags?: (AppearanceTagOrderByRelationAggregateInput | null),avatar?: (ImageOrderByWithRelationInput | null),avatarId?: (SortOrder | null),banner?: (ImageOrderByWithRelationInput | null),bannerId?: (SortOrder | null),bot?: (SortOrder | null),cratedTags?: (TagOrderByRelationAggregateInput | null),createdAt?: (SortOrder | null),email?: (SortOrder | null),emailVerified?: (SortOrder | null),id?: (SortOrder | null),image?: (SortOrder | null),imageLikes?: (ImageLikeOrderByRelationAggregateInput | null),imageTags?: (ImageTagOrderByRelationAggregateInput | null),images?: (ImageOrderByRelationAggregateInput | null),markedFaces?: (FaceOrderByRelationAggregateInput | null),name?: (SortOrder | null),placedRestrictions?: (UserRestrictionOrderByRelationAggregateInput | null),reportedImages?: (ImageReportOrderByRelationAggregateInput | null),restrictions?: (UserRestrictionOrderByRelationAggregateInput | null),roles?: (RoleOrderByRelationAggregateInput | null),tagAliases?: (TagAliasOrderByRelationAggregateInput | null),tagCategories?: (TagCategoryOrderByRelationAggregateInput | null),taggedAppearances?: (AppearanceOrderByRelationAggregateInput | null),token?: (SortOrder | null),updatedAt?: (SortOrder | null)}

export interface UserRestrictionCreateManyAddedByInput {associatedEntityId?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),restriction: RestrictionKind,updatedAt?: (Scalars['DateTime'] | null),userId: Scalars['Int']}

export interface UserRestrictionCreateManyAddedByInputEnvelope {data?: (UserRestrictionCreateManyAddedByInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface UserRestrictionCreateManyUserInput {addedById?: (Scalars['Int'] | null),associatedEntityId?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),id?: (Scalars['Int'] | null),restriction: RestrictionKind,updatedAt?: (Scalars['DateTime'] | null)}

export interface UserRestrictionCreateManyUserInputEnvelope {data?: (UserRestrictionCreateManyUserInput[] | null),skipDuplicates?: (Scalars['Boolean'] | null)}

export interface UserRestrictionCreateNestedManyWithoutAddedByInput {connect?: (UserRestrictionWhereUniqueInput[] | null),connectOrCreate?: (UserRestrictionCreateOrConnectWithoutAddedByInput[] | null),create?: (UserRestrictionCreateWithoutAddedByInput[] | null),createMany?: (UserRestrictionCreateManyAddedByInputEnvelope | null)}

export interface UserRestrictionCreateNestedManyWithoutUserInput {connect?: (UserRestrictionWhereUniqueInput[] | null),connectOrCreate?: (UserRestrictionCreateOrConnectWithoutUserInput[] | null),create?: (UserRestrictionCreateWithoutUserInput[] | null),createMany?: (UserRestrictionCreateManyUserInputEnvelope | null)}

export interface UserRestrictionCreateOrConnectWithoutAddedByInput {create: UserRestrictionCreateWithoutAddedByInput,where: UserRestrictionWhereUniqueInput}

export interface UserRestrictionCreateOrConnectWithoutUserInput {create: UserRestrictionCreateWithoutUserInput,where: UserRestrictionWhereUniqueInput}

export interface UserRestrictionCreateWithoutAddedByInput {associatedEntityId?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),restriction: RestrictionKind,updatedAt?: (Scalars['DateTime'] | null),user: UserCreateNestedOneWithoutRestrictionsInput}

export interface UserRestrictionCreateWithoutUserInput {addedBy?: (UserCreateNestedOneWithoutPlacedRestrictionsInput | null),associatedEntityId?: (Scalars['Int'] | null),createdAt?: (Scalars['DateTime'] | null),restriction: RestrictionKind,updatedAt?: (Scalars['DateTime'] | null)}

export interface UserRestrictionListRelationFilter {every?: (UserRestrictionWhereInput | null),none?: (UserRestrictionWhereInput | null),some?: (UserRestrictionWhereInput | null)}

export interface UserRestrictionOrderByRelationAggregateInput {_count?: (SortOrder | null)}

export interface UserRestrictionScalarWhereInput {AND?: (UserRestrictionScalarWhereInput[] | null),NOT?: (UserRestrictionScalarWhereInput[] | null),OR?: (UserRestrictionScalarWhereInput[] | null),addedById?: (IntNullableFilter | null),associatedEntityId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),restriction?: (EnumRestrictionKindFilter | null),updatedAt?: (DateTimeFilter | null),userId?: (IntFilter | null)}

export interface UserRestrictionUpdateManyMutationInput {associatedEntityId?: (NullableIntFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),restriction?: (EnumRestrictionKindFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserRestrictionUpdateManyWithWhereWithoutAddedByInput {data: UserRestrictionUpdateManyMutationInput,where: UserRestrictionScalarWhereInput}

export interface UserRestrictionUpdateManyWithWhereWithoutUserInput {data: UserRestrictionUpdateManyMutationInput,where: UserRestrictionScalarWhereInput}

export interface UserRestrictionUpdateManyWithoutAddedByInput {connect?: (UserRestrictionWhereUniqueInput[] | null),connectOrCreate?: (UserRestrictionCreateOrConnectWithoutAddedByInput[] | null),create?: (UserRestrictionCreateWithoutAddedByInput[] | null),createMany?: (UserRestrictionCreateManyAddedByInputEnvelope | null),delete?: (UserRestrictionWhereUniqueInput[] | null),deleteMany?: (UserRestrictionScalarWhereInput[] | null),disconnect?: (UserRestrictionWhereUniqueInput[] | null),set?: (UserRestrictionWhereUniqueInput[] | null),update?: (UserRestrictionUpdateWithWhereUniqueWithoutAddedByInput[] | null),updateMany?: (UserRestrictionUpdateManyWithWhereWithoutAddedByInput[] | null),upsert?: (UserRestrictionUpsertWithWhereUniqueWithoutAddedByInput[] | null)}

export interface UserRestrictionUpdateManyWithoutUserInput {connect?: (UserRestrictionWhereUniqueInput[] | null),connectOrCreate?: (UserRestrictionCreateOrConnectWithoutUserInput[] | null),create?: (UserRestrictionCreateWithoutUserInput[] | null),createMany?: (UserRestrictionCreateManyUserInputEnvelope | null),delete?: (UserRestrictionWhereUniqueInput[] | null),deleteMany?: (UserRestrictionScalarWhereInput[] | null),disconnect?: (UserRestrictionWhereUniqueInput[] | null),set?: (UserRestrictionWhereUniqueInput[] | null),update?: (UserRestrictionUpdateWithWhereUniqueWithoutUserInput[] | null),updateMany?: (UserRestrictionUpdateManyWithWhereWithoutUserInput[] | null),upsert?: (UserRestrictionUpsertWithWhereUniqueWithoutUserInput[] | null)}

export interface UserRestrictionUpdateWithWhereUniqueWithoutAddedByInput {data: UserRestrictionUpdateWithoutAddedByInput,where: UserRestrictionWhereUniqueInput}

export interface UserRestrictionUpdateWithWhereUniqueWithoutUserInput {data: UserRestrictionUpdateWithoutUserInput,where: UserRestrictionWhereUniqueInput}

export interface UserRestrictionUpdateWithoutAddedByInput {associatedEntityId?: (NullableIntFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),restriction?: (EnumRestrictionKindFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null),user?: (UserUpdateOneRequiredWithoutRestrictionsInput | null)}

export interface UserRestrictionUpdateWithoutUserInput {addedBy?: (UserUpdateOneWithoutPlacedRestrictionsInput | null),associatedEntityId?: (NullableIntFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),restriction?: (EnumRestrictionKindFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserRestrictionUpsertWithWhereUniqueWithoutAddedByInput {create: UserRestrictionCreateWithoutAddedByInput,update: UserRestrictionUpdateWithoutAddedByInput,where: UserRestrictionWhereUniqueInput}

export interface UserRestrictionUpsertWithWhereUniqueWithoutUserInput {create: UserRestrictionCreateWithoutUserInput,update: UserRestrictionUpdateWithoutUserInput,where: UserRestrictionWhereUniqueInput}

export interface UserRestrictionUserRestrictionTargetCompoundUniqueInput {restriction: RestrictionKind,userId: Scalars['Int']}

export interface UserRestrictionWhereInput {AND?: (UserRestrictionWhereInput[] | null),NOT?: (UserRestrictionWhereInput[] | null),OR?: (UserRestrictionWhereInput[] | null),addedBy?: (UserWhereInput | null),addedById?: (IntNullableFilter | null),associatedEntityId?: (IntNullableFilter | null),createdAt?: (DateTimeFilter | null),id?: (IntFilter | null),restriction?: (EnumRestrictionKindFilter | null),updatedAt?: (DateTimeFilter | null),user?: (UserWhereInput | null),userId?: (IntFilter | null)}

export interface UserRestrictionWhereUniqueInput {id?: (Scalars['Int'] | null),userRestrictionTarget?: (UserRestrictionUserRestrictionTargetCompoundUniqueInput | null)}

export interface UserUpdateOneRequiredWithoutDiscoveredImageVoteInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutDiscoveredImageVoteInput | null),create?: (UserCreateWithoutDiscoveredImageVoteInput | null),update?: (UserUpdateWithoutDiscoveredImageVoteInput | null),upsert?: (UserUpsertWithoutDiscoveredImageVoteInput | null)}

export interface UserUpdateOneRequiredWithoutImageLikesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImageLikesInput | null),create?: (UserCreateWithoutImageLikesInput | null),update?: (UserUpdateWithoutImageLikesInput | null),upsert?: (UserUpsertWithoutImageLikesInput | null)}

export interface UserUpdateOneRequiredWithoutReportedImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutReportedImagesInput | null),create?: (UserCreateWithoutReportedImagesInput | null),update?: (UserUpdateWithoutReportedImagesInput | null),upsert?: (UserUpsertWithoutReportedImagesInput | null)}

export interface UserUpdateOneRequiredWithoutRestrictionsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutRestrictionsInput | null),create?: (UserCreateWithoutRestrictionsInput | null),update?: (UserUpdateWithoutRestrictionsInput | null),upsert?: (UserUpsertWithoutRestrictionsInput | null)}

export interface UserUpdateOneWithoutActionedReportedImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutActionedReportedImagesInput | null),create?: (UserCreateWithoutActionedReportedImagesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutActionedReportedImagesInput | null),upsert?: (UserUpsertWithoutActionedReportedImagesInput | null)}

export interface UserUpdateOneWithoutAppearanceTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutAppearanceTagsInput | null),create?: (UserCreateWithoutAppearanceTagsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutAppearanceTagsInput | null),upsert?: (UserUpsertWithoutAppearanceTagsInput | null)}

export interface UserUpdateOneWithoutAvatarInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutAvatarInput | null),create?: (UserCreateWithoutAvatarInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutAvatarInput | null),upsert?: (UserUpsertWithoutAvatarInput | null)}

export interface UserUpdateOneWithoutBannerInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutBannerInput | null),create?: (UserCreateWithoutBannerInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutBannerInput | null),upsert?: (UserUpsertWithoutBannerInput | null)}

export interface UserUpdateOneWithoutCratedTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutCratedTagsInput | null),create?: (UserCreateWithoutCratedTagsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutCratedTagsInput | null),upsert?: (UserUpsertWithoutCratedTagsInput | null)}

export interface UserUpdateOneWithoutImageTagsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImageTagsInput | null),create?: (UserCreateWithoutImageTagsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutImageTagsInput | null),upsert?: (UserUpsertWithoutImageTagsInput | null)}

export interface UserUpdateOneWithoutImagesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutImagesInput | null),create?: (UserCreateWithoutImagesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutImagesInput | null),upsert?: (UserUpsertWithoutImagesInput | null)}

export interface UserUpdateOneWithoutMarkedFacesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutMarkedFacesInput | null),create?: (UserCreateWithoutMarkedFacesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutMarkedFacesInput | null),upsert?: (UserUpsertWithoutMarkedFacesInput | null)}

export interface UserUpdateOneWithoutPlacedRestrictionsInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutPlacedRestrictionsInput | null),create?: (UserCreateWithoutPlacedRestrictionsInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutPlacedRestrictionsInput | null),upsert?: (UserUpsertWithoutPlacedRestrictionsInput | null)}

export interface UserUpdateOneWithoutTagAliasesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTagAliasesInput | null),create?: (UserCreateWithoutTagAliasesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutTagAliasesInput | null),upsert?: (UserUpsertWithoutTagAliasesInput | null)}

export interface UserUpdateOneWithoutTagCategoriesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTagCategoriesInput | null),create?: (UserCreateWithoutTagCategoriesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutTagCategoriesInput | null),upsert?: (UserUpsertWithoutTagCategoriesInput | null)}

export interface UserUpdateOneWithoutTaggedAppearancesInput {connect?: (UserWhereUniqueInput | null),connectOrCreate?: (UserCreateOrConnectWithoutTaggedAppearancesInput | null),create?: (UserCreateWithoutTaggedAppearancesInput | null),delete?: (Scalars['Boolean'] | null),disconnect?: (Scalars['Boolean'] | null),update?: (UserUpdateWithoutTaggedAppearancesInput | null),upsert?: (UserUpsertWithoutTaggedAppearancesInput | null)}

export interface UserUpdateWithoutActionedReportedImagesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutAppearanceTagsInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutAvatarInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutBannerInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutCratedTagsInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutDiscoveredImageVoteInput {actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutImageLikesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutImageTagsInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutImagesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutMarkedFacesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutPlacedRestrictionsInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutReportedImagesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutRestrictionsInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutTagAliasesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutTagCategoriesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),taggedAppearances?: (AppearanceUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpdateWithoutTaggedAppearancesInput {DiscoveredImageVote?: (DiscoveredImageVoteUpdateManyWithoutUserInput | null),actionedReportedImages?: (ImageReportUpdateManyWithoutActionedByInput | null),appearanceTags?: (AppearanceTagUpdateManyWithoutAddedByInput | null),avatar?: (ImageUpdateOneWithoutUserAvatarOfInput | null),banner?: (ImageUpdateOneWithoutUserBannerOfInput | null),bot?: (BoolFieldUpdateOperationsInput | null),cratedTags?: (TagUpdateManyWithoutAddedByInput | null),createdAt?: (DateTimeFieldUpdateOperationsInput | null),email?: (NullableStringFieldUpdateOperationsInput | null),emailVerified?: (NullableDateTimeFieldUpdateOperationsInput | null),image?: (NullableStringFieldUpdateOperationsInput | null),imageLikes?: (ImageLikeUpdateManyWithoutUserInput | null),imageTags?: (ImageTagUpdateManyWithoutAddedByInput | null),images?: (ImageUpdateManyWithoutUserInput | null),markedFaces?: (FaceUpdateManyWithoutAddedByInput | null),name?: (NullableStringFieldUpdateOperationsInput | null),placedRestrictions?: (UserRestrictionUpdateManyWithoutAddedByInput | null),reportedImages?: (ImageReportUpdateManyWithoutReportedByInput | null),restrictions?: (UserRestrictionUpdateManyWithoutUserInput | null),roles?: (RoleUpdateManyWithoutUserInput | null),tagAliases?: (TagAliasUpdateManyWithoutAddedByInput | null),tagCategories?: (TagCategoryUpdateManyWithoutAddedByInput | null),token?: (NullableStringFieldUpdateOperationsInput | null),updatedAt?: (DateTimeFieldUpdateOperationsInput | null)}

export interface UserUpsertWithoutActionedReportedImagesInput {create: UserCreateWithoutActionedReportedImagesInput,update: UserUpdateWithoutActionedReportedImagesInput}

export interface UserUpsertWithoutAppearanceTagsInput {create: UserCreateWithoutAppearanceTagsInput,update: UserUpdateWithoutAppearanceTagsInput}

export interface UserUpsertWithoutAvatarInput {create: UserCreateWithoutAvatarInput,update: UserUpdateWithoutAvatarInput}

export interface UserUpsertWithoutBannerInput {create: UserCreateWithoutBannerInput,update: UserUpdateWithoutBannerInput}

export interface UserUpsertWithoutCratedTagsInput {create: UserCreateWithoutCratedTagsInput,update: UserUpdateWithoutCratedTagsInput}

export interface UserUpsertWithoutDiscoveredImageVoteInput {create: UserCreateWithoutDiscoveredImageVoteInput,update: UserUpdateWithoutDiscoveredImageVoteInput}

export interface UserUpsertWithoutImageLikesInput {create: UserCreateWithoutImageLikesInput,update: UserUpdateWithoutImageLikesInput}

export interface UserUpsertWithoutImageTagsInput {create: UserCreateWithoutImageTagsInput,update: UserUpdateWithoutImageTagsInput}

export interface UserUpsertWithoutImagesInput {create: UserCreateWithoutImagesInput,update: UserUpdateWithoutImagesInput}

export interface UserUpsertWithoutMarkedFacesInput {create: UserCreateWithoutMarkedFacesInput,update: UserUpdateWithoutMarkedFacesInput}

export interface UserUpsertWithoutPlacedRestrictionsInput {create: UserCreateWithoutPlacedRestrictionsInput,update: UserUpdateWithoutPlacedRestrictionsInput}

export interface UserUpsertWithoutReportedImagesInput {create: UserCreateWithoutReportedImagesInput,update: UserUpdateWithoutReportedImagesInput}

export interface UserUpsertWithoutRestrictionsInput {create: UserCreateWithoutRestrictionsInput,update: UserUpdateWithoutRestrictionsInput}

export interface UserUpsertWithoutTagAliasesInput {create: UserCreateWithoutTagAliasesInput,update: UserUpdateWithoutTagAliasesInput}

export interface UserUpsertWithoutTagCategoriesInput {create: UserCreateWithoutTagCategoriesInput,update: UserUpdateWithoutTagCategoriesInput}

export interface UserUpsertWithoutTaggedAppearancesInput {create: UserCreateWithoutTaggedAppearancesInput,update: UserUpdateWithoutTaggedAppearancesInput}

export interface UserWhereInput {AND?: (UserWhereInput[] | null),DiscoveredImageVote?: (DiscoveredImageVoteListRelationFilter | null),NOT?: (UserWhereInput[] | null),OR?: (UserWhereInput[] | null),actionedReportedImages?: (ImageReportListRelationFilter | null),appearanceTags?: (AppearanceTagListRelationFilter | null),avatar?: (ImageWhereInput | null),avatarId?: (IntNullableFilter | null),banner?: (ImageWhereInput | null),bannerId?: (IntNullableFilter | null),bot?: (BoolFilter | null),cratedTags?: (TagListRelationFilter | null),createdAt?: (DateTimeFilter | null),email?: (StringNullableFilter | null),emailVerified?: (DateTimeNullableFilter | null),id?: (IntFilter | null),image?: (StringNullableFilter | null),imageLikes?: (ImageLikeListRelationFilter | null),imageTags?: (ImageTagListRelationFilter | null),images?: (ImageListRelationFilter | null),markedFaces?: (FaceListRelationFilter | null),name?: (StringNullableFilter | null),placedRestrictions?: (UserRestrictionListRelationFilter | null),reportedImages?: (ImageReportListRelationFilter | null),restrictions?: (UserRestrictionListRelationFilter | null),roles?: (RoleListRelationFilter | null),tagAliases?: (TagAliasListRelationFilter | null),tagCategories?: (TagCategoryListRelationFilter | null),taggedAppearances?: (AppearanceListRelationFilter | null),token?: (StringNullableFilter | null),updatedAt?: (DateTimeFilter | null)}

export interface UserWhereUniqueInput {avatarId?: (Scalars['Int'] | null),bannerId?: (Scalars['Int'] | null),email?: (Scalars['String'] | null),id?: (Scalars['Int'] | null),token?: (Scalars['String'] | null)}


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



const AppearanceTag_possibleTypes = ['AppearanceTag']
export const isAppearanceTag = (obj?: { __typename?: any } | null): obj is AppearanceTag => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isAppearanceTag"')
  return AppearanceTag_possibleTypes.includes(obj.__typename)
}



const DiscoveredImage_possibleTypes = ['DiscoveredImage']
export const isDiscoveredImage = (obj?: { __typename?: any } | null): obj is DiscoveredImage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscoveredImage"')
  return DiscoveredImage_possibleTypes.includes(obj.__typename)
}



const DiscoveredImageVerdict_possibleTypes = ['DiscoveredImageVerdict']
export const isDiscoveredImageVerdict = (obj?: { __typename?: any } | null): obj is DiscoveredImageVerdict => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscoveredImageVerdict"')
  return DiscoveredImageVerdict_possibleTypes.includes(obj.__typename)
}



const DiscoveredImageVote_possibleTypes = ['DiscoveredImageVote']
export const isDiscoveredImageVote = (obj?: { __typename?: any } | null): obj is DiscoveredImageVote => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscoveredImageVote"')
  return DiscoveredImageVote_possibleTypes.includes(obj.__typename)
}



const DiscoveredPost_possibleTypes = ['DiscoveredPost']
export const isDiscoveredPost = (obj?: { __typename?: any } | null): obj is DiscoveredPost => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscoveredPost"')
  return DiscoveredPost_possibleTypes.includes(obj.__typename)
}



const DiscoveryProvider_possibleTypes = ['DiscoveryProvider']
export const isDiscoveryProvider = (obj?: { __typename?: any } | null): obj is DiscoveryProvider => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscoveryProvider"')
  return DiscoveryProvider_possibleTypes.includes(obj.__typename)
}



const DiscoveryStatistic_possibleTypes = ['DiscoveryStatistic']
export const isDiscoveryStatistic = (obj?: { __typename?: any } | null): obj is DiscoveryStatistic => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isDiscoveryStatistic"')
  return DiscoveryStatistic_possibleTypes.includes(obj.__typename)
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



const Homepage_possibleTypes = ['Homepage']
export const isHomepage = (obj?: { __typename?: any } | null): obj is Homepage => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHomepage"')
  return Homepage_possibleTypes.includes(obj.__typename)
}



const HomepageTrendingPerson_possibleTypes = ['HomepageTrendingPerson']
export const isHomepageTrendingPerson = (obj?: { __typename?: any } | null): obj is HomepageTrendingPerson => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isHomepageTrendingPerson"')
  return HomepageTrendingPerson_possibleTypes.includes(obj.__typename)
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



const ImageReport_possibleTypes = ['ImageReport']
export const isImageReport = (obj?: { __typename?: any } | null): obj is ImageReport => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImageReport"')
  return ImageReport_possibleTypes.includes(obj.__typename)
}



const ImageTag_possibleTypes = ['ImageTag']
export const isImageTag = (obj?: { __typename?: any } | null): obj is ImageTag => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isImageTag"')
  return ImageTag_possibleTypes.includes(obj.__typename)
}



const LeaderboardUser_possibleTypes = ['LeaderboardUser']
export const isLeaderboardUser = (obj?: { __typename?: any } | null): obj is LeaderboardUser => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isLeaderboardUser"')
  return LeaderboardUser_possibleTypes.includes(obj.__typename)
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



const ProviderStatistic_possibleTypes = ['ProviderStatistic']
export const isProviderStatistic = (obj?: { __typename?: any } | null): obj is ProviderStatistic => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isProviderStatistic"')
  return ProviderStatistic_possibleTypes.includes(obj.__typename)
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



const TagAlias_possibleTypes = ['TagAlias']
export const isTagAlias = (obj?: { __typename?: any } | null): obj is TagAlias => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTagAlias"')
  return TagAlias_possibleTypes.includes(obj.__typename)
}



const TagCategory_possibleTypes = ['TagCategory']
export const isTagCategory = (obj?: { __typename?: any } | null): obj is TagCategory => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isTagCategory"')
  return TagCategory_possibleTypes.includes(obj.__typename)
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



const UserNotifications_possibleTypes = ['UserNotifications']
export const isUserNotifications = (obj?: { __typename?: any } | null): obj is UserNotifications => {
  if (!obj?.__typename) throw new Error('__typename is missing in "isUserNotifications"')
  return UserNotifications_possibleTypes.includes(obj.__typename)
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
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Promise<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    person: (PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>}),
    tags: ((args?: {cursor?: (AppearanceTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Promise<FieldsSelection<AppearanceTag, R>[]>})&({get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Promise<FieldsSelection<AppearanceTag, R>[]>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface AppearanceObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    image: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    person: (PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>}),
    tags: ((args?: {cursor?: (AppearanceTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Observable<FieldsSelection<AppearanceTag, R>[]>})&({get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Observable<FieldsSelection<AppearanceTag, R>[]>}),
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

export interface AppearanceTagPromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    appearance: (AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    tag: (TagPromiseChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Promise<FieldsSelection<Tag, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface AppearanceTagObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    appearance: (AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    tag: (TagObservableChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Observable<FieldsSelection<Tag, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface DiscoveredImagePromiseChain{
    approvedImage: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    duplicateImage: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    providerType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    referenceUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    
/** A smaller thumbnail of the image */
thumbnail: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    uniqueIdentifier: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    verdict: (DiscoveredImageVerdictPromiseChain & {get: <R extends DiscoveredImageVerdictRequest>(request: R, defaultValue?: (FieldsSelection<DiscoveredImageVerdict, R> | undefined)) => Promise<(FieldsSelection<DiscoveredImageVerdict, R> | undefined)>}),
    
/** The vote cast by the currently logged in user */
vote: (DiscoveredImageVotePromiseChain & {get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: (FieldsSelection<DiscoveredImageVote, R> | undefined)) => Promise<(FieldsSelection<DiscoveredImageVote, R> | undefined)>}),
    
/** Votes cast by all users */
votes: ((args?: {cursor?: (DiscoveredImageVoteWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredImageVoteWhereInput | null)}) => {get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImageVote, R>[]) => Promise<FieldsSelection<DiscoveredImageVote, R>[]>})&({get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImageVote, R>[]) => Promise<FieldsSelection<DiscoveredImageVote, R>[]>})
}

export interface DiscoveredImageObservableChain{
    approvedImage: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    duplicateImage: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    providerType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    referenceUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    
/** A smaller thumbnail of the image */
thumbnail: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    uniqueIdentifier: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    verdict: (DiscoveredImageVerdictObservableChain & {get: <R extends DiscoveredImageVerdictRequest>(request: R, defaultValue?: (FieldsSelection<DiscoveredImageVerdict, R> | undefined)) => Observable<(FieldsSelection<DiscoveredImageVerdict, R> | undefined)>}),
    
/** The vote cast by the currently logged in user */
vote: (DiscoveredImageVoteObservableChain & {get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: (FieldsSelection<DiscoveredImageVote, R> | undefined)) => Observable<(FieldsSelection<DiscoveredImageVote, R> | undefined)>}),
    
/** Votes cast by all users */
votes: ((args?: {cursor?: (DiscoveredImageVoteWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredImageVoteWhereInput | null)}) => {get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImageVote, R>[]) => Observable<FieldsSelection<DiscoveredImageVote, R>[]>})&({get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImageVote, R>[]) => Observable<FieldsSelection<DiscoveredImageVote, R>[]>})
}

export interface DiscoveredImageVerdictPromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    reason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscoveredImageVerdictObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    reason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscoveredImageVotePromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    reason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscoveredImageVoteObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    reason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface DiscoveredPostPromiseChain{
    accountAvatarUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    accountName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    body: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    images: ((args?: {cursor?: (DiscoveredImageWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Promise<FieldsSelection<DiscoveredImage, R>[]>})&({get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Promise<FieldsSelection<DiscoveredImage, R>[]>}),
    originalPostDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    postUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    providerType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Groups who are associated with the social media account that created this post. */
referencingGroups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    
/** People who are associated with the social media account that created this post. */
referencingPeople: ({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>}),
    uniqueIdentifier: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface DiscoveredPostObservableChain{
    accountAvatarUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    accountName: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    body: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    images: ((args?: {cursor?: (DiscoveredImageWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Observable<FieldsSelection<DiscoveredImage, R>[]>})&({get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Observable<FieldsSelection<DiscoveredImage, R>[]>}),
    originalPostDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    postUrl: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    providerType: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Groups who are associated with the social media account that created this post. */
referencingGroups: ({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    
/** People who are associated with the social media account that created this post. */
referencingPeople: ({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>}),
    uniqueIdentifier: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}


/** The list of providers that supply images for the discovery feed */
export interface DiscoveryProviderPromiseChain{
    destination: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    official: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    provider: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The number of days remaining until this provider is checked for updates again */
waitDays: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}


/** The list of providers that supply images for the discovery feed */
export interface DiscoveryProviderObservableChain{
    destination: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    official: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    provider: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The number of days remaining until this provider is checked for updates again */
waitDays: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}

export interface DiscoveryStatisticPromiseChain{
    count: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}

export interface DiscoveryStatisticObservableChain{
    count: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    verdict: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface FacePromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    appearance: (AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: (FieldsSelection<Appearance, R> | undefined)) => Promise<(FieldsSelection<Appearance, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    height: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    
/** @deprecated No longer supported */
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
    
/** @deprecated No longer supported */
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

export interface HomepagePromiseChain{
    trending: ({get: <R extends HomepageTrendingPersonRequest>(request: R, defaultValue?: FieldsSelection<HomepageTrendingPerson, R>[][]) => Promise<FieldsSelection<HomepageTrendingPerson, R>[][]>})
}

export interface HomepageObservableChain{
    trending: ({get: <R extends HomepageTrendingPersonRequest>(request: R, defaultValue?: FieldsSelection<HomepageTrendingPerson, R>[][]) => Observable<FieldsSelection<HomepageTrendingPerson, R>[][]>})
}

export interface HomepageTrendingPersonPromiseChain{
    person: (PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>})
}

export interface HomepageTrendingPersonObservableChain{
    person: (PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>})
}

export interface ImagePromiseChain{
    appearanceTags: ((args?: {cursor?: (AppearanceTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Promise<FieldsSelection<AppearanceTag, R>[]>})&({get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Promise<FieldsSelection<AppearanceTag, R>[]>}),
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
    
/** The center of focus for the image. Calculated based on the position of the faces in the image. */
focus: (ImageCoordinatePromiseChain & {get: <R extends ImageCoordinateRequest>(request: R, defaultValue?: FieldsSelection<ImageCoordinate, R>) => Promise<FieldsSelection<ImageCoordinate, R>>}),
    
/** SHA256 checksum of the image. */
hash: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** Height of the image in pixels. */
height: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    hiddenAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    imageTags: ((args?: {cursor?: (ImageTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends ImageTagRequest>(request: R, defaultValue?: FieldsSelection<ImageTag, R>[]) => Promise<FieldsSelection<ImageTag, R>[]>})&({get: <R extends ImageTagRequest>(request: R, defaultValue?: FieldsSelection<ImageTag, R>[]) => Promise<FieldsSelection<ImageTag, R>[]>}),
    ireneBotId: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>}),
    
/** @deprecated Unused field, all images are SFW */
isNsfw: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** False if not logged in */
liked: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Promise<(Scalars['Boolean'] | undefined)>}),
    
/** The IANA media type of the image. */
mimetype: ({get: (request?: boolean|number, defaultValue?: MimeType) => Promise<MimeType>}),
    
/** Dominant colors in the image in decimal format, sorted by frequency. */
palette: ({get: (request?: boolean|number, defaultValue?: Scalars['Int'][]) => Promise<Scalars['Int'][]>}),
    
/** The visibility status of the image. */
public: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** Direct link to the image on the CDN */
rawUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    reported: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    
/** The unique url identifier of the image. */
slug: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    
/** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
source: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
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
    appearanceTags: ((args?: {cursor?: (AppearanceTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Observable<FieldsSelection<AppearanceTag, R>[]>})&({get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>[]) => Observable<FieldsSelection<AppearanceTag, R>[]>}),
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
    
/** The center of focus for the image. Calculated based on the position of the faces in the image. */
focus: (ImageCoordinateObservableChain & {get: <R extends ImageCoordinateRequest>(request: R, defaultValue?: FieldsSelection<ImageCoordinate, R>) => Observable<FieldsSelection<ImageCoordinate, R>>}),
    
/** SHA256 checksum of the image. */
hash: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** Height of the image in pixels. */
height: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    hiddenAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    imageTags: ((args?: {cursor?: (ImageTagWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends ImageTagRequest>(request: R, defaultValue?: FieldsSelection<ImageTag, R>[]) => Observable<FieldsSelection<ImageTag, R>[]>})&({get: <R extends ImageTagRequest>(request: R, defaultValue?: FieldsSelection<ImageTag, R>[]) => Observable<FieldsSelection<ImageTag, R>[]>}),
    ireneBotId: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>}),
    
/** @deprecated Unused field, all images are SFW */
isNsfw: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** False if not logged in */
liked: ({get: (request?: boolean|number, defaultValue?: (Scalars['Boolean'] | undefined)) => Observable<(Scalars['Boolean'] | undefined)>}),
    
/** The IANA media type of the image. */
mimetype: ({get: (request?: boolean|number, defaultValue?: MimeType) => Observable<MimeType>}),
    
/** Dominant colors in the image in decimal format, sorted by frequency. */
palette: ({get: (request?: boolean|number, defaultValue?: Scalars['Int'][]) => Observable<Scalars['Int'][]>}),
    
/** The visibility status of the image. */
public: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** Direct link to the image on the CDN */
rawUrl: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    reported: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    
/** The unique url identifier of the image. */
slug: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    
/** The url the image was taken from (if applicable). Not guaranteed to be a direct image url. */
source: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
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

export interface ImageReportPromiseChain{
    action: ({get: (request?: boolean|number, defaultValue?: (ImageReportAction | undefined)) => Promise<(ImageReportAction | undefined)>}),
    actionedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    reason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    reportedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface ImageReportObservableChain{
    action: ({get: (request?: boolean|number, defaultValue?: (ImageReportAction | undefined)) => Observable<(ImageReportAction | undefined)>}),
    actionedAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    image: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    reason: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    reportedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface ImageTagPromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    image: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    tag: (TagPromiseChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Promise<FieldsSelection<Tag, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface ImageTagObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    image: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    tag: (TagObservableChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Observable<FieldsSelection<Tag, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface LeaderboardUserPromiseChain{
    rank: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    user: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Promise<FieldsSelection<User, R>>}),
    xp: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>})
}

export interface LeaderboardUserObservableChain{
    rank: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    user: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: FieldsSelection<User, R>) => Observable<FieldsSelection<User, R>>}),
    xp: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>})
}

export interface MutationPromiseChain{
    
/** Add an appearance relation on an image. */
addAppearance: ((args: {imageId: Scalars['Int'],personId: Scalars['Int']}) => AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    addProvider: ((args: {provider: AddProviderInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    createAppearanceTag: ((args: {appearanceId: Scalars['Int'],name: Scalars['String']}) => AppearanceTagPromiseChain & {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>) => Promise<FieldsSelection<AppearanceTag, R>>}),
    createImageTag: ((args: {imageId: Scalars['Int'],name: Scalars['String']}) => ImageTagPromiseChain & {get: <R extends ImageTagRequest>(request: R, defaultValue?: FieldsSelection<ImageTag, R>) => Promise<FieldsSelection<ImageTag, R>>}),
    createOnePerson: ((args: {data: PersonCreateInput}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>}),
    createTag: ((args: {name: Scalars['String']}) => TagPromiseChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Promise<FieldsSelection<Tag, R>>}),
    deleteAppearanceTag: ((args: {appearanceId: Scalars['Int'],name: Scalars['String']}) => AppearanceTagPromiseChain & {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: (FieldsSelection<AppearanceTag, R> | undefined)) => Promise<(FieldsSelection<AppearanceTag, R> | undefined)>}),
    deleteImageTag: ((args: {imageId: Scalars['Int'],name: Scalars['String']}) => ImageTagPromiseChain & {get: <R extends ImageTagRequest>(request: R, defaultValue?: (FieldsSelection<ImageTag, R> | undefined)) => Promise<(FieldsSelection<ImageTag, R> | undefined)>}),
    discoveredImageVote: ((args: {imageId: Scalars['Int'],reason?: (Scalars['String'] | null),verdict: Scalars['String']}) => DiscoveredImageVotePromiseChain & {get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImageVote, R>) => Promise<FieldsSelection<DiscoveredImageVote, R>>}),
    
/** Vote using the same verdict on all images in a post */
discoveredPostVote: ((args: {postId: Scalars['Int'],reason?: (Scalars['String'] | null),verdict: Scalars['String']}) => {get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Promise<FieldsSelection<DiscoveredImage, R>[]>}),
    
/** Action on an image reported by a user. Only usable by moderators */
imageReportAction: ((args: {action: ImageReportAction,reportId: Scalars['Int']}) => ImageReportPromiseChain & {get: <R extends ImageReportRequest>(request: R, defaultValue?: (FieldsSelection<ImageReport, R> | undefined)) => Promise<(FieldsSelection<ImageReport, R> | undefined)>}),
    
/** Attach an existing face to an apperance. */
linkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    
/** Removes an appearance from an image */
removeAppearance: ((args: {appearanceId: Scalars['Int']}) => AppearancePromiseChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Promise<FieldsSelection<Appearance, R>>}),
    reportImage: ((args: {imageId: Scalars['Int'],reason?: (Scalars['String'] | null)}) => ImageReportPromiseChain & {get: <R extends ImageReportRequest>(request: R, defaultValue?: (FieldsSelection<ImageReport, R> | undefined)) => Promise<(FieldsSelection<ImageReport, R> | undefined)>}),
    
/** Queue an image to get scanned for faces */
scanFaces: ((args: {slug: Scalars['String']}) => QueueInfoPromiseChain & {get: <R extends QueueInfoRequest>(request: R, defaultValue?: FieldsSelection<QueueInfo, R>) => Promise<FieldsSelection<QueueInfo, R>>}),
    toggleLike: ((args: {imageId: Scalars['Int']}) => ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Promise<FieldsSelection<Image, R>>}),
    
/** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
unlinkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    updatePerson: ((args: {id: Scalars['Int'],update: UpdatePersonInputs}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: (FieldsSelection<Person, R> | undefined)) => Promise<(FieldsSelection<Person, R> | undefined)>}),
    upsertOneGroup: ((args: {create: GroupCreateInput,update: GroupUpdateInput,where: GroupWhereUniqueInput}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Promise<FieldsSelection<Group, R>>}),
    upsertOnePerson: ((args: {create: PersonCreateInput,update: PersonUpdateInput,where: PersonWhereUniqueInput}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Promise<FieldsSelection<Person, R>>})
}

export interface MutationObservableChain{
    
/** Add an appearance relation on an image. */
addAppearance: ((args: {imageId: Scalars['Int'],personId: Scalars['Int']}) => AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    addProvider: ((args: {provider: AddProviderInput}) => {get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    createAppearanceTag: ((args: {appearanceId: Scalars['Int'],name: Scalars['String']}) => AppearanceTagObservableChain & {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: FieldsSelection<AppearanceTag, R>) => Observable<FieldsSelection<AppearanceTag, R>>}),
    createImageTag: ((args: {imageId: Scalars['Int'],name: Scalars['String']}) => ImageTagObservableChain & {get: <R extends ImageTagRequest>(request: R, defaultValue?: FieldsSelection<ImageTag, R>) => Observable<FieldsSelection<ImageTag, R>>}),
    createOnePerson: ((args: {data: PersonCreateInput}) => PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>}),
    createTag: ((args: {name: Scalars['String']}) => TagObservableChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Observable<FieldsSelection<Tag, R>>}),
    deleteAppearanceTag: ((args: {appearanceId: Scalars['Int'],name: Scalars['String']}) => AppearanceTagObservableChain & {get: <R extends AppearanceTagRequest>(request: R, defaultValue?: (FieldsSelection<AppearanceTag, R> | undefined)) => Observable<(FieldsSelection<AppearanceTag, R> | undefined)>}),
    deleteImageTag: ((args: {imageId: Scalars['Int'],name: Scalars['String']}) => ImageTagObservableChain & {get: <R extends ImageTagRequest>(request: R, defaultValue?: (FieldsSelection<ImageTag, R> | undefined)) => Observable<(FieldsSelection<ImageTag, R> | undefined)>}),
    discoveredImageVote: ((args: {imageId: Scalars['Int'],reason?: (Scalars['String'] | null),verdict: Scalars['String']}) => DiscoveredImageVoteObservableChain & {get: <R extends DiscoveredImageVoteRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImageVote, R>) => Observable<FieldsSelection<DiscoveredImageVote, R>>}),
    
/** Vote using the same verdict on all images in a post */
discoveredPostVote: ((args: {postId: Scalars['Int'],reason?: (Scalars['String'] | null),verdict: Scalars['String']}) => {get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Observable<FieldsSelection<DiscoveredImage, R>[]>}),
    
/** Action on an image reported by a user. Only usable by moderators */
imageReportAction: ((args: {action: ImageReportAction,reportId: Scalars['Int']}) => ImageReportObservableChain & {get: <R extends ImageReportRequest>(request: R, defaultValue?: (FieldsSelection<ImageReport, R> | undefined)) => Observable<(FieldsSelection<ImageReport, R> | undefined)>}),
    
/** Attach an existing face to an apperance. */
linkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    
/** Removes an appearance from an image */
removeAppearance: ((args: {appearanceId: Scalars['Int']}) => AppearanceObservableChain & {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>) => Observable<FieldsSelection<Appearance, R>>}),
    reportImage: ((args: {imageId: Scalars['Int'],reason?: (Scalars['String'] | null)}) => ImageReportObservableChain & {get: <R extends ImageReportRequest>(request: R, defaultValue?: (FieldsSelection<ImageReport, R> | undefined)) => Observable<(FieldsSelection<ImageReport, R> | undefined)>}),
    
/** Queue an image to get scanned for faces */
scanFaces: ((args: {slug: Scalars['String']}) => QueueInfoObservableChain & {get: <R extends QueueInfoRequest>(request: R, defaultValue?: FieldsSelection<QueueInfo, R>) => Observable<FieldsSelection<QueueInfo, R>>}),
    toggleLike: ((args: {imageId: Scalars['Int']}) => ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>) => Observable<FieldsSelection<Image, R>>}),
    
/** Unlinks an existing face from an appearance. This dissociates the face from the appearance but does not remove the face data */
unlinkFace: ((args: {appearanceId: Scalars['Int'],faceId: Scalars['Int']}) => {get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    updatePerson: ((args: {id: Scalars['Int'],update: UpdatePersonInputs}) => PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: (FieldsSelection<Person, R> | undefined)) => Observable<(FieldsSelection<Person, R> | undefined)>}),
    upsertOneGroup: ((args: {create: GroupCreateInput,update: GroupUpdateInput,where: GroupWhereUniqueInput}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>) => Observable<FieldsSelection<Group, R>>}),
    upsertOnePerson: ((args: {create: PersonCreateInput,update: PersonUpdateInput,where: PersonWhereUniqueInput}) => PersonObservableChain & {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>) => Observable<FieldsSelection<Person, R>>})
}

export interface PersonPromiseChain{
    aliases: ((args?: {cursor?: (AliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AliasRequest>(request: R, defaultValue?: FieldsSelection<Alias, R>[]) => Promise<FieldsSelection<Alias, R>[]>})&({get: <R extends AliasRequest>(request: R, defaultValue?: FieldsSelection<Alias, R>[]) => Promise<FieldsSelection<Alias, R>[]>}),
    appearances: ((args?: {cursor?: (AppearanceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Promise<FieldsSelection<Appearance, R>[]>})&({get: <R extends AppearanceRequest>(request: R, defaultValue?: FieldsSelection<Appearance, R>[]) => Promise<FieldsSelection<Appearance, R>[]>}),
    avatar: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    banner: (ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    birthDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
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
    avatar: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    banner: (ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    birthDate: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    faces: ((args?: {cursor?: (FaceWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>})&({get: <R extends FaceRequest>(request: R, defaultValue?: FieldsSelection<Face, R>[]) => Observable<FieldsSelection<Face, R>[]>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    memberOf: ((args?: {cursor?: (GroupMemberWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Observable<FieldsSelection<GroupMember, R>[]>})&({get: <R extends GroupMemberRequest>(request: R, defaultValue?: FieldsSelection<GroupMember, R>[]) => Observable<FieldsSelection<GroupMember, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    preferredAlias: (AliasObservableChain & {get: <R extends AliasRequest>(request: R, defaultValue?: (FieldsSelection<Alias, R> | undefined)) => Observable<(FieldsSelection<Alias, R> | undefined)>}),
    preferredMembership: (GroupMemberObservableChain & {get: <R extends GroupMemberRequest>(request: R, defaultValue?: (FieldsSelection<GroupMember, R> | undefined)) => Observable<(FieldsSelection<GroupMember, R> | undefined)>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}


/** Statistics associated with each provider */
export interface ProviderStatisticPromiseChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    defaultName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    destination: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    discoveredImages: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    lastPost: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    lastScrape: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Promise<(Scalars['DateTime'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    official: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Promise<Scalars['Boolean']>}),
    priority: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    scrapeCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    tokens: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Promise<Scalars['Float']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>})
}


/** Statistics associated with each provider */
export interface ProviderStatisticObservableChain{
    createdAt: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    defaultName: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    destination: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    discoveredImages: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    enabled: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    lastPost: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    lastScrape: ({get: (request?: boolean|number, defaultValue?: (Scalars['DateTime'] | undefined)) => Observable<(Scalars['DateTime'] | undefined)>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    official: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    priority: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    scrapeCount: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    tokens: ({get: (request?: boolean|number, defaultValue?: Scalars['Float']) => Observable<Scalars['Float']>}),
    url: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>})
}

export interface QueryPromiseChain{
    countAppearances: ((args: {groups: Scalars['Int'][]}) => {get: <R extends AppearanceCountRequest>(request: R, defaultValue?: FieldsSelection<AppearanceCount, R>[]) => Promise<FieldsSelection<AppearanceCount, R>[]>}),
    discoveredImages: ((args?: {cursor?: (DiscoveredImageWhereUniqueInput | null),orderBy?: (DiscoveredImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredImageWhereInput | null)}) => {get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Promise<FieldsSelection<DiscoveredImage, R>[]>})&({get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Promise<FieldsSelection<DiscoveredImage, R>[]>}),
    discoveredPosts: ((args?: {cursor?: (DiscoveredPostWhereUniqueInput | null),orderBy?: (DiscoveredPostOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredPostWhereInput | null)}) => {get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Promise<FieldsSelection<DiscoveredPost, R>[]>})&({get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Promise<FieldsSelection<DiscoveredPost, R>[]>}),
    discoveryFeed: ((args: {groupIds: Scalars['Int'][],peopleIds: Scalars['Int'][],skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Promise<FieldsSelection<DiscoveredPost, R>[]>}),
    discoveryHistory: ((args?: {skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Promise<FieldsSelection<DiscoveredPost, R>[]>})&({get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Promise<FieldsSelection<DiscoveredPost, R>[]>}),
    discoveryLeaderboard: ((args?: {skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends LeaderboardUserRequest>(request: R, defaultValue?: FieldsSelection<LeaderboardUser, R>[]) => Promise<FieldsSelection<LeaderboardUser, R>[]>})&({get: <R extends LeaderboardUserRequest>(request: R, defaultValue?: FieldsSelection<LeaderboardUser, R>[]) => Promise<FieldsSelection<LeaderboardUser, R>[]>}),
    discoveryProviders: ({get: <R extends ProviderStatisticRequest>(request: R, defaultValue?: FieldsSelection<ProviderStatistic, R>[]) => Promise<FieldsSelection<ProviderStatistic, R>[]>}),
    discoverySchedule: ({get: <R extends DiscoveryProviderRequest>(request: R, defaultValue?: FieldsSelection<DiscoveryProvider, R>[]) => Promise<FieldsSelection<DiscoveryProvider, R>[]>}),
    discoveryStats: ({get: <R extends DiscoveryStatisticRequest>(request: R, defaultValue?: FieldsSelection<DiscoveryStatistic, R>[]) => Promise<FieldsSelection<DiscoveryStatistic, R>[]>}),
    group: ((args: {where: GroupWhereUniqueInput}) => GroupPromiseChain & {get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R> | undefined)) => Promise<(FieldsSelection<Group, R> | undefined)>}),
    groups: ((args?: {cursor?: (GroupWhereUniqueInput | null),orderBy?: (GroupOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (GroupWhereInput | null)}) => {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>})&({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Promise<FieldsSelection<Group, R>[]>}),
    homepage: ({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>}),
    
/** Find a single image by its slug. */
image: ((args: {slug: Scalars['String']}) => ImagePromiseChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Promise<(FieldsSelection<Image, R> | undefined)>}),
    imageConnections: ((args: {depth: Scalars['Int'],slug: Scalars['String']}) => ImageConnectionsPromiseChain & {get: <R extends ImageConnectionsRequest>(request: R, defaultValue?: (FieldsSelection<ImageConnections, R> | undefined)) => Promise<(FieldsSelection<ImageConnections, R> | undefined)>}),
    imageReports: ((args?: {cursor?: (ImageReportWhereUniqueInput | null),orderBy?: (ImageReportOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageReportWhereInput | null)}) => {get: <R extends ImageReportRequest>(request: R, defaultValue?: FieldsSelection<ImageReport, R>[]) => Promise<FieldsSelection<ImageReport, R>[]>})&({get: <R extends ImageReportRequest>(request: R, defaultValue?: FieldsSelection<ImageReport, R>[]) => Promise<FieldsSelection<ImageReport, R>[]>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>}),
    me: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    notifications: (UserNotificationsPromiseChain & {get: <R extends UserNotificationsRequest>(request: R, defaultValue?: FieldsSelection<UserNotifications, R>) => Promise<FieldsSelection<UserNotifications, R>>}),
    people: ((args?: {cursor?: (PersonWhereUniqueInput | null),orderBy?: (PersonOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (PersonWhereInput | null)}) => {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>})&({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Promise<FieldsSelection<Person, R>[]>}),
    person: ((args: {where: PersonWhereUniqueInput}) => PersonPromiseChain & {get: <R extends PersonRequest>(request: R, defaultValue?: (FieldsSelection<Person, R> | undefined)) => Promise<(FieldsSelection<Person, R> | undefined)>}),
    personImages: ((args: {amount?: (Scalars['Int'] | null),personIds: Scalars['Int'][]}) => {get: <R extends ImageMatchRequest>(request: R, defaultValue?: FieldsSelection<ImageMatch, R>[]) => Promise<FieldsSelection<ImageMatch, R>[]>}),
    user: ((args?: {id?: (Scalars['Int'] | null)}) => UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})&(UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>})
}

export interface QueryObservableChain{
    countAppearances: ((args: {groups: Scalars['Int'][]}) => {get: <R extends AppearanceCountRequest>(request: R, defaultValue?: FieldsSelection<AppearanceCount, R>[]) => Observable<FieldsSelection<AppearanceCount, R>[]>}),
    discoveredImages: ((args?: {cursor?: (DiscoveredImageWhereUniqueInput | null),orderBy?: (DiscoveredImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredImageWhereInput | null)}) => {get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Observable<FieldsSelection<DiscoveredImage, R>[]>})&({get: <R extends DiscoveredImageRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredImage, R>[]) => Observable<FieldsSelection<DiscoveredImage, R>[]>}),
    discoveredPosts: ((args?: {cursor?: (DiscoveredPostWhereUniqueInput | null),orderBy?: (DiscoveredPostOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (DiscoveredPostWhereInput | null)}) => {get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Observable<FieldsSelection<DiscoveredPost, R>[]>})&({get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Observable<FieldsSelection<DiscoveredPost, R>[]>}),
    discoveryFeed: ((args: {groupIds: Scalars['Int'][],peopleIds: Scalars['Int'][],skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Observable<FieldsSelection<DiscoveredPost, R>[]>}),
    discoveryHistory: ((args?: {skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Observable<FieldsSelection<DiscoveredPost, R>[]>})&({get: <R extends DiscoveredPostRequest>(request: R, defaultValue?: FieldsSelection<DiscoveredPost, R>[]) => Observable<FieldsSelection<DiscoveredPost, R>[]>}),
    discoveryLeaderboard: ((args?: {skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends LeaderboardUserRequest>(request: R, defaultValue?: FieldsSelection<LeaderboardUser, R>[]) => Observable<FieldsSelection<LeaderboardUser, R>[]>})&({get: <R extends LeaderboardUserRequest>(request: R, defaultValue?: FieldsSelection<LeaderboardUser, R>[]) => Observable<FieldsSelection<LeaderboardUser, R>[]>}),
    discoveryProviders: ({get: <R extends ProviderStatisticRequest>(request: R, defaultValue?: FieldsSelection<ProviderStatistic, R>[]) => Observable<FieldsSelection<ProviderStatistic, R>[]>}),
    discoverySchedule: ({get: <R extends DiscoveryProviderRequest>(request: R, defaultValue?: FieldsSelection<DiscoveryProvider, R>[]) => Observable<FieldsSelection<DiscoveryProvider, R>[]>}),
    discoveryStats: ({get: <R extends DiscoveryStatisticRequest>(request: R, defaultValue?: FieldsSelection<DiscoveryStatistic, R>[]) => Observable<FieldsSelection<DiscoveryStatistic, R>[]>}),
    group: ((args: {where: GroupWhereUniqueInput}) => GroupObservableChain & {get: <R extends GroupRequest>(request: R, defaultValue?: (FieldsSelection<Group, R> | undefined)) => Observable<(FieldsSelection<Group, R> | undefined)>}),
    groups: ((args?: {cursor?: (GroupWhereUniqueInput | null),orderBy?: (GroupOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (GroupWhereInput | null)}) => {get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>})&({get: <R extends GroupRequest>(request: R, defaultValue?: FieldsSelection<Group, R>[]) => Observable<FieldsSelection<Group, R>[]>}),
    homepage: ({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>}),
    
/** Find a single image by its slug. */
image: ((args: {slug: Scalars['String']}) => ImageObservableChain & {get: <R extends ImageRequest>(request: R, defaultValue?: (FieldsSelection<Image, R> | undefined)) => Observable<(FieldsSelection<Image, R> | undefined)>}),
    imageConnections: ((args: {depth: Scalars['Int'],slug: Scalars['String']}) => ImageConnectionsObservableChain & {get: <R extends ImageConnectionsRequest>(request: R, defaultValue?: (FieldsSelection<ImageConnections, R> | undefined)) => Observable<(FieldsSelection<ImageConnections, R> | undefined)>}),
    imageReports: ((args?: {cursor?: (ImageReportWhereUniqueInput | null),orderBy?: (ImageReportOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageReportWhereInput | null)}) => {get: <R extends ImageReportRequest>(request: R, defaultValue?: FieldsSelection<ImageReport, R>[]) => Observable<FieldsSelection<ImageReport, R>[]>})&({get: <R extends ImageReportRequest>(request: R, defaultValue?: FieldsSelection<ImageReport, R>[]) => Observable<FieldsSelection<ImageReport, R>[]>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>}),
    me: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    notifications: (UserNotificationsObservableChain & {get: <R extends UserNotificationsRequest>(request: R, defaultValue?: FieldsSelection<UserNotifications, R>) => Observable<FieldsSelection<UserNotifications, R>>}),
    people: ((args?: {cursor?: (PersonWhereUniqueInput | null),orderBy?: (PersonOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (PersonWhereInput | null)}) => {get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>})&({get: <R extends PersonRequest>(request: R, defaultValue?: FieldsSelection<Person, R>[]) => Observable<FieldsSelection<Person, R>[]>}),
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
    aliases: ((args?: {cursor?: (TagAliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends TagAliasRequest>(request: R, defaultValue?: FieldsSelection<TagAlias, R>[]) => Promise<FieldsSelection<TagAlias, R>[]>})&({get: <R extends TagAliasRequest>(request: R, defaultValue?: FieldsSelection<TagAlias, R>[]) => Promise<FieldsSelection<TagAlias, R>[]>}),
    category: (TagCategoryPromiseChain & {get: <R extends TagCategoryRequest>(request: R, defaultValue?: (FieldsSelection<TagCategory, R> | undefined)) => Promise<(FieldsSelection<TagCategory, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    source: ({get: (request?: boolean|number, defaultValue?: TagSource) => Promise<TagSource>})
}

export interface TagObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    aliases: ((args?: {cursor?: (TagAliasWhereUniqueInput | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null)}) => {get: <R extends TagAliasRequest>(request: R, defaultValue?: FieldsSelection<TagAlias, R>[]) => Observable<FieldsSelection<TagAlias, R>[]>})&({get: <R extends TagAliasRequest>(request: R, defaultValue?: FieldsSelection<TagAlias, R>[]) => Observable<FieldsSelection<TagAlias, R>[]>}),
    category: (TagCategoryObservableChain & {get: <R extends TagCategoryRequest>(request: R, defaultValue?: (FieldsSelection<TagCategory, R> | undefined)) => Observable<(FieldsSelection<TagCategory, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    source: ({get: (request?: boolean|number, defaultValue?: TagSource) => Observable<TagSource>})
}

export interface TagAliasPromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    tag: (TagPromiseChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Promise<FieldsSelection<Tag, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface TagAliasObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    tag: (TagObservableChain & {get: <R extends TagRequest>(request: R, defaultValue?: FieldsSelection<Tag, R>) => Observable<FieldsSelection<Tag, R>>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
}

export interface TagCategoryPromiseChain{
    addedBy: (UserPromiseChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Promise<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Promise<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>})
}

export interface TagCategoryObservableChain{
    addedBy: (UserObservableChain & {get: <R extends UserRequest>(request: R, defaultValue?: (FieldsSelection<User, R> | undefined)) => Observable<(FieldsSelection<User, R> | undefined)>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    name: ({get: (request?: boolean|number, defaultValue?: Scalars['String']) => Observable<Scalars['String']>}),
    updatedAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>})
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
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Promise<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Promise<Scalars['Int']>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Promise<FieldsSelection<Image, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Promise<(Scalars['String'] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Promise<FieldsSelection<Role, R>[]>}),
    xp: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface UserObservableChain{
    avatar: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    bot: ({get: (request?: boolean|number, defaultValue?: Scalars['Boolean']) => Observable<Scalars['Boolean']>}),
    createdAt: ({get: (request?: boolean|number, defaultValue?: Scalars['DateTime']) => Observable<Scalars['DateTime']>}),
    id: ({get: (request?: boolean|number, defaultValue?: Scalars['Int']) => Observable<Scalars['Int']>}),
    images: ((args?: {cursor?: (ImageWhereUniqueInput | null),orderBy?: (ImageOrderByWithRelationInput[] | null),skip?: (Scalars['Int'] | null),take?: (Scalars['Int'] | null),where?: (ImageWhereInput | null)}) => {get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>})&({get: <R extends ImageRequest>(request: R, defaultValue?: FieldsSelection<Image, R>[]) => Observable<FieldsSelection<Image, R>[]>}),
    name: ({get: (request?: boolean|number, defaultValue?: (Scalars['String'] | undefined)) => Observable<(Scalars['String'] | undefined)>}),
    roles: ({get: <R extends RoleRequest>(request: R, defaultValue?: FieldsSelection<Role, R>[]) => Observable<FieldsSelection<Role, R>[]>}),
    xp: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}

export interface UserNotificationsPromiseChain{
    unreadReports: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Promise<(Scalars['Int'] | undefined)>})
}

export interface UserNotificationsObservableChain{
    unreadReports: ({get: (request?: boolean|number, defaultValue?: (Scalars['Int'] | undefined)) => Observable<(Scalars['Int'] | undefined)>})
}