import { objectType } from "nexus"

export const GroupMember = objectType({
  name: "GroupMember",
  definition(t) {
    t.model
      .id()
      .group()
      .person()
      .startDate()
      .group()
      .endDate()
      .createdAt()
      .updatedAt()
  },
})
