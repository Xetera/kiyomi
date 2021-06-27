
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
