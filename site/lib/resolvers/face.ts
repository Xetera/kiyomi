import { objectType, queryField, intArg } from "nexus";

export const Face = objectType({
  name: "Face",
  definition(t) {
    t.model
      .id()
      .x()
      .y()
      .height()
      .width()
      .addedBy()
      .appearance()
      .image()
      .score()
      .createdAt()
      .updatedAt();
  },
});
