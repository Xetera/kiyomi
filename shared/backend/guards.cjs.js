
var Alias_possibleTypes = ['Alias']
module.exports.isAlias = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAlias"')
  return Alias_possibleTypes.includes(obj.__typename)
}



var Appearance_possibleTypes = ['Appearance']
module.exports.isAppearance = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAppearance"')
  return Appearance_possibleTypes.includes(obj.__typename)
}



var AppearanceCount_possibleTypes = ['AppearanceCount']
module.exports.isAppearanceCount = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAppearanceCount"')
  return AppearanceCount_possibleTypes.includes(obj.__typename)
}



var AppearanceTag_possibleTypes = ['AppearanceTag']
module.exports.isAppearanceTag = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isAppearanceTag"')
  return AppearanceTag_possibleTypes.includes(obj.__typename)
}



var DiscoveredImage_possibleTypes = ['DiscoveredImage']
module.exports.isDiscoveredImage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscoveredImage"')
  return DiscoveredImage_possibleTypes.includes(obj.__typename)
}



var DiscoveredImageVerdict_possibleTypes = ['DiscoveredImageVerdict']
module.exports.isDiscoveredImageVerdict = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscoveredImageVerdict"')
  return DiscoveredImageVerdict_possibleTypes.includes(obj.__typename)
}



var DiscoveredImageVote_possibleTypes = ['DiscoveredImageVote']
module.exports.isDiscoveredImageVote = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscoveredImageVote"')
  return DiscoveredImageVote_possibleTypes.includes(obj.__typename)
}



var DiscoveredPost_possibleTypes = ['DiscoveredPost']
module.exports.isDiscoveredPost = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscoveredPost"')
  return DiscoveredPost_possibleTypes.includes(obj.__typename)
}



var DiscoveryProvider_possibleTypes = ['DiscoveryProvider']
module.exports.isDiscoveryProvider = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscoveryProvider"')
  return DiscoveryProvider_possibleTypes.includes(obj.__typename)
}



var DiscoveryStatistic_possibleTypes = ['DiscoveryStatistic']
module.exports.isDiscoveryStatistic = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isDiscoveryStatistic"')
  return DiscoveryStatistic_possibleTypes.includes(obj.__typename)
}



var Face_possibleTypes = ['Face']
module.exports.isFace = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isFace"')
  return Face_possibleTypes.includes(obj.__typename)
}



var Group_possibleTypes = ['Group']
module.exports.isGroup = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGroup"')
  return Group_possibleTypes.includes(obj.__typename)
}



var GroupAlias_possibleTypes = ['GroupAlias']
module.exports.isGroupAlias = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGroupAlias"')
  return GroupAlias_possibleTypes.includes(obj.__typename)
}



var GroupMember_possibleTypes = ['GroupMember']
module.exports.isGroupMember = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isGroupMember"')
  return GroupMember_possibleTypes.includes(obj.__typename)
}



var Homepage_possibleTypes = ['Homepage']
module.exports.isHomepage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHomepage"')
  return Homepage_possibleTypes.includes(obj.__typename)
}



var HomepageTrendingPerson_possibleTypes = ['HomepageTrendingPerson']
module.exports.isHomepageTrendingPerson = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isHomepageTrendingPerson"')
  return HomepageTrendingPerson_possibleTypes.includes(obj.__typename)
}



var Image_possibleTypes = ['Image']
module.exports.isImage = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImage"')
  return Image_possibleTypes.includes(obj.__typename)
}



var ImageConnections_possibleTypes = ['ImageConnections']
module.exports.isImageConnections = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImageConnections"')
  return ImageConnections_possibleTypes.includes(obj.__typename)
}



var ImageCoordinate_possibleTypes = ['ImageCoordinate']
module.exports.isImageCoordinate = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImageCoordinate"')
  return ImageCoordinate_possibleTypes.includes(obj.__typename)
}



var ImageEdge_possibleTypes = ['ImageEdge']
module.exports.isImageEdge = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImageEdge"')
  return ImageEdge_possibleTypes.includes(obj.__typename)
}



var ImageMatch_possibleTypes = ['ImageMatch']
module.exports.isImageMatch = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImageMatch"')
  return ImageMatch_possibleTypes.includes(obj.__typename)
}



var ImageReport_possibleTypes = ['ImageReport']
module.exports.isImageReport = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImageReport"')
  return ImageReport_possibleTypes.includes(obj.__typename)
}



var ImageTag_possibleTypes = ['ImageTag']
module.exports.isImageTag = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isImageTag"')
  return ImageTag_possibleTypes.includes(obj.__typename)
}



var LeaderboardUser_possibleTypes = ['LeaderboardUser']
module.exports.isLeaderboardUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isLeaderboardUser"')
  return LeaderboardUser_possibleTypes.includes(obj.__typename)
}



var Mutation_possibleTypes = ['Mutation']
module.exports.isMutation = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isMutation"')
  return Mutation_possibleTypes.includes(obj.__typename)
}



var Person_possibleTypes = ['Person']
module.exports.isPerson = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isPerson"')
  return Person_possibleTypes.includes(obj.__typename)
}



var ProviderStatistic_possibleTypes = ['ProviderStatistic']
module.exports.isProviderStatistic = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isProviderStatistic"')
  return ProviderStatistic_possibleTypes.includes(obj.__typename)
}



var Query_possibleTypes = ['Query']
module.exports.isQuery = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQuery"')
  return Query_possibleTypes.includes(obj.__typename)
}



var QueueInfo_possibleTypes = ['QueueInfo']
module.exports.isQueueInfo = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isQueueInfo"')
  return QueueInfo_possibleTypes.includes(obj.__typename)
}



var Role_possibleTypes = ['Role']
module.exports.isRole = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isRole"')
  return Role_possibleTypes.includes(obj.__typename)
}



var Tag_possibleTypes = ['Tag']
module.exports.isTag = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTag"')
  return Tag_possibleTypes.includes(obj.__typename)
}



var TagAlias_possibleTypes = ['TagAlias']
module.exports.isTagAlias = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTagAlias"')
  return TagAlias_possibleTypes.includes(obj.__typename)
}



var TagCategory_possibleTypes = ['TagCategory']
module.exports.isTagCategory = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isTagCategory"')
  return TagCategory_possibleTypes.includes(obj.__typename)
}



var Thumbnail_possibleTypes = ['Thumbnail']
module.exports.isThumbnail = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isThumbnail"')
  return Thumbnail_possibleTypes.includes(obj.__typename)
}



var User_possibleTypes = ['User']
module.exports.isUser = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUser"')
  return User_possibleTypes.includes(obj.__typename)
}



var UserNotifications_possibleTypes = ['UserNotifications']
module.exports.isUserNotifications = function(obj) {
  if (!obj || !obj.__typename) throw new Error('__typename is missing in "isUserNotifications"')
  return UserNotifications_possibleTypes.includes(obj.__typename)
}
